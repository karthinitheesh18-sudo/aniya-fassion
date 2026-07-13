import React from "react";
import { collections } from "../data";
import { useReveal } from "./useReveal";

interface CategoriesProps {
  onSelectCategory: (categoryName: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function Categories({ onSelectCategory, onScrollToSection }: CategoriesProps) {
  const { ref, isVisible } = useReveal(0.05);

  const handleCollectionClick = (category: string) => {
    let filterVal = "all";
    if (category === "women") filterVal = "Dresses";
    if (category === "men") filterVal = "Jackets";
    if (category === "accessories") filterVal = "Accessories";
    
    onSelectCategory(filterVal);
    onScrollToSection("products-section");
  };

  return (
    <section 
      ref={ref} 
      id="collections-section" 
      className="py-28 bg-[#FAF9F6] border-b border-[#D4AF37]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
            Seasonal Campaigns
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-[#0A0A0A] uppercase transition-all duration-1000 ease-luxury"
            style={{
              fontFamily: "'Playfair Display', serif",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)"
            }}
          >
            Featured Collections
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 italic text-sm">Explore our curated campaign lookbooks for this season</p>
        </div>

        {/* Premium Editorial Asymmetrical/Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              onClick={() => handleCollectionClick(collection.category)}
              className="flex flex-col group cursor-pointer bg-white border border-[#2C2C2C]/5 shadow-sm hover:shadow-xl transition-all duration-700 p-4 rounded-lg relative overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Image Frame */}
              <div className="h-[360px] sm:h-[420px] md:h-[450px] w-full relative overflow-hidden mb-6 rounded-md">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-luxury"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Visual subtle overlay */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-500" />
                
                {/* Decorative border reveal */}
                <div className="absolute inset-3 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/35 transition-all duration-700 pointer-events-none" />
              </div>

              {/* Text content underneath */}
              <div className="flex flex-col px-1 pb-1">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#B76E79] font-bold mb-1.5">
                  {collection.subtitle}
                </span>
                
                <h3 
                  className="text-black text-xl font-bold tracking-wider uppercase mb-3 hover:text-[#D4AF37] transition-colors duration-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {collection.name}
                </h3>

                <div className="w-8 group-hover:w-full h-[1px] bg-[#D4AF37] mb-4 transition-all duration-500" />
                
                <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center gap-2">
                  Discover Collection <span className="text-[#D4AF37] transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
