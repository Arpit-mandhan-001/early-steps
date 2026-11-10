"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";

/* ───────────────────────── Config ───────────────────────── */

// 25 Gallery Images (dayhome-40.jpeg to dayhome-64.jpeg)
const IMAGES = Array.from({ length: 25 }, (_, i) => ({
  src: `/images/dayhome/dayhome-${i + 30}.jpeg`,
  alt: `Gallery photo ${i + 1}`,
}));

// Placeholder tones
const TONES = [
  "#d9cfc6",
  "#c9d3c9",
  "#e8d2d0",
  "#cfd6dc",
  "#ddd5c4",
  "#c5cfc1",
  "#e3cfc9",
  "#d4d4d4",
  "#c8d0d8",
  "#e6d9c8",
  "#cdd7cb",
  "#dccfd1",
  "#d8c9bd",
  "#c5d5d0",
  "#eadbd1",
  "#d0d5df",
  "#e2d6c5",
  "#cbd8ca",
  "#e5caca",
  "#d4cec4",
  "#c7d0d8",
  "#e0d4cd",
  "#d0dacd",
  "#e8d9b9",
  "#d6cbd5",
];

// 5 columns × 5 rows = 25 unique images
const COLS_PERIOD = 5;
const ROWS_PERIOD = 5;

const LAYOUT: number[][] = [
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
];

// Automatic movement speed
const AUTO_SPEED = { x: -8, y: -5 };

// Momentum settings
const MOMENTUM_DECAY = 1.8;
const MAX_VELOCITY = 3000;

/* ───────────────────────── Helpers ───────────────────────── */

const mod = (n: number, m: number) => ((n % m) + m) % m;

function getMetrics(w: number) {
  const tileW = w < 640 ? 130 : w < 1024 ? 200 : 240;

  const tileH = Math.round((tileW * 4) / 3);
  const gap = Math.round(tileW / 12);

  return {
    tileW,
    tileH,
    pitchX: tileW + gap,
    pitchY: tileH + gap,
  };
}

/* ───────────────────────── Component ───────────────────────── */

export default function InfiniteDragGallery() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  const motion = useRef({
    x: 0,
    y: 0,
    vx: AUTO_SPEED.x,
    vy: AUTO_SPEED.y,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    visible: true,
    initialised: false,
  });

  /* ───────────────────────── Measure Canvas ───────────────────────── */

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      setSize({
        w: el.clientWidth,
        h: el.clientHeight,
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  /* ───────────────────────── Tile Metrics ───────────────────────── */

  const m = useMemo(() => getMetrics(size?.w ?? 1440), [size?.w]);

  const periodX = COLS_PERIOD * m.pitchX;
  const periodY = ROWS_PERIOD * m.pitchY;

  /* ───────────────────────── Generate Tiles ───────────────────────── */

  const tiles = useMemo(() => {
    if (!size) return [];

    const cols = Math.ceil(size.w / m.pitchX) + COLS_PERIOD + 2;

    const rows = Math.ceil(size.h / m.pitchY) + ROWS_PERIOD + 2;

    const out: {
      key: string;
      left: number;
      top: number;
      img: number;
    }[] = [];

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        out.push({
          key: `${c}-${r}`,
          left: c * m.pitchX,

          // Staggered column layout
          top: (r - 1) * m.pitchY + (c % 2 ? m.pitchY / 2 : 0),

          img: LAYOUT[c % COLS_PERIOD][mod(r - 1, ROWS_PERIOD)],
        });
      }
    }

    return out;
  }, [size, m, periodX, periodY]);

  /* ───────────────────────── Animation Loop ───────────────────────── */

  useEffect(() => {
    if (!size) return;

    const s = motion.current;
    const track = trackRef.current;
    const wrap = wrapRef.current;

    if (!track || !wrap) return;

    const isMobile = window.matchMedia("(max-width: 639px)").matches;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const auto = isMobile || reduced ? { x: 0, y: 0 } : AUTO_SPEED;

    if (!s.initialised) {
      s.x = -(periodX / COLS_PERIOD) * 0.55;
      s.y = -(periodY / ROWS_PERIOD) * 0.3;
      s.initialised = true;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        s.visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );

    io.observe(wrap);

    const apply = () => {
      const tx = mod(s.x, periodX) - periodX;
      const ty = mod(s.y, periodY) - periodY;

      track.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!s.visible) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (!s.dragging) {
        const k = 1 - Math.exp(-dt * MOMENTUM_DECAY);

        s.vx += (auto.x - s.vx) * k;
        s.vy += (auto.y - s.vy) * k;

        s.x += s.vx * dt;
        s.y += s.vy * dt;
      }

      apply();

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, periodX, periodY]);

  /* ───────────────────────── Pointer Drag ───────────────────────── */

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    const s = motion.current;

    e.currentTarget.setPointerCapture(e.pointerId);

    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastT = performance.now();

    s.vx = 0;
    s.vy = 0;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = motion.current;

    if (!s.dragging) return;

    const now = performance.now();
    const dt = (now - s.lastT) / 1000;

    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;

    s.x += dx;
    s.y += dy;

    if (dt > 0) {
      s.vx = s.vx * 0.5 + (dx / dt) * 0.5;
      s.vy = s.vy * 0.5 + (dy / dt) * 0.5;
    }

    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.lastT = now;
  };

  /* ───────────────────────── End Drag ───────────────────────── */

  const endDrag = (e?: PointerEvent<HTMLDivElement>) => {
    const s = motion.current;

    if (!s.dragging) return;

    s.dragging = false;

    if (performance.now() - s.lastT > 90) {
      s.vx = 0;
      s.vy = 0;
    }

    s.vx = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, s.vx));

    s.vy = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, s.vy));

    if (e && e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  /* ───────────────────────── Keyboard Controls ───────────────────────── */

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const s = motion.current;
    const push = 700;

    if (e.key === "ArrowLeft") {
      s.vx = push;
    } else if (e.key === "ArrowRight") {
      s.vx = -push;
    } else if (e.key === "ArrowUp") {
      s.vy = push;
    } else if (e.key === "ArrowDown") {
      s.vy = -push;
    } else {
      return;
    }

    e.preventDefault();
  };

  /* ───────────────────────── JSX ───────────────────────── */

  return (
    <section className="relative w-full bg-[#FDF9F6] overflow-hidden">
      {/* Gallery Heading */}
      <div className="flex flex-col items-center justify-center text-center text-[#244730] font-nunito font-bold px-4 pt-8 pb-4">
        <h2 className="text-3xl md:text-4xl lg:text-6xl">Our Image Gallery</h2>

        <p className="mt-3 text-sm md:text-base font-sans font-normal text-[#244730]/60">
          Explore our beautiful moments and memories
        </p>
      </div>

      {/* Gallery Canvas */}
      <div
        ref={wrapRef}
        role="region"
        aria-label="Photo gallery. Drag in any direction or use the arrow keys to explore."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        onDragStart={(e) => e.preventDefault()}
        className="
          relative
          h-[520px]
          w-full
          cursor-grab
          touch-none
          select-none
          overflow-hidden
          outline-none
          active:cursor-grabbing
          focus-visible:ring-2
          focus-visible:ring-[#CF7883]
          sm:h-[640px]
          lg:h-[820px]
        "
      >
        {/* Moving Track */}
        <div
          ref={trackRef}
          className="absolute left-0 top-0 will-change-transform"
        >
          {tiles.map((t) => (
            <div
              key={t.key}
              className="absolute overflow-hidden rounded-xl shadow-sm"
              style={{
                left: t.left,
                top: t.top,
                width: m.tileW,
                height: m.tileH,
                backgroundColor: TONES[t.img],
              }}
            >
              <Image
                src={IMAGES[t.img].src}
                alt={IMAGES[t.img].alt}
                fill
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 200px, 150px"
                draggable={false}
                className="pointer-events-none object-cover"
              />
            </div>
          ))}
        </div>

        {/* Soft Edge Vignette */}
        {/* <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#FDF9F6] to-transparent sm:w-16 lg:w-24" />

          <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#FDF9F6] to-transparent sm:w-16 lg:w-24" />

          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#FDF9F6] to-transparent sm:h-12" />

          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FDF9F6] to-transparent sm:h-24" />
        </div> */}

        {/* Floating Drag Instruction */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-md">
          <p className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-[#244730]">
            <span className="text-lg">✥</span>
            Drag to explore
          </p>
        </div>
      </div>
    </section>
  );
}
