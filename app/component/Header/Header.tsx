"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Music } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-white text-2xl font-bold tracking-widest">
          BADBOY
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest text-gray-300">
          <a href="#music" className="hover:text-white">Music</a>
          <a href="#videos" className="hover:text-white">Videos</a>
          <a href="#tour" className="hover:text-white">Tour</a>
          <a href="#signup" className="hover:text-white">Sign Up</a>
        </nav>

        {/* SOCIALS */}
        <div className="flex items-center gap-5 text-gray-300">
          <a href="#" className="hover:text-white"><Instagram size={18} /></a>
          <a href="#" className="hover:text-white"><Twitter size={18} /></a>
          <a href="#" className="hover:text-white"><Youtube size={18} /></a>
          <a href="#" className="hover:text-white"><Music size={18} /></a>
        </div>
      </div>
    </header>
  );
}