import {
  Heart,
  MapPin,
  Star,
  ShieldCheck,
  BookOpen,
  Clock,
} from "lucide-react";

export default function TeacherCard({ teacher, onFavorite }) {
  const name = teacher.user?.name || teacher.userDetails?.name || "Teacher";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const subjects = teacher.subjects || [];

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50">
      
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600">
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900">
                {name}
              </h3>

              <ShieldCheck
                size={16}
                className="text-blue-600"
              />
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Star
                size={15}
                className="fill-current text-amber-400"
              />

              <span className="font-medium text-slate-700">
                {teacher.rating ?? "New"}
              </span>

              {teacher.experienceYears != null && (
                <>
                  <span>•</span>
                  <span>
                    {teacher.experienceYears} yrs experience
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Favorite */}
        <button
          type="button"
          onClick={() => onFavorite?.(teacher)}
          aria-label="Save teacher"
          className="rounded-full p-2 text-slate-400 transition hover:bg-slate-50 hover:text-red-500"
        >
          <Heart size={20} />
        </button>
      </div>

      {/* Location */}
      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
        <MapPin size={16} className="text-blue-500" />

        <span>
          {teacher.distanceKm != null
            ? `${teacher.distanceKm} km away`
            : "Nearby"}
        </span>
      </div>

      {/* Subjects */}
      {subjects.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {subjects.slice(0, 4).map((subject) => (
            <span
              key={subject}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {subject}
            </span>
          ))}
        </div>
      )}

      {/* Details */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">Teaching mode</p>
            <p className="text-sm font-medium capitalize text-slate-700">
              {teacher.teachingMode || "Flexible"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} className="text-slate-400" />

          <div>
            <p className="text-xs text-slate-400">Rate</p>
            <p className="text-sm font-semibold text-slate-800">
              {teacher.hourlyRate != null
                ? `₹${teacher.hourlyRate}/hr`
                : "Contact teacher"}
            </p>
          </div>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
      >
        View teacher
      </button>
    </article>
  );
}