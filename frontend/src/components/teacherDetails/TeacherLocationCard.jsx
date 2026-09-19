//import React from "react";
import { MapPin, Navigation } from "lucide-react";

export default function TeacherLocationCard({ distanceKm, hourlyRate, onBookClick }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
      <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-3xl font-extrabold text-slate-900">${hourlyRate || 0}</span>
          <span className="text-sm text-slate-500 font-medium"> / hr</span>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
          Available Now
        </span>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <MapPin size={14} className="text-blue-600" /> Proximity Radius
        </div>
        <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <Navigation size={14} className="text-slate-400" />
          {distanceKm !== undefined ? `${distanceKm} km away from you` : "Location verified"}
        </div>
      </div>

      <button
        onClick={onBookClick}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md shadow-blue-500/20 text-sm"
      >
        Request Session
      </button>
    </div>
  );
}