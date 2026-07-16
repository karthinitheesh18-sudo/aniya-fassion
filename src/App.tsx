/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewArrivals from "./components/NewArrivals";
import Lookbook from "./components/Lookbook";
import DesignerSpotlight from "./components/DesignerSpotlight";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import QuickViewModal from "./components/QuickViewModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import { Product, CartItem } from "./types";
import BrandLogoLoader from "./components/BrandLogoLoader";
import FutureFeatures from "./components/FutureFeatures";
import Orders from "./components/Orders";
import Contact from "./components/Contact";

import SecondHero from "./components/SecondHero";
import FloatingCategories from "./components/FloatingCategories";
import FeaturedCollections from "./components/FeaturedCollections";
import PromotionalBanners from "./components/PromotionalBanners";
import BestSellers from "./components/BestSellers";
import Benefits from "./components/Benefits";


export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  // Shopping Cart state with LocalStorage recovery

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("luxefashion_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist state with LocalStorage recovery
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("luxefashion_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Navigation and overlay UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filtering and searching states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState<string>("home");

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage("shop");
    setTimeout(() => {
      handleScrollToSection("products-section");
    }, 150);
  };

  // Sync state changes to storage
  useEffect(() => {
    localStorage.setItem("luxefashion_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("luxefashion_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Handler: Scroll helper
  const handleScrollToSection = (id: string) => {
    const sectionToPageMap: Record<string, string> = {
      "products-section": "shop",
      "hero-section": "home",
      "spotlight-section": "about",
      "contact-section": "contact",
      "lookbook-section": "lookbook",
      "orders-section": "orders",
    };

    const targetPage = sectionToPageMap[id];
    if (targetPage && currentPage !== targetPage) {
      setCurrentPage(targetPage);
      // Wait for page layout rendering to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // Handler: Add to Shopping Cart
  const handleAddToCart = (product: Product, size: string, color: { name: string; hex: string }) => {
    const uniqueId = `${product.id}-${size}-${color.name}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        // Increment quantity of existing match
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        // Append new unique configuration
        return [
          ...prevCart,
          {
            id: uniqueId,
            product,
            quantity: 1,
            selectedSize: size,
            selectedColor: color,
          },
        ];
      }
    });

    // Auto open side-cart drawer to showcase cart reaction
    setIsCartOpen(true);
  };

  // Handler: Update Quantity inside drawer
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Handler: Remove item from cart
  const handleRemoveCartItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Handler: Empty shopping cart on completed checkout
  const handleClearCart = () => {
    setCart([]);
  };

  // Handler: Toggle Wishlist state
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyIn = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyIn) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== product.id));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white antialiased relative">
      
      {/* Visual initial full brand load curtain screen overlay */}
      {!isAppLoaded && (
        <BrandLogoLoader onComplete={() => setIsAppLoaded(true)} />
      )}

      {/* Wrap main content to sit on top of footer curtain */}
      <div className="relative z-10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:mb-[380px]">


        {/* Main Header navigation */}
        <Navbar
          cart={cart}
          wishlist={wishlist}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleSelectCategory}
          onScrollToSection={handleScrollToSection}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Main Layout Blocks */}
        <main>
          
          {currentPage === "home" && (
            <>
              {/* Full Showcase Hero Area */}
              <Hero onScrollToSection={handleScrollToSection} />

              {/* Large Spacer breathing room */}
              <div className="h-24 sm:h-36 bg-white" />

              {/* New Second Hero (End Banner Hero) */}
              <SecondHero
                onScrollToSection={handleScrollToSection}
                onSelectCategory={handleSelectCategory}
              />

              {/* Floating Categories circle links */}
              <FloatingCategories onSelectCategory={handleSelectCategory} />

              {/* Featured Collections categories grid */}
              <FeaturedCollections
                onSelectCategory={handleSelectCategory}
                onScrollToSection={handleScrollToSection}
              />

              {/* Promotional Banners split banner */}
              <PromotionalBanners
                onSelectCategory={handleSelectCategory}
                onScrollToSection={handleScrollToSection}
              />

              {/* Best Sellers Grid - Our Most Loved Picks */}
              <BestSellers
                onOpenQuickView={setSelectedProduct}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />

              {/* Benefits assurance bar */}
              <Benefits />

              {/* Secure Newsletter subscription container */}
              <Newsletter />
            </>
          )}

          {currentPage === "shop" && (
            /* Interactive Products Grid with full filtering & searching */
            <NewArrivals
              onOpenQuickView={setSelectedProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
            />
          )}

          {currentPage === "lookbook" && (
            /* Interactive Editorial Lookbook Section */
            <Lookbook 
              onOpenQuickView={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onScrollToSection={handleScrollToSection}
            />
          )}

          {currentPage === "about" && (
            /* Designer Spotlight acts as the About Us Page */
            <DesignerSpotlight 
              onScrollToSection={handleScrollToSection}
            />
          )}

          {currentPage === "orders" && (
            /* Orders tracking portal page */
            <Orders />
          )}

          {currentPage === "contact" && (
            /* Contact Us Page */
            <Contact />
          )}

          {currentPage === "design-lab" && (
            /* Design Lab & Future Features Sections (Quiz, Outfit builder, Try-on) */
            <FutureFeatures />
          )}

        </main>
      </div>

      {/* Elegant Footer with curtain z-index layer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onSelectCategory={handleSelectCategory}
      />

      {/* Slide-over Right Overlay: Shopping Cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Slide-over Right Overlay: Wishlist drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onOpenQuickView={setSelectedProduct}
      />

      {/* Modal Center Overlay: Product Detail quick-views */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

    </div>
  );
}
