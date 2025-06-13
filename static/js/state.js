const ROUTE_KEY = 'selectedRoute';
const COMPLETED_KEY = 'completedLocations';

export function saveRouteId(id) {
  localStorage.setItem(ROUTE_KEY, id);
}

export function getSavedRouteId() {
  return localStorage.getItem(ROUTE_KEY);
}

export function getCompletedLocations() {
  return JSON.parse(localStorage.getItem(COMPLETED_KEY) || '{}');
}

export function isLocationCompleted(id) {
  const data = getCompletedLocations();
  return !!data[id];
}

export function toggleLocationCompleted(id) {
  const data = getCompletedLocations();
  if (data[id]) {
    delete data[id];
  } else {
    data[id] = true;
  }
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(data));
}

export function clearRouteProgress(locationIds) {
  const data = getCompletedLocations();
  locationIds.forEach(id => {
    delete data[id];
  });
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(data));
}
