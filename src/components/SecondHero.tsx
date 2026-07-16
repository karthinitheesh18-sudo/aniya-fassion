import React, { useEffect, useState } from "react";
import { Play, ArrowRight, ShieldCheck, RotateCcw, Truck } from "lucide-react";
import { secondHeroData } from "../data/homepage";
import RevealSection from "./ui/RevealSection";
import Button from "./ui/Button";

interface SecondHeroProps {
  onScrollToSection: (id: string) => void;
  onSelectCategory: (cat: string) => void;
}

export default function SecondHero({ onScrollToSection, onSelectCategory }: SecondHeroProps) {
  const [offsetY, setOffsetY] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll offset tracking for parallax
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % secondHeroData.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleShopNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelectCategory("all");
    onScrollToSection("products-section");
  };

  const handleWatchLookbookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onScrollToSection("lookbook-section");
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + secondHeroData.images.length) % secondHeroData.images.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % secondHeroData.images.length);
  };

  const iconMap = {
    "Free Shipping": <Truck className="w-4 h-4 text-neutral-800" />,
    "Easy Returns": <RotateCcw className="w-4 h-4 text-neutral-800" />,
    "Secure Payment": <ShieldCheck className="w-4 h-4 text-neutral-800" />,
  };

  return (
    <RevealSection
      id="second-hero-section"
      className="py-20 md:py-28 bg-[#FAF6F0] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-bold mb-4 block">
              {secondHeroData.label}
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {secondHeroData.title}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base tracking-wide font-light leading-relaxed max-w-md md:max-w-lg mb-10">
              {secondHeroData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center mb-16">
              <Button
                variant="primary"
                onClick={handleShopNowClick}
                href="#products-section"
                icon={<ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />}
              >
                {secondHeroData.ctaPrimary.text}
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleWatchLookbookClick}
                href="#lookbook-section"
                icon={
                  <span className="flex items-center justify-center w-9 h-9 border border-black/25 rounded-full transition-transform duration-300 group-hover:scale-105 group-hover:bg-black/5">
                    <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                  </span>
                }
                iconPosition="left"
              >
                {secondHeroData.ctaSecondary.text}
              </Button>
            </div>

            {/* Three Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/5 text-left">
              {secondHeroData.highlights.map((hl) => (
                <div key={hl.title} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {iconMap[hl.title as keyof typeof iconMap]}
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black">
                      {hl.title}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium tracking-wide">
                    {hl.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Lifestyle Slideshow */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Visual background element */}
            <div className="absolute -inset-4 bg-neutral-200/35 rounded-3xl -z-10 blur-xl scale-95" />
            
            {/* Image Frame with soft rounded corners & overflow styling */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full max-w-[460px] h-[480px] sm:h-[560px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white bg-[#FAF8F5] relative transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${offsetY * -0.03}px)`,
              }}
            >
              {/* Overlapping sliding images */}
              {secondHeroData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Luxury Campaign Slide ${index + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeSlide === index 
                      ? "opacity-100 scale-100 z-10" 
                      : "opacity-0 scale-103 z-0 pointer-events-none"
                  }`}
                />
              ))}

              {/* Bottom Right Slideshow Indicator Controls */}
              <div 
                className="absolute bottom-6 right-6 z-20 flex items-center gap-3.5 bg-black/45 backdrop-blur-md px-4 py-2.5 rounded-full text-white/90 border border-white/10 shadow-lg transition-opacity duration-300"
              >
                {/* Pagination Dots */}
                <div className="flex gap-2">
                  {secondHeroData.images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === index ? "bg-white scale-125" : "bg-white/35 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Vertical Divider */}
                <div className="w-px h-3 bg-white/20" />

                {/* Left/Right manual arrows */}
                <div className="flex items-center gap-2 text-xs font-bold font-sans">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="hover:text-white/60 transition-colors select-none cursor-pointer flex items-center justify-center w-4 h-4"
                    aria-label="Previous Slide"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="hover:text-white/60 transition-colors select-none cursor-pointer flex items-center justify-center w-4 h-4"
                    aria-label="Next Slide"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
            
            {/* Minimal Right scroll side slider indicator */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6">
              <span className="text-[9px] font-bold tracking-widest text-neutral-400 rotate-90 select-none">01</span>
              <div className="w-px h-16 bg-neutral-200 relative">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-black" />
              </div>
              <span className="text-[9px] font-bold tracking-widest text-neutral-400 rotate-90 select-none">03</span>
            </div>
          </div>

        </div>
      </div>
    </RevealSection>
  );
}
