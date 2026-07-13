import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <section id="contact-section" className="py-28 bg-white min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
            Atelier Locations &amp; Support
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-wider text-[#0A0A0A] uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 italic text-sm">Reach out to our customer care and designer suites</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Column 1: Contact Form */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-[#D4AF37]/15 p-6 sm:p-10 flex flex-col justify-between">
            {isSent ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-12 h-12 border-2 border-[#D4AF37] flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-3">Message Dispatched</h3>
                <p className="text-xs text-gray-500 max-w-xs leading-relaxed font-light">
                  Thank you for contacting Aanya Fashions. Our customer concierge will review your message and reply within 12–24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <h3 
                  className="text-lg font-bold uppercase tracking-widest text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Send Atelier Message
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-[#D4AF37] rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-[#D4AF37] rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="Subject (Optional)"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-[#D4AF37] rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-1.5">Message Content</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your request..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border border-gray-200 text-xs px-4 py-3 focus:outline-none focus:border-[#D4AF37] rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:text-black py-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer border border-[#0A0A0A] hover:border-[#D4AF37] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Column 2: Details & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-bold">HQ Coordinates</span>
              <h3 
                className="text-2xl font-bold uppercase text-black"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aanya Atelier
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Visit our experience suites for custom measurements, fabric inspection, and exclusive private showcases of seasonal runway collections.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-[#D4AF37]/30 text-[#D4AF37] rounded-none">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest font-bold text-gray-400">Experience Suite</span>
                  <span className="text-xs font-semibold text-[#0A0A0A] block mt-1">12 Luxury Way, Colaba</span>
                  <span className="text-xs text-gray-500 block">Mumbai, MH 400005, India</span>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-[#D4AF37]/30 text-[#D4AF37] rounded-none">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest font-bold text-gray-400">Telephone Line</span>
                  <span className="text-xs font-semibold text-[#0A0A0A] block mt-1">1-800-AANYA-FIT (Toll Free)</span>
                  <span className="text-xs text-gray-500 block">+91 22 555 LUX-DRAPE</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 border border-[#D4AF37]/30 text-[#D4AF37] rounded-none">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest font-bold text-gray-400">Concierge Email</span>
                  <span className="text-xs font-semibold text-[#0A0A0A] block mt-1">concierge@aanyafashions.com</span>
                  <span className="text-xs text-gray-500 block">customercare@aanya.com</span>
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Atelier Hours: Mon–Sat • 10:00 AM – 7:00 PM IST
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
