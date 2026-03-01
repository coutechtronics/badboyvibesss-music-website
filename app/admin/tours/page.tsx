"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

type Tour = {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticket_url?: string | null;
  created_at?: string;
};

export default function ToursAdminPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // modal + form
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [ticketUrl, setTicketUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  async function fetchTours() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("date", { ascending: true });

    if (error) console.error("tours fetch error:", error.message);

    setTours((data as Tour[]) || []);
    setLoading(false);
  }

  async function addTour() {
    if (!date || !city.trim() || !venue.trim()) return;

    setSaving(true);

    const { error } = await supabase.from("tours").insert([
      {
        date,
        city: city.trim(),
        venue: venue.trim(),
        ticket_url: ticketUrl.trim() ? ticketUrl.trim() : null,
      },
    ]);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setDate("");
    setCity("");
    setVenue("");
    setTicketUrl("");
    setOpen(false);
    fetchTours();
  }

  async function deleteTour(id: string) {
    const ok = confirm("Delete this tour date?");
    if (!ok) return;

    const { error } = await supabase.from("tours").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }

    fetchTours();
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tours</h1>
          <button
            onClick={() => setOpen(true)}
            className="bg-yellow-500 text-black px-4 py-2"
          >
            Add
          </button>
        </div>

        {loading && <p className="text-white/70">Loading...</p>}

        {!loading && tours.length === 0 && (
          <p className="opacity-60">No tours yet</p>
        )}

        <div className="space-y-4">
          {tours.map((t) => (
            <div
              key={t.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-white/10 p-4 rounded-xl bg-white/5"
            >
              <div className="min-w-0">
                <p className="font-medium">
                  {t.date} — {t.city}
                </p>
                <p className="text-white/60 text-sm truncate">{t.venue}</p>

                {t.ticket_url && (
                  <a
                    href={t.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 text-sm hover:underline"
                  >
                    Ticket link
                  </a>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => deleteTour(t.id)}
                  className="bg-red-600 px-3 py-1 text-xs rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-black border border-white/20 p-6 w-full max-w-md rounded-xl">
              <h2 className="text-lg font-bold mb-4">Add Tour</h2>

              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 text-white mb-4 rounded"
              />

              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                City
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 text-white mb-4 rounded"
                placeholder="Lagos"
              />

              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Venue
              </label>
              <input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 text-white mb-4 rounded"
                placeholder="Eko Hotel"
              />

              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Ticket URL (optional)
              </label>
              <input
                value={ticketUrl}
                onChange={(e) => setTicketUrl(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 text-white mb-6 rounded"
                placeholder="https://..."
              />

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-white/30 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={addTour}
                  disabled={saving}
                  className="bg-yellow-500 text-black px-4 py-2 disabled:opacity-60 rounded"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}