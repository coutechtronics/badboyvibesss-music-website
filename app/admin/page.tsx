"use client";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <ul className="space-y-4 text-lg">
        <li><Link href="/admin/music">🎵 Music</Link></li>
        <li><Link href="/admin/videos">🎬 Videos</Link></li>
        <li><Link href="/admin/announcements">📣 Announcements</Link></li>
        <li><Link href="/admin/tours">🎤 Tours</Link></li>
        <li><Link href="/admin/articles">🎤 Articles</Link></li>
      </ul>
    </main>
  );
}