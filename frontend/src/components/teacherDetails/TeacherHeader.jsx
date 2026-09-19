//import React from "react";
import { Star, ShieldCheck, Heart, Share2 } from "lucide-react";

export default function TeacherHeader({ name, rating = 4.9, reviewCount = 28 }) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "T";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="w-24 h-24 rounded-2xl bg-blue-100 text-blue-700 text-2xl font-extrabold flex items-center justify-center border-2 border-blue-200 shadow-sm">
          {initials}
        </div>
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{name || "Tutor Profile"}</h1>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-md">
              <ShieldCheck size={14} /> Verified DBS
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2 text-sm text-slate-500">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={16} fill="currentColor" /> {rating}
            </div>
            <span>•</span>
            <span>({reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition">
          <Share2 size={18} />
        </button>
        <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition hover:text-red-500">
          <Heart size={18} />
        </button>
      </div>
    </div>
  );
}