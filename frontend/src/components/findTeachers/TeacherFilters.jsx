import { SlidersHorizontal, X } from "lucide-react";

const quickSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Computer Science",
];

export default function TeacherFilters({
  teachingMode,
  setTeachingMode,
  maxPrice,
  setMaxPrice,
  subject,
  setSubject,
}) {
  const clearFilters = () => {
    setTeachingMode("");
    setMaxPrice("");
  };

  const hasFilters = teachingMode || maxPrice;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-center gap-3">

          {/* Filter label */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <SlidersHorizontal size={17} />
            Filters
          </div>

          {/* Teaching mode */}
          <select
            value={teachingMode}
            onChange={(e) => setTeachingMode(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Teaching mode</option>
            <option value="online">Online</option>
            <option value="home">Home</option>
            <option value="both">Online + Home</option>
          </select>

          {/* Price */}
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Any price</option>
            <option value="200">Under ₹200/hr</option>
            <option value="300">Under ₹300/hr</option>
            <option value="500">Under ₹500/hr</option>
            <option value="1000">Under ₹1,000/hr</option>
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-red-500"
            >
              <X size={15} />
              Clear
            </button>
          )}
        </div>

        {/* Quick subjects */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium uppercase tracking-wide text-slate-400">
            Popular
          </span>

          {quickSubjects.map((item) => {
            const active = subject.toLowerCase() === item.toLowerCase();

            return (
              <button
                key={item}
                type="button"
                onClick={() => setSubject(active ? "" : item)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}