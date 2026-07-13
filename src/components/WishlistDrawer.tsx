import React from "react";
import { X, Heart, Trash2, Eye, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onOpenQuickView,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div id="wishlist-drawer-overlay" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      
      {/* Click outside close Constraint */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide Out Panel */}
      <div id="wishlist-drawer-container" className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-left z-10">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-bold text-gray-900 text-lg">My Favorites</span>
            {wishlist.length > 0 && (
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>
          <button
            id="close-wishlist-drawer-btn"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Listing */}
        {wishlist.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
            <Heart className="w-12 h-12 text-gray-300 mb-4 stroke-1" />
            <h4 className="text-base font-bold text-gray-900 mb-2">Your wishlist is empty</h4>
            <p className="text-gray-500 text-xs max-w-xs leading-relaxed mb-8">
              Keep track of premium apparel that catches your eye. Save products so you can easily find them later!
            </p>
            <button
              onClick={onClose}
              className="bg-black text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-lg"
            >
              Start Discovering
            </button>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto px-6 py-4 divide-y divide-gray-100">
            {wishlist.map((product) => (
              <div key={product.id} className="py-4 flex space-x-4 animate-fade-in">
                
                {/* Photo */}
                <div className="w-20 h-24 bg-gray-100 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details & Action */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-gray-900 text-sm leading-tight max-w-[200px] truncate">
                        {product.name}
                      </h5>
                      <span className="font-bold text-sm text-black">${product.price}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">
                      {product.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    
                    {/* View Options Trigger */}
                    <button
                      onClick={() => {
                        onClose();
                        onOpenQuickView(product);
                      }}
                      className="text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span>Configure Options</span>
                    </button>

                    {/* Delete item */}
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                      aria-label="Remove item"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Footer info message */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400">
            Saved favorites are preserved locally on this browser.
          </p>
        </div>

      </div>
    </div>
  );
}
