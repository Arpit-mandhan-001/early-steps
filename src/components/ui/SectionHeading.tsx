import React from "react";
import Badge from "./Badge";

interface SectionHeadingProps {
  badgeText?: string;
  badgeVariant?: "forest" | "rose" | "pastel" | "outline";
  title: string;
  highlightedWord?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  badgeText,
  badgeVariant = "forest",
  title,
  highlightedWord,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : "text-left"} mb-12 md:mb-16 ${className}`}
    >
      {badgeText && (
        <div className="mb-3.5">
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-nunito text-[#244730] tracking-tight leading-[1.18]">
        {highlightedWord && title.includes(highlightedWord) ? (
          <>
            {title.split(highlightedWord)[0]}
            <span className="text-[#CF7883] relative inline-block">
              {highlightedWord}
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2 text-[#CF7883]/30 -z-10"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 15 Q50 0 100 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {title.split(highlightedWord)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#1D2A20]/80 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

