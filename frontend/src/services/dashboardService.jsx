const pendingRequests = new Map();

async function fetchJson(path) {
  const response = await fetch(path, { credentials: "include" });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const error = new Error(data.errors?.[0]?.msg || data.message || "Could not load dashboard data");
    error.status = response.status;
    throw error;
  }

  return data;
}

async function postJson(path, body) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const error = new Error(data.errors?.[0]?.msg || data.message || "Could not save profile data");
    error.status = response.status;
    throw error;
  }

  return data;
}

function getJson(path) {
  if (pendingRequests.has(path)) return pendingRequests.get(path);

  const request = fetchJson(path).finally(() => {
    pendingRequests.delete(path);
  });
  pendingRequests.set(path, request);
  return request;
}

async function getOptionalProfile(path) {
  try {
    const data = await getJson(path);
    return data.profile || null;
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

export async function getStudentProfile() {
  return getOptionalProfile("/students/profile");
}

export async function saveStudentProfile(profile) {
  const data = await postJson("/students/profile", profile);
  return data.profile;
}

export async function getTeacherProfile() {
  return getOptionalProfile("/teachers/profile");
}

export async function saveTeacherProfile(profile) {
  const data = await postJson("/teachers/profile", profile);
  return data.profile;
}

export async function getStudentDashboardData() {
  const [requestData, profile] = await Promise.all([
    getJson("/students/requests"),
    getStudentProfile(),
  ]);

  return {
    requests: Array.isArray(requestData.requests) ? requestData.requests : [],
    profile,
  };
}

export async function getTeacherDashboardData() {
  const [requestData, profile] = await Promise.all([
    getJson("/teachers/requests"),
    getTeacherProfile(),
  ]);

  return {
    requests: Array.isArray(requestData.requests) ? requestData.requests : [],
    profile,
  };
}
