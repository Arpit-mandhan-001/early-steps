"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Home,
  Sparkles,
  Utensils,
  Languages,
  Palette,
  Sun,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { CARE_PILLARS } from "@/data/dayhomeData";
import { IMAGES } from "@/data/images";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

/* ───────────────────────── Scroll reveal ─────────────────────────
   Animates in ONLY when the element scrolls into view (once).
   from="top"   → slides down from above
   from="left"  → slides in from the left
   from="right" → slides in from the right
   Respects prefers-reduced-motion (shows instantly).
──────────────────────────────────────────────────────────────── */
type RevealFrom = "top" | "left" | "right";

const HIDDEN: Record<RevealFrom, string> = {
  top: "opacity-0 -translate-y-12",
  left: "opacity-0 -translate-x-16 lg:-translate-x-24",
  right: "opacity-0 translate-x-16 lg:translate-x-24",
};

function Reveal({
  from,
  delay = 0,
  className = "",
  children,
}: {
  from: RevealFrom;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect(); // play once
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1500 ease-out will-change-transform ${
        shown ? "opacity-100 translate-x-0 translate-y-0" : HIDDEN[from]
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function OurCareSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home className="w-6 h-6 text-[#244730]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#CF7883]" />,
    Apple: <Utensils className="w-6 h-6 text-[#244730]" />,
    Languages: <Languages className="w-6 h-6 text-[#CF7883]" />,
    Palette: <Palette className="w-6 h-6 text-[#244730]" />,
    Sun: <Sun className="w-6 h-6 text-[#CF7883]" />,
    BookOpen: <BookOpen className="w-6 h-6 text-[#244730]" />,
  };

  const careImages: Record<string, string> = {
    "home-care": IMAGES.care.homeCare,
    "play-learning": IMAGES.care.playLearning,
    "meals-snacks": IMAGES.care.mealsSnacks,
    "bilingual-comm": IMAGES.care.bilingual,
    "creative-arts": IMAGES.care.creativeArts,
    "outdoor-play": IMAGES.care.outdoorPlay,
    "books-toys": IMAGES.care.booksToys,
  };

  // Scroll to a particular card
  const scrollToCard = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;

    const cards = container.children;
    const target = cards[index] as HTMLElement;

    if (!target) return;

    container.scrollTo({
      left: target.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  // Update active slider position while scrolling
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left -
          container.getBoundingClientRect().left,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const nextSlide = () => {
    scrollToCard(Math.min(activeIndex + 1, CARE_PILLARS.length - 1));
  };

  const prevSlide = () => {
    scrollToCard(Math.max(activeIndex - 1, 0));
  };

  return (
    <section
      id="care"
      className="py-8 sm:py-10 md:py-12 lg:py-16 bg-[#F5F6EF] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title → comes from TOP */}
        <Reveal from="top">
          <SectionHeading
            badgeText="Comprehensive Childcare"
            badgeVariant="rose"
            title="A Gentle Foundation for Every Stage of Growth"
            highlightedWord="Foundation"
            subtitle="From homemade balanced meals to creative discovery and dual-language warmth, our daily care program is centered entirely on your child's happiness and safety."
          />
        </Reveal>

        {/* Image / card grid → comes from LEFT */}
        <Reveal from="left" delay={150} className="mt-12">
          <div className="relative">
            {/* Left Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              disabled={activeIndex === 0}
              aria-label="Previous card"
              className="
      absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20
      w-11 h-11 md:w-15 md:h-15
      rounded-full bg-white
      shadow-lg border border-[#F0E8E1]
      flex items-center justify-center
      text-[#244730]
      hover:bg-[#244730] hover:text-white
      transition-all duration-700
      disabled:opacity-0 disabled:pointer-events-none
    "
            >
              <ChevronLeft size={22} />
            </button>

            {/* Cards */}
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="
      flex gap-5 lg:gap-6
      overflow-x-auto overflow-y-hidden
      snap-x snap-mandatory scroll-smooth
      pb-3
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
            >
              {CARE_PILLARS.map((pillar, index) => {
                const hasImage = !!careImages[pillar.id];

                return (
                  <div
                    key={pillar.id}
                    className="
            shrink-0 w-[100%] sm:w-[68%]
            lg:w-[calc((100%-3rem)/2)]
            snap-start h-auto
          "
                  >
                    <Card
                      variant="white"
                      className="
              flex flex-col h-full
              overflow-hidden p-0
              border border-[#F0E8E1]
              hover:border-[#CF7883]/50
              transition-colors duration-700
            "
                    >
                      {hasImage && (
                        <div className="relative w-full h-78 sm:h-88 overflow-hidden bg-[#FDF9F6] shrink-0">
                          <Image
                            src={careImages[pillar.id]}
                            alt={pillar.title}
                            fill
                            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 33vw"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                          />

                          <div className="absolute top-3 right-3">
                            <Badge variant="pastel" size="sm">
                              {pillar.tag}
                            </Badge>
                          </div>
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="font-nunito font-extrabold text-xl text-[#244730] mb-2 leading-snug">
                            {pillar.title}
                          </h3>

                          <p className="font-sans text-sm sm:text-base text-[#1D2A20]/80 leading-relaxed mb-4">
                            {pillar.fullDesc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#F0E8E1] flex items-center justify-between text-xs font-semibold text-[#244730]">
                          <span>Age Group: 1–5 Years</span>
                          {/* <span className="text-[#CF7883] font-bold">
                          Daily Routine
                        </span> */}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              disabled={activeIndex === CARE_PILLARS.length - 1}
              aria-label="Next card"
              className="
      absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20
      w-11 h-11 md:w-15 md:h-15
      rounded-full bg-white
      shadow-lg border border-[#F0E8E1]
      flex items-center justify-center
      text-[#244730]
      hover:bg-[#244730] hover:text-white
      transition-all duration-700
      disabled:opacity-0 disabled:pointer-events-none
    "
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </Reveal>

        {/* Nutrition Banner → comes from RIGHT */}
        <Reveal from="right" className="mt-8 md:mt-10">
          <div className="rounded-3xl bg-linear-to-r from-[#244730] to-[#1A3423] text-white p-6 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-left">
              <Badge
                variant="rose"
                size="sm"
                className="mb-3 text-white border-white/20"
              >
                Fresh Nutrition Daily
              </Badge>

              <h4 className="font-nunito font-extrabold text-xl md:2xl lg:text-3xl leading-snug">
                Wholesome Lunches & Two Energizing Snacks Everyday
              </h4>

              <p className="mt-2 font-sans text-white/80 text-[12px] md:text-sm lg:text-base">
                We understand the importance of quality nutrition in early brain
                development. All meals are prepared with care, clean
                ingredients, and accommodating consideration for dietary
                preferences.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#contact"
                className="
                inline-flex items-center justify-center
                px-5 py-3 md:px-6 md:py-3.5
                rounded-full
                font-nunito font-bold
                text-[12px] sm:text-sm md:text-base
                bg-[#CF7883] text-white
                hover:bg-[#B65D69]
                transition-all duration-500
                shadow-md hover:shadow-lg
              "
              >
                Ask About Our Meal Routine
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}