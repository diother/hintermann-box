export async function loadRoutes() {
  const res = await fetch("/data/routes.json");
  if (!res.ok) throw new Error(`Failed to fetch routes.json: ${res.status} ${res.statusText}`);
  return await res.json();
}

export async function loadLocations() {
  const res = await fetch("/data/locations.json");
  if (!res.ok) throw new Error(`Failed to fetch locations.json: ${res.status} ${res.statusText}`);
  return await res.json();
}
