import React from "react";
import { useReveal } from "./useReveal";

interface DesignerSpotlightProps {
  onScrollToSection: (id: string) => void;
}

export default function DesignerSpotlight({ onScrollToSection }: DesignerSpotlightProps) {
  const { ref, isVisible } = useReveal(0.05);

  return (
    <section
      ref={ref}
      id="spotlight-section"
      className="py-24 bg-[#0A0A0A] text-white border-b border-[#D4AF37]/10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Column 1: Designer Portrait */}
          <div
            className="lg:col-span-6 relative transition-all duration-1000 ease-luxury"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)"
            }}
          >
            {/* Elegant multi-layer frames */}
            <div className="absolute inset-4 border border-[#D4AF37]/30 translate-x-3 translate-y-3 pointer-events-none z-10" />
            
            <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[3/4]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBErcqmTbzx8latwT4vwwQvQ8RrDPUnUlJ8BYLQPCVe7K7q00YR8MjUpsvfD0N6XWI8TtHdxbwL-oebmstj0_Y2tzpmTVcY1diBaIsTYCyZ1N3LntHoZfW43mhj1PVCtIca1ReF4nL8V9Ato_GDYfeo0rfrBzgKah9GzZXanK-uWyShtjPAuddRE_2LYzfovmfZJLooH_FumXNPXxc2DmrLgHc9cq0JwqZwbPnlRdn7yiKEKdYOjtHUag"
                alt="Lead Designer Aanya Sen"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 ease-luxury"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Float Badge */}
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-1 font-semibold">
                Creative Director
              </p>
              <h4 
                className="text-2xl font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aanya Sen
              </h4>
            </div>
          </div>

          {/* Column 2: Bio and Philosophy */}
          <div
            className="lg:col-span-6 flex flex-col justify-center transition-all duration-1000 ease-luxury"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "200ms"
            }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-3 block">
              The Creative Voice
            </span>
            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider uppercase mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Designer Spotlight
            </h3>

            <div className="w-12 h-[1px] bg-[#D4AF37] mb-8" />

            <blockquote className="text-lg sm:text-xl text-[#F5F1E8]/90 italic font-light leading-relaxed mb-6 border-l-2 border-[#D4AF37] pl-6">
              &ldquo;Fashion is not merely clothing; it is a canvas of identity. A drape should feel like a second skin, conveying grace without noise.&rdquo;
            </blockquote>

            <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
              Aanya Sen fuses traditional handloom drapes with minimalist contemporary outlines. Drawing inspiration from standard Indian weaves and modern structure, she creates garments that adapt perfectly to the modern posture. Every thread, bead, and seam is supervised to represent pristine, sustainable luxury.
            </p>

            {/* Signature or Monogram */}
            <div className="mb-8">
              <span 
                className="text-3xl text-[#D4AF37] font-light tracking-widest block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aanya Sen
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-500 font-semibold block mt-1">
                Handcrafted Luxury Heritage
              </span>
            </div>

            <button
              onClick={() => onScrollToSection("products-section")}
              className="w-fit border border-[#D4AF37] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-500 cursor-pointer"
            >
              View Curated Collection
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
