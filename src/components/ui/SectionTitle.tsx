import React, { ReactNode } from "react";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  rightElement?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  rightElement,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 ${
        isCentered ? "text-center md:text-center md:justify-center" : ""
      } ${className}`}
    >
      <div className={isCentered ? "w-full flex flex-col items-center" : "max-w-2xl"}>
        {subtitle && (
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B76E79] font-bold mb-3.5 block">
            {subtitle}
          </span>
        )}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
        {isCentered && <div className="w-12 h-[1px] bg-[#D4AF37] mt-5" />}
      </div>
      {rightElement && (
        <div className={`flex-shrink-0 flex ${isCentered ? "justify-center" : "justify-start md:justify-end"}`}>
          {rightElement}
        </div>
      )}
    </div>
  );
}
