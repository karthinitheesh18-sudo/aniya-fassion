import React, { useState } from "react";
import { useReveal } from "./useReveal";
import { products } from "../data";
import { Product } from "../types";
import { Plus, Eye, ShoppingCart } from "lucide-react";

interface LookbookProps {
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  onScrollToSection: (id: string) => void;
}

export default function Lookbook({ onOpenQuickView, onAddToCart, onScrollToSection }: LookbookProps) {
  const { ref, isVisible } = useReveal(0.05);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Map lookbook hotspots to actual products in the data file
  const lookbookProducts = [
    {
      id: "tag-1",
      productId: "p2", // Elegant Summer Dress
      x: "42%",
      y: "35%",
      label: "Silk Heritage Dress",
      details: products.find(p => p.id === "p2")
    },
    {
      id: "tag-2",
      productId: "p6", // Minimalist Leather Watch
      x: "28%",
      y: "55%",
      label: "Luxury Leather Watch",
      details: products.find(p => p.id === "p6")
    },
    {
      id: "tag-3",
      productId: "p4", // Designer Sneakers
      x: "52%",
      y: "88%",
      label: "Minimalist Sneakers",
      details: products.find(p => p.id === "p4")
    }
  ];

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0] || "One Size";
    const defaultColor = product.colors[0] || { name: "Default", hex: "#000000" };
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <section 
      ref={ref} 
      id="lookbook-section" 
      className="py-24 bg-[#FAF9F6] border-b border-[#D4AF37]/10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
            Style Inspiration
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A] uppercase">
            Interactive Lookbook
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 italic text-sm">Explore editorial looks and tap hotspots to shop items directly</p>
        </div>

        {/* Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Image container with interactive hotspots */}
          <div 
            className="lg:col-span-7 relative group transition-all duration-1000 ease-luxury overflow-hidden border border-[#D4AF37]/15 shadow-xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.98)"
            }}
          >
            {/* Main Editorial Image */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4VvL7icvrTJ0OAIfxszO0Wk08mmNCaFpeJnteMT8XJwN1zQNUlV-XkhDmd0GxTgrFZ2urfdPS9FOIM1WTJfB8v2JNtXhesJPNbV3wclKFCviC1doDmDQ8DQu6u03cW-2q7hllDEAaEj07ecCi_UPEEFdmCgC9YQgGN8y4d6nXf7FUJTNDU62a5b8339b9udHWVCA_RzlA_WlcMjIF38d3eJJn4SenxtnkZORM_RsNagi_aN22qfTiLA"
              alt="Editorial Lookbook Model"
              className="w-full h-[650px] object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-luxury"
              loading="lazy"
            />
            
            {/* Hotspot Dots */}
            {lookbookProducts.map((tag) => {
              const product = tag.details;
              if (!product) return null;

              const isActive = activeTag === tag.id;

              return (
                <div
                  key={tag.id}
                  className="absolute"
                  style={{ left: tag.x, top: tag.y }}
                >
                  {/* Pulsating core pin button */}
                  <button
                    onClick={() => setActiveTag(isActive ? null : tag.id)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center focus:outline-none z-20 cursor-pointer transition-all duration-300 ${
                      isActive ? "bg-[#D4AF37] scale-110" : "bg-[#0A0A0A]/85 hover:bg-[#D4AF37] hover:scale-105"
                    }`}
                  >
                    <Plus className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "rotate-45 text-black" : "text-white"
                    }`} />
                    
                    {/* Ring Pulse */}
                    <span className="absolute -inset-1 border border-[#D4AF37] rounded-full animate-ping opacity-60 pointer-events-none" />
                  </button>

                  {/* Popover Card */}
                  <div
                    className={`absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-[#0A0A0A] p-4 w-60 shadow-2xl border border-[#D4AF37]/35 transition-all duration-500 z-30 ${
                      isActive 
                        ? "opacity-100 translate-y-0 pointer-events-auto" 
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="flex gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-16 object-cover bg-gray-50 border border-gray-100"
                      />
                      <div className="flex-grow min-w-0">
                        <p className="text-[9px] uppercase tracking-widest text-[#B76E79] font-semibold mb-0.5">
                          {product.category}
                        </p>
                        <h4 className="text-xs font-bold text-[#0A0A0A] mb-1 truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-black block mb-2">
                          ${product.price}
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              onOpenQuickView(product);
                              setActiveTag(null);
                            }}
                            className="bg-[#0A0A0A] hover:bg-[#D4AF37] text-white hover:text-black p-1.5 rounded-none transition-colors cursor-pointer"
                            title="Quick View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              handleQuickAdd(product);
                              setActiveTag(null);
                            }}
                            className="bg-transparent hover:bg-[#FAF9F6] text-[#0A0A0A] border border-gray-200 p-1.5 rounded-none transition-colors cursor-pointer flex items-center justify-center"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Lookbook Editorial Descriptions */}
          <div 
            className="lg:col-span-5 flex flex-col justify-center transition-all duration-1000 ease-luxury"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "200ms"
            }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-bold mb-3 block">
              Runway Edit • Look 01
            </span>
            <h3 
              className="text-3xl sm:text-4xl font-bold tracking-wider text-[#0A0A0A] uppercase mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Classic Drapes & Modern Accents
            </h3>
            
            <p className="text-sm text-[#2C2C2C] font-light leading-relaxed mb-8">
              A celebration of modern posture blended seamlessly with heritage weaves. This look features an elegant flow, accented with clean metallic details and comfortable footwear designed for lasting silhouette support. Hover or tap the coordinates on the model to reveal each layer of this signature design style.
            </p>

            {/* List of items in look */}
            <div className="space-y-4 border-t border-[#D4AF37]/15 pt-6 mb-8">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#2C2C2C]">01. Silk Heritage Dress</span>
                <span className="text-gray-400 font-light">$150.00</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#2C2C2C]">02. Swiss Quartz Watch</span>
                <span className="text-gray-400 font-light">$220.00</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#2C2C2C]">03. Calfskin Sneakers</span>
                <span className="text-gray-400 font-light">$180.00</span>
              </div>
            </div>

            <button
              onClick={() => onScrollToSection("products-section")}
              className="w-fit bg-[#0A0A0A] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black border border-[#0A0A0A] hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
            >
              Shop Full Lookbook
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
