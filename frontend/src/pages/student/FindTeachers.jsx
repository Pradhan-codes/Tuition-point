import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import FindTeachersHeader from "../../components/findTeachers/FindTeachersHeader";
import TeacherSearchBar from "../../components/findTeachers/TeacherSearchBar";
import TeacherFilters from "../../components/findTeachers/TeacherFilters";
import TeacherResults from "../../components/findTeachers/TeacherResults";
import Pagination from "../../components/findTeachers/Pagination";

import { resolveSearchLocation } from "../../services/locationService";
import { searchTeachers } from "../../services/teacherService";

export default function FindTeachers() {
  const routerLocation = useLocation();
  const initialSubject = routerLocation.state?.subject || "";
  const initialLocation = routerLocation.state?.location?.trim() || "";

  const [subject, setSubject] = useState(initialSubject);
  const [activeSubject, setActiveSubject] = useState(initialSubject);
  const [location, setLocation] = useState(initialLocation);
  const [coords, setCoords] = useState(null);
  const [resolvingLocation, setResolvingLocation] = useState(Boolean(initialLocation));
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
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const debounceTimerRef = useRef(null);
  const locationRequestRef = useRef(0);
  const geocodeControllerRef = useRef(null);

  // Resolve a location passed from the home search. Direct visits wait for user input.
  useEffect(() => {
    if (!initialLocation) return undefined;

    const controller = new AbortController();
    const requestId = ++locationRequestRef.current;
    geocodeControllerRef.current = controller;

    resolveSearchLocation(initialLocation, controller.signal)
      .then((resolved) => {
        if (requestId === locationRequestRef.current) setCoords(resolved);
      })
      .catch((locationError) => {
        if (locationError.name !== "AbortError" && requestId === locationRequestRef.current) {
          setError(locationError.message || "Could not resolve that location.");
          setTeachers([]);
        }
      })
      .finally(() => {
        if (requestId === locationRequestRef.current) {
          setResolvingLocation(false);
          geocodeControllerRef.current = null;
        }
      });

    return () => {
      controller.abort();
      if (requestId === locationRequestRef.current) locationRequestRef.current += 1;
    };
  }, [initialLocation]);

  const handleSubjectChange = (value) => {
    setSubject(value);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setActiveSubject(value);
      setPage(1);
    }, 400);
  };

  const handleQuickSubjectSelect = (value) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setSubject(value);
    setActiveSubject(value);
    setPage(1);
  };

  const handleLocationChange = (event) => {
    geocodeControllerRef.current?.abort();
    locationRequestRef.current += 1;
    setLocation(event.target.value);
    setCoords(null);
    setResolvingLocation(false);
    setError(null);
    setTeachers([]);
    setLoading(false);
    setPagination({ total: 0, totalPages: 1 });
  };

  const handleSearchSubmit = async (event) => {
    event?.preventDefault();
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setActiveSubject(subject);
    setPage(1);
    setTeachers([]);
    setPagination({ total: 0, totalPages: 1 });

    const query = location.trim();
    if (!query) {
      setCoords(null);
      setError("Enter a city or postal code to search.");
      return;
    }

    geocodeControllerRef.current?.abort();
    const controller = new AbortController();
    const requestId = ++locationRequestRef.current;
    geocodeControllerRef.current = controller;
    setCoords(null);
    setResolvingLocation(true);
    setError(null);

    try {
      const resolved = await resolveSearchLocation(query, controller.signal);
      if (requestId === locationRequestRef.current) setCoords(resolved);
    } catch (locationError) {
      if (locationError.name !== "AbortError" && requestId === locationRequestRef.current) {
        setError(locationError.message || "Could not resolve that location.");
      }
    } finally {
      if (requestId === locationRequestRef.current) {
        setResolvingLocation(false);
        geocodeControllerRef.current = null;
      }
    }
  };

  const lng = coords?.lng;
  const lat = coords?.lat;

  useEffect(() => {
    if (lng == null || lat == null) return undefined;

    const controller = new AbortController();
    let isMounted = true;

    const loadTeachers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchTeachers({
          lng,
          lat,
          radius,
          page,
          limit: 8,
          subject: activeSubject,
          maxPrice,
          teachingMode,
          signal: controller.signal,
        });

        if (!isMounted) return;
        setTeachers(data.teachers || []);
        setPagination(data.pagination || {
          total: data.total || 0,
          totalPages: data.totalPages || 1,
        });
      } catch (searchError) {
        if (searchError.name !== "AbortError" && isMounted) {
          setError(searchError.message || "Something went wrong fetching teachers.");
          setTeachers([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTeachers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [lng, lat, radius, page, activeSubject, maxPrice, teachingMode]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFavorite = (teacher) => {
    // Favorites will be connected to backend later.
    console.log("Favorite teacher:", teacher._id);
  };

  const locationName = coords?.label || "";

  return (
    <main className="min-h-screen bg-slate-50">
      <FindTeachersHeader locationName={locationName} radius={radius} />

      <TeacherSearchBar
        subject={subject}
        setSubject={handleSubjectChange}
        location={location}
        setLocation={handleLocationChange}
        locationName={coords?.label || ""}
        radius={radius}
        setRadius={(value) => {
          setRadius(value);
          setPage(1);
        }}
        onSubmit={handleSearchSubmit}
        resolvingLocation={resolvingLocation}
      />

      {error && (
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

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
        subject={activeSubject}
        setSubject={handleQuickSubjectSelect}
      />

      {coords ? (
        <TeacherResults teachers={teachers} loading={loading} onFavorite={handleFavorite} />
      ) : (
        <section className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600">
            {resolvingLocation ? "Finding your search location…" : "Enter a city or postal code and search to see teachers in that area."}
          </div>
        </section>
      )}

      {!loading && teachers.length > 0 && (
        <div className="bg-slate-50 px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Pagination page={page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </main>
  );
}
