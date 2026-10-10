const resultCache = new Map();
const cacheDurationMs = 24 * 60 * 60 * 1000;
const maximumCacheEntries = 500;
let requestQueue = Promise.resolve();
let nextRequestAt = 0;

function searchProvider(query) {
  const searchEndpoint = process.env.GEOCODING_SEARCH_URL || "https://nominatim.openstreetmap.org/search";
  const url = new URL(searchEndpoint);
  url.searchParams.set("q", query);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "TuitionPoint/1.0 (location search)",
    },
    signal: AbortSignal.timeout(10000),
  });
}

export function resolveLocation(query) {
  const normalizedQuery = query.trim().replace(/\s+/g, " ");
  const cacheKey = normalizedQuery.toLowerCase();
  const cached = resultCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return Promise.resolve(cached.location);
  if (cached) resultCache.delete(cacheKey);

  const request = requestQueue.then(async () => {
    const queuedCached = resultCache.get(cacheKey);
    if (queuedCached && queuedCached.expiresAt > Date.now()) return queuedCached.location;
    if (queuedCached) resultCache.delete(cacheKey);

    const waitMs = Math.max(0, nextRequestAt - Date.now());
    if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));
    nextRequestAt = Date.now() + 1000;

    const response = await searchProvider(normalizedQuery);
    if (!response.ok) throw new Error("Location search is temporarily unavailable. Please try again.");

    const results = await response.json();
    const match = Array.isArray(results) ? results[0] : null;
    if (!match) return null;

    const lat = Number(match.lat);
    const lng = Number(match.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

    const location = {
      lat,
      lng,
      label: match.display_name || normalizedQuery,
    };
    if (resultCache.size >= maximumCacheEntries) {
      resultCache.delete(resultCache.keys().next().value);
    }
    resultCache.set(cacheKey, { location, expiresAt: Date.now() + cacheDurationMs });
    return location;
  });

  requestQueue = request.catch(() => undefined);
  return request;
}
