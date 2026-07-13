import React from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative h-[85vh] w-full overflow-hidden bg-gray-900"
    >
      {/* Background Image with optimized loading and modern CSS framing */}
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRgdK1SVb7xOpeb6rLJ4knhgb_0pUknNHbztPk7LzWR_kfNLjao47qoe0rDknQxJZKUfkJqBvpb0JL0NzXOGSZ6jo1jhOxi7lVMbjMKR-hFNHrJI9UH5Es2bB9SVwtoivzYgehh3TKUqEDLnfdVh1FhQrFun_q4GIHwhRtojZWUM2ShnYznZO-4b7nmnnO_lBHXoreEcUdEkWjZFZtplWtQ8GEdepm9o6D4V3kua_-592ZVvSQo4s39MGNe6mFjPRxzkE"
        alt="LuxeFashion Premium Biker Style Model"
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
        referrerPolicy="no-referrer"
      />

      {/* Hero overlay layout gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl w-full text-left ml-0 sm:ml-4 lg:ml-12 text-white">
          
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="text-[10px] tracking-widest uppercase font-semibold">New Summer Drops Active</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
            Define Your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
              Style
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-200/90 mb-10 font-light max-w-xl leading-relaxed">
            Discover premium fashion that speaks to your individuality. Engineered for lasting form, unmatched comfort, and pristine visual posture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              id="hero-shop-now-btn"
              onClick={() => onScrollToSection("products-section")}
              className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black border border-white transition-all duration-300 flex items-center justify-center group"
            >
              Shop Now 
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-collections-btn"
              onClick={() => onScrollToSection("collections-section")}
              className="border border-white/80 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
