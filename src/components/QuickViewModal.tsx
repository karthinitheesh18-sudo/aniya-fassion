import React, { useState, useEffect, useRef } from "react";
import { X, Star, Heart, Check, Plus, Minus, ShoppingBag, ShieldCheck, RefreshCw, Send } from "lucide-react";
import { Product } from "../types";
import { products } from "../data";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

interface MockReview {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}: QuickViewModalProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Initialize/update active product when prop product changes
  useEffect(() => {
    setActiveProduct(product);
  }, [product]);

  if (!activeProduct) return null;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>({ name: "", hex: "" });
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Image Gallery State
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);

  // Image Zoom State
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  // Review Form States
  const [reviewsList, setReviewsList] = useState<MockReview[]>([
    { id: 1, name: "Aarav S.", rating: 5, text: "Outstanding quality. The weave and fabric structure feels incredibly luxurious.", date: "2026-07-02" },
    { id: 2, name: "Diya M.", rating: 5, text: "The fit is exact and elegant. Exceeded all my premium style expectations.", date: "2026-06-28" }
  ]);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Gallery Images simulation (since DB has 1 image, we simulate a multi-angle gallery by cropping/modifying key viewframes)
  const galleryImages = [
    activeProduct.image,
    activeProduct.image, // details close-up
    activeProduct.image  // texture alternate
  ];

  // Related Products query (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === activeProduct.category && p.id !== activeProduct.id)
    .slice(0, 3);

  // Reset local selector states on product change
  useEffect(() => {
    if (activeProduct) {
      setSelectedSize(activeProduct.sizes[0] || "One Size");
      setSelectedColor(activeProduct.colors[0] || { name: "Default", hex: "#000000" });
      setQuantity(1);
      setIsAdded(false);
      setActiveImgIdx(0);
      setIsZooming(false);
      setShowReviewForm(false);
    }
  }, [activeProduct]);

  const isInWishlist = wishlist.some((item) => item.id === activeProduct.id);

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    onAddToCart(activeProduct, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  // Image Magnifier Coordinates Calculator
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Submit Review Form Handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) return;
    const newRev: MockReview = {
      id: reviewsList.length + 1,
      name: newReviewName,
      rating: newReviewRating,
      text: newReviewText,
      date: new Date().toISOString().split("T")[0]
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewName("");
    setNewReviewRating(5);
    setNewReviewText("");
    setShowReviewForm(false);
  };

  return (
    <div 
      id="quickview-modal-overlay" 
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all animate-fade-in"
    >
      
      {/* Modal Container */}
      <div 
        id="quickview-modal-container" 
        className="relative bg-white w-full max-w-5xl rounded-none shadow-2xl overflow-hidden animate-slide-up max-h-[92vh] overflow-y-auto"
      >
        
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#FAF9F6] border border-gray-200 hover:bg-black hover:text-white p-2.5 transition-all duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT COLUMN: Image gallery with hover magnifier */}
          <div className="p-6 sm:p-8 bg-[#F5F1E8]/30 flex flex-col justify-between border-r border-[#D4AF37]/10">
            
            {/* Main Interactive Zoom Box */}
            <div 
              className="relative h-[360px] sm:h-[450px] overflow-hidden bg-white border border-gray-100 cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Floating badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                {activeProduct.isNew && (
                  <span className="bg-[#0A0A0A] text-white text-[8px] font-semibold px-2.5 py-1.5 uppercase tracking-widest">
                    New Design
                  </span>
                )}
                {activeProduct.isSale && (
                  <span className="bg-red-700 text-white text-[8px] font-semibold px-2.5 py-1.5 uppercase tracking-widest">
                    Save {activeProduct.discount}%
                  </span>
                )}
              </div>

              {/* Main zoomable image */}
              <img
                src={galleryImages[activeImgIdx]}
                alt={activeProduct.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  activeImgIdx === 1 ? "scale-110 origin-center" : activeImgIdx === 2 ? "scale-105 saturate-125" : ""
                }`}
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? "scale(2.2)" : undefined,
                  transition: isZooming ? "none" : "transform 0.5s ease"
                }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Thumbnail Controls */}
            <div className="flex justify-center space-x-3 mt-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-16 h-20 border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
                    activeImgIdx === idx ? "border-[#D4AF37]" : "border-gray-200 hover:border-black"
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumb ${idx + 1}`} 
                    className={`w-full h-full object-cover ${
                      idx === 1 ? "scale-110" : idx === 2 ? "scale-105 saturate-125" : ""
                    }`}
                  />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Selection details, Reviews */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[600px] md:max-h-[580px]">
            
            <div>
              {/* Product Category */}
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B76E79] mb-1.5 block">
                {activeProduct.category}
              </span>
              
              {/* Name */}
              <h2 
                className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] uppercase tracking-wider mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {activeProduct.name}
              </h2>

              {/* Stars & Reviews counter */}
              <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-gray-100">
                <div className="flex text-[#D4AF37]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < Math.floor(activeProduct.rating) ? "fill-[#D4AF37]" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
                  {reviewsList.length} Customer Reviews
                </span>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline space-x-3 mb-6 bg-[#F5F1E8]/50 p-4 border border-[#D4AF37]/10">
                <span className="text-xl font-bold text-[#0A0A0A]">${activeProduct.price}</span>
                {activeProduct.originalPrice > activeProduct.price && (
                  <>
                    <span className="text-xs text-gray-400 line-through">${activeProduct.originalPrice}</span>
                    <span className="text-[9px] text-red-600 font-bold bg-red-50 px-2 py-0.5 uppercase tracking-widest">
                      Save ${activeProduct.originalPrice - activeProduct.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
                {activeProduct.description}
              </p>

              {/* Color Swatch Selectors */}
              <div className="mb-6">
                <span className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">
                  Color Selection: <span className="text-[#B76E79] font-normal">{selectedColor.name}</span>
                </span>
                <div className="flex gap-3">
                  {activeProduct.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                          isSelected ? "border-[#D4AF37] scale-110 shadow" : "border-gray-200 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selectors */}
              <div className="mb-6">
                <span className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">
                  Size Selection: <span className="text-[#B76E79] font-normal">{selectedSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-10 text-[10px] font-semibold border transition-all duration-300 focus:outline-none cursor-pointer ${
                          isSelected
                            ? "bg-[#0A0A0A] text-white border-black"
                            : "bg-transparent text-gray-800 border-gray-200 hover:border-[#D4AF37]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* CTA action buttons */}
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                
                {/* Quantity adjustments */}
                <div className="flex items-center border border-gray-200 h-12 w-full sm:w-auto">
                  <button
                    onClick={handleDecreaseQty}
                    className="px-4 text-gray-500 hover:text-black focus:outline-none cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold text-[#0A0A0A] w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQty}
                    className="px-4 text-gray-500 hover:text-black focus:outline-none cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  id="add-to-cart-cta-btn"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-grow h-12 px-8 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 w-full sm:w-auto cursor-pointer ${
                    isAdded
                      ? "bg-emerald-700 text-white"
                      : "bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:text-black"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? "Added to Cart" : "Add to Cart"}</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(activeProduct)}
                  className={`p-3 border transition-colors cursor-pointer ${
                    isInWishlist ? "border-red-400 text-red-500 bg-red-50" : "border-gray-200 text-gray-400 hover:border-black hover:text-black"
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-red-500" : ""}`} />
                </button>
              </div>

              {/* Core assurances */}
              <div className="flex items-center justify-start space-x-6 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] mr-1.5" /> Secure Checkout
                </span>
                <span className="flex items-center">
                  <RefreshCw className="w-3.5 h-3.5 text-[#B76E79] mr-1.5" /> 30-Day Returns
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ─── CUSTOMER REVIEWS TAB / DRAWER ────────────────────────────────── */}
        <div className="border-t border-[#D4AF37]/10 p-6 sm:p-8 bg-[#FAF9F6]">
          <div className="flex justify-between items-center mb-6">
            <h3 
              className="text-lg font-bold uppercase tracking-widest text-[#0A0A0A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Customer Reviews ({reviewsList.length})
            </h3>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-xs uppercase tracking-widest font-bold text-[#B76E79] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              {showReviewForm ? "Cancel" : "Write A Review"}
            </button>
          </div>

          {/* Form drawer */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-white border border-[#D4AF37]/20 space-y-4 max-w-xl animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold mb-1.5">Rating (1 to 5)</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  >
                    {[5, 4, 3, 2, 1].map((s) => (
                      <option key={s} value={s}>{s} Stars</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold mb-1.5">Comments</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-xs px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Tell us what you think..."
                />
              </div>
              <button
                type="submit"
                className="bg-black hover:bg-[#D4AF37] text-white hover:text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>
            </form>
          )}

          {/* List of reviews */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="bg-white p-5 border border-gray-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex text-[#D4AF37]">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-light">{rev.date}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2 italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <span className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider">
                  — {rev.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RELATED PRODUCTS CONTAINER ───────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#D4AF37]/10 p-6 sm:p-8 bg-white">
            <h3 
              className="text-lg font-bold uppercase tracking-widest text-[#0A0A0A] mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Related Collection Pieces
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveProduct(p)}
                  className="group cursor-pointer bg-[#F5F1E8]/20 border border-gray-100 p-3 flex flex-col justify-between hover:border-[#D4AF37]/45 transition-colors duration-300"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-3 relative bg-[#F5F1E8]">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1 truncate group-hover:text-[#D4AF37] transition-colors">
                    {p.name}
                  </h4>
                  <span className="text-xs font-bold text-[#B76E79]">${p.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
