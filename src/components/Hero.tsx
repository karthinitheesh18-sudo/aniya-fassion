import React, { useRef, useEffect, useState, useCallback } from "react";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

const TOTAL_FRAMES = 150; // Number of frames to extract from the video (up to watches scene)

export default function Hero({ onScrollToSection }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const currentScrollProgressRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);    // 0–100 loading percentage
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoBgColor, setLogoBgColor] = useState("#F4F3EF"); // Dynamic color state matching logo background
  const [targetRect, setTargetRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const updateTargetRect = useCallback(() => {
    const placeholder = document.getElementById("navbar-logo-placeholder");
    if (placeholder) {
      const rect = placeholder.getBoundingClientRect();
      setTargetRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      // Delay slightly to ensure Navbar mount layout calculations are settled
      const timer = setTimeout(updateTargetRect, 300);
      return () => clearTimeout(timer);
    }
  }, [isReady, updateTargetRect]);

  useEffect(() => {
    window.addEventListener("resize", updateTargetRect);
    return () => window.removeEventListener("resize", updateTargetRect);
  }, [updateTargetRect]);

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

      // Clean up previous run if any
      framesRef.current.forEach((bmp) => bmp.close());
      framesRef.current = [];

      const targetCutoffTime = video.duration * 0.72; 

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

        if (ctx) {
          ctx.drawImage(video, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
          try {
            const bitmap = await createImageBitmap(offscreenCanvas);
            framesRef.current.push(bitmap);
          } catch (err) {
            console.error("Frame bitmap generation failed: ", err);
          }
        }

        // Speed up loader clearance: let user view page once first 6 frames are ready
        if (i === 5) {
          setIsReady(true);
          // Draw first frame immediately
          setTimeout(() => drawFrame(0), 10);
        }

        setLoadProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));
      }

      setIsReady(true);
      drawFrame(currentScrollProgressRef.current);
    };

    extractFrames().catch(console.error);

    return () => {
      video.src = "";
      framesRef.current.forEach((bmp) => bmp.close());
    };
  }, []);

  const bannerImgRef = useRef<HTMLImageElement | null>(null);

  // ─── Step 2: Draw Video Frame on Canvas ──────────────────────────────────
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (progress <= 0.72) {
      // Phase 1: Scrub video frames of walking models
      const videoProgress = progress / 0.72;
      const frameIndex = Math.round(videoProgress * (frames.length - 1));
      const clampedIndex = Math.max(0, Math.min(frames.length - 1, frameIndex));

      const img = frames[clampedIndex];
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    } else {
      // Phase 2: Past 0.72 progress, transition to the luxury fashion poster
      const bannerImg = bannerImgRef.current;
      
      // Always draw the base video frame first (last extracted frame index 59)
      const baseImg = frames[frames.length - 1];
      const scale = Math.max(canvas.width / baseImg.width, canvas.height / baseImg.height);
      const x = (canvas.width - baseImg.width * scale) / 2;
      const y = (canvas.height - baseImg.height * scale) / 2;
      ctx.drawImage(baseImg, x, y, baseImg.width * scale, baseImg.height * scale);

      if (bannerImg && bannerImg.complete) {
        // Linear fade transition from 0.72 to 0.82 progress
        const t = Math.min(1, (progress - 0.72) / 0.10);
        ctx.save();
        ctx.globalAlpha = t;
        const bScale = Math.max(canvas.width / bannerImg.width, canvas.height / bannerImg.height);
        const bx = (canvas.width - bannerImg.width * bScale) / 2;
        const by = (canvas.height - bannerImg.height * bScale) / 2;
        ctx.drawImage(bannerImg, bx, by, bannerImg.width * bScale, bannerImg.height * bScale);
        ctx.restore();
      }
    }
  }, []);

  // Preload the campaign poster banner image and trigger canvas redraw on load
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      bannerImgRef.current = img;
      drawFrame(currentScrollProgressRef.current);
    };
    img.onerror = (e) => {
      console.error("Failed to load /hero_ended_banner.png", e);
    };
    img.src = "/hero_ended_banner.png";

    // Immediate draw fallback if already resolved/cached
    if (img.complete) {
      bannerImgRef.current = img;
      drawFrame(currentScrollProgressRef.current);
    }
  }, [drawFrame]);

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

  const parseHexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.slice(0, 2), 16) || 244;
    const g = parseInt(cleanHex.slice(2, 4), 16) || 243;
    const b = parseInt(cleanHex.slice(4, 6), 16) || 239;
    return `${r}, ${g}, ${b}`;
  };

  // ─── Step 5: Compute Logo Overlay Anim Variables ────────────────────────
  const getLogoOverlayStyles = () => {
    if (scrollProgress <= 0.72) {
      return { opacity: 0, scale: 0.85, visibility: "hidden" as const, x: 0, y: 0, rotate: 0, bgOpacity: 1, isFixed: false };
    }
    
    if (scrollProgress <= 0.90) {
      // Phase 1: Entrance/scale in center of hero
      const t = (scrollProgress - 0.72) / (0.90 - 0.72);
      const scale = 0.85 + t * 0.2; // 0.85 -> 1.05
      return {
        opacity: t,
        scale,
        visibility: "visible" as const,
        x: 0,
        y: 0,
        rotate: 0,
        bgOpacity: 1,
        isFixed: false
      };
    }
    
    // Phase 2: Flying to Navbar slot
    // Clamp t from 0.90 to 0.98 to finalize positioning right before scroll reaches 1.0
    const t = Math.max(0, Math.min(1, (scrollProgress - 0.90) / (0.98 - 0.90)));
    const easeT = t * t * (3 - 2 * t); // Smooth easing curve
    
    const W = window.innerWidth;
    const H = window.innerHeight;
    const initialWidth = Math.min(850, W * 0.85);
    
    // The placeholder image is locked to targetRect.height (40px)
    const finalSize = targetRect ? targetRect.height : 40;
    const targetX = targetRect ? (targetRect.left + finalSize / 2) : 80;
    const targetY = targetRect ? (targetRect.top + finalSize / 2) : 24;
    
    // Center point displacement calculations
    const dX = targetX - W / 2;
    const dY = targetY - H / 2;
    const targetScale = finalSize / initialWidth;
    
    const currentScale = 1.05 - (1.05 - targetScale) * easeT;
    const x = dX * easeT;
    const y = dY * easeT;
    
    // Soft magazine-like 3D tilt during path flight
    const rotate = (1 - easeT) * -4 * Math.sin(easeT * Math.PI);
    
    // Fade out white background overlay progressively
    const bgOpacity = Math.max(0, 1 - easeT);
    
    // Fully transparent handoff at scroll progress >= 0.98
    const logoOpacity = scrollProgress >= 0.98 ? 0 : 1;
    
    return {
      opacity: logoOpacity,
      scale: currentScale,
      visibility: "visible" as const,
      x,
      y,
      rotate,
      bgOpacity,
      isFixed: true
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
            className={`${logoStyles.isFixed ? "fixed" : "absolute"} inset-0 flex items-center justify-center pointer-events-none`}
            style={{
              opacity: scrollProgress >= 0.98 ? 0 : logoStyles.opacity,
              background: `rgba(${parseHexToRgb(logoBgColor)}, ${logoStyles.bgOpacity})`,
              visibility: logoStyles.visibility,
              zIndex: logoStyles.isFixed ? 45 : 15
            }}
          >
            <img
              src="/aanya_logo.png"
              alt="Aanya Fashions Logo"
              className="w-[850px] max-w-[85vw] h-auto object-contain transition-transform duration-75"
              style={{
                transform: `translate(${logoStyles.x}px, ${logoStyles.y}px) scale(${logoStyles.scale}) rotate(${logoStyles.rotate}deg)`,
                WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 95%)",
                maskImage: "radial-gradient(ellipse at center, black 50%, transparent 95%)",
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
