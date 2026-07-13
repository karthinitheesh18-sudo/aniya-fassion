import React, { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Text color based on scrolled state
  const textColor = isScrolled ? "text-[#0A0A0A]" : "text-white";
  const hoverTextColor = "hover:text-[#D4AF37]";
  const iconColor = isScrolled ? "text-[#2C2C2C]" : "text-white/90";

  return (
    <header 
      id="main-header" 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-luxury ${
        isScrolled 
          ? "bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-md py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 -ml-2 ${textColor} ${hoverTextColor} focus:outline-none transition-colors duration-300`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Luxury Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              id="brand-logo"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onScrollToSection("hero-section");
              }}
              className={`text-xl font-bold tracking-[0.25em] uppercase hover:opacity-80 transition-all duration-300 ${textColor}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Aanya Fashions
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {[
              { id: "products-section", label: "Shop", cat: "all" },
              { id: "collections-section", label: "Collections" },
              { id: "lookbook-section", label: "Lookbook" },
              { id: "spotlight-section", label: "Designer Spotlight" },
              { id: "testimonials-section", label: "Reviews" },
              { id: "instagram-section", label: "Instagram" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.cat) setSelectedCategory(link.cat);
                  onScrollToSection(link.id);
                }}
                className={`relative py-1 text-[11px] font-medium uppercase tracking-widest transition-colors duration-300 ${textColor} ${hoverTextColor} group`}
              >
                {link.label}
                {/* Gold slide underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* Commerce Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Bar Inline Toggle */}
            <div className="relative flex items-center">
              {isSearchVisible && (
                <input
                  id="navbar-search-input"
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`mr-2 px-3 py-1 text-xs border rounded-none focus:outline-none focus:border-[#D4AF37] w-32 sm:w-44 transition-all duration-300 ${
                    isScrolled 
                      ? "bg-white text-black border-gray-300" 
                      : "bg-black/30 text-white border-white/20 placeholder-white/50"
                  }`}
                />
              )}
              <button
                id="search-toggle-btn"
                onClick={() => {
                  setIsSearchVisible(!isSearchVisible);
                  if (isSearchVisible) setSearchQuery("");
                }}
                className={`p-2 transition-colors duration-300 ${iconColor} ${hoverTextColor}`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Wishlist Icon */}
            <button
              id="wishlist-toggle-btn"
              onClick={onOpenWishlist}
              className={`p-2 transition-colors duration-300 relative ${iconColor} ${hoverTextColor}`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span 
                  id="wishlist-badge" 
                  className="absolute top-1 right-1 bg-[#B76E79] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white"
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              className={`p-2 transition-colors duration-300 relative ${iconColor} ${hoverTextColor}`}
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span 
                  id="cart-badge" 
                  className="absolute top-1 right-1 bg-[#D4AF37] text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Button */}
            <button
              id="account-btn"
              className={`p-2 transition-colors duration-300 hidden sm:inline-block ${iconColor} ${hoverTextColor}`}
              aria-label="Account"
              onClick={() => alert("Simulated: Welcome to Aanya Fashions luxury portal.")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-lg flex flex-col justify-center px-8 transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Close Button in Full-Screen menu */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-4 text-white hover:text-[#D4AF37] focus:outline-none"
          aria-label="Close Menu"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col space-y-6 text-center">
          {[
            { id: "products-section", label: "Shop Products", cat: "all" },
            { id: "collections-section", label: "Collections" },
            { id: "lookbook-section", label: "Lookbook Portfolio" },
            { id: "spotlight-section", label: "Designer Spotlight" },
            { id: "testimonials-section", label: "Client Reviews" },
            { id: "instagram-section", label: "Instagram Feed" },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                if (link.cat) setSelectedCategory(link.cat);
                setIsMobileMenuOpen(false);
                onScrollToSection(link.id);
              }}
              className="text-2xl font-bold uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors duration-300"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {link.label}
            </a>
          ))}
          
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              alert("Simulated: Welcome to Aanya Fashions luxury portal.");
            }}
            className="pt-6 text-sm uppercase tracking-widest text-white/50 hover:text-white flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" /> Account Login
          </button>
        </div>
      </div>
    </header>
  );
}
