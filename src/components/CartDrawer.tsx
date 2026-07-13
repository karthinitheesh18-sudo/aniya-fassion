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
  const total = subtotal + shippingCost;

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
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      
      {/* Click outside backdrop close constraint */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide Out Panel */}
      <div id="cart-drawer-container" className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-left z-10">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <span className="font-bold text-gray-900 text-lg">
              {checkoutStep === "shipping" ? "Checkout Details" : checkoutStep === "success" ? "Order Placed" : "Shopping Bag"}
            </span>
            {checkoutStep === "cart" && cart.length > 0 && (
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Inner Panel Body */}
        {checkoutStep === "success" ? (
          /* Order Confirmation Success Panel */
          <div className="flex-grow p-8 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-emerald-600 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You For Your Order!</h3>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-6">
              Order ID: #LF-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-xs">
              We&apos;ve sent a confirmation email to your registered email address. Your luxurious wardrobe is officially preparing for transport!
            </p>
            <button
              onClick={handleCompleteOrder}
              className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : checkoutStep === "shipping" ? (
          /* Shipping Address Input Form */
          <div className="flex-grow p-6 overflow-y-auto">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Shipping Destination</h4>
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="123 Luxury Way Apt 4B"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10001"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* Order summary box */}
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <span className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Summary</span>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                  <span>Total Amount</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="w-1/3 border border-gray-200 text-gray-600 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-grow bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 rounded"
                >
                  <Lock className="w-4 h-4" />
                  <span>Submit Payment</span>
                </button>
              </div>
            </form>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Shopping Bag */
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mb-4 stroke-1" />
            <h4 className="text-base font-bold text-gray-900 mb-2">Your Shopping Bag is empty</h4>
            <p className="text-gray-500 text-xs max-w-xs leading-relaxed mb-8">
              Looks like you haven&apos;t added any luxury pieces yet. Go check our new collections to express your individuality!
            </p>
            <button
              onClick={onClose}
              className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-lg"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          /* Cart Listing Panel */
          <div className="flex-grow flex flex-col justify-between overflow-hidden">
            
            {/* Free Shipping Alert Bar */}
            <div className="bg-gray-50 px-6 py-3.5 border-b border-gray-100 text-center text-xs">
              {isFreeShipping ? (
                <p className="text-emerald-700 font-medium">
                  🎉 Congratulations! You&apos;ve unlocked <strong className="font-bold">FREE Express Shipping</strong>
                </p>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-gray-600 font-medium">
                    Add <strong className="font-bold">${freeShippingThreshold - subtotal}</strong> more to qualify for <strong className="font-bold">Free Shipping</strong>!
                  </p>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-black h-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* List of elements */}
            <div className="flex-grow overflow-y-auto px-6 py-4 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4 animate-fade-in">
                  
                  {/* Photo representation */}
                  <div className="w-20 h-24 bg-gray-100 flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Metadata and Qty controls */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h5 className="font-bold text-gray-900 text-sm leading-tight max-w-[180px] truncate">
                          {item.product.name}
                        </h5>
                        <span className="font-bold text-sm text-black">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <span className="inline-flex items-center">
                          Color:
                          <span
                            className="w-2.5 h-2.5 rounded-full ml-1 border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          ></span>
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      
                      {/* Qty edit block */}
                      <div className="flex items-center border border-gray-200 rounded bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:text-black focus:outline-none"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-black focus:outline-none"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Trash action */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Cost Breakdown Summary & CTA */}
            <div className="bg-gray-50 px-6 py-6 border-t border-gray-100">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Bag Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Standard Shipping</span>
                  <span>{isFreeShipping ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-200 pt-2.5">
                  <span>Estimated Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Secure terms */}
              <div className="flex items-center space-x-2 text-[10px] text-gray-400 mb-4 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Encrypted transactions. Secure server environment.</span>
              </div>

              {/* CTA */}
              <button
                id="cart-checkout-btn"
                onClick={() => setCheckoutStep("shipping")}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 rounded-lg group transition-all duration-300"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
