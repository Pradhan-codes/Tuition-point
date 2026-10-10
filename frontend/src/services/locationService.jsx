export async function resolveSearchLocation(query, signal) {
  const params = new URLSearchParams({ q: query.trim() });
  const response = await fetch(`/students/geocode?${params.toString()}`, {
    signal,
    credentials: "include",
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Could not resolve that location.");
  }

  if (!data.location || !Number.isFinite(data.location.lat) || !Number.isFinite(data.location.lng)) {
    throw new Error("We couldn’t find that location. Try a nearby city or postal code.");
  }

  return data.location;
}
