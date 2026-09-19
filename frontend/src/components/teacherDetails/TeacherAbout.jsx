//import React from "react";
import { BookOpen, Clock, Laptop, Home } from "lucide-react";

export default function TeacherAbout({ bio, subjects = [], experienceYears = 0, teachingMode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Bio */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">About the Tutor</h2>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
          {bio || "No biography provided by this instructor yet."}
        </p>
      </div>

      {/* Experience & Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-100 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Clock size={18} />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Experience</div>
            <div className="text-sm font-semibold text-slate-800">{experienceYears} Years Teaching</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            {teachingMode === "online" ? <Laptop size={18} /> : <Home size={18} />}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Teaching Mode</div>
            <div className="text-sm font-semibold text-slate-800 capitalize">
              {teachingMode === "both" ? "Online & In-Person" : `${teachingMode} only`}
            </div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-blue-600" /> Subjects Offered
        </h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((sub, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-lg border border-blue-100"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}