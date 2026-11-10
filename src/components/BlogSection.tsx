import React from "react";
import { BookOpen, Clock, ArrowRight, Info, Sparkles } from "lucide-react";
import { SAMPLE_BLOGS } from "@/data/dayhomeData";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

export default function BlogSection() {
  return (
    <section id="blog" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-[#FDF9F6] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Parent Resources"
          badgeVariant="rose"
          title="Insights from Early Childhood Learning"
          highlightedWord="Early Childhood"
          subtitle="Tips, developmental milestones, and guides prepared to support Calgary parents during the formative early years (ages 1–5)."
        />

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SAMPLE_BLOGS.map((blog) => (
            <Card
              key={blog.id}
              variant="white"
              className="flex flex-col justify-between border border-[#F0E8E1] hover:border-[#244730]/40 transition-all duration-300"
            >
              <div>
                {/* Meta pills */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="pastel" size="sm">
                    {blog.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-[#1D2A20]/60">
                    <Clock className="w-3.5 h-3.5 text-[#CF7883]" />
                    {blog.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-nunito font-extrabold text-lg sm:text-xl text-[#244730] mb-3 leading-snug group-hover:text-[#CF7883] transition-colors">
                  {blog.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-xs sm:text-sm text-[#1D2A20]/80 leading-relaxed mb-6">
                  {blog.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#F0E8E1] flex items-center justify-between">
                <span className="text-xs text-[#1D2A20]/50 font-medium">
                  {blog.date} • Preview
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold font-nunito text-[#244730] hover:text-[#CF7883] transition-colors cursor-default">
                  Read Article Coming Soon
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

