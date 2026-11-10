import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "forest" | "rose" | "pastel" | "outline";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Badge({
  children,
  variant = "forest",
  className = "",
  size = "md",
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs font-semibold tracking-wide",
    md: "px-3.5 py-1 text-xs sm:text-sm font-semibold tracking-wide",
    lg: "px-4 py-1.5 text-sm font-semibold tracking-wide",
  };

  const variantClasses = {
    forest: "bg-[#244730]/10 text-[#244730] border border-[#244730]/20",
    rose: "bg-[#CF7883]/15 text-[#B65D69] border border-[#CF7883]/30",
    pastel: "bg-[#FDF9F6] text-[#244730] border border-[#F0E8E1] shadow-xs",
    outline: "bg-white/80 backdrop-blur-xs text-[#244730] border border-[#244730]/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

