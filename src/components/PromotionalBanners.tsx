import React from "react";
import { ArrowRight } from "lucide-react";
import { promotionsData } from "../data/homepage";
import RevealSection from "./ui/RevealSection";
import Button from "./ui/Button";

interface PromotionalBannersProps {
  onSelectCategory: (categoryVal: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function PromotionalBanners({
  onSelectCategory,
  onScrollToSection,
}: PromotionalBannersProps) {
  const handlePromoClick = (categoryVal: string) => {
    onSelectCategory(categoryVal);
    onScrollToSection("products-section");
  };

  return (
    <RevealSection
      id="promotions-section"
      className="py-20 bg-white border-b border-neutral-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Left Banner: Spring Sale */}
          <div
            onClick={() => handlePromoClick(promotionsData.left.categoryVal)}
            className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer border border-neutral-100"
          >
            {/* Background Image with Zoom */}
            <img
              src={promotionsData.left.image}
              alt={promotionsData.left.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
            />
            {/* Dark/Warm overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-700" />
            
            {/* Content overlay */}
            <div className="absolute inset-8 sm:inset-10 flex flex-col justify-end items-start text-white">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#FAF6F0]/85 font-semibold mb-2 block">
                {promotionsData.left.subtitle}
              </span>
              <h3
                className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white mb-6 leading-tight max-w-xs"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {promotionsData.left.title}
              </h3>
              
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePromoClick(promotionsData.left.categoryVal);
                }}
                className="!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-black"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                {promotionsData.left.buttonText}
              </Button>
            </div>
          </div>

          {/* Right Banner: Fresh Styles */}
          <div
            onClick={() => handlePromoClick(promotionsData.right.categoryVal)}
            className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer border border-neutral-100"
          >
            {/* Background Image with Zoom */}
            <img
              src={promotionsData.right.image}
              alt={promotionsData.right.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
            />
            {/* Dark/Warm overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-700" />
            
            {/* Content overlay */}
            <div className="absolute inset-8 sm:inset-10 flex flex-col justify-end items-start text-white">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#FAF6F0]/85 font-semibold mb-2 block">
                {promotionsData.right.subtitle}
              </span>
              <h3
                className="text-2xl sm:text-3.5xl font-bold tracking-tight text-white mb-6 leading-tight max-w-xs"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {promotionsData.right.title}
              </h3>
              
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePromoClick(promotionsData.right.categoryVal);
                }}
                className="!bg-white !text-black !border-white hover:!bg-black hover:!text-white hover:!border-black"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                {promotionsData.right.buttonText}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </RevealSection>
  );
}
