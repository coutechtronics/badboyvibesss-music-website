import { FaSpotify, FaApple, FaMusic } from "react-icons/fa";

type MusicItem = {
  id: string;
  title?: string | null;
  cover?: string | null; // stored filename/path in bucket
  spotify?: string | null;
  apple?: string | null;
  audiomack?: string | null;
};

function buildPublicCoverUrl(cover?: string | null) {
  if (!cover) return "/placeholder.png";

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return "/placeholder.png";

  // If you ever store full URLs in DB, respect them
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;

  // Bucket name must match your Supabase Storage bucket
  return `${base}/storage/v1/object/public/music-covers/${cover}`;
}

export default function MusicCard({ item }: { item: MusicItem }) {
  const coverUrl = buildPublicCoverUrl(item.cover);

  return (
    <div className="group text-center">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-900">
        <img
          src={coverUrl}
          alt={item.title ?? "Music cover"}
          loading="lazy"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-75"
        />
      </div>

      <h3 className="mt-3 text-[11px] uppercase tracking-[0.18em] opacity-90 group-hover:opacity-100 transition">
        {item.title ?? "Untitled"}
      </h3>

      <div className="mt-3 flex justify-center gap-3">
        {item.spotify ? (
          <a
            href={item.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center hover:border-white transition"
            aria-label="Spotify"
          >
            <FaSpotify size={13} />
          </a>
        ) : null}

        {item.apple ? (
          <a
            href={item.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center hover:border-white transition"
            aria-label="Apple Music"
          >
            <FaApple size={13} />
          </a>
        ) : null}

        {item.audiomack ? (
          <a
            href={item.audiomack}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center hover:border-white transition"
            aria-label="Audiomack"
          >
            <FaMusic size={13} />
          </a>
        ) : null}
      </div>
    </div>
  );
}