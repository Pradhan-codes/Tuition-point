import { SearchX } from "lucide-react";
import TeacherCard from "./TeacherCard";

export default function TeacherResults({
  teachers,
  loading,
  onFavorite,
}) {
  if (loading) {
    return (
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Results heading */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {teachers.length > 0
                ? "Teachers near you"
                : "No teachers found"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {teachers.length > 0
                ? `${teachers.length} teachers available`
                : "Try expanding your search or changing your filters."}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {teachers.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <SearchX size={24} className="text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No matching teachers
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              We couldn't find teachers matching your current search.
              Try increasing the search radius or removing some filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher._id}
                teacher={teacher}
                onFavorite={onFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}