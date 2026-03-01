// app/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";

import Header from "./component/Header/Header";
import Newsletter from "./component/Newsletter";
import Footer from "./component/Footer/Footer";
import TourSection from "./component/Tour/TourSection";
import AnnouncementSection from "./component/Announcement/Announcement";
import MusicSection from "./component/Music/MusicSection";
import VideoSection from "./component/Video/VideoSection";
import FeaturedRelease from "./component/FeaturedRelease/FeaturedRelease";
import { supabase } from "@/app/lib/supabase";
import HeroTextRotator from "./component/Hero/HeroTextRotator";

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
      <Header />

      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden pt-16">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/vibes.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
        />

        {/* Cinematic overlays (readability + vibe) */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/55" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.75))]" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* ✅ Rotating hero text */}
          <HeroTextRotator />

          {/* CTA buttons */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#music"
              className="px-6 py-3 rounded-full bg-white text-black text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition"
            >
              Listen Now
            </a>

            <a
              href="#videos"
              className="px-6 py-3 rounded-full border border-white/35 text-white text-xs uppercase tracking-widest font-semibold hover:border-white/70 transition"
            >
              Watch Videos
            </a>

            <a
              href="#tour"
              className="hidden sm:inline-flex px-6 py-3 rounded-full border border-white/20 text-white/90 text-xs uppercase tracking-widest font-semibold hover:border-white/50 transition"
            >
              Tour Dates
            </a>
          </div>

          <p className="mt-6 text-[10px] text-white/55 tracking-[0.25em] uppercase">
            Tap the menu for socials • Stream on Apple Music & Spotify
          </p>
        </div>
      </section>

      <FeaturedRelease item={featured} />

      <MusicSection music={music ?? []} />
      <VideoSection videos={videos ?? []} />
      <AnnouncementSection announcements={announcements ?? []} />
      <TourSection tours={tours ?? []} />
      <Newsletter />
      <Footer />
    </main>
  );
}