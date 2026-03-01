"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AnnouncementsAdmin() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    setAnnouncements(data || []);
    setLoading(false);
  }

  async function addAnnouncement() {
    if (!text.trim()) return;

    setSaving(true);

    await supabase.from("announcements").insert([
      {
        text,
        is_active: true,
      },
    ]);

    setText("");
    setOpen(false);
    setSaving(false);
    fetchAnnouncements();
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase
      .from("announcements")
      .update({ is_active: !current })
      .eq("id", id);

    fetchAnnouncements();
  }

  async function deleteAnnouncement(id: string) {
    await supabase.from("announcements").delete().eq("id", id);
    fetchAnnouncements();
  }

  return (
    <div className="p-8 text-white relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-500 text-black px-4 py-2"
        >
          Add
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && announcements.length === 0 && (
        <p className="opacity-60">No announcements yet</p>
      )}

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border border-white/10 p-4"
          >
           <span className="text-black font-medium">
  {item.text}
</span>

            <div className="flex gap-4">
              <button
                onClick={() => toggleActive(item.id, item.is_active)}
                className={`px-3 py-1 text-xs ${
                  item.is_active ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                {item.is_active ? "Active" : "Inactive"}
              </button>

              <button
                onClick={() => deleteAnnouncement(item.id)}
                className="bg-red-600 px-3 py-1 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border border-white/20 p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">New Announcement</h2>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-black border border-white/20 p-3 text-white mb-4"
              placeholder="Enter announcement text"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border border-white/30"
              >
                Cancel
              </button>

              <button
                onClick={addAnnouncement}
                disabled={saving}
                className="bg-yellow-500 text-black px-4 py-2"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}