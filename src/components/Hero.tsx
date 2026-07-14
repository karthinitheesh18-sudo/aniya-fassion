import React, { useRef, useEffect, useState, useCallback } from "react";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

const TOTAL_FRAMES = 150;

export default function Hero({ onScrollToSection }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const bannerImgRef = useRef<HTMLImageElement | null>(null);
  const currentScrollProgressRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoBgColor, setLogoBgColor] = useState("#F4F3EF");
  const [targetRect, setTargetRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ─── Logo placeholder rect tracking ──────────────────────────────────────
  const updateTargetRect = useCallback(() => {
    const placeholder = document.getElementById("navbar-logo-placeholder");
    if (placeholder) {
      const rect = placeholder.getBoundingClientRect();
      setTargetRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(updateTargetRect, 300);
      return () => clearTimeout(timer);
    }
  }, [isReady, updateTargetRect]);

  useEffect(() => {
    window.addEventListener("resize", updateTargetRect);
    return () => window.removeEventListener("resize", updateTargetRect);
  }, [updateTargetRect]);

  // ─── Step 1: Preload logo color + extract video frames ────────────────────
  useEffect(() => {
    const logoImg = new Image();
    logoImg.src = "/aanya_logo.png";
    logoImg.crossOrigin = "anonymous";
    logoImg.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = logoImg.naturalWidth || 100;
      canvas.height = logoImg.naturalHeight || 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(logoImg, 0, 0);
        try {
          const [r, g, b] = ctx.getImageData(2, 2, 1, 1).data;
          setLogoBgColor(`#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`);
        } catch (e) {
          console.warn("Logo pixel sample failed", e);
        }
      }
    };

    const video = document.createElement("video");
    video.src = "/by_using_the_images_only_refer.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    const offscreen = document.createElement("canvas");
    const ctx = offscreen.getContext("2d");

    const extract = async () => {
      await new Promise<void>(resolve => {
        video.addEventListener("loadedmetadata", () => resolve(), { once: true });
        video.load();
      });

      offscreen.width = video.videoWidth;
      offscreen.height = video.videoHeight;
      framesRef.current.forEach(b => b.close());
      framesRef.current = [];

      const cutoff = video.duration * 0.70;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        await new Promise<void>(resolve => {
          const onSeeked = () => { video.removeEventListener("seeked", onSeeked); resolve(); };
          video.addEventListener("seeked", onSeeked);
          video.currentTime = (i / (TOTAL_FRAMES - 1)) * cutoff;
        });
        if (ctx) {
          ctx.drawImage(video, 0, 0, offscreen.width, offscreen.height);
          try {
            framesRef.current.push(await createImageBitmap(offscreen));
          } catch (err) { console.error("Bitmap failed", err); }
        }
        if (i === 5) { setIsReady(true); setTimeout(() => drawFrame(0), 10); }
        setLoadProgress(Math.round(((i + 1) / TOTAL_FRAMES) * 100));
      }

      setIsReady(true);
      drawFrame(currentScrollProgressRef.current);
    };

    extract().catch(console.error);
    return () => { video.src = ""; framesRef.current.forEach(b => b.close()); };
  }, []);

  // ─── Step 2: Draw frame on canvas ─────────────────────────────────────────
  const drawFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cover = (img: ImageBitmap | HTMLImageElement) => {
      const iw = "width" in img ? img.width : (img as HTMLImageElement).naturalWidth;
      const ih = "height" in img ? img.height : (img as HTMLImageElement).naturalHeight;
      const s = Math.max(canvas.width / iw, canvas.height / ih);
      const x = (canvas.width - iw * s) / 2;
      const y = (canvas.height - ih * s) / 2;
      ctx.drawImage(img as CanvasImageSource, x, y, iw * s, ih * s);
    };

    if (progress <= 0.70) {
      // Phase 1 — scrub video frames
      const idx = Math.round((progress / 0.70) * (frames.length - 1));
      cover(frames[Math.max(0, Math.min(frames.length - 1, idx))]);
    } else {
      // Phase 2 — campaign poster fade-in (untouched, no masks, no dark overlays)
      cover(frames[frames.length - 1]);
      const banner = bannerImgRef.current;
      if (banner && banner.complete) {
        const t = Math.min(1, (progress - 0.70) / 0.10);
        ctx.save();
        ctx.globalAlpha = t;
        cover(banner);
        ctx.restore();
      }
    }
  }, []);

  // Preload campaign banner
  useEffect(() => {
    const img = new Image();
    img.onload = () => { bannerImgRef.current = img; drawFrame(currentScrollProgressRef.current); };
    img.onerror = e => console.error("Banner load failed", e);
    img.src = "/hero_ended_banner.png";
    if (img.complete) { bannerImgRef.current = img; drawFrame(currentScrollProgressRef.current); }
  }, [drawFrame]);

  // ─── Step 3: Scroll handler ────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProgress(p);
      currentScrollProgressRef.current = p;
      drawFrame(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReady, drawFrame]);

  // ─── Step 4: Resize handler ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      setIsMobile(window.innerWidth < 768);
      drawFrame(currentScrollProgressRef.current);
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [drawFrame]);

  // ─── Step 5: Logo fly animation ────────────────────────────────────────────
  const parseHexToRgb = (hex: string) => {
    const h = hex.replace("#", "");
    return `${parseInt(h.slice(0, 2), 16) || 244}, ${parseInt(h.slice(2, 4), 16) || 243}, ${parseInt(h.slice(4, 6), 16) || 239}`;
  };

  const getLogoStyles = () => {
    if (scrollProgress <= 0.70) return { opacity: 0, scale: 0.85, visibility: "hidden" as const, x: 0, y: 0, rotate: 0, bgOpacity: 1, isFixed: false, brightness: 1 };
    if (scrollProgress <= 0.80) {
      const t = (scrollProgress - 0.70) / 0.10;
      return { opacity: t, scale: 0.85 + t * 0.2, visibility: "visible" as const, x: 0, y: 0, rotate: 0, bgOpacity: 1, isFixed: false, brightness: 1 };
    }
    if (scrollProgress >= 0.88) {
      // Hide the flying logo once the animation lands and the static navbar logo takes over
      return { opacity: 0, scale: 0.85, visibility: "hidden" as const, x: 0, y: 0, rotate: 0, bgOpacity: 0, isFixed: false, brightness: 0 };
    }
    const t = Math.max(0, Math.min(1, (scrollProgress - 0.80) / 0.08));
    const easeT = t * t * (3 - 2 * t);
    const W = window.innerWidth, H = window.innerHeight;
    const iw = Math.min(850, W * 0.85);
    const fs = targetRect ? targetRect.height : 140;
    const tx = targetRect ? targetRect.left + fs / 2 : 80;
    const ty = targetRect ? targetRect.top + fs / 2 : 24;
    return {
      opacity: 1,
      scale: 1.05 - (1.05 - fs / iw) * easeT,
      visibility: "visible" as const,
      x: (tx - W / 2) * easeT,
      y: (ty - H / 2) * easeT,
      rotate: (1 - easeT) * -4 * Math.sin(easeT * Math.PI),
      bgOpacity: Math.max(0, 1 - easeT),
      isFixed: true,
      brightness: 1 - easeT
    };
  };

  const ls = getLogoStyles();
  const overlayOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.70) / 0.10));

  return (
    <section ref={containerRef} id="hero-section" style={{ height: "450vh" }} className="relative w-full">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ display: isReady ? "block" : "none" }} />

        {/* ── Hero campaign overlay — fades in after scroll 70% ── */}
        {isReady && (
          <div className="absolute inset-0 z-20" style={{ opacity: overlayOpacity, pointerEvents: overlayOpacity > 0.05 ? "auto" : "none" }}>

            {/* Editorial Content Block + CTA Buttons */}
            <div
              className="absolute left-[5.5vw] top-[18vh] sm:top-[22vh] md:top-[25vh] flex flex-col justify-start max-w-xl md:max-w-2xl pointer-events-auto"
            >
              {/* Fashion content text */}
              <div className="select-none text-left mb-6 md:mb-10">
                <p 
                  className="uppercase tracking-[0.45em] text-[#C5A880] text-[11px] sm:text-[13px] font-bold mb-3 sm:mb-4"
                  style={{ letterSpacing: '0.45em' }}
                >
                  Aanya Fashions
                </p>
                <h1 
                  className="text-white text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.0] mb-4" 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Fashion
                  <span className="block text-2xl sm:text-4xl md:text-5xl font-medium tracking-normal mt-2 md:mt-3 leading-tight">
                    Is More Than Clothing. <br className="hidden sm:inline" /> It's Identity. <span className="italic font-normal text-xl sm:text-3xl md:text-3.5xl text-[#C5A880] font-serif lowercase">Live it. Own it. Be it.</span>
                  </span>
                </h1>
                <p className="text-white/80 text-sm sm:text-base tracking-wide font-light leading-relaxed max-w-md md:max-w-xl">
                  Discover timeless styles, premium fabrics, and curated collections that speak who you are without saying a word.
                </p>
              </div>

              {/* Interactive HTML CTA Buttons */}
              <div className="flex gap-4 sm:gap-6">
                {/* Primary — Shop Now */}
                <a
                  href="#new-arrivals"
                  onClick={e => { e.preventDefault(); document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group relative overflow-hidden inline-flex items-center gap-2 font-bold uppercase select-none text-black"
                  style={{
                    background: "#C5A880",
                    padding: "16px 38px",
                    fontSize: "12px",
                    letterSpacing: "0.3em",
                  }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Shop Now</span>
                  <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </a>

                {/* Secondary — Explore Lookbook */}
                <a
                  href="#categories-section"
                  onClick={e => { e.preventDefault(); document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group inline-flex items-center gap-2 font-bold uppercase transition-all duration-300 select-none text-white border"
                  style={{
                    borderColor: "rgba(255,255,255,0.4)",
                    padding: "16px 38px",
                    fontSize: "12px",
                    letterSpacing: "0.3em",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C5A880";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#C5A880";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                >
                  Explore Lookbook
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ── Logo cinematic fly-to-navbar overlay ── */}
        {isReady && (
          <div
            className={`${ls.isFixed ? "fixed" : "absolute"} inset-0 flex items-center justify-center pointer-events-none`}
            style={{
              opacity: ls.opacity,
              visibility: ls.visibility,
              zIndex: ls.isFixed ? 60 : 15,
            }}
          >
            <img
              src="/aanya_logo.png"
              alt="Aanya Fashions"
              className="w-[850px] max-w-[85vw] h-auto object-contain"
              style={{
                transform: `translate(${ls.x}px, ${ls.y}px) scale(${ls.scale}) rotate(${ls.rotate}deg)`,
                transition: "transform 75ms linear",
              }}
            />
          </div>
        )}

        {/* ── Loading screen ── */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
            <div className="flex flex-col items-center gap-6">
              <p className="uppercase tracking-[0.5em]" style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px" }}>Aanya Fashions</p>
              <div className="w-48 h-px bg-white/10 relative overflow-hidden rounded-full">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-150"
                  style={{ width: `${loadProgress}%`, background: "linear-gradient(to right, #8C9A86, #E0B5B1)" }}
                />
              </div>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px", letterSpacing: "0.3em" }}>{loadProgress}%</p>
            </div>
          </div>
        )}

        {/* ── Scroll progress bar ── */}
        {isReady && (
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/8 z-30">
            <div
              className="h-full"
              style={{
                width: `${scrollProgress * 100}%`,
                background: "linear-gradient(to right, #8C9A86, #E0B5B1)",
                transition: "width 50ms linear",
              }}
            />
          </div>
        )}

      </div>
    </section>
  );
}
