
import React from "react";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

import { BUSINESS_INFO } from "@/data/dayhomeData";
import { IMAGES } from "@/data/images";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";

export default function AboutSection() {
  const { founder } = BUSINESS_INFO;

  const credentialIcons = [
    GraduationCap,
    ShieldCheck,
    HeartHandshake,
    Award,
  ];

  return (
    <section
      id="about"
      className="py-10 sm:py-14 lg:py-20 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          badgeText="Meet The Founder"
          badgeVariant="forest"
          title="Nurturing Young Minds with Experience & Heart"
          highlightedWord="Experience & Heart"
          subtitle="A certified Level 3 Early Childhood Educator and mother of three, dedicated to creating Calgary's most comforting and encouraging home childcare."
        />

        {/* Main About Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-12">

          {/* LEFT SIDE - LARGE IMAGE (60%) */}
          <div className="lg:col-span-7 relative">

            <div className="relative w-full h-[420px] sm:h-[550px] lg:h-[800px] rounded-[2rem] overflow-hidden shadow-xl bg-[#FDF9F6]">

              <Image
                src={IMAGES.about.founder}
                alt={`Indu Bala, Founder of EarlySteps Dayhome in Whitehorn Calgary`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />

              {/* Image Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#244730]/70 via-transparent to-transparent pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-5 left-5">
                <div className="bg-white/95 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
                  <HeartHandshake className="w-4 h-4 text-[#CF7883]" />
                  <span className="text-xs font-bold text-[#244730] uppercase tracking-wider">
                    Meet Your Child's Caregiver
                  </span>
                </div>
              </div>

              {/* Bottom Image Content */}
              <div className=" absolute bottom-0 left-0 right-0 p-6 sm:p-9">

              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-5 -right-2 sm:-right-5 bg-white rounded-2xl p-4 shadow-xl border border-[#F0E8E1] flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-[#244730]/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#244730]" />
              </div>

              <div>
                <h4 className="font-nunito font-extrabold text-xl text-[#244730]">
                  9+ Years
                </h4>
                <p className="text-xs text-[#1D2A20]/65 font-medium">
                  Childcare Experience
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE - ONLY TEXT (40%) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left pt-6 lg:pt-0">

            {/* Small Label */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-[#CF7883]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#CF7883]">
                A Little About Me
              </span>
            </div>

            {/* Main Heading */}
            <h3 className="font-nunito font-extrabold text-3xl sm:text-4xl xl:text-[42px] leading-[1.15] text-[#244730]">
              More Than Childcare,
              <span className="block text-[#CF7883] mt-1">
                A Place to Belong.
              </span>
            </h3>

            {/* Founder Bio */}
            <div className="mt-6 space-y-5 text-base sm:text-lg text-[#1D2A20]/80 font-sans leading-relaxed">

              <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#244730] first-letter:font-nunito first-letter:float-left first-letter:mr-2">
                {founder.bio[0]}
              </p>

              <p>
                {founder.bio[1]}
              </p>

            </div>

            {/* Personal Message */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#FDF9F6] border-l-4 border-[#CF7883]">

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-6 h-6 text-[#CF7883] shrink-0 mt-1" />

                <div>
                  <h4 className="font-nunito font-extrabold text-lg text-[#244730]">
                    Every Child Deserves to Feel Special
                  </h4>

                  <p className="text-sm text-[#1D2A20]/75 leading-relaxed mt-2">
                    Creating a safe, nurturing and joyful environment where
                    children can explore, learn, grow and feel at home.
                  </p>
                </div>
              </div>

            </div>

            {/* Experience Details */}
            <div className="grid grid-cols-2 gap-3 mt-6">

              <div className="rounded-xl bg-white border border-[#F0E8E1] p-4">
                <h4 className="font-nunito font-extrabold text-2xl text-[#244730]">
                  2017
                </h4>
                <p className="text-xs text-[#1D2A20]/65 mt-1">
                  Childcare Journey Began
                </p>
              </div>

              <div className="rounded-xl bg-white border border-[#F0E8E1] p-4">
                <h4 className="font-nunito font-extrabold text-xl text-[#CF7883]">
                  Mother of 3
                </h4>
                <p className="text-xs text-[#1D2A20]/65 mt-1">
                  A Mother's Caring Touch
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* QUALIFICATIONS & SAFETY CREDENTIALS */}
        <div className="mt-6 sm:mt-14">

          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">

            <div>
              <h3 className="font-nunito font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#244730]">
                Qualifications & Safety Credentials
              </h3>
            </div>

            <p className="text-sm text-[#1D2A20]/65 max-w-sm leading-relaxed">
              Professional training and a commitment to providing safe,
              reliable and quality childcare.
            </p>

          </div>

          {/* Horizontal Credentials Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {founder.certifications.map((item, idx) => {
              const Icon = credentialIcons[idx % credentialIcons.length];

              return (
                <Card
                  key={idx}
                  variant="pastel"
                  className="p-5 sm:p-6 border border-[#F0E8E1] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >

                  {/* Icon and Year */}
                  <div className="flex items-center justify-between mb-5">

                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-[#244730]" />
                    </div>

                    <span className="text-xs font-extrabold text-[#CF7883] bg-white px-3 py-1.5 rounded-full">
                      {item.year}
                    </span>

                  </div>

                  {/* Credential Details */}
                  <h4 className="font-nunito font-extrabold text-lg text-[#244730] leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs font-bold text-[#CF7883] mt-2">
                    {item.institution}
                  </p>

                  <p className="text-sm text-[#1D2A20]/75 mt-3 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bottom Verified Label */}
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#E9DED5]">
                    <CheckCircle2 className="w-4 h-4 text-[#244730]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#244730]">
                      Professional Credential
                    </span>
                  </div>

                </Card>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
