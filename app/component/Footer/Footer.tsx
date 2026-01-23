import Newsletter from "../Newsletter";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-24">

      {/* Newsletter section */}
      <Newsletter />

      {/* Footer main */}
      <div className="max-w-6xl mx-auto px-10 py-16 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-bold">
            BADBOYVIBESSS
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Official platform for music, visuals & announcements.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>Music</li>
            <li>Videos</li>
            <li>Tour</li>
            <li>Sign Up</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white mb-4">Follow</h3>
          <div className="flex gap-4 text-xl">
            <span>IG</span>
            <span>X</span>
            <span>YT</span>
            <span>TT</span>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Badboyvibesss. All rights reserved.
      </div>

    </footer>
  );
}
