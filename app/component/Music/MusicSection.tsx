import MusicCard from "./MusicCard";

type MusicItem = {
  id: string;
  title?: string | null;
  artist?: string | null;
  cover_url?: string | null;
  audio_url?: string | null;
};

export default function MusicSection({ music }: { music: MusicItem[] }) {
  return (
    <section id="music" className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-center text-4xl md:text-7xl font-extrabold tracking-[0.10em] mb-10">
          MU$IC
        </h2>

        {(!music || music.length === 0) ? (
          <p className="text-center text-white/60">No tracks yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {music.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}