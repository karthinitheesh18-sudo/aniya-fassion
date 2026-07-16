import React from "react";
import { ArrowRight } from "lucide-react";
import { bestSellersData } from "../data/homepage";
import SectionTitle from "./ui/SectionTitle";
import ProductCard from "./ui/ProductCard";
import RevealSection from "./ui/RevealSection";
import { Product } from "../types";

interface BestSellersProps {
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export default function BestSellers({
  onOpenQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}: BestSellersProps) {
  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // View All CTA link
  const rightLink = (
    <a
      href="#products-section"
      className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors duration-300"
    >
      <span>{bestSellersData.ctaText}</span>
      <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );

  return (
    <RevealSection
      id="bestsellers-section"
      className="py-24 bg-white border-b border-neutral-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionTitle
          subtitle={bestSellersData.subtitle}
          title={bestSellersData.title}
          rightElement={rightLink}
        />

        {/* 6-Product Grid: 2 columns on mobile, 3 on tablet/laptop, 6 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {bestSellersData.products.map((product, index) => {
            // Safe cast as Product type for Quick View Modal
            const castedProduct = {
              ...product,
              originalPrice: product.originalPrice || product.price,
              discount: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0,
            } as Product;

            return (
              <div
                key={product.id}
                className="gpu-accelerated transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <ProductCard
                  product={castedProduct}
                  favorite={isInWishlist(product.id)}
                  onToggleWishlist={() => onToggleWishlist(castedProduct)}
                  onOpenQuickView={() => onOpenQuickView(castedProduct)}
                  onAddToCart={onAddToCart}
                />
              </div>
            );
          })}
        </div>

      </div>
    </RevealSection>
  );
}
