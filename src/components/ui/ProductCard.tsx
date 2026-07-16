import React from "react";
import { Heart, Star, Eye, ShoppingCart } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  favorite: boolean;
  onToggleWishlist: () => void;
  onOpenQuickView: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
}

export default function ProductCard({
  product,
  favorite,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart,
}: ProductCardProps) {
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || "One Size";
    const defaultColor = product.colors[0] || { name: "Default", hex: "#000000" };
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <div
      onClick={onOpenQuickView}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-100/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-[#D4AF37]/25 transition-all duration-500 hover:-translate-y-1.5 p-3 cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative h-[220px] sm:h-[280px] md:h-[300px] bg-[#FAF8F5] rounded-xl overflow-hidden mb-4 border border-neutral-100/40">
        
        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-3.5 right-3.5 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm text-neutral-400 hover:text-[#B76E79] hover:scale-105 active:scale-95 transition-all duration-300 border border-neutral-100"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              favorite ? "fill-[#B76E79] text-[#B76E79]" : "text-neutral-400"
            }`}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Hover Action Overlays */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView();
            }}
            className="bg-black text-white p-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 shadow-md cursor-pointer border border-black"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart quick bar */}
        <div className="absolute inset-x-3 bottom-3 translate-y-14 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-black text-white text-[9px] sm:text-[10px] py-3.5 font-bold uppercase tracking-widest hover:bg-[#FAF6F0] hover:text-black hover:border-black/20 transition-all duration-300 flex items-center justify-center space-x-2 border border-black cursor-pointer rounded-lg shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex-grow flex flex-col justify-between px-1.5 pb-1">
        <div>
          <span className="text-[9px] text-[#B76E79] uppercase tracking-[0.25em] font-semibold mb-1 block">
            Aanya Atelier
          </span>
          <h3 className="font-bold text-[#0A0A0A] text-sm hover:text-[#D4AF37] transition-colors duration-300 mb-1 truncate">
            {product.name}
          </h3>
          
          {/* Rating stars */}
          <div className="flex items-center space-x-1 mb-2.5">
            <div className="flex text-[#D4AF37]">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3 h-3 ${
                    idx < Math.floor(product.rating)
                      ? "fill-[#D4AF37] text-[#D4AF37]"
                      : "text-neutral-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] text-neutral-400 font-medium">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center space-x-2 pt-2 border-t border-neutral-100">
          <span className="text-sm font-bold text-[#0A0A0A]">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
