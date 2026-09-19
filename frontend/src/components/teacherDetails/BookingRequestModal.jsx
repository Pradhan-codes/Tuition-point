import { useState } from "react";
import { X, Send } from "lucide-react";

export default function BookingRequestModal({ isOpen, onClose, teacherId, subjects = [], onSuccess }) {
  const [subject, setSubject] = useState(subjects[0] || "");
  const [mode, setMode] = useState("online");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/students/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId, subject, mode, message })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send request");

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold text-slate-900 mb-1">Book a Learning Session</h3>
        <p className="text-xs text-slate-500 mb-4">Send a direct booking request to the instructor.</p>

        {error && (
          <div className="mb-4 text-xs bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Select Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white"
            >
              {subjects.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Learning Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {["online", "home"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`py-2 text-xs font-semibold rounded-xl border capitalize transition ${
                    mode === m ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-600"
                  }`}
                >
                  {m === "home" ? "In-Person" : "Online"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Note / Learning Goal</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Preparing for exams, need assistance with calculus..."
              className="w-full border border-slate-200 rounded-xl p-2.5 text-sm focus:outline-none focus:border-blue-600"
              maxLength={300}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Send size={16} /> {loading ? "Sending..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}