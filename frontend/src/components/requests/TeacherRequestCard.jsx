import { useState } from "react";
import { Laptop, Home, Check, X, Mail, Phone, Calendar } from "lucide-react";
import RequestStatusBadge from "./RequestStatusBadge";

export default function TeacherRequestCard({ request, onStatusUpdate }) {
  const [submitting, setSubmitting] = useState(false);
  const student = request.student || {};

  const handleAction = async (status) => {
    setSubmitting(true);
    await onStatusUpdate(request._id, status);
    setSubmitting(false);
  };

  const formattedDate = new Date(request.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
            {request.subject}
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            {student.name || "Prospective Student"}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
            <Calendar size={12} /> Received on {formattedDate}
          </div>
        </div>

        <RequestStatusBadge status={request.status} />
      </div>

      {request.message && (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
          <span className="font-semibold text-slate-700 block mb-0.5">Student Goal:</span>
          {request.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium capitalize">
          {request.mode === "online" ? <Laptop size={14} /> : <Home size={14} />}
          {request.mode} Session
        </div>

        {request.status === "pending" ? (
          <div className="flex items-center gap-2">
            <button
              disabled={submitting}
              onClick={() => handleAction("rejected")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 font-semibold transition disabled:opacity-50"
            >
              <X size={14} /> Decline
            </button>
            <button
              disabled={submitting}
              onClick={() => handleAction("accepted")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition shadow-sm disabled:opacity-50"
            >
              <Check size={14} /> Accept Request
            </button>
          </div>
        ) : request.status === "accepted" ? (
          <div className="flex items-center gap-3 text-slate-700">
            {student.phone && (
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <Phone size={13} /> {student.phone}
              </span>
            )}
            {student.email && (
              <span className="flex items-center gap-1 text-slate-600">
                <Mail size={13} /> {student.email}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}