import React from "react";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/dayhomeData";
import { IMAGES } from "@/data/images";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function AboutSection() {
  const { founder } = BUSINESS_INFO;

  return (
    <section id="about" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Meet The Founder"
          badgeVariant="forest"
          title="Nurturing Young Minds with Experience & Heart"
          highlightedWord="Experience & Heart"
          subtitle="A certified Level 3 Early Childhood Educator and mother of three, dedicated to creating Calgary's most comforting and encouraging home childcare."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Photography & Credentials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative mx-auto w-full max-w-md">
              {/* Rounded image frame */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-[#FDF9F6] shadow-xl bg-[#FDF9F6] aspect-4/5 sm:aspect-square lg:aspect-4/5">
                <Image
                  src={IMAGES.about.founder}
                  alt={`Indu Bala, Founder of EarlySteps Dayhome in Whitehorn Calgary`}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#244730]/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-nunito font-extrabold text-lg text-[#244730]">
                        {founder.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#CF7883]">
                        {founder.title}
                      </p>
                    </div>
                    <span className="text-xs font-bold bg-[#244730] text-white px-3 py-1 rounded-full">
                      9 Yrs Exp
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating credentials sticker */}
              <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-[#CF7883] text-white rounded-2xl p-3.5 shadow-lg items-center gap-2.5">
                <span className="font-nunito font-bold text-xs uppercase tracking-wider">
                  Level 3 Certified 2025
                </span>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
              <div className="rounded-2xl bg-[#FDF9F6] border border-[#F0E8E1] p-3.5 text-center">
                <div className="font-nunito font-extrabold text-2xl text-[#244730]">
                  2017
                </div>
                <div className="text-xs font-medium text-[#1D2A20]/75">
                  Childcare Journey Began
                </div>
              </div>
              <div className="rounded-2xl bg-[#FDF9F6] border border-[#F0E8E1] p-3.5 text-center">
                <div className="font-nunito font-extrabold text-2xl text-[#CF7883]">
                  Mother of 3
                </div>
                <div className="text-xs font-medium text-[#1D2A20]/75">
                  Natural Maternal Care
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Verified Qualifications */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="space-y-4 text-base sm:text-lg text-[#1D2A20]/85 font-sans leading-relaxed">
              <p className="first-letter:text-4xl first-letter:font-extrabold first-letter:text-[#244730] first-letter:font-nunito first-letter:float-left first-letter:mr-2">
                {founder.bio[0]}
              </p>
              <p>{founder.bio[1]}</p>
            </div>

            {/* Qualifications & Timeline Card */}
            <div className="mt-2">
              <h4 className="font-nunito font-extrabold text-xl text-[#244730] mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#CF7883]" />
                Qualifications & Safety Credentials
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {founder.certifications.map((item, idx) => (
                  <Card
                    key={idx}
                    variant="pastel"
                    className="p-4 sm:p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold text-[#CF7883] uppercase tracking-wider">
                          {item.year}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-[#244730]" />
                      </div>
                      <h5 className="font-nunito font-bold text-base text-[#244730]">
                        {item.title}
                      </h5>
                      <p className="text-xs font-semibold text-[#1D2A20]/70 mt-0.5">
                        {item.institution}
                      </p>
                    </div>
                    <p className="text-xs text-[#1D2A20]/80 mt-2 font-sans leading-normal">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
}

