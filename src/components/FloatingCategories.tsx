import React from "react";
import { floatingCategoriesData } from "../data/homepage";
import FloatingCategory from "./ui/FloatingCategory";
import RevealSection from "./ui/RevealSection";

interface FloatingCategoriesProps {
  onSelectCategory: (categoryVal: string) => void;
}

export default function FloatingCategories({ onSelectCategory }: FloatingCategoriesProps) {
  return (
    <RevealSection
      id="floating-categories-section"
      className="py-12 bg-white border-b border-neutral-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scroll container with hidden scrollbar for a clean slider interface */}
        <div className="flex items-center justify-start md:justify-center gap-8 sm:gap-12 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {floatingCategoriesData.map((cat, index) => (
            <div
              key={cat.id}
              className="snap-center flex-shrink-0"
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              <FloatingCategory
                name={cat.name}
                image={cat.image}
                isSale={cat.isSale}
                onClick={() => onSelectCategory(cat.categoryVal)}
              />
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
