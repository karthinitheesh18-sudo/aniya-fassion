import React from "react";
import { Truck, RotateCcw, ShieldCheck, HelpCircle } from "lucide-react";

interface BenefitCardProps {
  title: string;
  desc: string;
  iconName: "Truck" | "RotateCcw" | "ShieldCheck" | "HelpCircle";
}

export default function BenefitCard({ title, desc, iconName }: BenefitCardProps) {
  const iconMap = {
    Truck: <Truck className="w-5 h-5 text-neutral-800" />,
    RotateCcw: <RotateCcw className="w-5 h-5 text-neutral-800" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-neutral-800" />,
    HelpCircle: <HelpCircle className="w-5 h-5 text-neutral-800" />,
  };

  return (
    <div className="flex items-center gap-4 bg-white/45 backdrop-blur-sm border border-neutral-100/50 p-5 rounded-2xl transition-all duration-300 hover:bg-white hover:border-[#D4AF37]/25 hover:shadow-md">
      <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 bg-[#FAF6F0] rounded-xl">
        {iconMap[iconName]}
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-0.5">
          {title}
        </h4>
        <p className="text-[11px] text-neutral-500 font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}
