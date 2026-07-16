import React, { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";
import { newsletterData } from "../data/homepage";
import RevealSection from "./ui/RevealSection";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please fill out your email address.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    
    // Simulate API registration delay
    setTimeout(() => {
      setStatus("success");
      setMessage(newsletterData.successMessage);
      setEmail("");
    }, 1000);
  };

  return (
    <RevealSection
      id="newsletter-section"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rounded Beige Container Banner */}
        <div className="relative bg-[#FAF6F0] rounded-3xl overflow-hidden shadow-sm border border-neutral-100/50 flex flex-col md:flex-row items-stretch min-h-[340px]">
          
          {/* Left Side: Elegant Cropped Portrait */}
          <div className="w-full md:w-[42%] relative min-h-[220px] md:min-h-full overflow-hidden">
            <img
              src={newsletterData.image}
              alt="Join Style List"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-1000"
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FAF6F0]/20 pointer-events-none" />
          </div>

          {/* Right Side: Signup Form */}
          <div className="w-full md:w-[58%] px-8 py-10 sm:p-12 lg:p-16 flex flex-col justify-center text-left">
            {status !== "success" ? (
              <div className="animate-fade-in w-full">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#B76E79] font-bold mb-2.5 block">
                  {newsletterData.subtitle}
                </span>
                
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {newsletterData.title}
                </h2>
                
                <p className="text-neutral-500 mb-8 text-xs sm:text-sm font-medium leading-relaxed max-w-md">
                  {newsletterData.description}
                </p>

                {/* Signup form field */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "idle") setStatus("idle");
                    }}
                    disabled={status === "loading"}
                    className="flex-grow bg-white border border-neutral-200/80 focus:border-black text-black focus:outline-none px-5 py-4 placeholder:text-neutral-400 text-xs tracking-wider rounded-xl transition-all duration-300 shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-800 disabled:text-neutral-500 px-8 py-4 font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300 rounded-xl cursor-pointer shadow-sm border border-black hover:border-neutral-800 flex items-center justify-center min-w-[130px]"
                  >
                    {status === "loading" ? "..." : "Subscribe"}
                  </button>
                </form>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="mt-4 inline-flex items-center space-x-2 bg-red-50 border border-red-100 text-red-600 px-4 py-2.5 rounded-xl text-[10px] uppercase tracking-widest animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="font-bold">{message}</span>
                  </div>
                )}
              </div>
            ) : (
              /* Success Anim */
              <div className="animate-slide-up flex flex-col items-start py-4">
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-5 h-5 text-white" />
                </div>
                
                <h3 
                  className="text-2xl font-bold text-black uppercase tracking-wider mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Welcome to the Club
                </h3>
                
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
                  {message}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </RevealSection>
  );
}

