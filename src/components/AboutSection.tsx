"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  Quote,
  ArrowRight,
} from "lucide-react";

import { BUSINESS_INFO } from "@/data/dayhomeData";
import { IMAGES } from "@/data/images";

/**
 * About Us — home page section
 * Palette : Forest Green #244730 · Dusty Rose #CF7883 · Pastel Sand #FDF9F6
 * Fonts   : font-nunito (primary) · font-sans (secondary)
 */

/* ───────────────────────── helpers ───────────────────────── */
const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useParallax<T extends HTMLElement>(strength = 24) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || prefersReducedMotion()) return;
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

const FROM = {
  up: "translate3d(0, 24px, 0)",
  left: "translate3d(-48px, 0, 0)",
  right: "translate3d(48px, 0, 0)",
};

/** Fade + slide + un-blur when scrolled into view. */
function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  from?: keyof typeof FROM;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-[1000ms] ${EASE} ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : FROM[from],
        filter: inView ? "blur(0)" : "blur(6px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Number that counts up once it scrolls into view. */
function Counter({
  to,
  from = 0,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  from?: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

const BTN =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CF7883]/50 sm:text-base";

const STATS = [
  {
    to: 9,
    from: 0,
    suffix: "+",
    label: "Years of Childcare Experience",
    accent: false,
  },
  {
    to: 3,
    from: 0,
    suffix: "",
    label: "Level 3 Certified Educator",
    accent: true,
  },
  { to: 2017, from: 2000, suffix: "", label: "Journey began", accent: false },
];

/** Balloon that floats from section bottom to top once `play` becomes true. */
function FlyingBalloon({
  play,
  containerRef,
  duration = 17000,
}: {
  play: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  duration?: number;
}) {
  const riseRef = useRef<HTMLDivElement>(null);
  const swayRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!play || started.current) return;
    const rise = riseRef.current;
    const sway = swayRef.current;
    const container = containerRef.current;
    if (!rise || !sway || !container || prefersReducedMotion()) return;
    started.current = true;

    const distance = container.offsetHeight + rise.offsetHeight + 40;

    // vertical flight: bottom -> top, fades in and out at the ends
    const flight = rise.animate(
      [
        { transform: "translate3d(0,0,0)", opacity: 0 },
        { opacity: 1, offset: 0.08 },
        { opacity: 1, offset: 0.9 },
        { transform: `translate3d(0,${-distance}px,0)`, opacity: 0 },
      ],
      { duration, easing: "cubic-bezier(.45,.05,.55,.95)", fill: "both" },
    );

    // gentle side-to-side sway + tilt
    const swayAnim = sway.animate(
      [
        { transform: "translateX(0) rotate(0deg)" },
        { transform: "translateX(18px) rotate(4deg)" },
        { transform: "translateX(-12px) rotate(-4deg)" },
        { transform: "translateX(14px) rotate(3deg)" },
        { transform: "translateX(0) rotate(0deg)" },
      ],
      { duration: 5000, iterations: Infinity, easing: "ease-in-out" },
    );

    flight.onfinish = () => swayAnim.cancel();

    return () => {
      flight.cancel();
      swayAnim.cancel();
    };
  }, [play, containerRef, duration]);

  return (
    <div
      ref={riseRef}
      className="absolute right-[4%] z-40 top-full w-16 opacity-0 will-change-transform sm:right-[6%] sm:w-20"
    >
      <div ref={swayRef} className="will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/baloon.svg" alt="" className="h-auto w-full" />
      </div>
    </div>
  );
}

/* ───────────────────────── section ───────────────────────── */
export default function AboutSection() {
  const { founder } = BUSINESS_INFO;
  const credentialIcons = [GraduationCap, ShieldCheck, HeartHandshake, Award];

  const { ref: sectionRef, inView: sectionInView } =
    useInView<HTMLElement>(0.15);
  const blobA = useParallax<HTMLDivElement>(60);
  const blobB = useParallax<HTMLDivElement>(-40);

  // image clip-reveal + parallax
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>(0.1);
  const imgParallax = useParallax<HTMLDivElement>(28);

  // subtle 3D tilt (hover-capable devices only)
  const tiltRef = useRef<HTMLDivElement>(null);
  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (
      !el ||
      prefersReducedMotion() ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${(x * 6).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
  };
  const resetTilt = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform =
        "perspective(1200px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#FDF9F6] pt-1 sm:pt-2 md:pt-3 lg:pt-4"
    >
      {/* ambient background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Background blobs */}
        <div
          ref={blobA}
          className="absolute -left-28 top-24 h-80 w-80 rounded-full bg-[#CF7883]/15 blur-3xl"
        />

        <div
          ref={blobB}
          className="absolute -right-24 bottom-40 h-96 w-96 rounded-full bg-[#244730]/10 blur-3xl"
        />

        {/* Floating Balloon */}
        <FlyingBalloon play={sectionInView} containerRef={sectionRef} />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* ───────── Heading ───────── */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#CF7883]/30 bg-[#CF7883]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#CF7883]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CF7883]" />
            About Us
          </span>

          <h2 className="mt-5 font-nunito text-3xl font-extrabold leading-[1.15] text-[#244730] sm:text-4xl lg:text-5xl">
            Nurturing Young Minds with{" "}
            <span className="relative inline-block text-[#CF7883]">
              Experience &amp; Heart
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-[#1D2A20]/75 sm:text-lg">
            A certified Level 3 Early Childhood Educator and mother of three,
            dedicated to creating Calgary&apos;s most comforting and encouraging
            home childcare.
          </p>
        </Reveal>

        {/* ───────── Main layout ───────── */}
        <div className="mt-6 grid grid-cols-1 items-center gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — founder image */}
          <Reveal from="left" className="lg:col-span-5">
            <div
              ref={tiltRef}
              onMouseMove={onTilt}
              onMouseLeave={resetTilt}
              className="relative mx-auto w-full max-w-[520px] transition-transform duration-300 ease-out will-change-transform"
            >
              {/* offset outline frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-[#CF7883]/50 sm:translate-x-5 sm:translate-y-5"
              />

              {/* photo */}
              <div
                ref={imgRef}
                className={`relative aspect-[5/5] w-full overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_60px_-30px_rgba(36,71,48,0.55)] transition-[clip-path,opacity] duration-[1300ms] ${EASE}`}
                style={{
                  clipPath: imgInView
                    ? "inset(0% 0% 0% 0% round 2rem)"
                    : "inset(12% 10% 12% 10% round 2rem)",
                  opacity: imgInView ? 1 : 0,
                }}
              >
                <div
                  ref={imgParallax}
                  className="absolute -inset-[8%] will-change-transform"
                >
                  <div
                    className="relative h-full w-full transition-transform duration-[1600ms] ease-out"
                    style={{ transform: imgInView ? "scale(1)" : "scale(1.2)" }}
                  >
                    <Image
                      src={"/images/owner.jpg"}
                      alt="Indu Bala, Founder of EarlySteps Dayhome in Whitehorn Calgary"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center scale-87"
                    />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#244730]/55 via-transparent to-transparent" />
              </div>

              {/* floating experience card */}
            </div>
          </Reveal>

          {/* RIGHT — story */}
          <div className="flex flex-col lg:col-span-7">
            <Reveal from="right" delay={150}>
              <div className="mt-6 space-y-5 font-sans text-base leading-relaxed text-[#1D2A20]/90 sm:text-lg">
                <p className="first-letter:float-left first-letter:mr-1 first-letter:font-nunito first-letter:text-4xl first-letter:font-extrabold first-letter:text-[#244730]">
                  {founder.bio[0]}
                </p>
                <p>{founder.bio[1]}</p>
              </div>
            </Reveal>

            {/* animated stats */}
            <Reveal delay={350}>
              <div className="mt-6 grid grid-cols-3 divide-x divide-[#F0E8E1] overflow-hidden rounded-2xl border border-[#F0E8E1] bg-white">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="px-2 py-4 text-center transition-colors duration-300 hover:bg-[#FDF9F6] sm:px-4 sm:py-5"
                  >
                    <p
                      className={`font-nunito text-2xl font-extrabold leading-none sm:text-3xl lg:text-4xl ${
                        s.accent ? "text-[#CF7883]" : "text-[#244730]"
                      }`}
                    >
                      <Counter to={s.to} from={s.from} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-[11px] font-medium leading-tight text-[#1D2A20]/65 sm:text-xs">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* actions */}
            <Reveal delay={450} className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className={`${BTN} bg-[#CF7883] text-white hover:shadow-[0_12px_28px_-10px_rgba(207,120,131,0.9)]`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-[400%]"
                />
                <span className="relative">Book a Visit</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/our-care"
                className={`${BTN} border-2 border-[#244730] text-[#244730] hover:bg-[#244730] hover:text-white`}
              >
                Explore Our Care
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ───────── Qualifications ───────── */}
        <div className="mt-8 lg:mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {founder.certifications.map((item, idx) => {
              const Icon = credentialIcons[idx % credentialIcons.length];
              return (
                <Reveal key={idx} delay={idx * 110} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#F0E8E1] bg-white p-5 shadow-[0_14px_30px_-24px_rgba(36,71,48,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-22px_rgba(36,71,48,0.55)] sm:p-6">
                    {/* animated top accent */}
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#CF7883] to-[#244730] transition-transform duration-500 group-hover:scale-x-100" />

                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF9F6] text-[#244730] transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#244730] group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-[#CF7883]/10 px-3 py-1.5 text-xs font-extrabold text-[#CF7883]">
                        {item.year}
                      </span>
                    </div>

                    <h4 className="font-nunito text-lg font-extrabold leading-snug text-[#244730]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs font-bold text-[#CF7883]">
                      {item.institution}
                    </p>
                  </article>
                </Reveal>
              );
            })}
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
          fill="#ECEEE3"
        ></path>
      </svg>
    </section>
  );
}
