import React, { useState, useEffect, useRef } from "react";
import { Star, Heart, Eye, ShoppingCart, Filter, ArrowUp, X, SlidersHorizontal } from "lucide-react";
import { Product } from "../types";
import { products } from "../data";
import { useReveal } from "./useReveal";

interface NewArrivalsProps {
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
}

export default function NewArrivals({
  onOpenQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
}: NewArrivalsProps) {
  const { ref, isVisible } = useReveal(0.05);
  const sectionRef = useRef<HTMLDivElement>(null);

  // ─── Search and Filtering States ────────────────────────────────────────
  const [sortOption, setSortOption] = useState<string>("newest");
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [minRating, setMinRating] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4; // Set to 4 to demonstrate functional pagination on our data list

  // Mobile Filters Overlay State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Back to Top Button visibility state
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // ─── Scroll Observer for Back to Top Button ─────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Show button once user scrolls past the top of the products grid
      setShowBackToTop(rect.top < 0 && rect.bottom > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset pagination when category, search query, or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, maxPrice, minRating, activeSize, activeColor, sortOption]);

  const categoriesList = [
    { name: "All Products", value: "all" },
    { name: "Jackets & Coats", value: "Jackets" },
    { name: "Dresses", value: "Dresses" },
    { name: "Shoes", value: "Shoes" },
    { name: "Accessories", value: "Accessories" },
  ];

  // Available Sizes for Filter
  const sizeOptions = ["XS", "S", "M", "L", "XL", "39", "40", "41", "42", "43", "44"];

  // Available Colors for Filter
  const colorOptions = [
    { name: "Black", hex: "#121212" },
    { name: "Brown", hex: "#5C4033" },
    { name: "Gold/Amber", hex: "#D4AF37" },
    { name: "Crimson", hex: "#C0392B" },
    { name: "Blue/Indigo", hex: "#2E5894" },
    { name: "Cream/White", hex: "#FAF9F6" },
  ];

  // ─── Filter & Sort Logic ────────────────────────────────────────────────
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

    // 2. Search Query Filter
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Price Filter
    const matchesPrice = product.price <= maxPrice;

    // 4. Rating Filter
    const matchesRating = product.rating >= minRating;

    // 5. Size Filter
    const matchesSize = !activeSize || product.sizes.includes(activeSize);

    // 6. Color Filter
    const matchesColor = !activeColor || product.colors.some(c => 
      c.name.toLowerCase().includes(activeColor.toLowerCase())
    );

    return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesSize && matchesColor;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "newest") {
      // Sort: New items first
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
    return 0;
  });

  // ─── Pagination Calculations ───────────────────────────────────────────
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || "One Size";
    const defaultColor = product.colors[0] || { name: "Default", hex: "#000000" };
    onAddToCart(product, defaultSize, defaultColor);
  };

  const clearAllFilters = () => {
    setMaxPrice(400);
    setMinRating(0);
    setActiveSize(null);
    setActiveColor(null);
    setSelectedCategory("all");
  };

  // Shared Sidebar Filters JSX
  const renderFilters = () => (
    <div className="space-y-8">
      {/* Category List */}
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B76E79] mb-4">
          Product Categories
        </h4>
        <div className="flex flex-col space-y-2">
          {categoriesList.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`text-left text-xs uppercase tracking-widest py-1 transition-colors duration-300 cursor-pointer ${
                selectedCategory === cat.value
                  ? "text-[#D4AF37] font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#D4AF37]/10" />

      {/* Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B76E79]">
            Max Price
          </h4>
          <span className="text-xs font-bold text-black">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="400"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1 bg-gray-200 accent-[#D4AF37] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-2">
          <span>$50</span>
          <span>$400</span>
        </div>
      </div>

      <div className="h-[1px] bg-[#D4AF37]/10" />

      {/* Customer Ratings */}
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B76E79] mb-4">
          Minimum Rating
        </h4>
        <div className="flex flex-col space-y-2">
          {[5, 4, 0].map((star) => (
            <button
              key={star}
              onClick={() => setMinRating(star)}
              className={`flex items-center text-xs space-x-2 py-1 transition-colors cursor-pointer ${
                minRating === star ? "text-[#D4AF37] font-semibold" : "text-gray-500 hover:text-black"
              }`}
            >
              <div className="flex text-[#D4AF37]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-3.5 h-3.5 ${
                      idx < (star || 5) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-200"
                    } ${star === 0 ? "opacity-30" : ""}`}
                  />
                ))}
              </div>
              <span>{star === 5 ? "Only 5 Stars" : star === 4 ? "4+ Stars" : "All Ratings"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#D4AF37]/10" />

      {/* Sizes Selection */}
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B76E79] mb-4">
          Select Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => setActiveSize(activeSize === size ? null : size)}
              className={`w-10 h-10 text-[10px] font-semibold border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                activeSize === size
                  ? "bg-[#0A0A0A] text-white border-black"
                  : "bg-transparent border-gray-200 text-[#2C2C2C] hover:border-[#D4AF37] hover:text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#D4AF37]/10" />

      {/* Colors Swatches */}
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B76E79] mb-4">
          Select Color
        </h4>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => setActiveColor(activeColor === color.name ? null : color.name)}
              className={`w-6 h-6 rounded-full border relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
                activeColor === color.name
                  ? "border-[#D4AF37] scale-110 shadow-md"
                  : "border-gray-200 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {activeColor === color.name && (
                <span className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filter Button */}
      <button
        onClick={clearAllFilters}
        className="w-full text-center py-3.5 border border-red-700/35 hover:border-red-700 text-red-600 hover:text-red-700 font-bold uppercase text-[9px] tracking-widest transition-colors cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <section 
      ref={ref}
      id="products-section" 
      className="py-24 bg-white border-b border-[#D4AF37]/10 relative"
    >
      <div ref={sectionRef} className="absolute top-0 left-0 w-full h-[1px] -translate-y-24" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
            Signature Pieces
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A] uppercase">
            New Arrivals
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 italic text-sm">Explore our newest curated drops with detailed filtering</p>
        </div>

        {/* Catalog Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 pb-6 border-b border-gray-100">
          
          {/* Active Status Info */}
          <div className="text-xs text-gray-500 tracking-wider">
            Showing <span className="font-bold text-black">{indexOfFirstItem + 1}–{Math.min(indexOfLastItem, sortedProducts.length)}</span> of <span className="font-bold text-black">{sortedProducts.length}</span> designs
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {/* Filter Toggle Mobile Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-200 text-xs font-semibold uppercase tracking-wider text-[#2C2C2C] hover:border-[#D4AF37] cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold hidden md:inline">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent border border-gray-200 text-xs font-semibold py-3 px-4 focus:outline-none focus:border-[#D4AF37] uppercase tracking-wider cursor-pointer"
              >
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ─── Main Products Layout (Sidebar + Grid) ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            {renderFilters()}
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-24 bg-[#F5F1E8] border border-dashed border-[#D4AF37]/20 flex flex-col items-center justify-center">
                <p className="text-[#2C2C2C] text-base mb-6 font-light">No items match your active filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-8 py-3.5 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors border border-[#0A0A0A] hover:border-[#D4AF37]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Upgraded Products Grid */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProducts.map((product, index) => {
                  const favorite = isInWishlist(product.id);
                  const brandName = "Aanya Atelier"; // Brand specification

                  return (
                    <div
                      key={product.id}
                      id={`product-card-${product.id}`}
                      className="group relative flex flex-col bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 p-2 sm:p-3 cursor-pointer"
                      onClick={() => onOpenQuickView(product)}
                    >
                      {/* Photo Area */}
                      <div className="relative h-[200px] sm:h-[260px] md:h-[280px] bg-[#FAF9F6] rounded-md overflow-hidden mb-4 border border-gray-100">
                        
                        {/* Category Badge overlay */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-[#0A0A0A] text-[#FAF9F6] text-[8px] font-bold px-3 py-1.5 uppercase tracking-widest">
                            {product.category}
                          </span>
                        </div>

                        {/* Wishlist Icon Toggle */}
                        <button
                          type="button"
                          id={`wishlist-btn-${product.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product);
                          }}
                          className="absolute top-4 right-4 z-10 bg-white p-2.5 rounded-full shadow-md text-gray-400 hover:text-[#B76E79] hover:scale-110 active:scale-95 transition-all duration-300"
                          aria-label="Add to Wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              favorite ? "fill-[#B76E79] text-[#B76E79]" : "text-gray-400"
                            }`}
                          />
                        </button>

                        {/* Main Image with Zoom Hover */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-luxury"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Actions Overlay (Quick View) */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenQuickView(product);
                            }}
                            className="bg-[#0A0A0A] text-white p-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg cursor-pointer"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Add to Cart slide-up action bar */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-luxury">
                          <button
                            type="button"
                            id={`quick-add-btn-${product.id}`}
                            onClick={(e) => handleQuickAdd(e, product)}
                            className="w-full bg-[#0A0A0A] text-white text-[10px] py-4 font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 flex items-center justify-center space-x-2 border border-[#0A0A0A] hover:border-[#D4AF37] cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>

                      {/* Product Metadata Details */}
                      <div className="flex-grow flex flex-col justify-between px-1">
                        <div>
                          {/* Brand Info */}
                          <p className="text-[9px] text-[#B76E79] uppercase tracking-[0.3em] font-bold mb-1.5">
                            {brandName}
                          </p>
                          
                          {/* Product Title */}
                          <h3 className="font-bold text-[#0A0A0A] text-sm hover:text-[#D4AF37] transition-colors duration-300 mb-1.5 truncate">
                            {product.name}
                          </h3>
                          
                          {/* Ratings */}
                          <div className="flex items-center space-x-1.5 mb-3">
                            <div className="flex text-[#D4AF37]">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  className={`w-3.5 h-3.5 ${
                                    idx < Math.floor(product.rating)
                                      ? "fill-[#D4AF37] text-[#D4AF37]"
                                      : "text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-gray-400 font-medium">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Price Tag with Discounts */}
                        <div className="flex items-center space-x-2.5 mt-auto pt-2 border-t border-gray-100">
                          <span className="text-sm font-bold text-[#0A0A0A]">${product.price}</span>
                          {product.originalPrice > product.price && (
                            <>
                              <span className="text-xs text-gray-400 line-through">
                                ${product.originalPrice}
                              </span>
                              <span className="text-[9px] text-[#B76E79] font-bold uppercase tracking-widest">
                                {product.discount}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ─── Pagination Navigation controls ─────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-3 mt-16">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-200 text-[10px] font-bold uppercase tracking-widest disabled:opacity-40 disabled:hover:bg-transparent hover:bg-[#F5F1E8] transition-colors cursor-pointer"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-9 h-9 text-[10px] font-bold border transition-all cursor-pointer ${
                      currentPage === idx + 1
                        ? "bg-[#0A0A0A] text-white border-black"
                        : "bg-transparent border-gray-200 text-gray-600 hover:border-[#D4AF37]"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-200 text-[10px] font-bold uppercase tracking-widest disabled:opacity-40 disabled:hover:bg-transparent hover:bg-[#F5F1E8] transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay mask */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          
          {/* Filter content body */}
          <div className="relative ml-0 mr-auto flex h-full w-full max-w-xs flex-col bg-white py-6 px-6 shadow-xl animate-slide-left overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-black focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {renderFilters()}
          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className={`fixed bottom-6 right-6 z-40 bg-[#0A0A0A] text-white p-3.5 border border-[#D4AF37]/45 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer ${
          showBackToTop ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }`}
        title="Back to Catalog Top"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </section>
  );
}
