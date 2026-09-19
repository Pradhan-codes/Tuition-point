import { useState, useEffect } from "react";
import StudentRequestCard from "../../components/requests/StudentRequestCard";
import { Inbox } from "lucide-react";

export default function StudentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchRequests = async () => {
      try {
        const res = await fetch("/students/requests");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Could not fetch requests");
        if (isMounted) setRequests(data.requests || []);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRequests();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">My Requests</h1>
          <p className="text-xs text-slate-500 mt-1">Track tuition inquiries sent to teachers</p>
        </div>

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
            <Inbox className="mx-auto text-slate-300 mb-2" size={32} />
            <h3 className="font-bold text-slate-700">No requests placed yet</h3>
            <p className="text-xs text-slate-400 mt-1">Search for nearby teachers to book your first lesson.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <StudentRequestCard key={req._id} request={req} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}