import { FaSpotify, FaApple, FaMusic } from "react-icons/fa";

type MusicItem = {
  id: string;
  title?: string | null;
  cover?: string | null;
  spotify?: string | null;
  apple?: string | null;
  audiomack?: string | null;
  created_at?: string | null;
};

function coverUrl(cover?: string | null) {
  if (!cover) return "/placeholder.png";
  if (cover.startsWith("http")) return cover;

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return "/placeholder.png";

  // matches your MusicCard storage path
  return `${base}/storage/v1/object/public/music-covers/${cover}`;
}

export default function FeaturedRelease({ item }: { item: MusicItem | null }) {
  if (!item) return null;

  const img = coverUrl(item.cover);

  return (
    <section className="bg-black text-white py-16 md:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Cover */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <img src={img} alt={item.title ?? "Release cover"} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Copy + CTA */}
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-yellow-400">
            Featured Release
          </p>

          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            {item.title ?? "Untitled"}
          </h2>

          <p className="mt-4 text-white/70 max-w-xl">
            Stream the latest drop now. Tap your preferred platform.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {item.spotify && (
              <a
                href={item.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-500 text-black px-5 py-3 rounded-full font-semibold"
              >
                <FaSpotify /> Spotify
              </a>
            )}

            {item.apple && (
              <a
                href={item.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-full hover:border-white/40 transition"
              >
                <FaApple /> Apple Music
              </a>
            )}

            {item.audiomack && (
              <a
                href={item.audiomack}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-full hover:border-white/40 transition"
              >
                <FaMusic /> Audiomack
              </a>
            )}
          </div>

          <div className="mt-6">
            <a
              href="#music"
              className="inline-flex uppercase tracking-widest text-xs text-white/70 hover:text-white transition"
            >
              View all releases →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}