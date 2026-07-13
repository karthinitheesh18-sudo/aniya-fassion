import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { Product, CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onScrollToSection,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-gray-700 hover:text-black focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              id="brand-logo"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onScrollToSection("hero-section");
              }}
              className="text-2xl font-bold tracking-tighter uppercase text-black hover:opacity-80 transition-opacity"
            >
              LUXEFASHION
            </a>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8 lg:space-x-10">
            <a
              id="nav-shop"
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory("all");
                onScrollToSection("products-section");
              }}
              className={`text-sm font-medium transition-colors hover:text-black ${
                selectedCategory === "all" ? "text-black border-b-2 border-black pb-1" : "text-gray-500"
              }`}
            >
              Shop
            </a>
            <a
              id="nav-collections"
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                onScrollToSection("collections-section");
              }}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
            >
              Collections
            </a>
            <a
              id="nav-new-arrivals"
              href="#new-arrivals"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory("Jackets");
                onScrollToSection("products-section");
              }}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
            >
              New Arrivals
            </a>
            <a
              id="nav-sale"
              href="#sale"
              onClick={(e) => {
                e.preventDefault();
                onScrollToSection("sale-section");
              }}
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Sale
            </a>
          </div>

          {/* Utility Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {isSearchVisible && (
                <input
                  id="navbar-search-input"
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2 px-3 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black w-36 sm:w-48 transition-all duration-300"
                />
              )}
              <button
                id="search-toggle-btn"
                onClick={() => {
                  setIsSearchVisible(!isSearchVisible);
                  if (isSearchVisible) setSearchQuery("");
                }}
                className="p-2 text-gray-700 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Button with Badge */}
            <button
              id="wishlist-toggle-btn"
              onClick={onOpenWishlist}
              className="p-2 text-gray-700 hover:text-black transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span id="wishlist-badge" className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Badge */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              className="p-2 text-gray-700 hover:text-black transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span id="cart-badge" className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account Mock Button */}
            <button
              id="account-btn"
              className="p-2 text-gray-700 hover:text-black transition-colors hidden sm:inline-block"
              aria-label="Account"
              onClick={() => alert("Welcome to LUXEFASHION. Account portal is simulated for preview.")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer/Dropdown */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <a
            id="mobile-nav-shop"
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory("all");
              setIsMobileMenuOpen(false);
              onScrollToSection("products-section");
            }}
            className="block py-2 text-base font-medium text-gray-900 border-b border-gray-50"
          >
            Shop All Products
          </a>
          <a
            id="mobile-nav-collections"
            href="#collections"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              onScrollToSection("collections-section");
            }}
            className="block py-2 text-base font-medium text-gray-900 border-b border-gray-50"
          >
            Collections
          </a>
          <a
            id="mobile-nav-new-arrivals"
            href="#new"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory("Jackets");
              setIsMobileMenuOpen(false);
              onScrollToSection("products-section");
            }}
            className="block py-2 text-base font-medium text-gray-900 border-b border-gray-50"
          >
            New Arrivals
          </a>
          <a
            id="mobile-nav-sale"
            href="#sale"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              onScrollToSection("sale-section");
            }}
            className="block py-2 text-base font-semibold text-red-600 border-b border-gray-50"
          >
            Summer Sale
          </a>
          <button
            id="mobile-nav-account"
            onClick={() => {
              setIsMobileMenuOpen(false);
              alert("Welcome to LUXEFASHION. Account portal is simulated for preview.");
            }}
            className="w-full text-left py-2 text-base font-medium text-gray-900 flex items-center"
          >
            <User className="w-5 h-5 mr-2 text-gray-500" /> Account Settings
          </button>
        </div>
      )}
    </header>
  );
}
