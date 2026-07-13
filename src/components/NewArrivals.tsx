import React from "react";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { products } from "../data";

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
  
  // Available filter tabs
  const categoriesList = [
    { name: "All Products", value: "all" },
    { name: "Jackets & Coats", value: "Jackets" },
    { name: "Dresses", value: "Dresses" },
    { name: "Shoes", value: "Shoes" },
    { name: "Accessories", value: "Accessories" },
  ];

  // Filtering products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Helper to handle Quick Add to Cart with default first options
  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || "One Size";
    const defaultColor = product.colors[0] || { name: "Default", hex: "#000000" };
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <section id="products-section" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Our Collection
          </h2>
          <div className="w-12 h-1 bg-black mx-auto mb-4"></div>
          <p className="text-gray-500 italic text-sm">Fresh premium styles just dropped</p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-100 pb-4">
          {categoriesList.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedCategory(tab.value)}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded ${
                selectedCategory === tab.value
                  ? "bg-black text-white shadow"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search feedback if query is active */}
        {searchQuery.trim() !== "" && (
          <div className="mb-8 text-center sm:text-left text-sm text-gray-500">
            Showing results for &quot;<span className="font-semibold text-black">{searchQuery}</span>&quot;
            <button
              onClick={() => setSelectedCategory("all")}
              className="ml-2 text-xs text-red-600 underline font-medium hover:text-red-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-base mb-4">No fashion items match your active filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800"
            >
              Show All Products
            </button>
          </div>
        ) : (
          /* Products Grid matching visual density requirements */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => {
              const favorite = isInWishlist(product.id);
              
              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="product-card group relative flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow p-2 cursor-pointer"
                  onClick={() => onOpenQuickView(product)}
                >
                  {/* Photo area */}
                  <div className="relative h-[380px] sm:h-[420px] bg-gray-50 overflow-hidden mb-4 rounded">
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="bg-black text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm">
                          New
                        </span>
                      )}
                      {product.isTrending && (
                        <span className="bg-indigo-600 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm">
                          Trending
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm animate-pulse">
                          Sale
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-amber-600 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Wishlist Floating Button */}
                    <button
                      type="button"
                      id={`wishlist-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-200"
                      aria-label="Add to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          favorite ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Main Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Interactive Actions Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuickView(product);
                        }}
                        className="bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-md"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Slide up Quick Add button */}
                    <div className="absolute inset-x-0 bottom-4 px-4 add-to-cart-btn">
                      <button
                        type="button"
                        id={`quick-add-btn-${product.id}`}
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="w-full bg-black text-white text-[11px] py-3.5 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Quick Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata area */}
                  <div className="flex-grow flex flex-col justify-between px-1">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-bold text-gray-900 text-sm hover:text-gray-700 transition-colors mb-1 truncate">
                        {product.name}
                      </h3>
                      
                      {/* Rating Stars */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 ${
                                idx < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
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

                    {/* Pricing */}
                    <div className="flex items-center space-x-2.5 mt-auto">
                      <span className="text-sm font-bold text-black">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                          <span className="text-[10px] text-red-600 font-bold uppercase tracking-tighter">
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

        {/* View All Reset block */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              setSelectedCategory("all");
              window.scrollTo({
                top: document.getElementById("products-section")?.offsetTop || 0,
                behavior: "smooth",
              });
            }}
            className="inline-flex items-center px-12 py-4 border-2 border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
