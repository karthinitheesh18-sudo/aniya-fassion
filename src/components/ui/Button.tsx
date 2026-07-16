import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  icon,
  iconPosition = "right",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 font-sans font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs rounded-full select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "relative overflow-hidden bg-black text-white px-8 py-4 sm:px-9 sm:py-4.5 border border-black hover:text-black group",
    secondary:
      "bg-transparent text-black px-6 py-4 hover:opacity-75 group",
    outline:
      "bg-transparent text-black border border-black/20 hover:border-black px-8 py-4 sm:px-9 sm:py-4.5 group",
    text:
      "bg-transparent text-black p-0 hover:text-black/75 group tracking-widest border-b border-black/10 hover:border-black",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {variant === "primary" && (
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
        )}
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
      )}
      {content}
    </button>
  );
}
