import React from "react";
import { Instagram, Facebook, Twitter, ArrowUp, Mail, ShieldCheck } from "lucide-react";

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onSelectCategory: (cat: string) => void;
}

export default function Footer({ onScrollToSection, onSelectCategory }: FooterProps) {
  
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterLinkClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    onSelectCategory(category);
    onScrollToSection("products-section");
  };

  return (
    <footer 
      id="main-footer" 
      className="md:fixed md:bottom-0 md:left-0 md:w-full md:z-0 bg-black text-white pt-16 pb-8 border-t border-gray-950 md:h-[380px] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Grid columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand block */}
          <div className="col-span-1">
            <h4 className="text-xl font-medium tracking-[0.2em] uppercase mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aanya Fashions
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Your destination for premium fashion and timeless style. Engineered to mold to your unique individuality.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              Shop Categories
            </h5>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <a
                  href="#jackets"
                  onClick={(e) => handleFooterLinkClick(e, "Jackets")}
                  className="hover:text-white transition-colors"
                >
                  Jackets &amp; Outerwear
                </a>
              </li>
              <li>
                <a
                  href="#dresses"
                  onClick={(e) => handleFooterLinkClick(e, "Dresses")}
                  className="hover:text-white transition-colors"
                >
                  Dresses &amp; Gowns
                </a>
              </li>
              <li>
                <a
                  href="#shoes"
                  onClick={(e) => handleFooterLinkClick(e, "Shoes")}
                  className="hover:text-white transition-colors"
                >
                  Shoes &amp; Footwear
                </a>
              </li>
              <li>
                <a
                  href="#accessories"
                  onClick={(e) => handleFooterLinkClick(e, "Accessories")}
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              Customer Help
            </h5>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Customer Service line simulated at 1-800-LUX-FASH."); }} className="hover:text-white transition-colors">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Orders are processed securely and ship within 1-2 business days."); }} className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("We offer free returns within 30 days of purchase."); }} className="hover:text-white transition-colors">
                  Returns &amp; Exchanges
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Check individual product description for specific sizing criteria."); }} className="hover:text-white transition-colors">
                  Size Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Trust assurances block */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
              Our Promise
            </h5>
            <div className="space-y-4 text-sm text-gray-300">
              <p className="leading-relaxed">
                We believe in ethical fashion sourcing, sustainable material production, and exquisite, premium finishes that outlast seasonal trends.
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Authorized Luxe Retailer</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            <p>&copy; 2026 Aanya Fashions. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>

          <div>
            <button
              onClick={handleBackToTop}
              className="bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-200 border border-gray-800 flex items-center justify-center"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
