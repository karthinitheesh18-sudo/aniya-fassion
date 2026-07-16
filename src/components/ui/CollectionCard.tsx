import React from "react";

interface CollectionCardProps {
  name: string;
  subtitle: string;
  image: string;
  onClick: () => void;
}

export default function CollectionCard({
  name,
  subtitle,
  image,
  onClick,
}: CollectionCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100/40 hover:shadow-xl hover:border-[#D4AF37]/20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      {/* Image container */}
      <div className="relative h-[340px] sm:h-[400px] md:h-[440px] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Shadow and Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
        
        {/* Soft layout border overlay on hover */}
        <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none" />

        {/* Content positioned inside the image (at the bottom) */}
        <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end text-white z-10">
          <h3
            className="text-xl sm:text-2xl font-bold tracking-wide uppercase mb-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {name}
          </h3>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors duration-300">
            <span>{subtitle}</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
