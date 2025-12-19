// Base URL for API requests
export const API_BASE_URL = "http://localhost:8000";

export function getApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
