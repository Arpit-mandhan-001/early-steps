"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

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
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-[1000ms] ${EASE} ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
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
      <h2 aria-label={text} className={`font-nunito ${className}`}>
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
      </h2>
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

const BTN =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CF7883]/50 sm:text-base";

/* ---------- section ---------- */
// Real details supplied for EarlySteps Dayhome
const PHONE = "403-467-8895";
const TEL = "tel:+14034678895";
const EMAIL = "EarlySteps786dayhome@gmail.com";

const TIMELINE = [
  { year: "2017", text: "Started working in childcare." },
  { year: "2021", text: "Earned Level 2 certification from Red Deer Polytechnic." },
  { year: "2025", text: "Achieved Level 3 certification." },
];

const STATS: { value: number | string; label: string }[] = [
  { value: 9, label: "years of childcare experience" },
  { value: "1–5", label: "years old, currently enrolling" },
  { value: 2, label: "snacks plus a healthy lunch daily" },
];

export default function CareTrust() {
  const { ref: lineRef, inView: lineIn } = useInView<HTMLOListElement>(0.3);

  return (
    <section className="relative overflow-x-clip bg-[#244730] font-sans text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="max-w-2xl">
              <Heading text="Care you can trust" className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" />
              <Reveal delay={250}>
                <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                  Led by Indu Bala, a Level 3 Early Childhood Educator, mother of three, and originally from New Delhi.
                  First Aid certified, with police clearance.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STATS.map(({ value, label }, i) => (
                <Reveal key={label} delay={i * 150}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-5 transition-colors duration-500 hover:bg-white/10">
                    <p className="font-nunito text-5xl font-extrabold text-[#CF7883]">
                      {typeof value === "number" ? <CountUp to={value} /> : value}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-white/80">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Timeline: a real sequence, so the line draws as it enters view */}
          <ol ref={lineRef} className="relative ml-3 flex flex-col gap-10 self-center pl-10">
            <span
              aria-hidden="true"
              className={`absolute bottom-2 left-0 top-2 w-0.5 origin-top bg-[#CF7883] transition-transform duration-[1800ms] ${EASE}`}
              style={{ transform: lineIn ? "scaleY(1)" : "scaleY(0)" }}
            />
            {TIMELINE.map(({ year, text }, i) => (
              <li key={year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3.15rem] top-2 h-4 w-4 rounded-full border-4 border-[#244730] bg-[#CF7883] transition-transform duration-700"
                  style={{ transform: lineIn ? "scale(1)" : "scale(0)", transitionDelay: `${400 + i * 500}ms` }}
                />
                <Reveal delay={i * 250}>
                  <p className="font-nunito text-4xl font-extrabold">{year}</p>
                  <p className="mt-1 max-w-sm text-base text-white/80">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-white/10 p-6 sm:p-8 lg:flex-row lg:items-center">
            <p className="max-w-md font-nunito text-2xl font-extrabold leading-snug">
              Ask Indu about availability, fees, hours, and visits.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={TEL} className={`${BTN} bg-[#CF7883] text-white hover:shadow-[0_12px_28px_-10px_rgba(207,120,131,0.9)]`}>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-[400%]"
                />
                <FiPhone className="relative" />
                <span className="relative">Call {PHONE}</span>
              </a>
              <a
                href={`mailto:${EMAIL}?subject=EarlySteps%20Dayhome%20enrollment%20enquiry`}
                className={`${BTN} bg-white text-[#244730] hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)]`}
              >
                <FiMail className="relative" />
                <span className="relative">Email Indu</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}