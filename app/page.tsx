// app/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";

import Newsletter from "./component/Newsletter";
import Footer from "./component/Footer/Footer";
import TourSection from "./component/Tour/TourSection";
import AnnouncementSection from "./component/Announcement/Announcement";
import MusicSection from "./component/Music/MusicSection";
import VideoSection from "./component/Video/VideoSection";
import FeaturedRelease from "./component/FeaturedRelease/FeaturedRelease";
import { supabase } from "@/app/lib/supabase";

export default async function Home() {
  noStore();

  const [
    { data: music, error: musicErr },
    { data: announcements, error: annErr },
    { data: tours, error: tourErr },
    { data: videos, error: vidErr },
  ] = await Promise.all([
    supabase.from("music").select("*").order("created_at", { ascending: false }),
    supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    supabase.from("tours").select("*").order("date", { ascending: true }),
    supabase.from("videos").select("*").order("created_at", { ascending: false }),
  ]);

  if (musicErr) console.error("music fetch error:", musicErr.message);
  if (annErr) console.error("announcements fetch error:", annErr.message);
  if (tourErr) console.error("tours fetch error:", tourErr.message);
  if (vidErr) console.error("videos fetch error:", vidErr.message);

  const featured =
  (music ?? []).find((m: any) => m.is_featured) ?? (music ?? [])[0] ?? null;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto px-4 md:px-10 py-5 flex items-center justify-between">
          <div className="text-sm md:text-lg font-extrabold tracking-widest uppercase">
            BADBOYVIBES
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase">
            <a href="#music" className="hover:text-gray-300 transition">
              Music
            </a>
            <a href="#videos" className="hover:text-gray-300 transition">
              Videos
            </a>
            <a href="#tour" className="hover:text-gray-300 transition">
              Tour
            </a>
            <a href="#signup" className="hover:text-gray-300 transition">
              Sign Up
            </a>
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <a href="#" aria-label="Instagram" className="hover:text-gray-300 transition">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm6-1.8a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
              </svg>
            </a>

            <a href="#" aria-label="X" className="hover:text-gray-300 transition">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-7.5 8.6L23 22h-6.7l-5.2-6.8L5 22H2l8-9.2L1 2h6.8l4.7 6.2L18.9 2z" />
              </svg>
            </a>

            <a href="#" aria-label="YouTube" className="hover:text-gray-300 transition">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 12s0-4.6-.6-6.7a3 3 0 00-2.1-2.1C18.2 2.6 12 2.6 12 2.6s-6.2 0-8.3.6A3 3 0 001.6 5.3C1 7.4 1 12 1 12s0 4.6.6 6.7a3 3 0 002.1 2.1c2.1.6 8.3.6 8.3.6s6.2 0 8.3-.6a3 3 0 002.1-2.1c.6-2.1.6-6.7.6-6.7zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>

            <a href="#" aria-label="TikTok" className="hover:text-gray-300 transition">
              <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 2h2a6 6 0 005 5v2a8 8 0 01-7-4v9.3a5.7 5.7 0 11-5.7-5.7h.7v2.9h-.7a2.8 2.8 0 102.8 2.8V2z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/vibes.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-[42px] md:text-[120px] font-extrabold tracking-[0.2em] uppercase">
            badboyvibesss
          </h1>
          <p className="mt-4 text-xs tracking-[0.35em] text-gray-300 uppercase">
            Music • Culture • Energy
          </p>
        </div>
      </section>

      {/* ================= FEATURED RELEASE ================= */}
      <FeaturedRelease item={featured} />

      {/* ================= CONTENT ================= */}
      <MusicSection music={music ?? []} />
      <VideoSection videos={videos ?? []} />
      <AnnouncementSection announcements={announcements ?? []} />
      <TourSection tours={tours ?? []} />
      <Newsletter />
      <Footer />
    </main>
  );
}