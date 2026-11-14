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
      className="relative overflow-hidden bg-[#FDF9F6] py-8 sm:py-10 md:py-12 lg:py-16"
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
                href="/contact"
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
                href="#care"
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
    </section>
  );
}
