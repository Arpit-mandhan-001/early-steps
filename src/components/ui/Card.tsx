import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: "white" | "pastel" | "forest";
}

export default function Card({
  children,
  className = "",
  hoverEffect = true,
  variant = "white",
}: CardProps) {
  const variantStyles = {
    white: "bg-white border border-[#F0E8E1] text-[#1D2A20]",
    pastel: "bg-[#FDF9F6] border border-[#F0E8E1] text-[#1D2A20]",
    forest: "bg-[#244730] border border-[#244730] text-white",
  };

  const hoverStyles = hoverEffect
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
    : "";

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 ${variantStyles[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}

