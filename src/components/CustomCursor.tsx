import React, { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect if the device has a mouse/pointer and check touch status
    const checkDevice = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  // Smooth delayed tracking for outer circle (lerp simulation)
  useEffect(() => {
    if (isMobile || !isVisible) return;

    let animFrameId: number;

    const updateOuterPosition = () => {
      setOuterPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease calculation
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animFrameId = requestAnimationFrame(updateOuterPosition);
    };

    animFrameId = requestAnimationFrame(updateOuterPosition);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [position, isMobile, isVisible]);

  // Listen to interactive hovers
  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.tagName === "SELECT" || 
        target.tagName === "INPUT" || 
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest(".product-card") !== null ||
        target.closest("[role='button']") !== null ||
        target.closest(".group") !== null;

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) ${isHovered ? "scale(0.8)" : "scale(1)"}`,
        }}
      />
      
      {/* Outer Circle ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-[#D4AF37] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-300"
        style={{
          transform: `translate3d(${outerPosition.x}px, ${outerPosition.y}px, 0) ${isHovered ? "scale(1.8)" : "scale(1)"}`,
          opacity: isHovered ? 0.45 : 0.7,
          backgroundColor: isHovered ? "rgba(212, 175, 55, 0.08)" : "transparent",
        }}
      />
    </>
  );
}
