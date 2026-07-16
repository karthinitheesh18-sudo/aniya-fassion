import React from "react";
import { benefitsData } from "../data/homepage";
import BenefitCard from "./ui/BenefitCard";
import RevealSection from "./ui/RevealSection";

export default function Benefits() {
  return (
    <RevealSection
      id="benefits-section"
      className="py-16 bg-[#FAF6F0] border-b border-neutral-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefitsData.map((benefit, index) => (
            <div
              key={benefit.id}
              className="gpu-accelerated transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <BenefitCard
                title={benefit.title}
                desc={benefit.desc}
                iconName={benefit.iconName}
              />
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
