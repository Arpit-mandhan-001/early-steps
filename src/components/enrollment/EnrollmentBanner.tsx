import React from "react";
import Card from "../ui/Card";
import { BUSINESS_INFO } from "@/data/dayhomeData";
import Badge from "../ui/Badge";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import SectionHeading from "../ui/SectionHeading";

const EnrollmentBanner = () => {
  const steps = [
    {
      num: "01",
      title: "Reach Out to Indu",
      desc: "Give us a quick call or send an email to check current openings for your child's age group (ages 1–5).",
    },
    {
      num: "02",
      title: "Schedule an In-Person Tour",
      desc: "Visit our Whitehorn home, meet Indu Bala in person, explore the play areas, and see our daily setup.",
    },
    {
      num: "03",
      title: "Discuss Hours, Fees & Routine",
      desc: "Review daily scheduling options, fees, food preferences, nap routines, and child-specific needs.",
    },
    {
      num: "04",
      title: "Gentle Transition & Welcome",
      desc: "A warm, gradual introduction so your child feels completely safe, excited, and settled from day one.",
    },
  ];

  return (
    <section className="bg-[#FDF9F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <SectionHeading
          badgeText="Enrollment Information"
          badgeVariant="rose"
          title="Welcoming New Friends Ages 1–5"
          highlightedWord="Ages 1–5"
          subtitle="We maintain an intimate home environment with dedicated attention for each child. Get in touch with Indu Bala to discuss openings, hours, and schedule your tour."
        />
        <div className="bg-white rounded-3xl border border-[#F0E8E1] shadow-xl max-w-6xl mx-auto mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-10 items-stretch">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-5 px-6 sm:px-8 lg:px-10 flex flex-col justify-center">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="forest" size="md">
                  Whitehorn, Calgary
                </Badge>

                <Badge variant="rose" size="md">
                  Limited Spaces
                </Badge>
              </div>

              {/* Heading */}
              <h3 className="font-nunito font-extrabold text-2xl sm:text-3xl text-[#244730] leading-tight">
                Quality Home Childcare Tailored to Your Little One
              </h3>

              {/* Description */}
              <p className="mt-4 text-[14px] text-[#1D2A20]/80 font-sans leading-relaxed">
                {BUSINESS_INFO.enrollmentNote}
              </p>

              {/* Verified Checklist */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm text-[#1D2A20]/85 font-medium">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#244730] shrink-0 mt-0.5" />
                  <span>Level 3 Early Childhood Educator</span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#244730] shrink-0 mt-0.5" />
                  <span>9 Years Childcare Experience</span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#244730] shrink-0 mt-0.5" />
                  <span>First Aid Certified & Police Cleared</span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#244730] shrink-0 mt-0.5" />
                  <span>Healthy Lunch & Two Snacks Daily</span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#244730] shrink-0 mt-0.5" />
                  <span>Bilingual English & Hindi Care</span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#244730] shrink-0 mt-0.5" />
                  <span>Safe, Smoke-free, Clean Home</span>
                </div>
              </div>
            </div>

            {/* RIGHT LARGE IMAGE */}
            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[400px] lg:min-h-[520px]">
              <Image
                src="/images/dayhome/dayhome-29.jpeg"
                alt="Warm and welcoming home childcare environment"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#142D1D]/60 via-transparent to-transparent" />

              {/* Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                  A Place to Grow & Explore
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Step Process Heading */}
        <div className="text-center mb-8">
          <h4 className="font-nunito font-extrabold text-2xl text-[#244730]">
            Simple 4-Step Enrollment Process
          </h4>

          <p className="text-sm text-[#1D2A20]/75 mt-1">
            We make enrolling your child straightforward, transparent, and
            pressure-free.
          </p>
        </div>

        {/* 4 Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <Card
              key={st.num}
              variant="white"
              className="p-6 relative flex flex-col justify-between border border-[#F0E8E1]"
            >
              <div>
                <span className="font-nunito font-black text-4xl text-[#CF7883]/30 block mb-3">
                  {st.num}
                </span>

                <h5 className="font-nunito font-extrabold text-lg text-[#244730] mb-2 leading-snug">
                  {st.title}
                </h5>

                <p className="font-sans text-xs sm:text-sm text-[#1D2A20]/80 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0E8E1] text-[11px] font-bold text-[#244730] uppercase tracking-wider">
                Step {st.num}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnrollmentBanner;
