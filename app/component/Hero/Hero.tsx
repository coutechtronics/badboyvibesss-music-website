"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* BACKGROUND VIDEO */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/vibes.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        {showLogo ? (
          // LOGO STATE
          <div className="animate-fade-in">
            <img
              src="/logo.png"   // ⬅ change if needed
              alt="BadBoyVibes Logo"
              className="w-32 md:w-48 mx-auto"
            />
          </div>
        ) : (
          // TEXT STATE
          <div className="animate-fade-in">
            <h1 className="text-[36px] md:text-[120px] font-extrabold tracking-[0.2em] uppercase">
              BADBOYVIBESSS
            </h1>
            <p className="mt-4 text-xs tracking-[0.35em] text-gray-300 uppercase">
              Music • Culture • Energy
            </p>
          </div>
        )}
      </div>
    </section>
  );
}