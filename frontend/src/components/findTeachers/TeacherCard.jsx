import { useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Star,
  ShieldCheck,
  BookOpen,
  Clock,
} from "lucide-react";

export default function TeacherCard({ teacher, onFavorite }) {
  const navigate = useNavigate();

  const name = teacher.userDetails?.name || teacher.user?.name || "Teacher";
  const teacherId = teacher.userDetails?._id || teacher.user?._id || teacher.user || teacher._id;

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "T";

  const subjects = teacher.subjects || [];

  const handleViewTeacher = () => {
    if (teacherId) {
      navigate(`/student/teacher-details/${teacherId}`);
    }
  };

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50 flex flex-col justify-between">
      
      <div>
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={handleViewTeacher}
          >
            {/* Avatar */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600 group-hover:bg-blue-100 transition">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="break-words font-semibold text-slate-900 group-hover:text-blue-600 transition">
                  {name}
                </h3>

                <ShieldCheck
                  size={16}
                  className="text-blue-600 shrink-0"
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
                      {teacher.experienceYears} yrs exp
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Favorite */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(teacher);
            }}
            aria-label="Save teacher"
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-50 hover:text-red-500"
          >
            <Heart size={20} />
          </button>
        </div>

        {/* Location */}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} className="text-blue-500 shrink-0" />

          <span>
            {teacher.distanceKm != null
              ? `${teacher.distanceKm} km away`
              : "Nearby"}
          </span>
        </div>

        {/* Subjects */}
        {subjects.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {subjects.slice(0, 4).map((sub) => (
              <span
                key={sub}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
              >
                {sub}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Details */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-slate-400 shrink-0" />

            <div>
              <p className="text-xs text-slate-400">Teaching mode</p>
              <p className="text-sm font-medium capitalize text-slate-700">
                {teacher.teachingMode === "both" ? "Online + Home" : (teacher.teachingMode || "Flexible")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-400 shrink-0" />

            <div>
              <p className="text-xs text-slate-400">Rate</p>
              <p className="text-sm font-semibold text-slate-800">
                {teacher.hourlyRate != null
                  ? `₹${teacher.hourlyRate}/hr`
                  : "Contact"}
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <button
          type="button"
          onClick={handleViewTeacher}
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
        >
          View teacher
        </button>
      </div>
    </article>
  );
}
