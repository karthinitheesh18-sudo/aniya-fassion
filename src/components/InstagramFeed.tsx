import React from "react";
import { Instagram } from "lucide-react";
import { useReveal } from "./useReveal";

interface InstagramPost {
  id: number;
  image: string;
  link: string;
}

const instagramData: InstagramPost[] = [
  {
    id: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBErcqmTbzx8latwT4vwwQvQ8RrDPUnUlJ8BYLQPCVe7K7q00YR8MjUpsvfD0N6XWI8TtHdxbwL-oebmstj0_Y2tzpmTVcY1diBaIsTYCyZ1N3LntHoZfW43mhj1PVCtIca1ReF4nL8V9Ato_GDYfeo0rfrBzgKah9GzZXanK-uWyShtjPAuddRE_2LYzfovmfZJLooH_FumXNPXxc2DmrLgHc9cq0JwqZwbPnlRdn7yiKEKdYOjtHUag",
    link: "https://instagram.com"
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9rSJ6NWXqJeOuddQm-MrTHumMcv2BWgzra678XBd5CX4Jn_bE2SahdRbySv8kUTWLfIj3--w1G-Go5clF0yiDfo8E43gIGSEyXgrsaJTdELGg-RLC5DlAdNXmNleyBgu5b7H-rr752t3FzEF9pHV4zqm7g32VhGv6V21tnDLyU114rE0xamqSTR-0Iy13SRKX4PnzOt_o84S1gKbYEBcWB0oxJKgI-DsZVbou8kv48GSAalNEvh-20Q",
    link: "https://instagram.com"
  },
  {
    id: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55UADWRbrTE0WJ9tOhOztlhXKnkRPj8it-rucfoMLg_IL06ZFDRzKf_2PhyVWqmR3u_MVt9mfaaNd7MVBOdyJX481_fhIju_URJvO5A9nvQpHV7eqFWow3sGdRV-sy_Z2QbhNxu1m7zcFsLphGd1iyMSfWINdyouwtipl7hBYQW0VyhCh6cmQFt9jLiOPsrDOYodRM0x8yo0aCc29tpVbQv0klqISy_E1tCvh4I8cGB5_blu-sTYfkQ",
    link: "https://instagram.com"
  },
  {
    id: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtuJzbwhNizJ5CryJYajWHM7__k6tuo2NTA1TGNAaLaMIDPeqIWneq6B26rrmnoEK2hiyXDZMBsg5JgOzxUlUlAH2WmuoJTeuBmy1s1DpfXWist5g5TaE4lyQtCZfP7MS4cBRQ8kyWta9gAixDAf9G98r5gVYa7KBl2X2C9srAOmmupBF-RZT9ANvizJE14EZIrkZcWoKggpyZMWuXhAYRTKkUeojul0hjpy93ATOI3RwSrfY9S1bAeA",
    link: "https://instagram.com"
  },
  {
    id: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf2FKKs8TW_Z7MJNxnXf7EEjPhQ8KS6nzAql_A8gIsnBdjQYSMqFiQSvCbJHHE1cTrOtpz6Cu81MBZpvOK6Bq2Ztr4TUCbR9KmNSIvOWKh2JD_kN13Vjxn5nybo5rJKH9I8RdLdWTbkMlhlpK2UdHlQ7jjyTrhLmwQNTmOO4a_HzrW-N301xvLGD_XKWRK0rLyWq9j3qv2zeGM3a8OdWo_uMEXRYCsA2unf8ix5O8WXDW6JKuvu6pLyqLInOAMRZPSXtU",
    link: "https://instagram.com"
  },
  {
    id: 6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYwnRyL7sSyPGZgnUwHmCqKlN4lSSgRFzfIkWeli1bI1xStD6VfAvBSujM7I6ppKJGLKxAtVpYOaLfu-5ZxTdrvlEIekb5LMu4J54xUhjKSQ1K2HGoQkcLSV5bw1ZjpdXdgCyfHQikyWvXTaLUkRURy5aLiiTsaA4mLY1s_MESyzumx39SYA8iB7CNPWIevmNo6M6ewZP_0qKENU-wl0lmuQuASuoA0oth7hMwbEWC1K1WT2uI4u5lqI-d3J14O_-MXhg",
    link: "https://instagram.com"
  }
];

export default function InstagramFeed() {
  const { ref, isVisible } = useReveal(0.05);

  return (
    <section
      ref={ref}
      id="instagram-section"
      className="py-24 bg-white border-b border-[#D4AF37]/10"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-semibold mb-2 block">
            Digital Showroom
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Instagram Feed
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-500 italic text-sm">Follow @AanyaFashions for daily style curation</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramData.map((post, index) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block overflow-hidden bg-[#0A0A0A] transition-all duration-1000 ease-luxury"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(45px)",
                transitionDelay: `${index * 80}ms`
              }}
            >
              {/* Square Image frame */}
              <div className="aspect-square w-full relative overflow-hidden">
                <img
                  src={post.image}
                  alt={`Aanya Fashions post ${post.id}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform scale-100 group-hover:scale-105 transition-all duration-1000 ease-luxury"
                  loading="lazy"
                />

                {/* Luxury Hover Overlay: Rose Gold Tint */}
                <div className="absolute inset-0 bg-[#B76E79]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white p-4">
                  <Instagram className="w-6 h-6 mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    Shop Post
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
