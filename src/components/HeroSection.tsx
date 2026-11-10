
import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  PhoneCall,
  MapPin,
  Heart,
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/dayhomeData";
import { IMAGES } from "@/data/images";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-linear-to-b from-[#FDF9F6] via-white to-white py-8 sm:py-10 md:py-12 lg:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-0 items-center">

          {/* Left Column */}
          <div className="h-full lg:col-span-6 flex flex-col items-start text-left">

            {/* Top Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="rose" size="md">
                <span>
                  Now Welcoming Enrollment • Ages {BUSINESS_INFO.ageGroup}
                </span>
              </Badge>

              <Badge
                variant="forest"
                size="md"
                className="hidden mt-3 sm:mt-0 sm:inline-flex"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Whitehorn, Calgary, AB</span>
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="
            mt-3
              text-[38px]
              leading-[1.02]
              sm:text-5xl
              md:text-6xl
              lg:text-[80px]
              font-black
              font-nunito
              text-[#244730]
              tracking-tight
            ">
              Little steps.
              <br />
              <span className="text-[#CF7883] relative inline-block">
                Big beginnings.
              </span>
            </h1>

            {/* Core Message */}
            <p className="
              mt-4
              sm:mt-5
              md:mt-6
              lg:mt-14
              text-base
              sm:text-lg
              md:text-xl
              text-[#1D2A20]/85
              font-sans
              leading-relaxed
              max-w-2xl
            ">
              {BUSINESS_INFO.mainMessage}
            </p>

            {/* Action Buttons */}
            <div className="
              mt-6
              md:mt-8
              lg:mt-14
              flex
              flex-col
              sm:flex-row
              items-stretch
              sm:items-center
              gap-3
              sm:gap-4
              w-full
              sm:w-auto
            ">
              <Button
                href="#enrollment"
                variant="rose"
                icon={<ArrowRight className="w-5 h-5" />}
                className="sm:text-sm md:text-sm lg:text-lg"
              >
                Enquire About Enrollment
              </Button>

              <Button
                href="#space"
                variant="outline"
                className="sm:text-sm md:text-sm lg:text-lg"
              >
                Explore Our Dayhome
              </Button>
            </div>

            {/* Phone Contact */}
            <div className="
              mt-5
              md:mt-7
              lg:mt-14
              flex
              items-start
              sm:items-center
              gap-2
              text-sm
              sm:text-base
              text-[#1D2A20]/75
            ">
              <PhoneCall className="w-4 h-4 mt-1 sm:mt-0 shrink-0 text-[#CF7883]" />

              <span>
                Prefer to talk directly? Call Indu at{" "}
                 <br className="block sm:hidden" />
                <a
                  href={BUSINESS_INFO.contact.phoneTel}
                  className="font-bold text-[#244730] hover:underline"
                >
                  {BUSINESS_INFO.contact.phoneDisplay}
                </a>
              </span>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none">

              {/* Main Image */}
              <div className="
                relative
                rounded-2xl
                sm:rounded-3xl
                overflow-hidden
                border-4
                border-white
                shadow-2xl
                shadow-black/10
                bg-[#FDF9F6]
                aspect-[4/3]
                sm:aspect-[5/4]
              ">
                <Image
                  src={IMAGES.hero.main}
                  alt="EarlySteps Dayhome playroom and learning environment in Whitehorn Calgary"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Caption */}
                <div className="
                hidden sm:block
                  absolute
                  bottom-3
                  sm:bottom-4
                  left-3
                  sm:left-4
                  right-3
                  sm:right-4
                  bg-white/90
                  backdrop-blur-md
                  rounded-xl
                  sm:rounded-2xl
                  p-2.5
                  sm:p-3
                  shadow-lg
                  items-center
                  justify-between
                  gap-2
                  border
                  border-white/50
                ">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="
                      w-8 h-8
                      sm:w-9 sm:h-9
                      rounded-xl
                      bg-[#244730]
                      text-white
                      flex
                      items-center
                      justify-center
                      shrink-0
                    ">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#CF7883] fill-[#CF7883]" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-nunito font-extrabold text-xs sm:text-sm text-[#244730] leading-tight">
                        Safe, Warm & Play-Based
                      </p>

                      <p className="font-sans text-[10px] sm:text-xs text-[#1D2A20]/70">
                        Real home environment in Whitehorn
                      </p>
                    </div>
                  </div>

                  <span className="
                    text-[10px]
                    sm:text-xs
                    font-bold
                    text-[#CF7883]
                    uppercase
                    tracking-wider
                    bg-[#CF7883]/10
                    px-2
                    sm:px-2.5
                    py-1
                    rounded-full
                    shrink-0
                  ">
                    Ages 1–5
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
