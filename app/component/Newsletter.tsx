export default function Newsletter() {
    return (
      <section className="bg-black py-32">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-10">
  
          <div className="flex justify-center">
            <img
              src="/bee.png"
              alt="Badboyvibesss mascot"
              className="w-20 h-20"
            />
          </div>
  
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide">
            $STAY BIZZY
          </h2>
  
          <p className="text-gray-400 max-w-xl mx-auto">
            Be the first to know when we drop new music, videos,
            tour dates, and exclusive updates from Badboyvibesss.
          </p>
  
          <form className="space-y-6 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:outline-none"
            />
  
            <select
              className="w-full bg-transparent border-b border-gray-600 py-3 text-gray-400 focus:outline-none"
            >
              <option>Country</option>
              <option>Nigeria</option>
              <option>UK</option>
              <option>USA</option>
              <option>Other</option>
            </select>
  
            <button
              type="button"
              className="w-full border border-white py-4 text-white tracking-widest hover:bg-white hover:text-black transition"
            >
              $IGN UP
            </button>
          </form>
  
        </div>
      </section>
    );
  }
  