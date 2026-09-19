export async function searchTeachers({
  lng,
  lat,
  radius,
  page,
  limit = 8,
  subject,
  maxPrice,
  teachingMode,
}) {
  const params = new URLSearchParams({
    lng,
    lat,
    radius,
    page,
    limit,
  });

  if (subject) {
    params.append("subject", subject);
  }

  if (maxPrice) {
    params.append("maxPrice", maxPrice);
  }

  if (teachingMode) {
    params.append("mode", teachingMode);
  }

  const response = await fetch(`/students/search?${params.toString()}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch teachers");
  }

  return data;
}