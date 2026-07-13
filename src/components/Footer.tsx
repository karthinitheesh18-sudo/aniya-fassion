import React from "react";
import { Instagram, Facebook, Twitter, ArrowUp, ShieldCheck } from "lucide-react";

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
      className="md:fixed md:bottom-0 md:left-0 md:w-full md:z-0 bg-[#0A0A0A] text-[#F5F1E8]/90 pt-16 pb-8 border-t border-[#D4AF37]/20 md:h-[380px] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Grid columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand block */}
          <div className="col-span-1">
            <h4 
              className="text-xl font-bold tracking-[0.25em] uppercase mb-4 text-[#D4AF37]" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Aanya Fashions
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs mb-6 font-light">
              Your destination for premium fashion and timeless style. Engineered to mold to your unique individuality.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B76E79] mb-6">
              Shop Categories
            </h5>
            <ul className="space-y-3 text-xs text-gray-400 font-light">
              <li>
                <a
                  href="#jackets"
                  onClick={(e) => handleFooterLinkClick(e, "Jackets")}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Jackets &amp; Outerwear
                </a>
              </li>
              <li>
                <a
                  href="#dresses"
                  onClick={(e) => handleFooterLinkClick(e, "Dresses")}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Dresses &amp; Gowns
                </a>
              </li>
              <li>
                <a
                  href="#shoes"
                  onClick={(e) => handleFooterLinkClick(e, "Shoes")}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Shoes &amp; Footwear
                </a>
              </li>
              <li>
                <a
                  href="#accessories"
                  onClick={(e) => handleFooterLinkClick(e, "Accessories")}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B76E79] mb-6">
              Customer Help
            </h5>
            <ul className="space-y-3 text-xs text-gray-400 font-light">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Customer Service line simulated at 1-800-LUX-FASH."); }} className="hover:text-[#D4AF37] transition-colors">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Orders are processed securely and ship within 1-2 business days."); }} className="hover:text-[#D4AF37] transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("We offer free returns within 30 days of purchase."); }} className="hover:text-[#D4AF37] transition-colors">
                  Returns &amp; Exchanges
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Check individual product description for specific sizing criteria."); }} className="hover:text-[#D4AF37] transition-colors">
                  Size Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Trust assurances block */}
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B76E79] mb-6">
              Our Promise
            </h5>
            <div className="space-y-4 text-xs text-gray-400 font-light">
              <p className="leading-relaxed">
                We believe in ethical fashion sourcing, sustainable material production, and exquisite, premium finishes that outlast seasonal trends.
              </p>
              <div className="flex items-center space-x-2 text-[10px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Authorized Luxe Retailer</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal bar */}
        <div className="pt-8 border-t border-[#2C2C2C] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 tracking-wider">
          <div>
            <p>&copy; 2026 Aanya Fashions. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">Contact Us</a>
          </div>

          <div>
            <button
              onClick={handleBackToTop}
              className="bg-[#2C2C2C]/50 hover:bg-[#D4AF37] text-white hover:text-black p-3.5 rounded-none transition-all duration-300 border border-gray-800 flex items-center justify-center cursor-pointer"
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
