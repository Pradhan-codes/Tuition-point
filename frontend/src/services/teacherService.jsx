export async function searchTeachers({
  lng,
  lat,
  radius,
  page,
  limit = 8,
  subject,
  maxPrice,
  teachingMode,
  signal,
}) {
  const params = new URLSearchParams({
    lng,
    lat,
    radius,
    page,
    limit,
  });

  if (subject && subject.trim()) {
    params.append("subject", subject.trim());
  }

  if (maxPrice) {
    params.append("maxPrice", maxPrice);
  }

  if (teachingMode) {
    params.append("mode", teachingMode);
  }

  const response = await fetch(`/students/search?${params.toString()}`, {
    signal,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch teachers");
  }

  return data;
}

export async function getTeacherById(id, signal) {
  const response = await fetch(`/teachers/${id}`, {
    signal,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Failed to load tutor details");
  }

  return data;
}

export async function createBookingRequest({ teacherId, subject, mode, message }) {
  const response = await fetch("/students/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ teacherId, subject, mode, message }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.errors?.[0]?.msg || "Failed to send booking request");
  }

  return data;
}
