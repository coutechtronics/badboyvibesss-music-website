import { FaInstagram, FaXTwitter, FaYoutube, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-24">
      <div className="max-w-6xl mx-auto px-10 py-16 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-bold">BADBOYVIBESSS</h2>
          <p className="mt-4 text-sm text-gray-500">
            Official platform for music, visuals & announcements.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#music" className="hover:text-white transition">
                Music
              </a>
            </li>
            <li>
              <a href="#videos" className="hover:text-white transition">
                Videos
              </a>
            </li>
            <li>
              <a href="#tour" className="hover:text-white transition">
                Tour
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white mb-4">Follow</h3>
          <div className="flex gap-5 text-xl">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-yellow-500 transition transform hover:scale-110"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-yellow-500 transition transform hover:scale-110"
            >
              <FaXTwitter />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-yellow-500 transition transform hover:scale-110"
            >
              <FaYoutube />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-yellow-500 transition transform hover:scale-110"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Badboyvibesss. All rights reserved.
      </div>
    </footer>
  );
}