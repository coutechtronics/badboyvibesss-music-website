"use client";

type Announcement = { id?: string; text: string };

export default function AnnouncementSection({
  announcements = [],
}: { announcements: Announcement[] }) {
  if (!announcements.length) return null;

  // Repeat enough times so the track is long
  const repeated = Array.from({ length: 6 }, () => announcements).flat();

  return (
    <section className="bg-black border-y border-white/10 py-4 overflow-hidden">
      <div className="marquee">
        <div className="marquee__track">
          {repeated.map((item, i) => (
            <span
              key={`${item.id ?? "a"}-${i}`}
              className="text-yellow-500 uppercase tracking-widest text-sm"
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}