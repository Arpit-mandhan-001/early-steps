import Image from "next/image";
import {
  BadgeCheck,
  Star,
  Play,
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  Award,
  CheckCircle2,
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/dayhomeData";
import Card from "../ui/Card";

const features = [
  {
    title: "Care and safety",
    color: "#CF7883",
  },
  {
    title: "Work experience",
    color: "#244730",
  },
  {
    title: "Love for children",
    color: "#7BC9D1",
  },
  {
    title: "Higher education",
    color: "#E99B50",
  },
];

export default function AboutHero() {
  const { founder } = BUSINESS_INFO;

  const credentialIcons = [GraduationCap, ShieldCheck, HeartHandshake, Award];

  return (
    <section className="w-full bg-[#FDF9F6]">
      <div className="container mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-16 items-center">
          {/* LEFT - MODERN EDITORIAL IMAGE LAYOUT */}
          <div className="relative w-full max-w-[650px] mx-auto">
            {/* Top Decorative Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#CF7883]">
                Moments That Matter
              </span>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-12 gap-4 items-start">
              {/* Main Image */}
              <div className="col-span-8">
                <div className="relative h-[300px] sm:h-[390px] md:h-[450px] rounded-[24px] overflow-hidden">
                  <Image
                    src="/images/dayhome/dayhome-12.jpeg"
                    alt="Children enjoying activities with their caregiver"
                    fill
                    priority
                    sizes="(max-width: 768px) 65vw, 35vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-4 flex flex-col gap-4 pt-12">
                {/* Secondary Image */}
                <div className="relative h-[180px] sm:h-[230px] md:h-[270px] rounded-[24px] overflow-hidden">
                  <Image
                    src="/images/dayhome/dayhome-27.jpeg"
                    alt="Caregiver spending quality time with children"
                    fill
                    sizes="(max-width: 768px) 35vw, 18vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Decorative Card */}
                <div className="bg-[#E8DF85] rounded-[24px] p-4 sm:p-5 min-h-[110px] flex flex-col justify-center">
                  <Star
                    size={24}
                    className="text-[#CF7883] fill-[#CF7883] mb-2"
                  />
                  <p className="text-[#493D35] text-sm sm:text-base font-semibold leading-snug">
                    Little moments, lasting memories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="pt-8 lg:pt-0">
            {/* Small Heading */}
            <span className="font-nunito font-bold text-lg sm:text-xl text-[#CF7883]">
              Who we are
            </span>

            {/* Main Heading */}
            <h2 className="font-nunito font-extrabold text-[#244730] text-3xl sm:text-4xl md:text-5xl xl:text-[58px] leading-[1.12] mt-4 mb-6">
              Welcome to the Most Secure Place!
            </h2>

            {/* Description */}
            <p className="font-sans text-[#858995] text-base sm:text-[17px] leading-7 sm:leading-8 mb-8">
              We know how to locate a nanny who is very professional and has an
              impeccable resume. We will choose a qualified and compassionate
              nanny for a full-time, part-time, or live-in position, so your
              child will be in capable hands. It's crucial to consider the
              child's safety.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 group"
                >
                  <span
                    className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: feature.color }}
                  >
                    <BadgeCheck
                      size={14}
                      strokeWidth={3}
                      className="text-white"
                    />
                  </span>

                  <h3 className="font-nunito font-extrabold text-[#244730] text-lg sm:text-xl">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-14">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="font-nunito font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#244730]">
                Qualifications & Safety Credentials
              </h3>
            </div>

            <p className="text-sm text-[#1D2A20]/65 max-w-sm leading-relaxed">
              Professional training and a commitment to providing safe, reliable
              and quality childcare.
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

                 
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
