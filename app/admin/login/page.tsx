"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/app/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.replace("/admin");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/15 rounded-xl p-6 bg-black">
        <h1 className="text-2xl font-extrabold tracking-widest uppercase">
          Admin Login
        </h1>
        <p className="mt-2 text-white/60 text-sm">
          Sign in to manage content.
        </p>

        {errorMsg && (
          <div className="mt-4 text-sm text-red-400 border border-red-400/30 bg-red-400/10 p-3 rounded">
            {errorMsg}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              className="w-full bg-black border border-white/20 rounded px-3 py-2 outline-none focus:border-white/50"
              placeholder="admin@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="w-full bg-black border border-white/20 rounded px-3 py-2 outline-none focus:border-white/50"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded disabled:opacity-60"
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}