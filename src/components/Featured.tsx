import React from "react";
import { Collection } from "../types";
import { collections } from "../data";
import { useReveal } from "./useReveal";

interface FeaturedProps {
  onSelectCategory: (categoryName: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function Featured({ onSelectCategory, onScrollToSection }: FeaturedProps) {
  const { ref, isVisible } = useReveal(0.05);
  
  const handleCollectionClick = (collectionId: string) => {
    if (collectionId === "summer") {
      onSelectCategory("Dresses"); // Filter to Dresses
    } else if (collectionId === "formal") {
      onSelectCategory("Jackets"); // Filter to Jackets
    } else {
      onSelectCategory("Accessories"); // Filter to Accessories
    }
    onScrollToSection("products-section");
  };

  return (
    <section 
      ref={ref} 
      id="collections-section" 
      className="py-20 bg-gray-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4 transition-all duration-1000 ease-luxury"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)"
            }}
          >
            Featured Collections
          </h2>
          <div className="w-12 h-1 bg-black mx-auto mb-4"></div>
          <p className="text-gray-500 italic text-sm">Curated styles for every occasion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="relative group h-[500px] sm:h-[550px] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-1000 bg-gray-200 cursor-pointer ease-luxury"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${index * 150}ms`
              }}
              onClick={() => handleCollectionClick(collection.id)}
            >
              {/* Product Background Image */}
              <img
                src={collection.image}
                alt={`${collection.name} Banner`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              {/* Overlay with Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-[10px] tracking-widest text-gray-300 uppercase font-semibold mb-2">
                  Hot Selection
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mb-1 tracking-tight">
                  {collection.name}
                </h3>
                <p className="text-white/80 mb-6 italic text-sm font-light">
                  {collection.subtitle}
                </p>
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCollectionClick(collection.id);
                    }}
                    className="inline-block w-fit bg-white text-black px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-500 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

