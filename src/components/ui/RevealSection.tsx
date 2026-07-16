import React, { ReactNode } from "react";
import { useReveal } from "../useReveal";

interface RevealSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

export default function RevealSection({
  children,
  id,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.05,
}: RevealSectionProps) {
  const { ref, isVisible } = useReveal(threshold, once);

  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] gpu-accelerated ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(1.03)",
        filter: isVisible ? "blur(0)" : "blur(4px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
