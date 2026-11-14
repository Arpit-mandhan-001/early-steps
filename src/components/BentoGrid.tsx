"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

/** Bento tile: clip-path reveal, inner scale-down, scroll parallax, hover zoom. */
function Frame({
  src,
  alt,
  className = "",
  sizes,
  parallax = 12,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  parallax?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const par = useParallax<HTMLDivElement>(parallax);
  return (
    <div
      ref={ref}
      className={`group relative min-h-0 min-w-0 overflow-hidden rounded-xl bg-[#FBEFEF] transition-[clip-path,opacity] duration-[1300ms] ${EASE} ${className}`}
      style={{
        clipPath: inView ? "inset(0% 0% 0% 0% round 0.75rem)" : "inset(14% 10% 14% 10% round 0.75rem)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* over-sized layer so the parallax shift never exposes an edge */}
      <div ref={par} className="absolute -inset-[12%] will-change-transform">
        <div
          className="relative h-full w-full transition-transform duration-[1600ms] ease-out"
          style={{ transform: inView ? "scale(1)" : "scale(1.2)" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- data ---------- */

// Update image paths here
const images = {
  image1: "/images/dayhome/dayhome-1.jpeg",
  image2: "/images/dayhome/dayhome-15.jpeg",
  image3: "/images/dayhome/dayhome-16.jpeg",
  image4: "/images/dayhome/dayhome-22.jpeg",
  image5: "/images/dayhome/dayhome-20.jpeg",
  image6: "/images/dayhome/dayhome-50.jpeg",
  image7: "/images/dayhome/dayhome-39.jpeg",
  image8: "/images/dayhome/dayhome-7.jpeg",
  image16: "/images/dayhome/dayhome-4.jpeg",
  image9: "/images/dayhome/dayhome-42.jpeg",
  image10: "/images/dayhome/dayhome-33.jpeg",
  image11: "/images/dayhome/dayhome-10.jpeg",
  image12: "/images/dayhome/dayhome-44.jpeg",
  image13: "/images/dayhome/dayhome-19.jpeg",
  image14: "/images/dayhome/dayhome-2.jpeg",
  image15: "/images/dayhome/dayhome-11.jpeg",
};

const tiles = [
  // Top row
  { src: images.image1, desktop: "md:col-start-1 md:col-span-3 md:row-start-1 md:row-span-1", mobile: "col-span-1 row-span-1" },
  { src: images.image2, desktop: "md:col-start-4 md:col-span-2 md:row-start-1 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image3, desktop: "md:col-start-6 md:col-span-2 md:row-start-1 md:row-span-2", mobile: "col-span-1 row-span-1" },
  { src: images.image4, desktop: "md:col-start-8 md:col-span-2 md:row-start-1 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image5, desktop: "md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-2", mobile: "col-span-2 row-span-1" },

  // Middle row
  { src: images.image6, desktop: "md:col-start-1 md:col-span-3 md:row-start-2 md:row-span-3", mobile: "col-span-2 row-span-2" },
  { src: images.image7, desktop: "md:col-start-4 md:col-span-3 md:row-start-3 md:row-span-2", mobile: "col-span-2 row-span-2" },
  { src: images.image8, desktop: "md:col-start-7 md:col-span-2 md:row-start-3 md:row-span-1", mobile: "col-span-1 row-span-1" },
  { src: images.image16, desktop: "md:col-start-7 md:col-span-2 md:row-start-4 md:row-span-1", mobile: "col-span-1 row-span-1" },
  { src: images.image9, desktop: "md:col-start-9 md:col-span-2 md:row-start-3 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image10, desktop: "md:col-start-11 md:col-span-2 md:row-start-3 md:row-span-2", mobile: "col-span-1 row-span-2" },

  // Bottom row
  { src: images.image11, desktop: "md:col-start-1 md:col-span-4 md:row-start-5 md:row-span-2", mobile: "col-span-2 row-span-2" },
  { src: images.image12, desktop: "md:col-start-5 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-1" },
  { src: images.image13, desktop: "md:col-start-7 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-1" },
  { src: images.image14, desktop: "md:col-start-9 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-2" },
  { src: images.image15, desktop: "md:col-start-11 md:col-span-2 md:row-start-5 md:row-span-2", mobile: "col-span-1 row-span-2" },
];

// Each tile drifts at a slightly different speed → depth between neighbours
const PARALLAX = [14, 9, 18, 11, 16];

/* ---------- section ---------- */
export default function BentoGrid() {
  const blob = useParallax<HTMLDivElement>(50);

  return (
    <section className="relative w-full overflow-x-clip">
      {/* soft rose glow that drifts with scroll (same as CareHero) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div ref={blob} className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#CF7883]/20 blur-3xl" />
      </div>

      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-[1400px]

          grid-cols-2
          grid-flow-dense
          auto-rows-[90px]
          gap-2

          sm:auto-rows-[120px]

          md:aspect-[496/257]
          md:grid-flow-row
          md:grid-cols-[repeat(12,minmax(0,1fr))]
          md:grid-rows-[repeat(6,minmax(0,1fr))]
          md:auto-rows-auto
          md:gap-[4px]
        "
      >
        {tiles.map((tile, index) => (
          <Frame
            key={index}
            src={tile.src}
            alt={`Interior design ${index + 1}`}
            sizes="(max-width: 767px) 50vw, 25vw"
            className={`${tile.mobile} ${tile.desktop}`}
            parallax={PARALLAX[index % PARALLAX.length]}
            delay={(index % 6) * 100}
          />
        ))}
      </div>
    </section>
  );
}