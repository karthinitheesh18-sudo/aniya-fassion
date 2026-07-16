import React, { useState } from "react";
import { Instagram, Facebook, Twitter, ArrowUp, ArrowRight, Play } from "lucide-react";

interface FooterProps {
  onScrollToSection: (id: string) => void;
  onSelectCategory: (cat: string) => void;
}

export default function Footer({ onScrollToSection, onSelectCategory }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterLinkClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    onSelectCategory(category);
    onScrollToSection("products-section");
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Simulated: ${email} has been subscribed to updates.`);
      setEmail("");
    }
  };

  return (
    <footer 
      id="main-footer" 
      className="md:fixed md:bottom-0 md:left-0 md:w-full md:z-0 bg-[#0A0A0A] text-[#F5F1E8]/90 pt-20 pb-8 border-t border-neutral-800 md:h-[400px] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Grid columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-left">
          
          {/* Column 1: Brand block */}
          <div className="col-span-1 md:col-span-1">
            <h4 
              className="text-lg font-bold tracking-[0.25em] uppercase mb-4 text-[#D4AF37]" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              AANYA | FASHION
            </h4>
            <p className="text-neutral-500 text-xs leading-relaxed max-w-xs mb-6 font-medium">
              Timeless fashion for every moment. Crafted for comfort, designed for elegance, made for you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B76E79] mb-5">
              SHOP
            </h5>
            <ul className="space-y-3.5 text-xs text-neutral-400 font-medium">
              <li>
                <a href="#products-section" onClick={(e) => handleFooterLinkClick(e, "all")} className="hover:text-[#D4AF37] transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="#products-section" onClick={(e) => handleFooterLinkClick(e, "all")} className="hover:text-[#D4AF37] transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#products-section" onClick={(e) => handleFooterLinkClick(e, "Dresses")} className="hover:text-[#D4AF37] transition-colors">
                  Women
                </a>
              </li>
              <li>
                <a href="#products-section" onClick={(e) => handleFooterLinkClick(e, "Jackets")} className="hover:text-[#D4AF37] transition-colors">
                  Men
                </a>
              </li>
              <li>
                <a href="#products-section" onClick={(e) => handleFooterLinkClick(e, "all")} className="hover:text-[#D4AF37] transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B76E79] mb-5">
              CUSTOMER CARE
            </h5>
            <ul className="space-y-3.5 text-xs text-neutral-400 font-medium">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onScrollToSection("contact-section"); }} className="hover:text-[#D4AF37] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Free worldwide shipping on orders over $99. Processing takes 1-2 business days."); }} className="hover:text-[#D4AF37] transition-colors">
                  Shipping &amp; Delivery
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("We support 30-day refunds and seamless size replacements."); }} className="hover:text-[#D4AF37] transition-colors">
                  Returns &amp; Exchanges
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Find sizing guide parameters in each individual product view."); }} className="hover:text-[#D4AF37] transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Contact customer support at support@aanyafashions.com for FAQs."); }} className="hover:text-[#D4AF37] transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT US */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B76E79] mb-5">
              ABOUT US
            </h5>
            <ul className="space-y-3.5 text-xs text-neutral-400 font-medium">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onScrollToSection("spotlight-section"); }} className="hover:text-[#D4AF37] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("We focus on sustainable fabrics and eco-friendly manufacturing."); }} className="hover:text-[#D4AF37] transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Join the Aanya Atelier family. View careers on LinkedIn."); }} className="hover:text-[#D4AF37] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("For press inquiries, contact press@aanyafashions.com."); }} className="hover:text-[#D4AF37] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Visit our concept stores in Paris, Milan, and New York."); }} className="hover:text-[#D4AF37] transition-colors">
                  Store Locator
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: STAY CONNECTED */}
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B76E79] mb-5">
              STAY CONNECTED
            </h5>
            <p className="text-neutral-500 text-xs leading-relaxed mb-4 font-medium">
              Sign up for updates and get 10% off your first order.
            </p>
            <form onSubmit={handleSubscribeSubmit} className="relative flex items-center w-full max-w-[240px]">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-500 text-white text-xs px-4 py-3 pr-10 focus:outline-none rounded-xl transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-1 p-2 text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright and legal bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500 tracking-wider">
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
              className="bg-neutral-900 hover:bg-[#D4AF37] text-white hover:text-black p-3 rounded-xl transition-all duration-300 border border-neutral-800 flex items-center justify-center cursor-pointer shadow-md"
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
