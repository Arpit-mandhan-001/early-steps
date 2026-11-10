"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, X, Eye, Check } from "lucide-react";
import { IMAGES } from "@/data/images";
import SectionHeading from "./ui/SectionHeading";
import Badge from "./ui/Badge";
import BentoGrid from "./BentoGrid";

type CategoryFilter = "all" | "playroom" | "learning" | "creative" | "books";

export default function OurSpaceSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedImage, setSelectedImage] = useState<(typeof IMAGES.gallery)[0] | null>(null);

  const filters: { label: string; value: CategoryFilter }[] = [
    { label: "All Areas", value: "all" },
    { label: "Playroom & Movement", value: "playroom" },
    { label: "Learning Stations", value: "learning" },
    { label: "Creative Art Corner", value: "creative" },
    { label: "Books & Toys", value: "books" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? IMAGES.gallery
      : IMAGES.gallery.filter((item) => item.category === activeFilter);

  return (
    <section id="space" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Authentic Environment"
          badgeVariant="forest"
          title="Take a Look Inside Our Dayhome"
          highlightedWord="Inside Our Dayhome"
        />
        <BentoGrid />
        {/* Filter Pills */}
        {/* <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 md:mb-12">
          {filters.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-nunito font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#244730] text-white shadow-md shadow-[#244730]/20 scale-105"
                    : "bg-[#FDF9F6] text-[#1D2A20]/80 hover:bg-[#244730]/10 hover:text-[#244730] border border-[#F0E8E1]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div> */}

        

        {/* In-Person Tour Callout */}
        <div className="mt-12 text-center bg-[#FDF9F6] rounded-3xl p-6 sm:p-8 border border-[#F0E8E1] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-nunito font-extrabold text-lg text-[#244730]">
              Would you like to see our dayhome in person?
            </h4>
            <p className="text-sm text-[#1D2A20]/75 mt-0.5">
              Parents are warmly invited to book an evening or weekend visit to tour the play spaces and meet Indu Bala.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 rounded-full font-nunito font-bold text-sm bg-[#244730] text-white hover:bg-[#1A3423] transition-colors"
          >
            Book a Dayhome Visit
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-70 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 w-full bg-[#1D2A20] max-h-[65vh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>

            <div className="p-6 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-[#F0E8E1]">
              <div>
                <Badge variant="rose" size="sm" className="mb-1.5">
                  {selectedImage.categoryLabel}
                </Badge>
                <h3 className="font-nunito font-extrabold text-xl text-[#244730]">
                  {selectedImage.title}
                </h3>
                <p className="font-sans text-sm text-[#1D2A20]/80 mt-1 max-w-2xl">
                  {selectedImage.description}
                </p>
              </div>
              <a
                href="#contact"
                onClick={() => setSelectedImage(null)}
                className="shrink-0 px-5 py-2.5 rounded-full font-nunito font-bold text-sm bg-[#CF7883] text-white hover:bg-[#B65D69] transition-colors"
              >
                Inquire About Spot
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

