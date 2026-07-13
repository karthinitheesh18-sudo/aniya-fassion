import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useReveal } from "./useReveal";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Meera Deshmukh",
    location: "Mumbai",
    rating: 5,
    text: "The drape of Aanya Fashions sarees is absolutely royal. I wore the Silk Heritage Saree for my daughter's wedding and received endless compliments. The quality of the weave is unmatched.",
    date: "June 2026"
  },
  {
    id: 2,
    name: "Ananya Iyer",
    location: "New Delhi",
    rating: 5,
    text: "Minimalist yet deeply rooted in legacy. The Kurtis are perfect for my gallery openings. They hold their shape and have a stunning visual posture. A true luxury brand.",
    date: "July 2026"
  },
  {
    id: 3,
    name: "Rohan Verma",
    location: "Bangalore",
    rating: 5,
    text: "I bought the luxury linen shirt and a custom silk jacket. The quality is outstanding, and the customer experience feels like a luxury atelier. Exceptional service.",
    date: "May 2026"
  }
];

export default function Testimonials() {
  const { ref, isVisible } = useReveal(0.05);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section
      ref={ref}
      id="testimonials-section"
      className="py-24 bg-[#F5F1E8] border-b border-[#D4AF37]/10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Quote Icon */}
        <div 
          className="flex justify-center mb-6 text-[#D4AF37]/35 transform transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "scale(1)" : "scale(0.8)" }}
        >
          <Quote className="w-12 h-12 rotate-180" />
        </div>

        {/* Section Heading */}
        <div className="mb-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
            Client Voices
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Client Reviews
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
        </div>

        {/* Testimonials Slider Area */}
        <div className="relative min-h-[220px] mb-8">
          {testimonialsData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.id}
                className={`absolute inset-x-0 top-0 transition-all duration-700 ease-luxury flex flex-col items-center ${
                  isActive 
                    ? "opacity-100 translate-x-0 pointer-events-auto" 
                    : "opacity-0 translate-x-12 pointer-events-none"
                }`}
              >
                {/* Rating Stars */}
                <div className="flex text-[#D4AF37] mb-6">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                {/* Review Text */}
                <p 
                  className="text-lg sm:text-xl md:text-2xl text-[#2C2C2C] font-light leading-relaxed mb-6 italic max-w-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;{item.text}&rdquo;
                </p>

                {/* Reviewer Meta */}
                <div className="text-center">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0A0A0A]">
                    {item.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-[#B76E79] font-semibold block mt-1">
                    {item.location} • {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 border border-[#2C2C2C]/30 rounded-none text-[#2C2C2C] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Indicators */}
          <div className="flex space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-[#D4AF37] w-4" : "bg-[#2C2C2C]/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 border border-[#2C2C2C]/30 rounded-none text-[#2C2C2C] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
            aria-label="Next Review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
