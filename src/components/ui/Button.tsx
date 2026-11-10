import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "rose" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  responsiveSize?: {
    sm: "sm" | "md" | "lg";
    md: "sm" | "md" | "lg";
    lg: "sm" | "md" | "lg";
  };
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  responsiveSize,
  className = "",
  icon,
  iconPosition = "right",
  type = "button",
  target,
  rel,
  ariaLabel,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs sm:text-sm font-semibold rounded-full gap-1.5",
    md: "px-6 py-3 text-sm sm:text-base font-semibold rounded-full gap-2",
    lg: "px-8 py-3.5 text-base sm:text-lg font-bold rounded-full gap-2.5 shadow-md hover:shadow-lg",
  };

  const variantClasses = {
    primary:
      "bg-[#244730] text-white hover:bg-[#1A3423] active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-[#244730]/20",
    rose: "bg-[#CF7883] text-white hover:bg-[#B65D69] active:scale-[0.98] transition-all duration-300 shadow-sm hover:shadow-[#CF7883]/25",
    outline:
      "bg-transparent text-[#244730] border-2 border-[#244730] hover:bg-[#244730] hover:text-white active:scale-[0.98] transition-all duration-300",
    white:
      "bg-white text-[#244730] hover:bg-[#FDF9F6] border border-[#F0E8E1] shadow-sm hover:shadow active:scale-[0.98] transition-all duration-300",
    ghost:
      "bg-transparent text-[#244730] hover:bg-[#244730]/10 active:scale-[0.98] transition-all duration-200",
  };

  const responsiveSizeClasses = responsiveSize
    ? `${sizeClasses[responsiveSize.sm]} md:${sizeClasses[responsiveSize.md].split(" ").join(" md:")} lg:${sizeClasses[responsiveSize.lg].split(" ").join(" lg:")}`
    : sizeClasses[size];

  const combinedClasses = `inline-flex items-center justify-center font-nunito tracking-wide transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#244730]/30 focus:ring-offset-2 ${responsiveSizeClasses} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if (href) {
    const isAnchorOrExternal =
      href.startsWith("#") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("http");
    if (isAnchorOrExternal) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
