"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
};

export default function HeroTextRotator() {
  const slides: Slide[] = useMemo(
    () => [
      { title: "BADBOYVIBESSS", subtitle: "Heavy energy. Real sound. No filters." },
      { title: "NEW DROPS • LOUD", subtitle: "Tap “Listen Now” to stream the latest." },
      { title: "MUSIC • VIDEOS • TOUR", subtitle: "Built for stage. Made for streets." },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  // Timing knobs
  const SHOW_MS = 2200; // how long text stays visible
  const FADE_MS = 450;  // fade duration (must match CSS)

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("out"), SHOW_MS);
    const t2 = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setPhase("in");
    }, SHOW_MS + FADE_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [index, slides.length]);

  const current = slides[index];

  return (
    <div className="relative flex flex-col items-center">
      <h1
        className={[
          "text-[36px] sm:text-[52px] md:text-[110px]",
          "font-extrabold uppercase",
          "tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.22em]",
          "drop-shadow-[0_10px_35px_rgba(0,0,0,0.65)]",
          "transition-all duration-[450ms] ease-out will-change-[opacity,transform,filter]",
          phase === "in"
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 -translate-y-2 blur-[1px]",
        ].join(" ")}
      >
        {current.title}
      </h1>

      <p
        className={[
          "mt-4 text-[10px] sm:text-xs uppercase",
          "tracking-[0.35em] text-white/80",
          "transition-all duration-[450ms] ease-out will-change-[opacity,transform]",
          phase === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
      >
        {current.subtitle}
      </p>
    </div>
  );
}