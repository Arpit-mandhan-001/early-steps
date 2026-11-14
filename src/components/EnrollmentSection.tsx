"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

import { BUSINESS_INFO } from "@/data/dayhomeData";
import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

/* ---------- local helpers (same as CareHero) ---------- */
const EASE = "ease-[cubic-bezier(.22,1,.36,1)]";

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { threshold, rootMargin: "0px 0px -6% 0px" }
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
    if (!el || !parent || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = parent.getBoundingClientRect();
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
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

/** Fade + lift + un-blur wrapper; `className` lets it sit inside flex/grid layouts. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-[1000ms] ${EASE} ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        filter: inView ? "blur(0)" : "blur(6px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- data ---------- */
const CHECKLIST = [
  "Level 3 Early Childhood Educator",
  "9 Years Childcare Experience",
  "First Aid Certified & Police Cleared",
  "Healthy Lunch & Two Snacks Daily",
  "Bilingual English & Hindi Care",
  "Safe, Smoke-free, Clean Home",
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function FlyingBalloon({
  play,
  containerRef,
  duration = 20000,
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
      className="absolute right-[4%] top-full z-50 w-16 opacity-0 will-change-transform sm:right-[6%] sm:w-20"
    >
      <div ref={swayRef} className="will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/airballon.png" alt="" className="h-auto w-full" />
      </div>
    </div>
  );
}


export default function EnrollmentSection() {
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

  const blob = useParallax<HTMLDivElement>(50);
  const { ref: imgRef, inView: imgInView } = useInView<HTMLDivElement>(0.1);
  const imgParallax = useParallax<HTMLDivElement>(24);
  const { ref: sectionRef, inView: sectionInView } = useInView<HTMLElement>(0.15);

  return (
    <section
    ref={sectionRef}
      id="enrollment"
      className="py-1 sm:py-2 md:py-3 lg:py-4 bg-[#F8F1EC] relative overflow-hidden"
    >
        <FlyingBalloon play={sectionInView} containerRef={sectionRef} />
      {/* soft rose glow that drifts with scroll */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div ref={blob} className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#CF7883]/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <Reveal>
          <SectionHeading
            badgeText="Enrollment Information"
            badgeVariant="rose"
            title="Welcoming New Friends Ages 1–5"
            highlightedWord="Ages 1–5"
            subtitle="We maintain an intimate home environment with dedicated attention for each child. Get in touch with Indu Bala to discuss openings, hours, and schedule your tour."
          />
        </Reveal>

        {/* Highlight Banner Card */}
        <Reveal delay={150} className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-3xl border border-[#F0E8E1] shadow-xl overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-10 items-stretch">

              {/* LEFT CONTENT */}
              <div className="lg:col-span-5 px-6 sm:px-8 lg:px-10 py-8 lg:py-0 flex flex-col justify-center">

                {/* Badges */}
                <Reveal delay={200} className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="forest" size="md">
                    Whitehorn, Calgary
                  </Badge>

                  <Badge variant="rose" size="md">
                    Limited Spaces
                  </Badge>
                </Reveal>

                {/* Heading */}
                <Reveal delay={300}>
                  <h3 className="font-nunito font-extrabold text-2xl sm:text-3xl text-[#244730] leading-tight">
                    Quality Home Childcare Tailored to Your Little One
                  </h3>
                </Reveal>

                {/* Description */}
                <Reveal delay={400}>
                  <p className="mt-4 text-[14px] text-[#1D2A20]/80 font-sans leading-relaxed">
                    {BUSINESS_INFO.enrollmentNote}
                  </p>
                </Reveal>

                {/* Verified Checklist (staggered) */}
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm text-[#1D2A20]/85 font-medium">
                  {CHECKLIST.map((item, i) => (
                    <Reveal key={item} delay={500 + i * 90}>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#244730] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* RIGHT LARGE IMAGE — clip reveal + parallax + zoom-out */}
              <div
                ref={imgRef}
                className={`lg:col-span-5 relative overflow-hidden min-h-[320px] sm:min-h-[400px] lg:min-h-[520px] transition-[clip-path,opacity] duration-[1300ms] ${EASE}`}
                style={{
                  clipPath: imgInView ? "inset(0% 0% 0% 0%)" : "inset(10% 8% 10% 8%)",
                  opacity: imgInView ? 1 : 0,
                  transitionDelay: "250ms",
                }}
              >
                <div ref={imgParallax} className="absolute -inset-[8%] will-change-transform">
                  <div
                    className="relative h-full w-full transition-transform duration-[1600ms] ease-out"
                    style={{ transform: imgInView ? "scale(1)" : "scale(1.2)" }}
                  >
                    <Image
                      src="/images/dayhome/dayhome-29.jpeg"
                      alt="Warm and welcoming home childcare environment"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#142D1D]/60 via-transparent to-transparent" />

                {/* Image Caption */}
                <div
                  className={`absolute bottom-6 left-6 right-6 text-white transition-[opacity,transform] duration-[1000ms] ${EASE}`}
                  style={{
                    opacity: imgInView ? 1 : 0,
                    transform: imgInView ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: "900ms",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                    A Place to Grow & Explore
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Reveal>

      </div>

      
    </section>
  );
}