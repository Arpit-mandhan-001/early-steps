"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiBookOpen, FiCoffee, FiEdit3, FiHome, FiMessageCircle, FiSmile, FiSun } from "react-icons/fi";

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

function Frame({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  parallax = 22,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  parallax?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const par = useParallax<HTMLDivElement>(parallax);
  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-[2rem] bg-white transition-[clip-path,opacity] duration-[1300ms] ${EASE} ${className}`}
      style={{
        clipPath: inView ? "inset(0% 0% 0% 0% round 2rem)" : "inset(16% 10% 16% 10% round 2rem)",
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
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */
// Content comes from the supplied EarlySteps services only. Replace image paths with real photos.
const SERVICES = [
  {
    title: "Home-based care",
    text: "Warm and welcoming home-based childcare.",
    icon: FiHome,
    image: "/images/dayhome/dayhome-44.jpeg",
    span: "lg:col-span-7",
    imageHeight: "h-[220px] sm:h-[280px] lg:h-[350px]",
  },
  {
    title: "Play-based learning",
    text: "Play-based learning and age-appropriate activities.",
    icon: FiSmile,
    image: "/images/dayhome/dayhome-45.jpeg",
    span: "lg:col-span-5",
    imageHeight: "h-[220px] sm:h-[280px] lg:h-[350px]",
  },
  {
    title: "Healthy meals",
    text: "Healthy lunch and snacks daily.",
    icon: FiCoffee,
    image: "/images/food.avif",
    span: "lg:col-span-4",
    imageHeight: "h-[220px] sm:h-[250px] lg:h-[260px]",
  },
  {
    title: "English and Hindi",
    text: "English and Hindi communication.",
    icon: FiMessageCircle,
    image: "/images/dayhome/dayhome-46.jpeg",
    span: "lg:col-span-4",
    imageHeight: "h-[220px] sm:h-[250px] lg:h-[260px]",
  },
  {
    title: "Creative activities",
    text: "Art, crafts, and creative activities.",
    icon: FiEdit3,
    image: "/images/dayhome/dayhome-55.jpeg",
    span: "lg:col-span-4",
    imageHeight: "h-[220px] sm:h-[250px] lg:h-[260px]",
  },
  {
    title: "Outdoor play",
    text: "Outdoor play and physical movement.",
    icon: FiSun,
    image: "/images/dayhome/dayhome-50.jpeg",
    span: "lg:col-span-6",
    imageHeight: "h-[220px] sm:h-[280px] lg:h-[320px]",
  },
  {
    title: "Books and imagination",
    text: "Books, imaginative play, toys, and hands-on exploration.",
    icon: FiBookOpen,
    image: "/images/dayhome/dayhome-36.jpeg",
    span: "lg:col-span-6",
    imageHeight: "h-[220px] sm:h-[280px] lg:h-[320px]",
  },
];

export default function CareServices() {
  return (
    <section id="services" className="relative scroll-mt-20 overflow-x-clip bg-white font-sans text-[#244730]">
      <div className="container mx-auto px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-2xl">
          <Heading
            text="Everything your little one needs to grow"
            className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={250}>
            <p className="mt-5 text-base leading-relaxed text-[#244730]/75 sm:text-lg">
              Simple, caring routines built around play, healthy food, and a home they feel safe in.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12">
          {SERVICES.map(({ title, text, icon: Icon, image, span , imageHeight}, i) => (
            <article
              key={title}
              className={`group/card flex flex-col rounded-[2.25rem] bg-[#FBEFEF] p-3 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-26px_rgba(36,71,48,0.5)] ${span} ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <Frame
                src={image}
                alt={`${title} at EarlySteps Dayhome`}
                className={imageHeight}
                parallax={16}
                delay={(i % 3) * 120}
              />
              <div className="flex items-start gap-4 p-4 sm:p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-xl text-[#CF7883] transition-all duration-500 group-hover/card:rotate-[-8deg] group-hover/card:bg-[#CF7883] group-hover/card:text-white">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-nunito text-xl font-extrabold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#244730]/75 sm:text-base">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}