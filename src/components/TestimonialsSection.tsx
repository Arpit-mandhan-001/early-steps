import React from "react";
import { Star, MessageSquareQuote, Info, Heart } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/data/dayhomeData";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Parent Reflections"
          badgeVariant="forest"
          title="What Families Value Most in Our Care"
          highlightedWord="Value Most"
          subtitle="Building open, trustworthy partnerships with parents. See sample feedback demonstrating our commitments, with genuine reviews currently being gathered."
        />

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SAMPLE_TESTIMONIALS.map((t) => (
            <Card
              key={t.id}
              variant="pastel"
              className="flex flex-col justify-between relative border border-[#F0E8E1] hover:border-[#CF7883]/40"
            >
              <div>
                {/* Header with 5 stars & sample pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#CF7883]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Badge variant="outline" size="sm" className="text-[10px]">
                    Sample Review
                  </Badge>
                </div>

                {/* Quote Icon */}
                <MessageSquareQuote className="w-8 h-8 text-[#244730]/20 mb-2" />

                {/* Content */}
                <p className="font-sans text-sm sm:text-base text-[#1D2A20]/85 italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 mt-6 border-t border-[#F0E8E1] flex items-center justify-between">
                <div>
                  <h4 className="font-nunito font-extrabold text-sm sm:text-base text-[#244730]">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[#1D2A20]/70 font-sans">
                    {t.relation} • {t.location}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#244730]/10 flex items-center justify-center text-[#244730]">
                  <Heart className="w-4 h-4 text-[#CF7883]" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

