import { USE_MOCK_API, getApiUrl } from "./config.js";
import { mockGetLandmarks, mockGetContinents } from "./mocks/landmarks.js";
import { getToken } from "../auth.js";

export async function getLandmarks() {
  if (USE_MOCK_API) return mockGetLandmarks();

  const token = getToken();

  const response = await fetch(getApiUrl(`/api/games`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`fetch landmarks failed: ${response.statusText}`);
  }

  return response.json();
}

export async function getContinents() {
  if (USE_MOCK_API) return mockGetContinents();
}
