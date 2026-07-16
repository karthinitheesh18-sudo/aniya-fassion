import React from "react";
import { ArrowRight } from "lucide-react";
import { featuredCollectionsData } from "../data/homepage";
import SectionTitle from "./ui/SectionTitle";
import CollectionCard from "./ui/CollectionCard";
import RevealSection from "./ui/RevealSection";

interface FeaturedCollectionsProps {
  onSelectCategory: (categoryVal: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function FeaturedCollections({
  onSelectCategory,
  onScrollToSection,
}: FeaturedCollectionsProps) {
  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelectCategory("all");
    onScrollToSection("products-section");
  };

  const handleCollectionClick = (categoryVal: string) => {
    onSelectCategory(categoryVal);
    onScrollToSection("products-section");
  };

  const rightLink = (
    <a
      href="#products-section"
      onClick={handleViewAllClick}
      className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors duration-300"
    >
      <span>{featuredCollectionsData.ctaText}</span>
      <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );

  return (
    <RevealSection
      id="featured-collections-section"
      className="py-24 bg-white border-b border-neutral-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionTitle
          subtitle={featuredCollectionsData.subtitle}
          title={featuredCollectionsData.title}
          rightElement={rightLink}
        />

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredCollectionsData.items.map((item, index) => (
            <div
              key={item.id}
              className="gpu-accelerated transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                animationDelay: `${index * 120}ms`,
              }}
            >
              <CollectionCard
                name={item.name}
                subtitle={item.subtitle}
                image={item.image}
                onClick={() => handleCollectionClick(item.categoryVal)}
              />
            </div>
          ))}
        </div>

      </div>
    </RevealSection>
  );
}
