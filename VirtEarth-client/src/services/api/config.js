// Set to true to use mock data instead of real API calls
export const USE_MOCK_API = true;

// Base URL for API requests
export const API_BASE_URL = '';

export function getApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
