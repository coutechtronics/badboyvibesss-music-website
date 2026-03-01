"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SiInstagram, SiTiktok, SiSpotify, SiApplemusic } from "react-icons/si";

const SOCIALS = {
  instagram: "https://www.instagram.com/badboyvibesss",
  tiktok: "https://www.tiktok.com/@badboyvibesss",
  apple: "https://music.apple.com/us/artist/badboyvibe%24/1862572421",
  spotify: "https://open.spotify.com/artist/4jREGrAD2n42yqgD7L5gbj",
};

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* TOP BAR (blends into drawer when open) */}
      <div
        className={`border-b border-white/10 backdrop-blur-md transition-colors duration-300 ${
          open ? "bg-black/80" : "bg-black/35"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="text-white text-sm md:text-xl font-semibold uppercase tracking-[0.30em]"
          >
            BADBOYVIBES
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest text-white/70">
            <a href="#music" className="hover:text-white transition">
              Music
            </a>
            <a href="#videos" className="hover:text-white transition">
              Videos
            </a>
            <a href="#tour" className="hover:text-white transition">
              Tour
            </a>
          </nav>

          {/* DESKTOP SOCIALS */}
          <div className="hidden md:flex items-center gap-2">
            <IconBtn href={SOCIALS.instagram} label="Instagram">
              <SiInstagram size={16} />
            </IconBtn>
            <IconBtn href={SOCIALS.tiktok} label="TikTok">
              <SiTiktok size={16} />
            </IconBtn>
            <IconBtn href={SOCIALS.apple} label="Apple Music">
              <SiApplemusic size={16} />
            </IconBtn>
            <IconBtn href={SOCIALS.spotify} label="Spotify">
              <SiSpotify size={16} />
            </IconBtn>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 transition"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Dim overlay (stronger = premium) */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[86%] max-w-sm border-l border-white/10 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel background with depth */}
          <div className="relative h-full bg-gradient-to-b from-black/80 via-black/70 to-black/85 backdrop-blur-xl">
            {/* subtle top glow line */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/15" />
            {/* subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" />

            {/* Panel header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
              <span className="text-white/80 text-[11px] uppercase tracking-[0.35em]">
                Menu
              </span>

              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 transition"
                aria-label="Close menu"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-8">
              {/* NAV LINKS */}
              <nav className="flex flex-col gap-6 text-white">
                <a
                  href="#music"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold uppercase tracking-widest hover:text-white/80 transition"
                >
                  Music
                </a>
                <a
                  href="#videos"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold uppercase tracking-widest hover:text-white/80 transition"
                >
                  Videos
                </a>
                <a
                  href="#tour"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold uppercase tracking-widest hover:text-white/80 transition"
                >
                  Tour
                </a>
              </nav>

              {/* Divider */}
              <div className="mt-8 h-px w-full bg-white/10" />

              {/* SOCIALS */}
              <div className="mt-6">
                <p className="text-white/60 text-[11px] uppercase tracking-[0.35em]">
                  Follow / Listen
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <IconBtn href={SOCIALS.instagram} label="Instagram" size="lg">
                    <SiInstagram size={18} />
                  </IconBtn>
                  <IconBtn href={SOCIALS.tiktok} label="TikTok" size="lg">
                    <SiTiktok size={18} />
                  </IconBtn>
                  <IconBtn href={SOCIALS.apple} label="Apple Music" size="lg">
                    <SiApplemusic size={18} />
                  </IconBtn>
                  <IconBtn href={SOCIALS.spotify} label="Spotify" size="lg">
                    <SiSpotify size={18} />
                  </IconBtn>
                </div>
              </div>
            </div>

            {/* bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  );
}

function IconBtn({
  href,
  label,
  children,
  size = "sm",
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  size?: "sm" | "lg";
}) {
  const base =
    size === "lg"
      ? "h-11 w-11 text-white/85"
      : "h-9 w-9 text-white/75";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition ${base}`}
    >
      {children}
    </a>
  );
}