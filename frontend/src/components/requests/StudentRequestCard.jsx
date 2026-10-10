//import React from "react";
import { Calendar, Laptop, Home, Mail, Phone } from "lucide-react";
import RequestStatusBadge from "./RequestStatusBadge";

export default function StudentRequestCard({ request }) {
  const teacher = request.teacher || {};
  const formattedDate = new Date(request.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
            {request.subject}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            {teacher.name || "Assigned Instructor"}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <Calendar size={12} /> Requested on {formattedDate}
          </div>
        </div>

        <RequestStatusBadge status={request.status} />
      </div>

      {request.message && (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
          <span className="font-semibold text-slate-700 block mb-0.5">Your Note:</span>
          {request.message}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 capitalize font-medium">
          {request.mode === "online" ? <Laptop size={14} /> : <Home size={14} />}
          {request.mode} Tuition
        </div>

        {request.status === "accepted" && (
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-slate-700">
            {teacher.phone && (
              <span className="flex min-w-0 items-center gap-1 break-all font-semibold text-emerald-600">
                <Phone size={13} /> {teacher.phone}
              </span>
            )}
            {teacher.email && (
              <span className="flex min-w-0 items-center gap-1 break-all text-slate-600">
                <Mail size={13} /> {teacher.email}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
