type Tour = {
  id?: string;
  date: string; // from DB (date or timestamptz)
  city: string;
  venue: string;
  ticket_url?: string | null;
};

type Props = {
  tours: Tour[] | null;
};

function formatTourDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function TourSection({ tours }: Props) {
  const rows = Array.isArray(tours) ? tours : [];
  const hasTours = rows.length > 0;

  return (
    <section id="tour" className="bg-[#2b1a24] text-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-[0.12em]">
            TOUR
          </h2>
          <p className="hidden md:block text-white/60 text-sm">
            Upcoming shows & tickets
          </p>
        </div>

        {!hasTours ? (
          <div className="border border-white/10 rounded-2xl p-8 bg-black/20">
            <p className="text-yellow-400 uppercase tracking-widest text-sm">
              No dates yet
            </p>
            <p className="mt-3 text-white/70 max-w-xl">
              New shows will be announced soon. Join the mailing list so you don’t miss tickets.
            </p>
            <a
              href="#signup"
              className="inline-flex mt-6 bg-yellow-500 text-black px-5 py-3 rounded-full font-semibold"
            >
              Join the list
            </a>
          </div>
        ) : (
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-black/25 text-xs uppercase tracking-widest text-white/60">
              <div className="col-span-3">Date</div>
              <div className="col-span-4">City</div>
              <div className="col-span-4">Venue</div>
              <div className="col-span-1 text-right"> </div>
            </div>

            <div className="divide-y divide-white/10">
              {rows.map((tour, i) => (
                <div
                  key={tour.id ?? `${tour.date}-${tour.city}-${i}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-6 bg-black/10 hover:bg-black/20 transition"
                >
                  <div className="md:col-span-3">
                    <p className="text-yellow-400 font-semibold">
                      {formatTourDate(tour.date)}
                    </p>
                  </div>

                  <div className="md:col-span-4">
                    <p className="font-semibold">{tour.city}</p>
                  </div>

                  <div className="md:col-span-4">
                    <p className="text-white/80">{tour.venue}</p>
                  </div>

                  <div className="md:col-span-1 md:text-right">
                    {tour.ticket_url ? (
                      <a
                        href={tour.ticket_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-yellow-400 uppercase tracking-widest text-xs hover:underline"
                      >
                        Tickets →
                      </a>
                    ) : (
                      <span className="inline-flex text-white/40 uppercase tracking-widest text-xs">
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}