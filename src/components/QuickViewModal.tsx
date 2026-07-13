import React, { useState, useEffect } from "react";
import { X, Star, Heart, Check, Plus, Minus, ShoppingBag, ShieldCheck, RefreshCw } from "lucide-react";
import { Product } from "../types";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}: QuickViewModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>({ name: "", hex: "" });
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Initialize selected values with defaults
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "One Size");
      setSelectedColor(product.colors[0] || { name: "Default", hex: "#000000" });
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div id="quickview-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-fade-in">
      
      {/* Modal Container */}
      <div id="quickview-modal-container" className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-slide-up max-h-[90vh] md:max-h-none overflow-y-auto">
        
        {/* Close button */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-black hover:text-white p-2.5 rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image with Tags */}
          <div className="relative bg-gray-50 flex items-center justify-center min-h-[350px] md:min-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover max-h-[500px]"
              referrerPolicy="no-referrer"
            />
            
            {/* Visual labels */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm">
                  New Arrival
                </span>
              )}
              {product.isSale && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-sm animate-pulse">
                  Sale -{product.discount}%
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            
            {/* Heading Details */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-2">
                {product.category}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-3">
                {product.name}
              </h2>

              {/* Rating & reviews */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium border-l border-gray-200 pl-3">
                  {product.reviews} reviews
                </span>
              </div>

              {/* Pricing section */}
              <div className="flex items-baseline space-x-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-2xl font-black text-black">${product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Interactive Color selection */}
              <div className="mb-6">
                <span className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                  Select Color: <span className="font-normal text-gray-500">{selectedColor.name}</span>
                </span>
                <div className="flex gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 focus:outline-none flex items-center justify-center transition-all ${
                          isSelected ? "border-black scale-110" : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && (
                          <Check className={`w-4 h-4 ${color.hex === "#F5F5F0" || color.hex === "#F9F6EE" ? "text-black" : "text-white"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Size selection */}
              <div className="mb-6">
                <span className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                  Select Size: <span className="font-normal text-gray-500">{selectedSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-10 px-3 text-xs font-semibold uppercase border rounded transition-all focus:outline-none ${
                          isSelected
                            ? "bg-black text-white border-black shadow"
                            : "bg-white text-gray-800 border-gray-200 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Details Bullet points */}
              {product.details && product.details.length > 0 && (
                <div className="mb-6">
                  <span className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                    Composition &amp; Care
                  </span>
                  <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1 leading-relaxed">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Actions: Qty and CTA */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                
                {/* Qty Selector */}
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-12 w-full sm:w-auto">
                  <button
                    onClick={handleDecreaseQty}
                    className="px-4 text-gray-500 hover:text-black focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQty}
                    className="px-4 text-gray-500 hover:text-black focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Add to Cart CTA */}
                <button
                  id="add-to-cart-cta-btn"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-grow h-12 px-8 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 w-full sm:w-auto ${
                    isAdded
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-black text-white hover:bg-gray-800 active:scale-95"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? "Added Successfully!" : "Add to Shopping Cart"}</span>
                </button>

                {/* Save Favorited Trigger */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-lg border focus:outline-none hover:bg-gray-50 hover:border-black transition-colors ${
                    isInWishlist ? "border-red-500 text-red-500 bg-red-50" : "border-gray-200 text-gray-400"
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500" : ""}`} />
                </button>
              </div>

              {/* Free features */}
              <div className="flex items-center justify-center sm:justify-start space-x-6 mt-4 text-[11px] text-gray-400">
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5" /> Secure Checkout
                </span>
                <span className="flex items-center">
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-500 mr-1.5" /> Free 30-Day Returns
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
