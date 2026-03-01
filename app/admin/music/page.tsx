"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Music = {
  id: string;
  title: string;
  cover: string | null;
  spotify: string | null;
  apple: string | null;
  audiomack: string | null;
  is_featured?: boolean | null;
};

export default function MusicAdmin() {
  const [music, setMusic] = useState<Music[]>([]);
  const [title, setTitle] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [spotify, setSpotify] = useState("");
  const [apple, setApple] = useState("");
  const [audiomack, setAudiomack] = useState("");
  const [loading, setLoading] = useState(false);
  const [featureLoadingId, setFeatureLoadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMusic();
  }, []);

  async function fetchMusic() {
    const { data, error } = await supabase
      .from("music")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("music fetch error:", error.message);

    setMusic((data as Music[]) || []);
  }

  async function uploadCover(file: File) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("music-covers").upload(fileName, file);
    if (error) throw error;

    const { data } = supabase.storage.from("music-covers").getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function addMusic() {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    setLoading(true);

    try {
      let coverUrl: string | null = null;

      if (coverFile) {
        coverUrl = await uploadCover(coverFile);
      }

      const { error } = await supabase.from("music").insert({
        title: title.trim(),
        cover: coverUrl,
        spotify: spotify.trim() || null,
        apple: apple.trim() || null,
        audiomack: audiomack.trim() || null,
        is_featured: false,
      });

      if (error) throw error;

      setTitle("");
      setCoverFile(null);
      setSpotify("");
      setApple("");
      setAudiomack("");

      await fetchMusic();
    } catch (err: any) {
      alert(err?.message ?? "Failed to add music");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMusic(id: string) {
    const ok = confirm("Delete this music item?");
    if (!ok) return;

    const { error } = await supabase.from("music").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }

    fetchMusic();
  }

  async function setFeatured(id: string) {
    setFeatureLoadingId(id);

    try {
      // 1) clear old featured
      const { error: clearErr } = await supabase
        .from("music")
        .update({ is_featured: false })
        .eq("is_featured", true);

      if (clearErr) throw clearErr;

      // 2) set new featured
      const { error: setErr } = await supabase
        .from("music")
        .update({ is_featured: true })
        .eq("id", id);

      if (setErr) throw setErr;

      await fetchMusic();
    } catch (err: any) {
      alert(err?.message ?? "Failed to set featured");
    } finally {
      setFeatureLoadingId(null);
    }
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Music</h1>

      {/* FORM */}
      <div className="space-y-3 max-w-xl">
        <input
          className="border border-white/20 bg-black p-2 w-full"
          placeholder="Song title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* COVER UPLOAD */}
        <input
          type="file"
          accept="image/*"
          className="border border-white/20 bg-black p-2 w-full"
          onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
        />

        <input
          className="border border-white/20 bg-black p-2 w-full"
          placeholder="Spotify link"
          value={spotify}
          onChange={(e) => setSpotify(e.target.value)}
        />

        <input
          className="border border-white/20 bg-black p-2 w-full"
          placeholder="Apple Music link"
          value={apple}
          onChange={(e) => setApple(e.target.value)}
        />

        <input
          className="border border-white/20 bg-black p-2 w-full"
          placeholder="Audiomack link"
          value={audiomack}
          onChange={(e) => setAudiomack(e.target.value)}
        />

        <button
          onClick={addMusic}
          disabled={loading}
          className="bg-yellow-500 text-black px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Music"}
        </button>
      </div>

      {/* LIST */}
      <div className="mt-10 space-y-4 max-w-2xl">
        {music.map((item) => (
          <div
            key={item.id}
            className="border border-white/10 p-4 flex justify-between items-center gap-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <p className="font-bold truncate">{item.title}</p>

                {item.is_featured && (
                  <span className="text-xs uppercase tracking-widest bg-yellow-500 text-black px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>

              {item.cover && (
                <img
                  src={item.cover}
                  alt={item.title}
                  className="mt-2 w-24 rounded border border-white/10"
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFeatured(item.id)}
                disabled={featureLoadingId === item.id}
                className="border border-white/20 px-3 py-2 text-xs uppercase tracking-widest hover:border-white/40 disabled:opacity-60"
              >
                {featureLoadingId === item.id ? "Setting..." : "Set Featured"}
              </button>

              <button
                onClick={() => deleteMusic(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}