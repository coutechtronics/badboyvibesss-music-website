"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function VideosAdmin() {
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    setVideos(data || []);
  }

  async function addVideo() {
    if (!title || !videoUrl) {
      alert("Title and video URL are required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("videos").insert({
      title,
      video_url: videoUrl,
      thumbnail: thumbnail || null,
    });

    if (error) {
      alert(error.message);
    } else {
      setTitle("");
      setVideoUrl("");
      setThumbnail("");
      await fetchVideos();
    }

    setLoading(false);
  }

  async function deleteVideo(id: string) {
    await supabase.from("videos").delete().eq("id", id);
    fetchVideos();
  }

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Videos</h1>

      {/* FORM */}
      <div className="space-y-4 max-w-xl">
        <input
          className="w-full p-3 bg-black border border-white/20 text-white"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-3 bg-black border border-white/20 text-white"
          placeholder="Video URL (YouTube or mp4)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <input
          className="w-full p-3 bg-black border border-white/20 text-white"
          placeholder="Thumbnail URL (optional)"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        <button
          onClick={addVideo}
          disabled={loading}
          className="bg-yellow-500 text-black px-6 py-2"
        >
          {loading ? "Adding..." : "Add Video"}
        </button>
      </div>

      {/* LIST */}
      <div className="mt-10 space-y-4 max-w-2xl">
        {videos.length === 0 && (
          <p className="opacity-60">No videos yet</p>
        )}

        {videos.map((video) => (
          <div
            key={video.id}
            className="flex justify-between items-center border border-white/10 p-4"
          >
            <div>
              <p className="font-bold">{video.title}</p>
              <p className="text-xs opacity-60">{video.video_url}</p>
            </div>

            <button
              onClick={() => deleteVideo(video.id)}
              className="bg-red-600 px-3 py-1 text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}