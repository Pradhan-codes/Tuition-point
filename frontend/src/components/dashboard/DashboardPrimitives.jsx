import { CalendarDays } from "lucide-react";
import RequestStatusBadge from "../requests/RequestStatusBadge";

export function DashboardStat({ label, value, detail }) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 break-words text-3xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </article>
  );
}

export function RequestPreview({ request, counterpartLabel, counterpartName }) {
  const name = counterpartName || "Name unavailable";
  const date = request.createdAt
    ? new Date(request.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="break-words font-semibold text-slate-900">{request.subject || "Subject unavailable"}</h3>
          <RequestStatusBadge status={request.status} />
        </div>
        <p className="mt-1 break-words text-sm text-slate-600">
          {counterpartLabel}: {name}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs capitalize text-slate-500">
          {request.mode && <span>{request.mode} session</span>}
          {date && (
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={13} /> {date}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function DashboardLoading() {
  return (
    <main className="mx-auto min-h-[60vh] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-label="Loading dashboard">
      <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        ))}
      </div>
      <div className="mt-6 h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
    </main>
  );
}

export function DashboardError({ message }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}
