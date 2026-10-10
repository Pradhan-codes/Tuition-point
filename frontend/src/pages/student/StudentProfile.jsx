import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { getStudentProfile, saveStudentProfile } from "../../services/dashboardService";

const emptyForm = {
  grade: "",
  board: "",
  subjectsNeeded: "",
  preferredMode: "",
  longitude: "",
  latitude: "",
  preferredRadius: "",
  budgetMin: "",
  budgetMax: "",
  availability: "",
  learningPreferences: "",
};

const lines = (value = "") => value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
const availabilityText = (items = []) =>
  items.map(({ day, startTime, endTime }) => `${day}, ${startTime}, ${endTime}`).join("\n");

function formFromProfile(profile) {
  const coordinates = profile?.location?.coordinates || [];
  return {
    grade: profile?.grade || "",
    board: profile?.board || "",
    subjectsNeeded: (profile?.subjectsNeeded || []).join("\n"),
    preferredMode: profile?.preferredMode || "",
    longitude: coordinates[0] ?? "",
    latitude: coordinates[1] ?? "",
    preferredRadius: profile?.preferredRadius ?? "",
    budgetMin: profile?.budget?.min ?? "",
    budgetMax: profile?.budget?.max ?? "",
    availability: availabilityText(profile?.availability),
    learningPreferences: (profile?.learningPreferences || []).join("\n"),
  };
}

function parseAvailability(value) {
  return lines(value).map((line) => {
    const [day = "", startTime = "", endTime = ""] = line.split(",").map((part) => part.trim());
    return { day: day.toLowerCase(), startTime, endTime };
  });
}

function Field({ label, name, children, hint }) {
  return (
    <label className="block text-sm font-medium text-slate-700" htmlFor={name}>
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span>}
    </label>
  );
}

const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function StudentProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;
    getStudentProfile()
      .then((profile) => {
        if (active && profile) setForm(formFromProfile(profile));
      })
      .catch((loadError) => {
        if (active) {
          setLoadFailed(true);
          setError(loadError.message || "Could not load your profile.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const subjectsNeeded = lines(form.subjectsNeeded);
      if (!subjectsNeeded.length) throw new Error("Add at least one subject.");
      const savedProfile = await saveStudentProfile({
        grade: form.grade.trim(),
        board: form.board.trim(),
        subjectsNeeded,
        preferredMode: form.preferredMode || undefined,
        location: { type: "Point", coordinates: [Number(form.longitude), Number(form.latitude)] },
        preferredRadius: form.preferredRadius === "" ? null : Number(form.preferredRadius),
        budget: {
          min: form.budgetMin === "" ? null : Number(form.budgetMin),
          max: form.budgetMax === "" ? null : Number(form.budgetMax),
        },
        availability: parseAvailability(form.availability),
        learningPreferences: lines(form.learningPreferences),
      });
      if (savedProfile) setForm(formFromProfile(savedProfile));
      setSuccess("Your profile has been saved.");
    } catch (saveError) {
      setError(saveError.message || "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 pt-8 md:pb-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link to="/student/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-700">
          <ArrowLeft size={16} /> Student dashboard
        </Link>
        <header className="mb-6 mt-4">
          <p className="text-sm font-semibold text-blue-700">Student profile</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{user?.name || "Your learning profile"}</h1>
          <p className="mt-2 text-sm text-slate-600">Manage the learning and location details saved to your account.</p>
        </header>

        {error && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {success && <div role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{success}</div>}
        {loading ? (
          <div className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" aria-label="Loading student profile" />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <fieldset disabled={saving || loadFailed} className="space-y-6 disabled:opacity-70">
              <section className="grid gap-4 sm:grid-cols-2">
                <Field label="Grade / class" name="grade"><input id="grade" name="grade" value={form.grade} onChange={update} required className={inputClass} /></Field>
                <Field label="Board" name="board"><input id="board" name="board" value={form.board} onChange={update} className={inputClass} /></Field>
                <Field label="Subjects needed" name="subjectsNeeded" hint="Enter one subject per line."><textarea id="subjectsNeeded" name="subjectsNeeded" value={form.subjectsNeeded} onChange={update} required rows={3} className={inputClass} /></Field>
                <Field label="Preferred learning mode" name="preferredMode"><select id="preferredMode" name="preferredMode" value={form.preferredMode} onChange={update} className={inputClass}><option value="">Choose a preference</option><option value="online">Online</option><option value="home">Home</option><option value="both">Online or home</option></select></Field>
              </section>

              <section className="border-t border-slate-100 pt-5">
                <h2 className="font-semibold text-slate-900">Location</h2>
                <p className="mt-1 text-xs text-slate-500">Coordinates are stored as longitude, latitude for nearby teacher search.</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <Field label="Longitude" name="longitude"><input id="longitude" name="longitude" type="number" min="-180" max="180" step="any" required value={form.longitude} onChange={update} className={inputClass} /></Field>
                  <Field label="Latitude" name="latitude"><input id="latitude" name="latitude" type="number" min="-90" max="90" step="any" required value={form.latitude} onChange={update} className={inputClass} /></Field>
                  <Field label="Preferred search radius (km)" name="preferredRadius"><input id="preferredRadius" name="preferredRadius" type="number" min="0" step="any" value={form.preferredRadius} onChange={update} className={inputClass} /></Field>
                </div>
              </section>

              <section className="grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                <div className="sm:col-span-2"><h2 className="font-semibold text-slate-900">Additional preferences</h2></div>
                <Field label="Minimum budget" name="budgetMin"><input id="budgetMin" name="budgetMin" type="number" min="0" step="any" value={form.budgetMin} onChange={update} className={inputClass} /></Field>
                <Field label="Maximum budget" name="budgetMax"><input id="budgetMax" name="budgetMax" type="number" min="0" step="any" value={form.budgetMax} onChange={update} className={inputClass} /></Field>
                <Field label="Availability" name="availability" hint="One time slot per line: day, start time, end time (24-hour, e.g. monday, 09:00, 12:00)."><textarea id="availability" name="availability" rows={3} value={form.availability} onChange={update} className={inputClass} /></Field>
                <Field label="Learning preferences" name="learningPreferences" hint="Enter one preference per line."><textarea id="learningPreferences" name="learningPreferences" rows={3} value={form.learningPreferences} onChange={update} className={inputClass} /></Field>
              </section>
            </fieldset>

            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button type="submit" disabled={saving || loading || loadFailed} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">
                <Save size={16} /> {saving ? "Saving…" : "Save profile"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
