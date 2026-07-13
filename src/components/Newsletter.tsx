import React, { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";

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
      setMessage("You have successfully joined the Aanya Fashions Private Club.");
      setEmail("");
    }, 1000);
  };

  return (
    <section id="newsletter-section" className="bg-[#0A0A0A] py-28 border-b border-[#D4AF37]/10 relative overflow-hidden flex items-center justify-center">
      
      {/* Decorative luxury corners */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#D4AF37]/35 pointer-events-none" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-[#D4AF37]/35 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-[#D4AF37]/35 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-[#D4AF37]/35 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        
        {/* Mail Icon framed in Gold */}
        <div className="inline-flex items-center justify-center w-14 h-14 border border-[#D4AF37]/30 rounded-none mb-6">
          <Mail className="w-5 h-5 text-[#D4AF37]" />
        </div>

        {status !== "success" ? (
          <div className="animate-fade-in">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
              Private Invitation
            </span>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Luxe Club Curation
            </h2>
            
            <p className="text-gray-400 mb-10 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed tracking-wide">
              Subscribe to receive curated style edits, early access to new releases, and exclusive member-only invitations.
            </p>

            {/* Sharp Minimalist Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                disabled={status === "loading"}
                className="flex-grow bg-[#2C2C2C]/20 border border-gray-800 focus:border-[#D4AF37] text-white focus:outline-none px-5 py-4 placeholder:text-gray-600 text-xs uppercase tracking-widest rounded-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-black hover:bg-[#D4AF37] hover:text-black disabled:bg-gray-800 disabled:text-gray-500 px-8 py-4 font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-500 rounded-none cursor-pointer border border-white hover:border-[#D4AF37]"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        ) : (
          /* Smooth Success Animation State */
          <div className="animate-slide-up flex flex-col items-center py-6">
            <div className="w-16 h-16 border-2 border-[#D4AF37] rounded-none flex items-center justify-center mb-6 animate-pulse">
              <Check className="w-8 h-8 text-[#D4AF37]" />
            </div>
            
            <h3 
              className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome to the Club
            </h3>
            
            <p className="text-gray-400 text-xs sm:text-sm max-w-md leading-relaxed font-light tracking-wider">
              {message}
            </p>
          </div>
        )}

        {/* Error Notification banner */}
        {status === "error" && (
          <div className="mt-6 inline-flex items-center space-x-2 bg-red-950/20 border border-red-900/30 text-red-400 px-5 py-3 rounded-none text-xs uppercase tracking-widest animate-fade-in max-w-md">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="font-semibold">{message}</span>
          </div>
        )}

      </div>
    </section>
  );
}
