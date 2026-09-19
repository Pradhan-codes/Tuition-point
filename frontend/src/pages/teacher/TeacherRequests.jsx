import { useState, useEffect } from "react";
import TeacherRequestCard from "../../components/requests/TeacherRequestCard";
import { Users } from "lucide-react";

export default function TeacherRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchRequests = async () => {
    try {
      const res = await fetch("/teachers/requests");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load inquiries");
      setRequests(data.requests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    fetchRequests();
  }, []);

  const handleStatusUpdate = async (requestId, status) => {
    try {
      const res = await fetch(`/api/teachers/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Status update failed");

      // Update state locally
      setRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status } : r))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Student Requests</h1>
          <p className="text-xs text-slate-500 mt-1">Manage incoming lesson bookings and inquiries</p>
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