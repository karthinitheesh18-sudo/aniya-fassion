import React, { useState } from "react";
import { Search, ShoppingBag, Truck, MapPin, CheckCircle, Package } from "lucide-react";

interface OrderItem {
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface MockOrder {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered";
  items: OrderItem[];
  subtotal: number;
  total: number;
  address: string;
}

const mockOrdersDb: Record<string, MockOrder> = {
  "AANYA-847291": {
    id: "AANYA-847291",
    date: "2026-07-10",
    status: "shipped",
    items: [
      { name: "Premium Leather Jacket", price: 299, qty: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2GTCZQRzHB1K2KUjGbDlNW5CnA3ffMrncZd7gpXLME_h97wOJBwTT98NuzW87kszzoZvxRB_SmzzKWbEb26-RKfo4jR_E4AR8VCe76OBzfN2FY4h_Jp6jtNJWqiPkR7iW_WwOMaIhS7TexXVFUbhoi_ddhnb7dqkn6uixKs7P94a2B-r8eFdAZZO9e7VtATDC4QG0Gc1HvCa6eROZ_KVIQtM6bus9_gt4XxRqeVEekoIRqPjmcP07bw" },
      { name: "Minimalist Leather Watch", price: 220, qty: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55UADWRbrTE0WJ9tOhOztlhXKnkRPj8it-rucfoMLg_IL06ZFDRzKf_2PhyVWqmR3u_MVt9mfaaNd7MVBOdyJX481_fhIju_URJvO5A9nvQpHV7eqFWow3sGdRV-sy_Z2QbhNxu1m7zcFsLphGd1iyMSfWINdyouwtipl7hBYQW0VyhCh6cmQFt9jLiOPsrDOYodRM0x8yo0aCc29tpVbQv0klqISy_E1tCvh4I8cGB5_blu-sTYfkQ" }
    ],
    subtotal: 519,
    total: 534,
    address: "123 Luxury Way, New York, NY 10001"
  },
  "AANYA-129482": {
    id: "AANYA-129482",
    date: "2026-07-12",
    status: "processing",
    items: [
      { name: "Elegant Summer Dress", price: 150, qty: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4VvL7icvrTJ0OAIfxszO0Wk08mmNCaFpeJnteMT8XJwN1zQNUlV-XkhDmd0GxTgrFZ2urfdPS9FOIM1WTJfB8v2JNtXhesJPNbV3wclKFCviC1doDmDQ8DQu6u03cW-2q7hllDEAaEj07ecCi_UPEEFdmCgC9YQgGN8y4d6nXf7FUJTNDU62a5b8339b9udHWVCA_RzlA_WlcMjIF38d3eJJn4SenxtnkZORM_RsNagi_aN22qfTiLA" }
    ],
    subtotal: 150,
    total: 150,
    address: "456 Heritage Lane, Mumbai, MH 400001"
  }
};

export default function Orders() {
  const [searchId, setSearchId] = useState("");
  const [activeOrder, setActiveOrder] = useState<MockOrder | null>(mockOrdersDb["AANYA-847291"]); // default load order
  const [errorMsg, setErrorMsg] = useState("");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const formattedId = searchId.trim().toUpperCase();
    const found = mockOrdersDb[formattedId] || mockOrdersDb[`AANYA-${formattedId}`];
    
    if (found) {
      setActiveOrder(found);
    } else {
      setActiveOrder(null);
      setErrorMsg("Order ID not found. Ensure you type a valid ID (e.g., AANYA-847291).");
    }
  };

  return (
    <section id="orders-section" className="py-28 bg-[#FAF9F6] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
            Customer Portal
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-wider text-[#0A0A0A] uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Order Tracking
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 italic text-sm">Trace the journey of your luxury wardrobe purchases</p>
        </div>

        {/* Order ID Lookup Form */}
        <form onSubmit={handleLookup} className="flex gap-3 max-w-xl mx-auto mb-16">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. AANYA-847291)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-grow bg-white border border-gray-200 focus:border-[#D4AF37] text-[#0A0A0A] text-xs uppercase tracking-widest px-5 py-4 focus:outline-none rounded-none"
          />
          <button
            type="submit"
            className="bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:text-black px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 rounded-none cursor-pointer border border-[#0A0A0A] hover:border-[#D4AF37] flex items-center gap-2"
          >
            <Search className="w-4 h-4" /> Lookup
          </button>
        </form>

        {errorMsg && (
          <div className="text-center text-xs text-red-600 font-semibold mb-8 uppercase tracking-widest">
            {errorMsg}
          </div>
        )}

        {/* Order Tracker Detail */}
        {activeOrder && (
          <div className="bg-white border border-[#D4AF37]/15 p-6 sm:p-10 shadow-sm space-y-8 animate-fade-in">
            
            {/* Order status header info */}
            <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 pb-6 gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#B76E79] font-bold block mb-1">Order Identifier</span>
                <span className="text-sm font-bold text-black uppercase tracking-wider">{activeOrder.id}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#B76E79] font-bold block mb-1">Purchase Date</span>
                <span className="text-sm font-medium text-gray-700">{activeOrder.date}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#B76E79] font-bold block mb-1">Delivery Destination</span>
                <span className="text-xs text-gray-500 font-light truncate max-w-xs block">{activeOrder.address}</span>
              </div>
            </div>

            {/* Tracking Status Timeline */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-6">Delivery Timeline</span>
              
              <div className="grid grid-cols-3 relative">
                {/* Connector line */}
                <div className="absolute top-[18px] left-[15%] right-[15%] h-[2px] bg-gray-200 z-0">
                  <div 
                    className="bg-[#D4AF37] h-full transition-all duration-1000"
                    style={{
                      width: activeOrder.status === "processing" ? "0%" : activeOrder.status === "shipped" ? "50%" : "100%"
                    }}
                  />
                </div>

                {/* Step 1: Placed */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center border-2 border-white shadow-md">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#0A0A0A] mt-2">Ordered</span>
                  <span className="text-[8px] text-gray-400 mt-0.5">Payment Verified</span>
                </div>

                {/* Step 2: Shipped */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-colors duration-500 ${
                    activeOrder.status === "shipped" || activeOrder.status === "delivered" 
                      ? "bg-[#D4AF37] text-black" 
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest mt-2 ${
                    activeOrder.status === "shipped" || activeOrder.status === "delivered" ? "text-black" : "text-gray-400"
                  }`}>Shipped</span>
                  <span className="text-[8px] text-gray-400 mt-0.5">In Transit</span>
                </div>

                {/* Step 3: Delivered */}
                <div className="flex flex-col items-center text-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-colors duration-500 ${
                    activeOrder.status === "delivered" 
                      ? "bg-emerald-600 text-white" 
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest mt-2 ${
                    activeOrder.status === "delivered" ? "text-emerald-700" : "text-gray-400"
                  }`}>Delivered</span>
                  <span className="text-[8px] text-gray-400 mt-0.5">Handed Over</span>
                </div>

              </div>
            </div>

            {/* Items summary */}
            <div className="border-t border-gray-100 pt-8">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#0A0A0A] mb-4">Items Summary</span>
              <div className="divide-y divide-gray-100">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-16 object-cover bg-gray-50 border border-gray-100" />
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-black">{item.name}</h5>
                        <span className="text-[10px] text-gray-400">Qty: {item.qty}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-black">${item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-6 flex flex-col items-end text-xs space-y-1.5 font-light text-gray-500">
              <div className="flex justify-between w-44">
                <span>Subtotal:</span>
                <span className="font-semibold text-black">${activeOrder.subtotal}</span>
              </div>
              <div className="flex justify-between w-44">
                <span>Estimated Shipping:</span>
                <span className="font-semibold text-black">FREE</span>
              </div>
              <div className="flex justify-between w-44 text-sm font-bold text-black pt-2 border-t border-gray-100 mt-1">
                <span>Total Amount:</span>
                <span>${activeOrder.total}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
