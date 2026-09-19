import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import TeacherHeader from "../../components/teacherDetails/TeacherHeader";
import TeacherAbout from "../../components/teacherDetails/TeacherAbout";
import TeacherLocationCard from "../../components/teacherDetails/TeacherLocationCard";
import BookingRequestModal from "../../components/teacherDetails/BookingRequestModal";

export default function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`/teachers/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load tutor");
        if (isMounted) setTeacher(data.teacher);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTeacher();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-16 text-center text-slate-500">Loading tutor details...</div>;
  }

  if (error || !teacher) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600 mb-4">{error || "Teacher not found"}</p>
        <button onClick={() => navigate(-1)} className="text-sm font-semibold text-blue-600">
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ChevronLeft size={16} /> Back to Search
        </button>

        {requestSent && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-2xl">
            Booking request submitted. The tutor will review and respond shortly.
          </div>
        )}

        <div className="space-y-6">
          <TeacherHeader name={teacher.user?.name} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <TeacherAbout
                bio={teacher.bio}
                subjects={teacher.subjects}
                experienceYears={teacher.experienceYears}
                teachingMode={teacher.teachingMode}
              />
            </div>

            <div className="md:col-span-1">
              <TeacherLocationCard
                distanceKm={teacher.distanceKm}
                hourlyRate={teacher.hourlyRate}
                onBookClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <BookingRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teacherId={teacher.user?._id || teacher.user}
        subjects={teacher.subjects}
        onSuccess={() => setRequestSent(true)}
      />
    </div>
  );
}