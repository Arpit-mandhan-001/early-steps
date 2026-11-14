"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiArrowRight, FiCoffee, FiHome, FiMessageCircle, FiShield, FiSmile } from "react-icons/fi";

/* ---------- local helpers ---------- */
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

/** Fade + lift wrapper; `className` lets it sit inside grids (e.g. h-full). */
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

function Heading({ text, className = "" }: { text: string; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref}>
      <h1 aria-label={text} className={`font-nunito ${className}`}>
        {text.split(" ").map((w, i) => (
          <span key={i} aria-hidden="true" className="mr-[0.25em] inline-block overflow-hidden pb-[0.15em] align-bottom">
            <span
              className={`inline-block transition-transform duration-[900ms] ${EASE}`}
              style={{ transform: inView ? "translateY(0)" : "translateY(110%)", transitionDelay: `${i * 60}ms` }}
            >
              {w}
            </span>
          </span>
        ))}
      </h1>
    </div>
  );
}

/** Rounded photo that fills its grid cell: clip reveal, parallax, hover zoom. */
function Frame({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  parallax = 22,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  parallax?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const par = useParallax<HTMLDivElement>(parallax);
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_50px_-26px_rgba(36,71,48,0.5)] transition-[clip-path,opacity] duration-[1300ms] ${EASE} ${className}`}
      style={{
        clipPath: inView ? "inset(0% 0% 0% 0% round 1.75rem)" : "inset(14% 10% 14% 10% round 1.75rem)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div ref={par} className="absolute -inset-[8%] will-change-transform">
        <div
          className="relative h-full w-full transition-transform duration-[1600ms] ease-out"
          style={{ transform: inView ? "scale(1)" : "scale(1.2)" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

/** Solid info tile that pops in with a soft scale. */
function Tile({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <div
      ref={ref}
      className={`rounded-[1.75rem] p-5 transition-[opacity,transform] duration-[900ms] ${EASE} ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.94)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const BTN =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CF7883]/50 sm:text-base";

/* ---------- section ---------- */
const MAIN_IMAGE = { src: "/images/dayhome/dayhome-4.jpeg", alt: "Children playing at EarlySteps Dayhome" };
const SECOND_IMAGE = { src: "/images/dayhome/dayhome-17.jpeg", alt: "Creative activity at EarlySteps Dayhome" };

// Wording taken from the supplied EarlySteps services
const HIGHLIGHTS = [
  { icon: FiHome, label: "Home-based care" },
  { icon: FiSmile, label: "Play-based learning" },
  { icon: FiCoffee, label: "Lunch and two snacks daily" },
  { icon: FiMessageCircle, label: "English and Hindi" },
];

export default function CareHero() {
  const blob = useParallax<HTMLDivElement>(50);

  return (
    <section className="relative overflow-x-clip bg-[#FBEFEF] font-sans text-[#244730]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div ref={blob} className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#CF7883]/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: message, actions, and key facts packed into one column */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <Heading text="Our Care" className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl" />
              <Reveal delay={250}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#244730]/75 sm:text-lg">
                  Warm, home-based childcare for children aged 1–5, where little ones feel safe, make friends, discover
                  new things, and grow through play.
                </p>
              </Reveal>
              <Reveal delay={400} className="mt-10 flex flex-wrap gap-3">
                <a href="#services" className={`${BTN} bg-[#CF7883] text-white hover:shadow-[0_12px_28px_-10px_rgba(207,120,131,0.9)]`}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-[400%]"
                  />
                  <span className="relative">See what we offer</span>
                  <FiArrowRight className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="/contact" className={`${BTN} border-2 border-[#244730] text-[#244730] hover:bg-[#244730] hover:text-white`}>
                  Ask about enrollment
                </a>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {HIGHLIGHTS.map(({ icon: Icon, label }, i) => (
                <Reveal key={label} delay={500 + i * 100} className="h-full">
                  <div className="group/tile flex h-full items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_14px_30px_-22px_rgba(36,71,48,0.6)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_36px_-20px_rgba(36,71,48,0.6)]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FBEFEF] text-lg text-[#CF7883] transition-all duration-500 group-hover/tile:bg-[#CF7883] group-hover/tile:text-white">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="font-nunito text-sm font-bold leading-tight sm:text-base">{label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: photo-led bento that matches the left column height */}
          <div className="grid h-full grid-cols-2 gap-3 sm:gap-4 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto]">
            <Frame
              src={MAIN_IMAGE.src}
              alt={MAIN_IMAGE.alt}
              className="row-span-2 min-h-[22rem] lg:min-h-[26rem]"
              sizes="(min-width: 1024px) 25vw, 50vw"
              priority
              parallax={26}
            />
            <Frame
              src={SECOND_IMAGE.src}
              alt={SECOND_IMAGE.alt}
              className="min-h-[10.5rem]"
              sizes="(min-width: 1024px) 25vw, 50vw"
              priority
              parallax={16}
              delay={150}
            />
            <Tile className="flex min-h-[10.5rem] flex-col justify-between bg-[#244730] text-white" delay={300}>
              <p className="font-nunito text-4xl font-extrabold text-[#CF7883] sm:text-5xl">Ages 1–5</p>
              <div>
                <p className="font-nunito text-lg font-bold leading-tight">Whitehorn, Calgary</p>
                <p className="mt-1 text-sm text-white/80">Currently welcoming enrollment</p>
              </div>
            </Tile>
            <Tile className="col-span-2 flex items-center gap-4 bg-[#CF7883] text-white" delay={450}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-xl">
                <FiShield aria-hidden="true" />
              </span>
              <p className="text-sm leading-snug sm:text-base">
                <span className="font-nunito font-extrabold">Led by Indu Bala.</span> Level 3 Early Childhood Educator,
                First Aid certified, with police clearance.
              </p>
            </Tile>
          </div>
        </div>
      </div>
    </section>
  );
}