import { useEffect, useState } from "react";

import FindTeachersHeader from "../../components/findTeachers/FindTeachersHeader";
import TeacherSearchBar from "../../components/findTeachers/TeacherSearchBar";
import TeacherFilters from "../../components/findTeachers/TeacherFilters";
import TeacherResults from "../../components/findTeachers/TeacherResults";
import Pagination from "../../components/findTeachers/Pagination";

import { searchTeachers } from "../../services/teacherService";

export default function FindTeachers() {
  // Search state
  const [subject, setSubject] = useState("");

  const [coords] = useState({
    lng: 78.4867,
    lat: 17.385,
  });

  const [locationName] = useState("Nearby (GPS)");

  const [radius, setRadius] = useState(5);

  // Filters
  const [maxPrice, setMaxPrice] = useState("");
  const [teachingMode, setTeachingMode] = useState("");

  // Results
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    let isMounted = true;

    const loadTeachers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchTeachers({
          lng: coords.lng,
          lat: coords.lat,
          radius,
          page,
          limit: 8,
          subject,
          maxPrice,
          teachingMode,
        });

        if (!isMounted) return;

        setTeachers(data.teachers || []);

        setPagination(
          data.pagination || {
            total: data.count || 0,
            totalPages: 1,
          }
        );
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
          setTeachers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeachers();

    return () => {
      isMounted = false;
    };
  }, [
    coords.lng,
    coords.lat,
    radius,
    page,
    subject,
    maxPrice,
    teachingMode,
  ]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // If the user changes search criteria,
    // always start from the first page.
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFavorite = (teacher) => {
    // Favorites will be connected to backend later.
    console.log("Favorite teacher:", teacher._id);
  };

  return (
    <main className="min-h-screen bg-slate-50">

      <FindTeachersHeader
        locationName={locationName}
        radius={radius}
      />

      <TeacherSearchBar
        subject={subject}
        setSubject={setSubject}
        locationName={locationName}
        radius={radius}
        setRadius={(value) => {
          setRadius(value);
          setPage(1);
        }}
        onSubmit={handleSearchSubmit}
      />

      <TeacherFilters
        teachingMode={teachingMode}
        setTeachingMode={(value) => {
          setTeachingMode(value);
          setPage(1);
        }}
        maxPrice={maxPrice}
        setMaxPrice={(value) => {
          setMaxPrice(value);
          setPage(1);
        }}
        subject={subject}
        setSubject={(value) => {
          setSubject(value);
          setPage(1);
        }}
      />

      {/* Error */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

      <TeacherResults
        teachers={teachers}
        loading={loading}
        onFavorite={handleFavorite}
      />

      {!loading && teachers.length > 0 && (
        <div className="bg-slate-50 px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Pagination
              page={page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}