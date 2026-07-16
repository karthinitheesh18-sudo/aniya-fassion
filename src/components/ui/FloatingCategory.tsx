import React from "react";

interface FloatingCategoryProps {
  name: string;
  image: string;
  isSale?: boolean;
  onClick: () => void;
}

export default function FloatingCategory({
  name,
  image,
  isSale = false,
  onClick,
}: FloatingCategoryProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3.5 group cursor-pointer focus:outline-none"
    >
      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-[#2C2C2C]/5 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] group-hover:scale-108 group-hover:border-[#D4AF37]/30 flex items-center justify-center bg-white">
        {isSale ? (
          <div className="absolute inset-0 bg-black flex items-center justify-center transition-colors duration-500 group-hover:bg-neutral-900">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white">
              Sale
            </span>
          </div>
        ) : (
          <>
            <img
              src={image}
              alt={name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            {/* Subtle light overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
          </>
        )}
      </div>
      <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-neutral-800 transition-colors duration-300 group-hover:text-black">
        {name}
      </span>
    </button>
  );
}
