import React, { useRef, useEffect, useState, useCallback } from "react";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

const TOTAL_FRAMES = 100; // Number of frames to extract from the video (up to watches scene)

export default function Hero({ onScrollToSection }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const currentScrollProgressRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);    // 0–100 loading percentage
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoBgColor, setLogoBgColor] = useState("#FAF9F6"); // Dynamic color state matching logo background

  // ─── Step 1: Preload Logo, Sample Background Color & Extract Video Frames ───
  useEffect(() => {
    // 1. Preload the brand logo image and dynamically sample its background color
    const logoImg = new Image();
    logoImg.src = "/aanya_logo.png";
    logoImg.crossOrigin = "anonymous";
    logoImg.onload = () => {
      // Create a canvas to sample the top-left corner pixel of the logo image
      const canvas = document.createElement("canvas");
      canvas.width = logoImg.naturalWidth || 100;
      canvas.height = logoImg.naturalHeight || 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(logoImg, 0, 0);
        try {
          // Sample the corner pixel at (2, 2) to get the true background color without text averaging
          const [r, g, b] = ctx.getImageData(2, 2, 1, 1).data;
          const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
          setLogoBgColor(hex);
        } catch (e) {
          console.warn("Failed to read image pixel data, falling back to default off-white color.", e);
        }
      }
    };

    // 2. Load and extract frames from video (only up to 7.2 seconds - the watches scene)
    const video = document.createElement("video");
    video.src = "/by_using_the_images_only_refer.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    const offscreenCanvas = document.createElement("canvas");
    const ctx = offscreenCanvas.getContext("2d");

    const extractFrames = async () => {
      await new Promise<void>((resolve) => {
        video.addEventListener("loadedmetadata", () => resolve(), { once: true });
        video.load();
      });

      offscreenCanvas.width = video.videoWidth;
      offscreenCanvas.height = video.videoHeight;

      // The watches showcase frame is at approximately 7.2 seconds of the 10-second video
      const targetCutoffTime = video.duration * 0.72; 
      const frames: ImageBitmap[] = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const targetTime = (i / (TOTAL_FRAMES - 1)) * targetCutoffTime;

        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            resolve();
          };
          video.addEventListener("seeked", onSeeked);
          video.currentTime = targetTime;
        });

        ctx!.drawImage(video, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
        const bitmap = await createImageBitmap(offscreenCanvas);
        frames.push(bitmap);

        setLoadProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));
      }

      framesRef.current = frames;
      setIsReady(true);
      drawFrame(0);
    };

    extractFrames().catch(console.error);

    return () => {
      video.src = "";
      framesRef.current.forEach((bmp) => bmp.close());
    };
  }, []);

  // ─── Step 2: Draw Video Frame on Canvas ──────────────────────────────────
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Limit scroll progress to 0.72 for the video frame selection
    const videoProgress = Math.min(1, progress / 0.72);
    const frameIndex = Math.round(videoProgress * (frames.length - 1));
    const clampedIndex = Math.max(0, Math.min(frames.length - 1, frameIndex));

    const img = frames[clampedIndex];
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  // ─── Step 3: Handle Scroll Event ───────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      setScrollProgress(progress);
      currentScrollProgressRef.current = progress;
      drawFrame(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReady, drawFrame]);

  // ─── Step 4: Handle Window Resizes ─────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentScrollProgressRef.current);
    };

    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [drawFrame]);

  // ─── Step 5: Compute Logo Overlay Anim Variables ────────────────────────
  const getLogoOverlayStyles = () => {
    if (scrollProgress <= 0.72) {
      return { opacity: 0, scale: 0.85, visibility: "hidden" as const };
    }
    // Map scroll progress 0.72 -> 0.90 to logo transition
    const t = Math.max(0, Math.min(1, (scrollProgress - 0.72) / (0.90 - 0.72)));
    
    // Zoom/scale logo up slowly from 0.85 to 1.05 for premium parallax zoom effect
    const scale = 0.85 + t * 0.2;
    return {
      opacity: t,
      scale,
      visibility: "visible" as const
    };
  };

  const logoStyles = getLogoOverlayStyles();

  return (
    <section
      ref={containerRef}
      id="hero-section"
      style={{ height: "450vh" }}
      className="relative w-full"
    >
      {/* Sticky viewport window */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        
        {/* Canvas renderer for buttery-smooth video segment */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: isReady ? "block" : "none" }}
        />

        {/* High-Fidelity fullscreen logo transition overlay */}
        {isReady && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-75"
            style={{
              opacity: logoStyles.opacity,
              backgroundColor: logoBgColor, // Dynamically sampled background color to eliminate edge division borders
              visibility: logoStyles.visibility,
              zIndex: 15
            }}
          >
            <img
              src="/aanya_logo.png"
              alt="Aanya Fashions Logo"
              className="w-[850px] max-w-[85vw] h-auto object-contain transition-transform duration-75"
              style={{
                transform: `scale(${logoStyles.scale})`,
              }}
            />
          </div>
        )}

        {/* Loading progress screen */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30">
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/40 text-[11px] tracking-[0.4em] uppercase">
                Aanya Fashions
              </p>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8C9A86] to-[#E0B5B1] transition-all duration-150"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="text-white/30 text-[10px] tracking-widest">
                {loadProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Bottom progress indicator bar */}
        {isReady && (
          <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full z-20">
            <div
              className="h-full bg-gradient-to-r from-[#8C9A86] to-[#E0B5B1]"
              style={{ width: `${scrollProgress * 100}%`, transition: "width 50ms linear" }}
            />
          </div>
        )}

      </div>
    </section>
  );
}
