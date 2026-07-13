import React, { useRef, useEffect, useState } from "react";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      
      const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      setScrollProgress(rawProgress);
      targetTimeRef.current = rawProgress * video.duration;
    };

    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    const tick = () => {
      if (video && !video.seeking && !isNaN(video.duration) && video.duration > 0) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.005) {
          // Interpolate current position toward target scroll position
          currentTimeRef.current = lerp(currentTimeRef.current, targetTimeRef.current, 0.06);
          // Clamp time bounds to prevent seek errors past end boundary
          currentTimeRef.current = Math.max(0, Math.min(video.duration - 0.05, currentTimeRef.current));
          video.currentTime = currentTimeRef.current;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    // Initial trigger
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative h-[320vh] w-full bg-black"
    >
      {/* Sticky viewport window: pins the hero section */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Playback video element scrubbing from /by_using_the_images_only_refer.mp4 */}
        <video
          ref={videoRef}
          src="/by_using_the_images_only_refer.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transform scale-100 will-change-transform bg-black"
        />

        {/* Dynamic scroll progress tracking bar (subtle indicator) */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-white/20 w-full z-20">
          <div
            className="h-full bg-gradient-to-r from-[#8C9A86] to-[#E0B5B1] transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

      </div>
    </section>
  );
}



