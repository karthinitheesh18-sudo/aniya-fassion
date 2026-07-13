import React, { useRef } from "react";
import { collections } from "../data";
import { useReveal } from "./useReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoriesProps {
  onSelectCategory: (categoryName: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function Categories({ onSelectCategory, onScrollToSection }: CategoriesProps) {
  const { ref, isVisible } = useReveal(0.05);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCollectionClick = (category: string) => {
    let filterVal = "all";
    if (category === "women") filterVal = "Dresses";
    if (category === "men") filterVal = "Jackets";
    if (category === "accessories") filterVal = "Accessories";
    
    onSelectCategory(filterVal);
    onScrollToSection("products-section");
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 420; // Width of a card + spacing
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section 
      ref={ref} 
      id="collections-section" 
      className="py-24 bg-[#F5F1E8] border-b border-[#D4AF37]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
              Curated Masterpieces
            </span>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A] uppercase transition-all duration-1000 ease-luxury"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)"
              }}
            >
              Featured Collections
            </h2>
          </div>
          
          {/* Scroll Controls (hidden on mobile, visible on desktop) */}
          <div className="hidden md:flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="p-3 border border-[#2C2C2C]/30 rounded-none text-[#2C2C2C] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 border border-[#2C2C2C]/30 rounded-none text-[#2C2C2C] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Wrapper */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-6 snap-x snap-mandatory scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: "none" }} // Firefox hidden scrollbar
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              onClick={() => handleCollectionClick(collection.category)}
              className="min-w-[300px] sm:min-w-[380px] md:min-w-[420px] max-w-[420px] snap-start relative group cursor-pointer overflow-hidden bg-[#0A0A0A] border border-[#2C2C2C] transition-all duration-1000 ease-luxury"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Image Frame */}
              <div className="h-[460px] sm:h-[540px] w-full relative overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-luxury"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Visual dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/35 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                {/* Decorative border reveal */}
                <div className="absolute inset-4 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/35 transition-all duration-700 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {collection.subtitle}
                  </span>
                  
                  <h3 
                    className="text-white text-2xl sm:text-3xl font-bold tracking-wider uppercase mb-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {collection.name}
                  </h3>

                  <div className="w-0 group-hover:w-full h-[1px] bg-[#D4AF37] mb-4 transition-all duration-700" />
                  
                  <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150 flex items-center gap-2">
                    Explore Collection <span className="text-[#D4AF37]">→</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
