import React from "react";
import { Category } from "../types";
import { categories } from "../data";
import { useReveal } from "./useReveal";

interface CategoriesProps {
  onSelectCategory: (categoryName: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function Categories({ onSelectCategory, onScrollToSection }: CategoriesProps) {
  const { ref, isVisible } = useReveal(0.05);
  
  const handleCategoryClick = (categoryName: string) => {
    // We map human-readable category name to the products filters
    let filterVal = "all";
    if (categoryName === "Men") filterVal = "all"; // we'll filter by standard terms or tag
    if (categoryName === "Women") filterVal = "Dresses"; // map women to Dresses filter
    if (categoryName === "Accessories") filterVal = "Accessories";
    if (categoryName === "Shoes") filterVal = "Shoes";
    
    onSelectCategory(filterVal);
    onScrollToSection("products-section");
  };

  return (
    <section 
      ref={ref} 
      id="categories-section" 
      className="py-20 bg-white border-b border-gray-50"
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
            Shop by Category
          </h2>
          <div className="w-12 h-1 bg-black mx-auto mb-4"></div>
          <p className="text-gray-500 italic text-sm">Find what you love</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-1000 bg-gray-100 ease-luxury"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${index * 120}ms`
              }}
            >
              {/* Box Image Ratio framing */}
              <div className="h-[360px] sm:h-[400px] w-full relative overflow-hidden">
                <img
                  src={category.image}
                  alt={`${category.name} Fashion`}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Visual Glassmorphism overlay container */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-bold tracking-widest uppercase mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-xs font-light uppercase tracking-wider group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                      Explore {category.count} Items →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

