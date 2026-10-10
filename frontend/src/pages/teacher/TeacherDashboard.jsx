import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, UserRound } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getTeacherDashboardData } from "../../services/dashboardService";
import {
  DashboardError,
  DashboardLoading,
  DashboardStat,
  RequestPreview,
} from "../../components/dashboard/DashboardPrimitives";

function getProfileCompletion(profile) {
  if (!profile) return null;
  const checks = [
    Boolean(profile.bio),
    Boolean(profile.subjects?.length),
    profile.hourlyRate !== undefined && profile.hourlyRate !== null,
    Boolean(profile.teachingMode),
    profile.experienceYears !== undefined && profile.experienceYears !== null,
    Boolean(profile.location?.coordinates?.length === 2),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getTeacherDashboardData()
      .then((data) => {
        if (!active) return;
        setRequests(data.requests);
        setProfile(data.profile);
      })
      .catch((loadError) => {
        if (active && loadError.name !== "AbortError") {
          setError(loadError.message || "Could not load your dashboard.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((request) => request.status === "pending").length,
    accepted: requests.filter((request) => request.status === "accepted").length,
    rejected: requests.filter((request) => request.status === "rejected").length,
  }), [requests]);

  if (loading) return <DashboardLoading />;

  return (
    <main className="min-h-screen bg-slate-50 pb-24 pt-8 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700">Teacher dashboard</p>
            <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-2 text-sm text-slate-600">A current view of incoming tutoring requests and your profile.</p>
          </div>
          <Link to="/teacher/my-requests" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
            <ClipboardList size={17} /> Student requests <ArrowRight size={16} />
          </Link>
        </header>

        {error && <div className="mb-6"><DashboardError message={error} /></div>}

        <section aria-label="Request statistics" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStat label="Total requests" value={stats.total} detail="Requests received" />
          <DashboardStat label="Pending" value={stats.pending} detail="Awaiting your response" />
          <DashboardStat label="Accepted" value={stats.accepted} detail="Accepted requests" />
          <DashboardStat label="Declined" value={stats.rejected} detail="Declined requests" />
        </section>

        <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,1fr)]">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Recent student requests</h2>
                <p className="mt-1 text-sm text-slate-500">Latest requests returned by your account.</p>
              </div>
              <Link to="/teacher/my-requests" className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900">
                Manage requests <ArrowRight size={15} />
              </Link>
            </div>

            {requests.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                <ClipboardList className="mx-auto text-slate-400" size={28} />
                <h3 className="mt-3 font-semibold text-slate-800">No student requests yet</h3>
                <p className="mt-1 text-sm text-slate-500">Incoming tutoring requests will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.slice(0, 4).map((request) => (
                  <RequestPreview
                    key={request._id}
                    request={request}
                    counterpartLabel="Student"
                    counterpartName={request.student?.name}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="min-w-0 space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <UserRound size={18} className="text-blue-700" />
                <h2 className="font-bold text-slate-900">Teaching profile</h2>
              </div>
              {profile ? (
                <>
                  {profile.bio && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{profile.bio}</p>}
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    {profile.subjects?.length > 0 && <p className="break-words">Subjects: {profile.subjects.join(", ")}</p>}
                    {profile.hourlyRate != null && <p>Rate: ₹{profile.hourlyRate} / hour</p>}
                    {profile.teachingMode && <p className="capitalize">Teaching mode: {profile.teachingMode === "both" ? "Online and home" : profile.teachingMode}</p>}
                    {profile.experienceYears != null && <p>Experience: {profile.experienceYears} years</p>}
                  </div>
                  {getProfileCompletion(profile) !== null && (
                    <div className="mt-4">
                      <div className="flex justify-between gap-3 text-xs text-slate-500">
                        <span>Profile details provided</span>
                        <span>{getProfileCompletion(profile)}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-blue-700" style={{ width: `${getProfileCompletion(profile)}%` }} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No teaching profile has been saved yet.</p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-slate-900">Quick actions</h2>
          <div className="mt-3 grid gap-2">
            <Link to="/teacher/my-requests" className="flex min-h-11 items-center justify-between rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100">
              View student requests <ArrowRight size={16} />
            </Link>
            <Link to="/teacher/profile" className="flex min-h-11 items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Edit profile <ArrowRight size={16} />
            </Link>
          </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
