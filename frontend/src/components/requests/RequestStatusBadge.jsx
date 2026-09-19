//import React from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export default function RequestStatusBadge({ status }) {
  const styles = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: <Clock size={12} />
    },
    accepted: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: <CheckCircle2 size={12} />
    },
    rejected: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: <XCircle size={12} />
    }
  };

  const current = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${current.bg} ${current.text} ${current.border}`}
    >
      {current.icon}
      {status}
    </span>
  );
}