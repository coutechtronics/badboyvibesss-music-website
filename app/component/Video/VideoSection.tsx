"use client";

import { useMemo, useState } from "react";

type VideoItem = {
  id: string;
  title: string;
  video_url: string;
};

function getYouTubeId(url: string) {
  return (
    url.match(/v=([^&]+)/)?.[1] ||
    url.match(/youtu\.be\/([^?]+)/)?.[1] ||
    url.match(/youtube\.com\/shorts\/([^?]+)/)?.[1] ||
    null
  );
}

export default function VideoSection({ videos }: { videos: VideoItem[] }) {
  const items = useMemo(() => {
    return (videos ?? [])
      .map((v) => ({ ...v, yt: getYouTubeId(v.video_url) }))
      .filter((v) => v.yt); // only valid YouTube links
  }, [videos]);

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (!videos || videos.length === 0) {
    return (
      <section id="videos" className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-center text-5xl md:text-7xl font-extrabold tracking-[0.10em] mb-10">
            VIDEO$
          </h2>
          <p className="text-center text-white/60">No videos yet.</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id="videos" className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-center text-5xl md:text-7xl font-extrabold tracking-[0.10em] mb-10">
            VIDEO$
          </h2>
          <p className="text-center text-white/60">
            Videos exist, but video_url is not a valid YouTube link. Use a full YouTube URL.
          </p>
        </div>
      </section>
    );
  }

  const current = items[Math.min(index, items.length - 1)];
  const thumb = `https://i.ytimg.com/vi/${current.yt}/hqdefault.jpg`;

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }
  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

  return (
    <section id="videos" className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-center text-5xl md:text-7xl font-extrabold tracking-[0.10em] mb-14">
          VIDEO$
        </h2>

        {/* SLIDE */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
            <img
              src={thumb}
              alt={current.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              loading="lazy"
            />

            {/* play */}
            <button
              onClick={() => setOpen(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Play video"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-500 flex items-center justify-center text-black text-xl hover:scale-105 transition">
                ▶
              </div>
            </button>

            {/* arrows */}
            {items.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/40 hover:border-white transition"
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/40 hover:border-white transition"
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-sm tracking-widest uppercase text-gray-300">
            {current.title}
          </p>

          {/* dots */}
          {items.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full ${i === index ? "bg-yellow-500" : "bg-gray-600"}`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL (unmount iframe on close = “pause”) */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-sm tracking-widest"
            >
              CLOSE ✕
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${current.yt}?autoplay=1`}
              title={current.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}