import { useState, useEffect } from "react";
import TeacherRequestCard from "../../components/requests/TeacherRequestCard";
import { Users } from "lucide-react";

export default function TeacherRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const fetchRequests = async () => {
    try {
      const res = await fetch("/teachers/requests", {
        credentials: "include",
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || "Failed to load inquiries");
      if (isMounted) setRequests(Array.isArray(data.requests) ? data.requests : []);
    } catch (err) {
      if (err.name !== "AbortError" && isMounted) setError(err.message || "Failed to load inquiries");
    } finally {
      if (isMounted) setLoading(false);
    }
  };
    fetchRequests();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleStatusUpdate = async (requestId, status) => {
    setError(null);
    try {
      const res = await fetch(`/teachers/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || "Status update failed");

      // Update state locally
      setRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status } : r))
      );
    } catch (err) {
      setError(err.message || "Status update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Student Requests</h1>
          <p className="text-xs text-slate-500 mt-1">Manage incoming lesson bookings and inquiries</p>
        </div>

        {error && requests.length > 0 && (
          <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-32 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
            {error}
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Users className="mx-auto text-slate-300 mb-2" size={32} />
            <h3 className="font-bold text-slate-700">No incoming requests</h3>
            <p className="text-xs text-slate-400 mt-1">New lesson inquiries will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <TeacherRequestCard
                key={req._id}
                request={req}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
