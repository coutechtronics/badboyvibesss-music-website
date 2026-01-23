
import Newsletter from "./component/Newsletter";
import Footer from "./component/Footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="text-xl font-extrabold tracking-widest uppercase">
          badboyvibesss
        </div>

        <nav className="flex gap-8 text-xs uppercase tracking-widest">
          <a href="#music" className="hover:text-gray-400">Music</a>
          <a href="#videos" className="hover:text-gray-400">Videos</a>
          <a href="#tour" className="hover:text-gray-400">Tour</a>
          <a href="#signup" className="hover:text-gray-400">Sign Up</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="flex items-center justify-center h-[85vh] text-center px-6">
        <div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest uppercase">
            badboyvibesss
          </h1>

          <p className="mt-6 text-sm md:text-base text-gray-400 tracking-wide">
            Music • Culture • Energy
          </p>
        </div>
      </section>

      {/* MUSIC SECTION */}
      <section id="music" className="px-10 pb-24">
        <h2 className="text-sm uppercase tracking-widest text-gray-400 mb-10">
          Music
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* MUSIC CARD */}
          {[
            { title: "Track One", link: "#" },
            { title: "Track Two", link: "#" },
            { title: "Track Three", link: "#" },
            { title: "Track Four", link: "#" },
          ].map((track, index) => (
            <a
              key={index}
              href={track.link}
              target="_blank"
              className="group"
            >
              <div className="aspect-square bg-gray-800 relative overflow-hidden">
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest">
                    Play
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm tracking-wide">
                {track.title}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* VIDEOS SECTION */}
<section id="videos" className="px-10 py-24 text-center">
  <h2 className="text-4xl font-bold tracking-widest mb-16">
    VIDEO$
  </h2>

  <div className="relative max-w-4xl mx-auto">
    {/* Video Frame */}
    <div className="aspect-video bg-gray-800 relative flex items-center justify-center">
      {/* Play Button */}
      <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center">
        ▶
      </div>

      {/* Arrows */}
      <button className="absolute left-4 text-white text-2xl">
        ‹
      </button>
      <button className="absolute right-4 text-white text-2xl">
        ›
      </button>
    </div>

    {/* Video Title */}
    <p className="mt-6 text-lg font-medium">
      Featured Video Title
    </p>

    {/* Dots */}
    <div className="flex justify-center gap-2 mt-4">
      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
      <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
    </div>
  </div>
</section>

{/* ANNOUNCEMENT SECTION */}
<section className="relative py-24 bg-black">
  <div className="max-w-6xl mx-auto px-10 text-center space-y-4">

    <p className="text-yellow-500 text-xl font-semibold tracking-wide">
      🏆 Billboard African Rookie of the Month
    </p>

    <p className="text-gray-500 text-sm uppercase tracking-widest">
      New announcements coming soon
    </p>

  </div>
</section>
<section className="relative py-32 bg-[#2b1a24] text-white">
  <div className="max-w-6xl mx-auto px-10">

    {/* Title */}
    <h2 className="text-6xl font-extrabold tracking-widest mb-16">
      TOUR
    </h2>

    {/* Tour list */}
    <div className="space-y-10">

      {/* Tour item */}
      <div className="flex items-center justify-between border-b border-yellow-500/30 pb-6">
        <div className="space-y-1">
          <p className="text-yellow-400 font-semibold">
            Tuesday, December 16th 2025
          </p>
          <p className="text-sm text-gray-300">
            Amore Gardens · Lagos, Nigeria
          </p>
        </div>

        <a
          href="#"
          className="text-yellow-400 uppercase tracking-widest text-sm hover:underline"
        >
          Tickets →
        </a>
      </div>

      {/* Tour item */}
      <div className="flex items-center justify-between border-b border-yellow-500/30 pb-6">
        <div className="space-y-1">
          <p className="text-yellow-400 font-semibold">
            Coming Soon
          </p>
          <p className="text-sm text-gray-300">
            Coming Soon
          </p>
        </div>

        <span className="text-gray-500 uppercase tracking-widest text-sm">
          Tickets →
        </span>
      </div>

    </div>
  </div>
</section>

<section className="bg-black py-32">
  <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <div className="space-y-6">
      <p className="text-xs tracking-widest text-gray-500 uppercase">
        Project · Comic
      </p>

      <h2 className="text-4xl md:text-6xl font-bold text-white">
        Sanko: <br /> The Series
      </h2>

      <p className="text-gray-400 leading-relaxed max-w-md">
        In this narrative, Kiloibuzzy recounts an event wherein
        Philomena engaged in intimate relations with Emeka
        clandestinely, yet Ukangbe maintained transparency,
        acknowledging his desire for reciprocity in their relationship.
      </p>

      <p className="text-xs text-gray-500 uppercase tracking-widest">
        Sanko — Issue 01
      </p>

      <button className="mt-4 inline-block border border-yellow-500 text-yellow-500 px-6 py-3 uppercase text-sm tracking-widest hover:bg-yellow-500 hover:text-black transition">
        Listen Now
      </button>
    </div>

    {/* RIGHT */}
    <div className="relative">
      <img
        src="/sanko-cover.jpg"
        alt="Sanko The Series"
        className="w-full rounded-lg"
      />
    </div>

  </div>
</section>

<Newsletter />
<Footer />

    </main>
  );
}
