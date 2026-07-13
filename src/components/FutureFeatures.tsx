import React, { useState } from "react";
import { Sliders, HelpCircle, TrendingUp, Sparkles, Ruler, Camera, Check, Plus, RefreshCw } from "lucide-react";
import { products } from "../data";
import { useReveal } from "./useReveal";

type FeatureTab = "outfit" | "quiz" | "trend" | "tryon" | "size";

export default function FutureFeatures() {
  const { ref, isVisible } = useReveal(0.05);
  const [activeTab, setActiveTab] = useState<FeatureTab>("outfit");

  // ─── Outfit Builder State ───────────────────────────────────────────────
  const [canvasItems, setCanvasItems] = useState<string[]>([]);
  const handleAddToCanvas = (img: string) => {
    if (canvasItems.includes(img)) {
      setCanvasItems(canvasItems.filter((i) => i !== img));
    } else {
      if (canvasItems.length < 3) {
        setCanvasItems([...canvasItems, img]);
      } else {
        alert("Maximum 3 canvas pairings allowed for outfit layout.");
      }
    }
  };

  // ─── Style Quiz State ──────────────────────────────────────────────────
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const handleQuizAnswer = (ans: string) => {
    setQuizAnswers([...quizAnswers, ans]);
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      setIsQuizLoading(true);
      setTimeout(() => {
        setIsQuizLoading(false);
        setQuizStep(4); // result phase
      }, 1500);
    }
  };
  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers([]);
  };

  // ─── Virtual Try-On State ──────────────────────────────────────────────
  const [selectedTryOnModel, setSelectedTryOnModel] = useState<string | null>(null);
  const [selectedTryOnGarment, setSelectedTryOnGarment] = useState<string | null>(null);
  const [tryOnStatus, setTryOnStatus] = useState<"idle" | "rendering" | "completed">("idle");

  const tryOnModels = [
    { id: "m1", name: "Elena R.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9rSJ6NWXqJeOuddQm-MrTHumMcv2BWgzra678XBd5CX4Jn_bE2SahdRbySv8kUTWLfIj3--w1G-Go5clF0yiDfo8E43gIGSEyXgrsaJTdELGg-RLC5DlAdNXmNleyBgu5b7H-rr752t3FzEF9pHV4zqm7g32VhGv6V21tnDLyU114rE0xamqSTR-0Iy13SRKX4PnzOt_o84S1gKbYEBcWB0oxJKgI-DsZVbou8kv48GSAalNEvh-20Q" },
    { id: "m2", name: "Kabir S.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBErcqmTbzx8latwT4vwwQvQ8RrDPUnUlJ8BYLQPCVe7K7q00YR8MjUpsvfD0N6XWI8TtHdxbwL-oebmstj0_Y2tzpmTVcY1diBaIsTYCyZ1N3LntHoZfW43mhj1PVCtIca1ReF4nL8V9Ato_GDYfeo0rfrBzgKah9GzZXanK-uWyShtjPAuddRE_2LYzfovmfZJLooH_FumXNPXxc2DmrLgHc9cq0JwqZwbPnlRdn7yiKEKdYOjtHUag" },
  ];

  const handleTryOnSubmit = () => {
    if (!selectedTryOnModel || !selectedTryOnGarment) return;
    setTryOnStatus("rendering");
    setTimeout(() => {
      setTryOnStatus("completed");
    }, 2000);
  };

  // ─── Size Guide State ──────────────────────────────────────────────────
  const [bust, setBust] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);
  const handleCalculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    const bustNum = Number(bust);
    const waistNum = Number(waist);
    if (!bustNum || !waistNum) return;

    if (bustNum <= 34 && waistNum <= 28) setCalculatedSize("Small (S)");
    else if (bustNum <= 38 && waistNum <= 32) setCalculatedSize("Medium (M)");
    else if (bustNum <= 42 && waistNum <= 36) setCalculatedSize("Large (L)");
    else setCalculatedSize("Extra Large (XL)");
  };

  return (
    <section 
      ref={ref} 
      id="design-lab-section" 
      className="py-24 bg-[#0A0A0A] text-white border-b border-[#D4AF37]/15 relative overflow-hidden"
    >
      {/* Decorative Shimmer Circle background overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#D4AF37]/5 rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block animate-pulse">
            Innovation Atelier
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-white uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Aanya Design Lab
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-400 italic text-sm">Preview upcoming tools and design your bespoke look dynamically</p>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16 border-b border-gray-900 pb-6">
          {[
            { id: "outfit", label: "Outfit Builder", icon: Sliders },
            { id: "tryon", label: "Virtual Try-On", icon: Camera },
            { id: "quiz", label: "Style Quiz", icon: HelpCircle },
            { id: "trend", label: "Trend Dashboard", icon: TrendingUp },
            { id: "size", label: "Size Guide Calculator", icon: Ruler },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FeatureTab)}
                className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 rounded-none border cursor-pointer ${
                  isActive
                    ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg scale-105"
                    : "bg-transparent text-gray-400 border-gray-800 hover:text-white hover:border-[#D4AF37]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── TAB CONTENT DISPLAY ─────────────────────────────────────────── */}
        <div 
          className="bg-[#2C2C2C]/20 border border-[#D4AF37]/15 p-6 sm:p-10 min-h-[400px] flex flex-col justify-between transition-all duration-700 ease-luxury"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)"
          }}
        >
          
          {/* TAB 1: Outfit Builder */}
          {activeTab === "outfit" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">Mix &amp; Match</span>
                <h3 className="text-2xl font-bold uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>Interactive Silhouette builder</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Tap clothing items below to place them in your design layout. Pair jackets, dresses, and luxury shoes to lock combinations.
                </p>
                
                {/* Closet Grid selector */}
                <div className="grid grid-cols-4 gap-3 pt-4">
                  {products.map((p) => {
                    const isSelected = canvasItems.includes(p.image);
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleAddToCanvas(p.image)}
                        className={`aspect-square border overflow-hidden transition-all duration-300 cursor-pointer relative ${
                          isSelected ? "border-[#D4AF37] scale-105" : "border-gray-800 hover:border-white"
                        }`}
                      >
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#D4AF37]/10 flex items-center justify-center">
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Outfit Canvas Board */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-black/40 border border-gray-800 h-[320px] relative">
                {canvasItems.length === 0 ? (
                  <div className="text-center text-gray-500 text-xs">
                    <Plus className="w-8 h-8 mx-auto mb-2 text-[#D4AF37] animate-pulse" />
                    <span>Closet Canvas Empty • Select Items to Pair</span>
                  </div>
                ) : (
                  <div className="flex gap-4 items-center justify-center animate-scale-up">
                    {canvasItems.map((img, idx) => (
                      <div key={idx} className="w-24 h-36 bg-[#F5F1E8] border border-[#D4AF37]/30 overflow-hidden shadow-2xl relative">
                        <img src={img} alt="paired" className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleAddToCanvas(img)}
                          className="absolute top-1 right-1 bg-black/80 hover:bg-red-700 text-white p-1 text-[8px] cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {canvasItems.length > 0 && (
                  <button 
                    onClick={() => { alert("Combination locked. Saved to collection planner!"); setCanvasItems([]); }}
                    className="absolute bottom-4 bg-[#D4AF37] text-black px-6 py-2.5 text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                  >
                    Lock Selection Bundle
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Virtual Try-On */}
          {activeTab === "tryon" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">AR Dressing Room</span>
                <h3 className="text-2xl font-bold uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>AI Virtual Silhouette Draping</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Select a runway canvas model and pairing garment from our listings to compute rendering.
                </p>

                {/* Select Model */}
                <div className="space-y-2">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-gray-400">1. Select Fitting Model</label>
                  <div className="flex gap-4">
                    {tryOnModels.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => { setSelectedTryOnModel(m.image); setTryOnStatus("idle"); }}
                        className={`flex items-center gap-3 px-3 py-2 border text-xs cursor-pointer ${
                          selectedTryOnModel === m.image ? "border-[#D4AF37] text-white" : "border-gray-800 text-gray-400 hover:border-gray-600"
                        }`}
                      >
                        <img src={m.image} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Dress */}
                <div className="space-y-2 pt-2">
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-gray-400">2. Select Apparel Design</label>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedTryOnGarment(p.image); setTryOnStatus("idle"); }}
                        className={`w-12 h-16 border flex-shrink-0 cursor-pointer overflow-hidden ${
                          selectedTryOnGarment === p.image ? "border-[#D4AF37]" : "border-gray-800"
                        }`}
                      >
                        <img src={p.image} alt="apparel" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {selectedTryOnModel && selectedTryOnGarment && tryOnStatus === "idle" && (
                  <button
                    onClick={handleTryOnSubmit}
                    className="w-full bg-[#D4AF37] text-black py-3.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                  >
                    Overlay Fitting Model
                  </button>
                )}
              </div>

              {/* Try On Viewer Screen */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-black/40 border border-gray-800 h-[340px] relative overflow-hidden">
                {tryOnStatus === "idle" ? (
                  <div className="text-center text-gray-500 text-xs">
                    {selectedTryOnModel ? (
                      <div className="flex flex-col items-center">
                        <img src={selectedTryOnModel} alt="model active" className="w-24 h-36 object-cover border border-gray-800 mb-2 animate-fade-in" />
                        <span>Now select a garment piece to drape</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-8 h-8 mx-auto mb-2 text-[#D4AF37] animate-pulse" />
                        <span>No Model Selected</span>
                      </div>
                    )}
                  </div>
                ) : tryOnStatus === "rendering" ? (
                  <div className="text-center text-gray-400 text-xs flex flex-col items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin" />
                    <span>Mapping fabric texture to model measurements...</span>
                  </div>
                ) : (
                  /* Completed State showing blended overlay details */
                  <div className="relative w-44 h-64 border border-[#D4AF37] overflow-hidden shadow-2xl animate-fade-in">
                    <img src={selectedTryOnModel!} alt="model" className="absolute inset-0 w-full h-full object-cover" />
                    <img 
                      src={selectedTryOnGarment!} 
                      alt="garment overlay" 
                      className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-multiply scale-90 translate-y-3" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 fill-[#D4AF37]" /> AI Fit Completed
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Style Quiz */}
          {activeTab === "quiz" && (
            <div className="max-w-xl mx-auto w-full text-center space-y-6 animate-fade-in">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">Silhouette Finder</span>
              
              {quizStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold uppercase">Question 1: What is your preferred color palette?</h3>
                  <div className="flex flex-col space-y-3">
                    {["Classic Obsidian & Warm Gold", "Delicate Sage & Sand Cream", "Aesthetic Crimson & Rose Gold"].map((ans) => (
                      <button
                        key={ans}
                        onClick={() => handleQuizAnswer(ans)}
                        className="py-3.5 border border-gray-800 hover:border-[#D4AF37] text-xs hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold uppercase">Question 2: Select your posture silhouette drape.</h3>
                  <div className="flex flex-col space-y-3">
                    {["Classic Indian Traditional folds", "Modern European Tailored posture", "Balanced Fusion posture"].map((ans) => (
                      <button
                        key={ans}
                        onClick={() => handleQuizAnswer(ans)}
                        className="py-3.5 border border-gray-800 hover:border-[#D4AF37] text-xs hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quizStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold uppercase">Question 3: Specify your measurements standard.</h3>
                  <div className="flex flex-col space-y-3">
                    {["US Standard sizes", "Indian Classic tailored fits", "European Contour drapes"].map((ans) => (
                      <button
                        key={ans}
                        onClick={() => handleQuizAnswer(ans)}
                        className="py-3.5 border border-gray-800 hover:border-[#D4AF37] text-xs hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isQuizLoading && (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin" />
                  <span className="text-xs text-gray-400">Analyzing measurements & fitting criteria...</span>
                </div>
              )}

              {quizStep === 4 && (
                <div className="space-y-6 animate-scale-up">
                  <h3 className="text-2xl font-bold text-[#D4AF37] uppercase">Your Style Recommendation</h3>
                  <div className="bg-black/40 border border-[#D4AF37]/20 p-6">
                    <p className="text-sm font-semibold uppercase mb-2">Look 01: Royal Heritage Drape</p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm mx-auto">
                      Based on your preferences for <span className="text-white font-medium">{quizAnswers[0]}</span> and a <span className="text-white font-medium">{quizAnswers[1]}</span> posture, we recommend exploring classic heritage pieces.
                    </p>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-3.5 bg-white text-black hover:bg-[#D4AF37] hover:text-black text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Take Quiz Again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Trend Dashboard */}
          {activeTab === "trend" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch animate-fade-in">
              {/* Card 1 */}
              <div className="bg-black/35 border border-gray-800 p-6 flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#B76E79] font-bold">Drape Posture</span>
                <h4 className="text-base font-bold uppercase my-3" style={{ fontFamily: "'Playfair Display', serif" }}>Silk Sage Popularity</h4>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl font-bold text-white">45%</span>
                  <span className="text-xs text-emerald-500 font-semibold mb-1">↑ 12% this week</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-light">
                  Indian traditional folds mixed with modern waist contours have seen a significant search volume spike.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-black/35 border border-gray-800 p-6 flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Trending Shades</span>
                <h4 className="text-base font-bold uppercase my-3" style={{ fontFamily: "'Playfair Display', serif" }}>Gold &amp; Obsidian Black</h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37] border border-gray-800" />
                  <div className="w-5 h-5 rounded-full bg-[#121212] border border-gray-800" />
                  <span className="text-xs text-gray-300 font-semibold ml-2">High demand</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-light">
                  Contrasting deep obsidian jackets paired with warm gold borders are currently trending on Pinterest runway logs.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-black/35 border border-gray-800 p-6 flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#B76E79] font-bold">Hot Items</span>
                <h4 className="text-base font-bold uppercase my-3" style={{ fontFamily: "'Playfair Display', serif" }}>Linen &amp; Suede Sneaker</h4>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl font-bold text-white">Top 3</span>
                  <span className="text-xs text-[#D4AF37] font-semibold mb-1">Bestseller status</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-light">
                  Lightweight calfskin sneakers remain the highest-retained accessory purchase this seasonal drop.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: Size Guide Calculator */}
          {activeTab === "size" && (
            <div className="max-w-md mx-auto w-full text-center space-y-6 animate-fade-in">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">Perfect Fit Calculator</span>
              <h3 className="text-xl font-bold uppercase">Bespoke Size calculation</h3>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Enter your exact measurements (inches) to calculate your recommended size profile instantly.
              </p>

              <form onSubmit={handleCalculateSize} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold mb-1.5">Bust Size (Inches)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 36"
                      value={bust}
                      onChange={(e) => { setBust(e.target.value); setCalculatedSize(null); }}
                      className="w-full bg-black/40 border border-gray-800 focus:border-[#D4AF37] text-white text-xs px-3 py-2.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest font-bold mb-1.5">Waist Size (Inches)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 30"
                      value={waist}
                      onChange={(e) => { setWaist(e.target.value); setCalculatedSize(null); }}
                      className="w-full bg-black/40 border border-gray-800 focus:border-[#D4AF37] text-white text-xs px-3 py-2.5 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-[#D4AF37] hover:text-black py-3 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Calculate Fit Size
                </button>
              </form>

              {calculatedSize && (
                <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/35 animate-scale-up">
                  <p className="text-xs text-gray-300">Your Recommended Atelier Size:</p>
                  <p className="text-lg font-bold text-[#D4AF37] uppercase mt-1">{calculatedSize}</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
