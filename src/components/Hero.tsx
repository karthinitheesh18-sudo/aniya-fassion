import React, { useRef, useEffect, useState, useCallback } from "react";
import Button from "./ui/Button";

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

  const [activeSlide, setActiveSlide] = useState(0);
  const slideImages = [
    "/slide_model_1.png",
    "/slide_model_2.png",
    "/slide_model_3.png"
  ];
  const [processedSlides, setProcessedSlides] = useState<string[]>(slideImages);
  const [hasStartedProcessing, setHasStartedProcessing] = useState(false);
  const [autoFace, setAutoFace] = useState(0);

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
          
          // Inpaint/remove the bottom-right AI watermark (X=1136..1183, Y=576..623)
          // by copying the adjacent clean background (X=1110..1130) and stretching it over
          ctx.drawImage(
            offscreen,
            1110, 565, 20, 70, // Source: clean background to the left
            1130, 565, 65, 70  // Destination: cover watermark area
          );

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

    // Enable high-quality image smoothing for canvas rescaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

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
      // Phase 2 — campaign poster split rotating banner is animated in the DOM.
      // Draw the preloaded high-resolution campaign banner instead of the compressed last video frame.
      if (bannerImgRef.current) {
        cover(bannerImgRef.current);
      } else {
        cover(frames[frames.length - 1]);
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

    let containerOffsetTop = container.offsetTop;
    let scrollable = container.offsetHeight - window.innerHeight;
    let rafId: number;

    const handleResize = () => {
      containerOffsetTop = container.offsetTop;
      scrollable = container.offsetHeight - window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      if (scrollable <= 0) return;
      const scrollTop = window.scrollY - containerOffsetTop;
      const p = Math.max(0, Math.min(1, scrollTop / scrollable));

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollProgress(p);
        currentScrollProgressRef.current = p;
        drawFrame(p);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
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

  // Auto-advance cube faces when scrollProgress >= 0.88 (doors closed completely)
  useEffect(() => {
    if (scrollProgress < 0.88) {
      setAutoFace(0);
      return;
    }
    const timer = setInterval(() => {
      setAutoFace(prev => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [scrollProgress >= 0.88]);

  const isPhase2 = scrollProgress > 0.70;

  // Preload and dynamically clean backgrounds of checkerboard images in the client browser ONLY when Phase 2 starts
  useEffect(() => {
    if (!isPhase2 || hasStartedProcessing) return;
    setHasStartedProcessing(true);

    const processAll = async () => {
      const results = await Promise.all(
        slideImages.map(src => {
          return new Promise<string>((resolve) => {
            const img = new Image();
            img.onload = () => {
              try {
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext("2d");
                if (!ctx) { resolve(src); return; }
                ctx.drawImage(img, 0, 0);
                
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;
                const w = canvas.width;
                const h = canvas.height;
                
                // Flood-fill queue
                const queue: number[] = [];
                const visited = new Uint8Array(w * h);
                
                const isBg = (r: number, g: number, b: number) => {
                  const max = Math.max(r, g, b);
                  const min = Math.min(r, g, b);
                  // Check if it is a light neutral color (white or grey squares + compression edges)
                  return (max - min) < 15 && min > 150;
                };
                
                const add = (x: number, y: number) => {
                  const idx = y * w + x;
                  if (visited[idx]) return;
                  visited[idx] = 1;
                  
                  const p = idx * 4;
                  if (isBg(data[p], data[p+1], data[p+2])) {
                    data[p+3] = 0; // Make transparent
                    queue.push(x, y);
                  }
                };
                
                // Seed flood-fill from the edges
                for (let x = 0; x < w; x++) {
                  add(x, 0);
                  add(x, h - 1);
                }
                for (let y = 0; y < h; y++) {
                  add(0, y);
                  add(w - 1, y);
                }
                
                let head = 0;
                while (head < queue.length) {
                  const x = queue[head++];
                  const y = queue[head++];
                  
                  // 4-neighbors
                  if (x > 0) add(x - 1, y);
                  if (x < w - 1) add(x + 1, y);
                  if (y > 0) add(x, y - 1);
                  if (y < h - 1) add(x, y + 1);
                }
                
                ctx.putImageData(imgData, 0, 0);
                resolve(canvas.toDataURL("image/png"));
              } catch (e) {
                console.error("Background cleaner failed", e);
                resolve(src);
              }
            };
            img.onerror = () => resolve(src);
            img.src = src;
          });
        })
      );
      setProcessedSlides(results);
    };
    
    processAll();
  }, [isPhase2, hasStartedProcessing, slideImages]);

  // Auto-advance sliding images in Phase 2
  useEffect(() => {
    if (!isPhase2) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slideImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPhase2, slideImages.length]);

  // ─── Step 5: Logo fly animation ────────────────────────────────────────────
  const parseHexToRgb = (hex: string) => {
    const h = hex.replace("#", "");
    return `${parseInt(h.slice(0, 2), 16) || 244}, ${parseInt(h.slice(2, 4), 16) || 243}, ${parseInt(h.slice(4, 6), 16) || 239}`;
  };

  const getLogoStyles = () => {
    const W = window.innerWidth, H = window.innerHeight;
    const iw = Math.min(850, W * 0.85);
    const fs = targetRect ? targetRect.height : 140;
    const tx = targetRect ? targetRect.left + fs / 2 : 80;
    const ty = targetRect ? targetRect.top + fs / 2 : 24;

    if (scrollProgress <= 0.70) {
      return { opacity: 0, scale: 0.85, visibility: "hidden" as const, x: 0, y: 0, rotate: 0, bgOpacity: 1, isFixed: false };
    }
    
    // 0.70 to 0.72 -> Fade in centered
    if (scrollProgress <= 0.72) {
      const t = (scrollProgress - 0.70) / 0.02;
      return { opacity: t, scale: 0.85 + t * 0.15, visibility: "visible" as const, x: 0, y: 0, rotate: 0, bgOpacity: 1, isFixed: true };
    }

    // 0.72 to 0.80 -> Fly to navbar
    if (scrollProgress < 0.80) {
      const t = (scrollProgress - 0.72) / 0.08;
      const easeT = t * t * (3 - 2 * t);
      return {
        opacity: 1 - easeT,
        scale: 1.0 - (1.0 - fs / iw) * easeT,
        visibility: "visible" as const,
        x: (tx - W / 2) * easeT,
        y: (ty - H / 2) * easeT,
        rotate: (1 - easeT) * -4 * Math.sin(easeT * Math.PI),
        bgOpacity: Math.max(0, 1 - easeT),
        isFixed: true
      };
    }

    // 0.80+ -> Hidden
    return { opacity: 0, scale: fs / iw, visibility: "hidden" as const, x: tx - W / 2, y: ty - H / 2, rotate: -4, bgOpacity: 0, isFixed: false };
  };

  const ls = getLogoStyles();
  const leftCards = [
    {
      label: "NEW COLLECTION",
      title: "Elevate Your Everyday Style",
      desc: "Crafted for timeless elegance.",
      cta: "Explore Collection",
      href: "#products-section"
    },
    {
      label: "SUMMER EDIT",
      title: "Minimal Luxury",
      desc: "Refined essentials made for every occasion.",
      cta: "View Lookbook",
      href: "#lookbook-section"
    },
    {
      label: "SIGNATURE PIECES",
      title: "Sartorial Precision",
      desc: "Designed to make a statement without effort.",
      cta: "Shop Signature",
      href: "#products-section"
    },
    {
      label: "THE EDITORIAL",
      title: "Modern Silhouettes",
      desc: "A curation of sculptural shapes and premium textures.",
      cta: "Read Editorial",
      href: "#lookbook-section"
    }
  ];

  const rightImages = [
    processedSlides[0] || "/slide_model_1.png",
    processedSlides[1] || "/slide_model_2.png",
    processedSlides[2] || "/slide_model_3.png",
    processedSlides[0] || "/slide_model_1.png"
  ];

  const doorSwingProgress = Math.max(0, Math.min(1, (scrollProgress - 0.80) / 0.08));
  const leftSwingY = (1 - doorSwingProgress) * -90;
  const rightSwingY = (1 - doorSwingProgress) * 90;
  const overlayOpacity = doorSwingProgress;

  return (
    <section ref={containerRef} id="hero-section" style={{ height: "450vh" }} className="relative w-full">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ display: isReady ? "block" : "none" }} />

        {/* Sand background overlay for a clean logo focus transition */}
        {isReady && scrollProgress > 0.70 && (
          <div 
            className="absolute inset-0 bg-[#FAF6F0] z-10 pointer-events-none"
            style={{
              opacity: Math.max(0, Math.min(1, (scrollProgress - 0.70) / 0.03))
            }}
          />
        )}

        {/* ── Symmetrically split full-screen 3D rotating panels (meeting behind logo) ── */}
        {isReady && scrollProgress >= 0.80 && (
          <div 
            className="absolute inset-0 z-20 pointer-events-none" 
            style={{ 
              perspective: "3200px",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Left Column Full-Screen Panel (Swings left-to-right) */}
            <div 
              className="absolute left-0 top-0 w-[50vw] h-screen overflow-visible"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                transform: `rotateY(${leftSwingY}deg)`,
                pointerEvents: doorSwingProgress > 0.1 ? "auto" : "none"
              }}
            >
              <div 
                className="w-full h-full relative"
              >
                {leftCards.map((card, i) => {
                  const isActive = i === (autoFace % 4);
                  const isPrev = i === ((autoFace - 1 + 4) % 4);
                  const isNext = i === ((autoFace + 1) % 4);

                  const isCubeActive = scrollProgress >= 0.88;

                  let transformStr = "translateZ(50vh) scale(0.95)";
                  let opacity = 0;
                  let zIndex = 0;

                  if (isCubeActive) {
                    if (isActive) {
                      transformStr = "translateZ(50vh) scale(1)";
                      opacity = 1;
                      zIndex = 10;
                    } else if (isPrev) {
                      transformStr = "translateZ(50vh) scale(0.98)";
                      opacity = 0;
                      zIndex = 5;
                    }
                  } else {
                    if (i === 0) {
                      transformStr = "translateZ(50vh) translate3d(0,0,0)";
                      opacity = overlayOpacity;
                      zIndex = 10;
                    }
                  }

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 bg-[#FAF6F0] flex flex-col justify-center items-center pt-[40px] sm:pt-[90px] text-center select-none"
                      style={{
                        transform: transformStr,
                        opacity: opacity,
                        zIndex: zIndex,
                        transition: isCubeActive ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                        paddingLeft: isMobile ? "1.5rem" : "6vw",
                        paddingRight: isMobile ? "0.75rem" : "2vw",
                      }}
                    >
                      <div className="max-w-[420px] flex flex-col items-center">
                        <span className="text-[9px] md:text-xs tracking-[0.45em] uppercase text-[#B76E79] font-bold mb-3 sm:mb-5 block">
                          {card.label}
                        </span>
                        <h3 
                          className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.15] mb-4 sm:mb-6"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-neutral-500 text-[10px] sm:text-xs md:text-sm tracking-wide font-light leading-relaxed mb-5 sm:mb-8 max-w-[280px] sm:max-w-sm">
                          {card.desc}
                        </p>
                        
                        <Button
                          variant="primary"
                          href={card.href}
                          className="!px-5 !py-3 !text-[10px] !tracking-[0.18em] sm:!px-8 sm:!py-4 sm:!text-[10px] sm:!tracking-[0.2em] transform-gpu will-change-transform"
                          onClick={e => {
                            e.preventDefault();
                            const element = document.getElementById(card.href.substring(1));
                            if (element) {
                              const headerOffset = 80;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                              window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth",
                              });
                            }
                          }}
                          icon={
                            <svg className="w-3 h-3 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          }
                        >
                          {card.cta}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column Full-Screen Panel (Swings right-to-left) */}
            <div 
              className="absolute right-0 top-0 w-[50vw] h-screen overflow-visible"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
                transform: `rotateY(${rightSwingY}deg)`,
                pointerEvents: doorSwingProgress > 0.1 ? "auto" : "none"
              }}
            >
              <div 
                className="w-full h-full relative"
              >
                {rightImages.map((src, i) => {
                  const isActive = i === (autoFace % 4);
                  const isPrev = i === ((autoFace - 1 + 4) % 4);
                  const isNext = i === ((autoFace + 1) % 4);

                  const isCubeActive = scrollProgress >= 0.88;

                  let transformStr = "translateZ(50vh) scale(0.95)";
                  let opacity = 0;
                  let zIndex = 0;

                  if (isCubeActive) {
                    if (isActive) {
                      transformStr = "translateZ(50vh) scale(1)";
                      opacity = 1;
                      zIndex = 10;
                    } else if (isPrev) {
                      transformStr = "translateZ(50vh) scale(0.98)";
                      opacity = 0;
                      zIndex = 5;
                    }
                  } else {
                    if (i === 0) {
                      transformStr = "translateZ(50vh) translate3d(0,0,0)";
                      opacity = overlayOpacity;
                      zIndex = 10;
                    }
                  }

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 bg-[#FAF6F0] overflow-hidden flex items-center justify-center pt-[40px] sm:pt-[90px] select-none"
                      style={{
                        transform: transformStr,
                        opacity: opacity,
                        zIndex: zIndex,
                        transition: isCubeActive ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                        paddingRight: isMobile ? "1.5rem" : "6vw",
                        paddingLeft: isMobile ? "0.75rem" : "2vw",
                      }}
                    >
                      <img
                        src={src}
                        alt={`Fashion visual ${i + 1}`}
                        loading="lazy"
                        className="max-h-[78vh] sm:max-h-[65vh] max-w-[90%] sm:max-w-[85%] w-auto object-contain"
                        style={{
                          willChange: "transform",
                          transform: "translate3d(0, 0, 0)",
                        }}
                      />
                    </div>
                  );
                })}
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
              className="w-[850px] max-w-[85vw] h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]"
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
