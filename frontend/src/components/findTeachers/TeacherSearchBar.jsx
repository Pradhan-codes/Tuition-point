import { Search, MapPin, SlidersHorizontal } from "lucide-react";

export default function TeacherSearchBar({
  subject,
  setSubject,
  locationName,
  radius,
  setRadius,
  onSubmit,
}) {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* Subject */}
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Search size={20} className="shrink-0 text-slate-400" />

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What do you want to learn?"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Location */}
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <MapPin size={20} className="shrink-0 text-blue-500" />

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400">
                  Location
                </p>

                <p className="truncate text-sm font-medium text-slate-700">
                  {locationName || "Your location"}
                </p>
              </div>
            </div>

            {/* Radius */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 lg:w-44">
              <SlidersHorizontal
                size={18}
                className="shrink-0 text-slate-400"
              />

              <div className="flex-1">
                <label
                  htmlFor="radius"
                  className="block text-xs font-medium text-slate-400"
                >
                  Search radius
                </label>

                <select
                  id="radius"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
                >
                  <option value={2}>2 km</option>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={20}>20 km</option>
                  <option value={50}>50 km</option>
                </select>
              </div>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Search size={18} />
              Search
            </button>

          </div>
        </form>
      </div>
    </section>
  );
}