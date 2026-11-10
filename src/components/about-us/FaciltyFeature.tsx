import Image from "next/image";
import { Puzzle, Utensils, Flower2 } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Brand palette
 * Primary  : Forest Green  #244730
 * Accent   : Dusty Rose    #CF7883
 * Neutral  : Pastel Sand   #FDF9F6
 *
 * Fonts (see tailwind config note): font-nunito = primary, font-sans = secondary
 */

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
  iconBg: string;
};

const features: Feature[] = [
  {
    title: "Soft & Safe Infant Rooms",
    description:
      "Play-based learning designed to support independence, curiosity, and early motor skill development",
    icon: <Puzzle className="h-7 w-7 text-[#244730]" strokeWidth={1.5} />,
    iconBg: "bg-[#CF7883]/30 shadow-[0_0_0_6px_rgba(207,120,131,0.12)]",
  },
  {
    title: "Feeding & Nutrition Zone",
    description:
      "Play-based learning designed to support independence, curiosity, and early motor skill development",
    icon: <Utensils className="h-7 w-7 text-[#244730]" strokeWidth={1.5} />,
    iconBg: "bg-[#244730]/15 shadow-[0_0_0_6px_rgba(36,71,48,0.07)]",
  },
  {
    title: "Outdoor Stroller Garden",
    description:
      "Play-based learning designed to support independence, curiosity, and early motor skill development",
    icon: <Flower2 className="h-7 w-7 text-[#244730]" strokeWidth={1.5} />,
    iconBg: "bg-[#E9D9A6]/70 shadow-[0_0_0_6px_rgba(233,217,166,0.3)]",
  },
];

export default function FacilityFeatures() {
  return (
    <section className="w-full overflow-hidden bg-[#FDF9F6] py-8 sm:py-10 md:py-12 lg:py-16">
      {/* Clip path for the photo blob (shared, zero-size) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="facility-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.26 0.18 C0.28 0.05 0.40 0.02 0.50 0.08 C0.56 0.14 0.62 0.17 0.70 0.17 L0.97 0.17 L0.99 0.60 L0.99 0.98 C0.80 1.0 0.60 0.96 0.40 0.90 C0.20 0.84 0.02 0.78 0.01 0.55 C0.01 0.40 0.15 0.30 0.26 0.18 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* ───────── Left : blob image ───────── */}
          <div className="relative mx-auto aspect-[4/4.4] w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[660px]">
            

            {/* main photo */}
            <Image
              src="/images/about-img4.png"
              alt="Children playing with colorful dough"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-contain"
              style={{ clipPath: "url(#facility-blob)" }}
              priority
            />

            
          </div>

          {/* ───────── Right : content ───────── */}
          <div className="relative font-nunito">
            <p className="text-lg font-semibold text-[#CF7883] sm:text-xl">
              Facility Features
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-[1.15] text-[#244730] sm:text-4xl md:text-5xl lg:text-[56px]">
              Thoughtfully Designed Spaces for Babies &amp; Toddlers
            </h2>

            <p className="mt-5 max-w-[640px] font-sans leading-relaxed text-[#244730]/60 text-base sm:text-[17px] lg:mt-6 lg:leading-[1.8]">
              At Kiddly, we believe that early childhood is a magical time
              filled with discovery, laughter, and learning. Our center is more
              than just a daycare it&apos;s a safe, Kiddly nurturing space
            </p>

            <ul className="mt-8 space-y-6 lg:mt-10 lg:space-y-8">
              {features.map((f) => (
                <li key={f.title} className="flex items-start gap-4 sm:gap-5">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-[66px] sm:w-[66px] ${f.iconBg}`}
                  >
                    {f.icon}
                  </span>

                  <div className="max-w-[500px]">
                    <h3 className="text-[18px] font-semibold text-[#244730] sm:text-xl">
                      {f.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-base leading-relaxed text-[#244730]/60 sm:text-[17px]">
                      {f.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}