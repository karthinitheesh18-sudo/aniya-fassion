import React, { useState, useEffect } from "react";

interface BrandLogoLoaderProps {
  onComplete: () => void;
}

export default function BrandLogoLoader({ onComplete }: BrandLogoLoaderProps) {
  const [phase, setPhase] = useState<"leaf" | "strokes" | "subtext" | "split" | "exit">("leaf");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("strokes"), 150);
    const t2 = setTimeout(() => setPhase("subtext"), 400);
    const t3 = setTimeout(() => setPhase("split"), 800);
    const t4 = setTimeout(() => {
      setPhase("exit");
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (phase === "exit") return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#FAF9F6] flex items-center justify-center overflow-hidden">
      {/* Top Half Curtain */}
      <div
        className="absolute top-0 left-0 right-0 bg-[#FAF9F6] z-10"
        style={{
          bottom: "50%",
          transform: phase === "split" ? "translateY(-100%)" : "translateY(0)",
          transition: phase === "split" ? "transform 750ms cubic-bezier(0.76, 0, 0.24, 1)" : "none"
        }}
      />
      {/* Bottom Half Curtain */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#FAF9F6] z-10"
        style={{
          top: "50%",
          transform: phase === "split" ? "translateY(100%)" : "translateY(0)",
          transition: phase === "split" ? "transform 750ms cubic-bezier(0.76, 0, 0.24, 1)" : "none"
        }}
      />

      {/* Center Container */}
      <div className="relative z-20 flex flex-col items-center justify-center max-w-md px-6 text-center">
        
        {/* Interactive Logo SVG Wrapper */}
        <div className="relative w-56 h-56 mb-4 flex items-center justify-center">
          
          {/* Overlapping Leaf Emblem (Top-Right of Aanya text position) */}
          <div className="absolute top-6 right-6 w-16 h-20 pointer-events-none">
            {/* Sage Green Petal (Base layer) */}
            <svg
              className="absolute inset-0 w-full h-full text-[#8C9A86] fill-current transform origin-bottom transition-all duration-700"
              style={{
                opacity: phase !== "leaf" ? 1 : 0,
                transform: phase !== "leaf" ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-10deg)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              viewBox="0 0 100 150"
            >
              <path d="M50 0 C75 50, 100 100, 50 150 C0 100, 25 50, 50 0 Z" opacity="0.85" />
            </svg>

            {/* Sand Beige Petal (Middle Layer) */}
            <svg
              className="absolute inset-0 w-full h-full text-[#D4C3B3] fill-current transform origin-bottom transition-all duration-700 delay-150"
              style={{
                opacity: phase !== "leaf" ? 1 : 0,
                transform: phase !== "leaf" ? "scale(1) rotate(5deg)" : "scale(0.8) rotate(-5deg)",
                mixBlendMode: "multiply",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              viewBox="0 0 100 150"
            >
              <path d="M50 10 C70 55, 95 105, 50 150 C5 105, 30 55, 50 10 Z" opacity="0.75" />
            </svg>

            {/* Dusty Rose Petal (Top Layer) */}
            <svg
              className="absolute inset-0 w-full h-full text-[#E0B5B1] fill-current transform origin-bottom transition-all duration-700 delay-300"
              style={{
                opacity: phase !== "leaf" ? 1 : 0,
                transform: phase !== "leaf" ? "scale(1) rotate(12deg)" : "scale(0.8) rotate(0deg)",
                mixBlendMode: "multiply",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              viewBox="0 0 100 150"
            >
              <path d="M50 20 C65 60, 90 110, 50 150 C10 110, 35 60, 50 20 Z" opacity="0.8" />
            </svg>
          </div>

          {/* "Aanya" script typography */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-5xl tracking-wide text-[#3E4A41] transition-all duration-1000"
              style={{
                fontFamily: "'Playfair Display', serif",
                opacity: phase === "leaf" ? 0 : 1,
                transform: phase === "leaf" ? "scale(0.97)" : "scale(1)",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              Aanya
            </span>
          </div>

          {/* "Fashions" handwritten script subtext */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <span
              className="text-xs tracking-[0.25em] uppercase text-[#3E4A41]/80 font-light opacity-0 transition-all duration-700"
              style={{
                opacity: phase === "subtext" || phase === "split" ? 1 : 0,
                transform: phase === "subtext" || phase === "split" ? "translateY(0)" : "translateY(8px)",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)"
              }}
            >
              Fashions
            </span>
          </div>
        </div>

        {/* Brand Sage Green to Dusty Rose shimmer indicator line */}
        <div className="w-40 h-[1.5px] bg-[#3E4A41]/10 overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#8C9A86] via-[#E0B5B1] to-transparent"
            style={{
              animation: phase === "strokes" || phase === "subtext" ? "shimmer-move 1200ms ease-in-out infinite" : "none"
            }}
          />
        </div>
        
      </div>
    </div>
  );
}
