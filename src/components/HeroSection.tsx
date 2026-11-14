"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall, MapPin, Heart } from "lucide-react";
import { BUSINESS_INFO } from "@/data/dayhomeData";
import { IMAGES } from "@/data/images";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

/* ---------- helpers ---------- */
const EASE = "ease-[cubic-bezier(.16,1,.3,1)]";
const SLIDE = `transition-[opacity,transform] duration-[1800ms] ${EASE}`;

function useParallax<T extends HTMLElement>(strength = 24) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (
      !el ||
      !parent ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = parent.getBoundingClientRect();
      const p =
        (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translate3d(0, ${(-p * strength).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

export default function HeroSection() {
  const par = useParallax<HTMLDivElement>(26);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(true);
      return;
    }
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const slide = (from: "left" | "right", delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted
      ? "translateX(0)"
      : `translateX(${from === "left" ? "-90px" : "90px"})`,
    transitionDelay: `${delay}ms`,
  });

  const openBox = (delay = 0) => ({
    clipPath: mounted
      ? "inset(-5% -5% -10% -5% round 0rem)"
      : "inset(16% 12% 16% 12% round 1.5rem)",
    opacity: mounted ? 1 : 0,
    transitionDelay: `${delay}ms`,
  });

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F5DEDE] pt-8 sm:pt-10 md:pt-12 lg:pt-16"
    >
      <div className="container mx-auto px-4 pb-6 sm:px-6 sm:pb-8 md:pb-10 lg:px-8 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-0 items-center">
          {/* Left Column */}
          <div className="h-full lg:col-span-6 flex flex-col items-start text-left">
            {/* Top Badges */}
            <div
              style={slide("left", 0)}
              className={`${SLIDE} mb-3 sm:mb-4 flex flex-wrap items-center gap-2`}
            >
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
            <h1
              style={slide("left", 120)}
              className={`${SLIDE} mt-2 sm:mt-3 text-[32px] min-[400px]:text-[38px] leading-[1.05] sm:text-5xl sm:leading-[1.04] md:text-6xl md:leading-[1.03] lg:text-[80px] lg:leading-[1.02] font-black font-nunito text-[#244730] tracking-tight`}
            >
              Little steps.
              <br />
              <span className="text-[#CF7883] relative inline-block">
                Big beginnings.
              </span>
            </h1>

            {/* Core Message */}
            <p
              style={slide("left", 240)}
              className={`${SLIDE} mt-4 sm:mt-5 md:mt-6 lg:mt-14 text-[15px] sm:text-lg md:text-xl text-[#1D2A20]/85 font-sans leading-relaxed max-w-xl md:max-w-2xl`}
            >
              {BUSINESS_INFO.mainMessage}
            </p>

            {/* Action Buttons */}
            <div
              style={slide("left", 360)}
              className={`${SLIDE} mt-6 sm:mt-7 md:mt-8 lg:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto`}
            >
              <Button
                href="/contact-us"
                variant="rose"
                icon={
                  <ArrowRight className="w-5 h-5 relative transition-transform duration-300 group-hover:translate-x-1" />
                }
                className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(207,120,131,0.9)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CF7883]/50 sm:text-sm md:text-base lg:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-[400%]"
                />
                <span className="relative">Enquire About Enrollment</span>
              </Button>

              <Button
                href="/our-care"
                variant="outline"
                className="group transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CF7883]/50 sm:text-sm md:text-base lg:text-lg"
              >
                Explore Our Dayhome
              </Button>
            </div>

            {/* Phone Contact */}
            <div
              style={slide("left", 480)}
              className={`${SLIDE} mt-5 sm:mt-6 md:mt-7 lg:mt-14 flex items-start sm:items-center gap-2 text-sm sm:text-base text-[#1D2A20]/75`}
            >
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
          <div
            style={slide("right", 200)}
            className={`${SLIDE} lg:col-span-6 relative w-full`}
          >
            <div className="relative mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-none">
              {/* Main Image */}
              <div
                style={openBox(800)}
                className="
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
    transition-[clip-path,opacity]
    duration-[1800ms]
    ease-[cubic-bezier(.16,1,.3,1)]
  "
              >
                <div
                  ref={par}
                  className="absolute -inset-[8%] will-change-transform"
                >
                  <Image
                    src={"/images/hero1.avif"}
                    alt="EarlySteps Dayhome playroom and learning environment in Whitehorn Calgary"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Caption */}
                <div
                  className="
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
                "
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div
                      className="
                      w-8 h-8
                      sm:w-9 sm:h-9
                      rounded-xl
                      bg-[#244730]
                      text-white
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                    >
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

                  <span
                    className="
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
                  "
                  >
                    Ages 1–5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg
        className="block w-full h-[80px] sm:h-[110px] md:h-[160px] lg:h-[258px]"
        viewBox="0 0 1911 258"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1318.02 226.876C1288.13 195.914 1289.01 146.59 1319.96 116.701C1350.93 86.8113 1400.25 87.6869 1430.14 118.643C1435.91 83.0982 1469.4 58.9629 1504.94 64.7367C1540.49 70.5104 1564.62 104.001 1558.85 139.539C1549.24 102.618 1571.38 64.9079 1608.3 55.2959C1645.22 45.6905 1682.93 67.8309 1692.54 104.745C1689.68 78.6345 1708.53 55.151 1734.64 52.2872C1760.75 49.4233 1784.23 68.272 1787.09 94.3824C1787.3 42.0498 1829.89 -0.203354 1882.23 0.000736237C1934.56 0.21141 1976.81 42.8003 1976.61 95.1329C1983.22 67.6335 2010.88 50.7071 2038.37 57.3302C2065.87 63.9466 2082.8 91.6041 2076.18 119.097C2095.47 124.068 2107.07 143.733 2102.1 163.022C2097.13 182.312 2077.47 193.919 2058.18 188.948C2103.9 182.793 2145.96 214.868 2152.11 260.59C2158.27 306.313 2126.19 348.369 2080.47 354.524C2114.27 351.015 2144.51 375.572 2148.02 409.372C2151.53 443.172 2126.98 473.417 2093.18 476.926C2123.48 487.63 2139.37 520.877 2128.66 551.181C2117.96 581.485 2084.71 597.371 2054.4 586.667C2054.18 604.831 2039.28 619.374 2021.12 619.15C2002.95 618.926 1988.41 604.021 1988.64 585.863C2005.18 601.631 2005.8 627.82 1990.04 644.365C1974.28 660.909 1948.09 661.535 1931.54 645.774C1940.42 701.089 1902.78 753.125 1847.46 762.006C1792.15 770.887 1740.11 733.243 1731.23 677.934C1717.29 689.679 1696.48 687.908 1684.73 673.971C1672.98 660.034 1674.75 639.217 1688.68 627.465C1682.4 651.831 1657.55 666.479 1633.18 660.192C1608.82 653.904 1594.17 629.058 1600.46 604.692C1605.06 660.475 1563.58 709.437 1507.79 714.038C1452.01 718.64 1403.05 677.157 1398.45 621.375C1392.55 650.303 1364.34 668.974 1335.41 663.082C1306.48 657.19 1287.81 628.966 1293.7 600.044C1295.37 618.584 1281.69 634.964 1263.16 636.629C1244.62 638.295 1228.24 624.621 1226.57 606.082C1222.08 634.483 1195.42 653.865 1167.02 649.375C1138.62 644.885 1119.24 618.221 1123.73 589.827C1116.76 617.366 1088.79 634.048 1061.25 627.083C1033.71 620.118 1017.03 592.144 1023.99 564.605C1026.08 612.217 989.168 652.502 941.556 654.589C893.944 656.669 853.659 619.762 851.572 572.15C869.584 578.898 878.716 598.971 871.968 616.99C865.22 635.003 845.146 644.141 827.127 637.386C813.328 669.218 776.335 683.833 744.504 670.034C712.672 656.235 698.057 619.242 711.856 587.411C703.949 633.146 660.458 663.813 614.722 655.899C568.987 647.992 538.32 604.501 546.234 558.766C540.941 586.377 514.264 604.475 486.653 599.182C459.041 593.889 440.943 567.212 446.236 539.601C459.496 582.091 435.795 627.287 393.298 640.54C350.808 653.799 305.612 630.098 292.359 587.602C293.926 601.624 283.834 614.265 269.804 615.838C255.781 617.405 243.141 607.313 241.567 593.283C221.613 616.207 186.852 618.61 163.928 598.655C141.004 578.701 138.601 543.939 158.555 521.016C175.89 572.117 148.522 627.596 97.4207 644.931C46.3193 662.265 -9.1602 634.898 -26.4947 583.796C-49.9452 603.369 -84.8248 600.229 -104.404 576.778C-123.984 553.328 -120.837 518.448 -97.3862 498.869C-138.487 530.99 -197.845 523.708 -229.966 482.607C-262.087 441.506 -254.805 382.149 -213.704 350.028C-247.096 318.335 -248.472 265.574 -216.779 232.176C-185.086 198.784 -132.325 197.408 -98.9268 229.101C-128.395 222.801 -147.184 193.807 -140.884 164.332C-134.583 134.865 -105.589 116.082 -76.1148 122.376C-72.0001 78.6082 -33.1901 46.4607 10.5772 50.5689C54.3446 54.6836 86.4921 93.4936 82.3839 137.261C76.8867 123.389 83.6743 107.681 97.5458 102.184C111.417 96.6866 127.126 103.474 132.623 117.346C135.783 90.8799 159.8 71.9852 186.272 75.1453C212.738 78.3054 231.633 102.322 228.473 128.795C210.546 92.0518 225.8 47.738 262.536 29.811C299.279 11.884 343.592 27.1381 361.519 63.8743C390.336 20.8574 448.567 9.34275 491.584 38.1589C534.601 66.9751 546.115 125.207 517.299 168.223C520.598 144.536 542.475 128.011 566.162 131.309C589.85 134.608 606.375 156.485 603.076 180.172C592.424 144.714 612.53 107.326 647.996 96.6734C683.455 86.0213 720.843 106.127 731.495 141.593C745.788 119.926 774.94 113.955 796.606 128.248C818.272 142.541 824.244 171.693 809.951 193.359C808.845 156.472 837.845 125.674 874.733 124.568C911.62 123.462 942.418 152.462 943.524 189.35C942.971 146.024 977.647 110.446 1020.97 109.893C1064.3 109.34 1099.88 144.016 1100.43 187.342C1092.92 139.302 1125.78 94.2705 1173.82 86.7587C1221.86 79.2534 1266.89 112.112 1274.41 160.152C1292.83 148.111 1317.52 153.285 1329.56 171.706C1341.62 190.147 1336.44 214.841 1318.02 226.876Z"
          fill="#FDF9F6"
        ></path>
      </svg>
    </section>
  );
}