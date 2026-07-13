import React, { useState } from "react";
import { X, Trash2, Plus, Minus, Lock, ShoppingBag, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "success">("cart");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 15;
  const taxRate = 0.08; // 8% Tax
  const estimatedTax = Math.round(subtotal * taxRate);
  const total = subtotal + shippingCost + estimatedTax;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city) {
      alert("Please fill out the shipping address details.");
      return;
    }
    setCheckoutStep("success");
  };

  const handleCompleteOrder = () => {
    onClearCart();
    setCheckoutStep("cart");
    onClose();
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fade-in">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide Out Panel */}
      <div 
        id="cart-drawer-container" 
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-left z-10 border-l border-[#D4AF37]/20"
      >
        
        {/* Header */}
        <div className="px-6 py-6 border-b border-[#D4AF37]/15 flex justify-between items-center bg-[#FAF9F6]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-black" />
            <span 
              className="font-bold text-[#0A0A0A] text-base uppercase tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {checkoutStep === "shipping" ? "Shipping Details" : checkoutStep === "success" ? "Order Confirmed" : "Shopping Bag"}
            </span>
            {checkoutStep === "cart" && cart.length > 0 && (
              <span className="bg-[#0A0A0A] text-white text-[10px] font-bold px-2 py-0.5 tracking-widest rounded-none">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black focus:outline-none transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Body */}
        {checkoutStep === "success" ? (
          /* Order success animation panel */
          <div className="flex-grow p-8 flex flex-col items-center justify-center text-center animate-fade-in bg-[#FAF9F6]">
            <div className="w-16 h-16 border-2 border-[#D4AF37] flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 
              className="text-2xl font-bold text-[#0A0A0A] uppercase tracking-wider mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Thank You For Your Order
            </h3>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-semibold mb-6">
              Order ID: #AANYA-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-xs text-gray-600 mb-8 leading-relaxed max-w-xs font-light">
              We&apos;ve sent a confirmation email to your registered address. Your curated wardrobe pieces are being prepared for dispatch.
            </p>
            <button
              onClick={handleCompleteOrder}
              className="w-full bg-[#0A0A0A] text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 rounded-none cursor-pointer border border-[#0A0A0A] hover:border-[#D4AF37]"
            >
              Continue Shopping
            </button>
          </div>
        ) : checkoutStep === "shipping" ? (
          /* Shipping Address Entry Form */
          <div className="flex-grow p-6 overflow-y-auto bg-[#FAF9F6]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B76E79] mb-6">Shipping Destination</h4>
            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-widest text-[#2C2C2C] mb-1.5">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-xs rounded-none focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-widest text-[#2C2C2C] mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter address"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-xs rounded-none focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-[#2C2C2C] mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-xs rounded-none focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-[#2C2C2C] mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Code"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 bg-white text-xs rounded-none focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Summary details */}
              <div className="bg-white p-5 border border-gray-100 mt-6 space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-3">Order Invoice</span>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Items Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Shipping Costs</span>
                  <span>{isFreeShipping ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Estimated Tax (8%)</span>
                  <span>${estimatedTax}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-black pt-3 border-t border-gray-100 mt-2">
                  <span>Order Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="w-1/3 border border-gray-200 text-gray-600 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors cursor-pointer rounded-none"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-grow bg-[#0A0A0A] text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 flex items-center justify-center space-x-2 rounded-none cursor-pointer border border-[#0A0A0A] hover:border-[#D4AF37]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Submit Payment</span>
                </button>
              </div>
            </form>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Bag */
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-[#FAF9F6]">
            <ShoppingBag className="w-12 h-12 text-[#D4AF37]/35 mb-4" />
            <h4 
              className="text-lg font-bold text-[#0A0A0A] mb-2 uppercase tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Shopping Bag is empty
            </h4>
            <p className="text-gray-500 text-xs max-w-xs leading-relaxed mb-8 font-light">
              Explore our signatures and designer collections to find pieces tailored for your unique posture.
            </p>
            <button
              onClick={onClose}
              className="bg-[#0A0A0A] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-none cursor-pointer border border-[#0A0A0A] hover:border-[#D4AF37]"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          /* Listing Cart Contents */
          <div className="flex-grow flex flex-col justify-between overflow-hidden">
            
            {/* Shipping Progress Indicator */}
            <div className="bg-[#FAF9F6] px-6 py-5 border-b border-[#D4AF37]/15 text-center text-xs">
              {isFreeShipping ? (
                <p className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">
                  🎉 You have unlocked Free Premium Shipping
                </p>
              ) : (
                <div className="space-y-2.5">
                  <p className="text-[#2C2C2C] font-light">
                    Add <strong className="font-bold text-[#0A0A0A]">${freeShippingThreshold - subtotal}</strong> more to unlock <strong className="font-semibold text-[#B76E79]">Free Shipping</strong>!
                  </p>
                  
                  {/* Progress track */}
                  <div className="w-full bg-gray-200 h-[3px] rounded-none overflow-hidden">
                    <div
                      className="bg-[#D4AF37] h-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* List items */}
            <div className="flex-grow overflow-y-auto px-6 py-4 divide-y divide-[#D4AF37]/10">
              {cart.map((item) => (
                <div key={item.id} className="py-5 flex space-x-4 animate-fade-in">
                  
                  {/* Thumbnail Image */}
                  <div className="w-20 h-26 bg-[#F5F1E8] flex-shrink-0 rounded-none overflow-hidden border border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Metadata and Controls */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider max-w-[170px] truncate">
                          {item.product.name}
                        </h5>
                        <span className="font-bold text-xs text-[#0A0A0A]">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                      
                      {/* Selection details */}
                      <div className="flex flex-wrap gap-2 text-[9px] text-[#B76E79] mt-1.5 uppercase tracking-widest font-semibold">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <span className="inline-flex items-center">
                          Color:
                          <span
                            className="w-2.5 h-2.5 rounded-full ml-1.5 border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      
                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-gray-200 bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-400 hover:text-black focus:outline-none cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-black w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-400 hover:text-black focus:outline-none cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Trash bin action */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Invoice Breakdown Summary */}
            <div className="bg-[#FAF9F6] px-6 py-6 border-t border-[#D4AF37]/15">
              <div className="space-y-2.5 mb-5 text-xs text-gray-500 font-light">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-black font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-black font-semibold">{isFreeShipping ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax (8%)</span>
                  <span className="text-black font-semibold">${estimatedTax}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0A0A0A] border-t border-[#D4AF37]/10 pt-3">
                  <span>Order Total</span>
                  <span className="text-[#0A0A0A] font-bold">${total}</span>
                </div>
              </div>

              {/* Security assurances */}
              <div className="flex items-center space-x-2 text-[9px] uppercase tracking-widest font-semibold text-gray-400 mb-5 justify-center">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Secure SSL Checkouts</span>
              </div>

              {/* Checkout Trigger button */}
              <button
                id="cart-checkout-btn"
                onClick={() => setCheckoutStep("shipping")}
                className="w-full bg-[#0A0A0A] text-white py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 rounded-none group transition-all duration-300 cursor-pointer border border-[#0A0A0A] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
