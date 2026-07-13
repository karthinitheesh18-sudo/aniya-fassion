import React, { useState, useEffect } from "react";

interface SaleTimerProps {
  onScrollToSection: (id: string) => void;
  onSelectCategory: (cat: string) => void;
}

export default function SaleTimer({ onScrollToSection, onSelectCategory }: SaleTimerProps) {
  
  // Set the timer countdown: 12 Hours, 35 Minutes, 20 Seconds from whenever loaded,
  // or simple persistent counting for a dynamic feel
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 35,
    seconds: 20,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Restart timer to prevent blank states
          return { hours: 12, minutes: 35, seconds: 20 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShopSale = () => {
    onSelectCategory("all"); // show all, user can look for sale items
    onScrollToSection("products-section");
  };

  // Zero-padding helper
  const padZero = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <section id="sale-section" className="relative bg-black text-white py-32 overflow-hidden">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-red-950/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Badge */}
        <div className="mb-6 inline-block bg-red-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm animate-bounce">
          Limited Time Offer
        </div>
        
        {/* Headings */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 uppercase">
          Summer Sale
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light max-w-lg mx-auto mb-12">
          Up to <strong className="text-white font-bold">50% OFF</strong> on selected premium luxury apparel
        </p>

        {/* Real Ticking Timer Grid */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 mb-16">
          
          <div className="bg-gray-900 border border-gray-800 w-20 sm:w-24 h-24 sm:h-28 flex flex-col items-center justify-center rounded-xl shadow-lg">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {padZero(timeLeft.hours)}
            </span>
            <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider mt-1">
              Hours
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-gray-700 font-mono">:</div>

          <div className="bg-gray-900 border border-gray-800 w-20 sm:w-24 h-24 sm:h-28 flex flex-col items-center justify-center rounded-xl shadow-lg">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {padZero(timeLeft.minutes)}
            </span>
            <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider mt-1">
              Minutes
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-gray-700 font-mono">:</div>

          <div className="bg-gray-900 border border-gray-800 w-20 sm:w-24 h-24 sm:h-28 flex flex-col items-center justify-center rounded-xl shadow-lg">
            <span className="text-3xl sm:text-4xl font-extrabold text-red-500 font-mono">
              {padZero(timeLeft.seconds)}
            </span>
            <span className="text-[10px] uppercase text-gray-500 font-semibold tracking-wider mt-1">
              Seconds
            </span>
          </div>

        </div>

        {/* CTA */}
        <button
          onClick={handleShopSale}
          className="bg-white text-black hover:bg-red-600 hover:text-white px-12 py-5 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md rounded"
        >
          Shop Sale Now
        </button>

      </div>
    </section>
  );
}
