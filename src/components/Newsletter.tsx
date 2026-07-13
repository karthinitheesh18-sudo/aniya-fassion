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
      setMessage("Success! You have subscribed to LUXEFASHION style updates.");
      setEmail("");
    }, 1000);
  };

  return (
    <section id="newsletter-section" className="bg-[#0a0d14] py-24 border-b border-gray-800 relative overflow-hidden">
      
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-6">
          <Mail className="w-5 h-5 text-white" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Stay in Style
        </h2>
        <p className="text-gray-400 mb-10 text-base sm:text-lg max-w-md mx-auto">
          Subscribe to receive curated style edits, early access to new releases, and exclusive member-only invitations.
        </p>

        {/* Form elements */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 border border-gray-800 p-1.5 bg-gray-900/40 rounded-lg max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            disabled={status === "loading" || status === "success"}
            className="flex-grow bg-transparent border-none text-white focus:outline-none px-4 py-3.5 placeholder:text-gray-600 text-sm focus:ring-0"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-400 px-8 py-3.5 font-bold uppercase text-xs tracking-widest transition-colors rounded"
          >
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed" : "Subscribe"}
          </button>
        </form>

        {/* Interactive feedback banners */}
        {status === "success" && (
          <div className="mt-6 inline-flex items-center space-x-2 bg-emerald-950/40 border border-emerald-800 text-emerald-300 px-5 py-3 rounded-lg text-sm animate-fade-in max-w-md">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="font-medium text-left">{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 inline-flex items-center space-x-2 bg-red-950/40 border border-red-800 text-red-300 px-5 py-3 rounded-lg text-sm animate-fade-in max-w-md">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="font-medium text-left">{message}</span>
          </div>
        )}

      </div>
    </section>
  );
}
