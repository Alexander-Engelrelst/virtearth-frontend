import { USE_MOCK_API, getApiUrl } from "./config.js";
import { getToken } from "../auth.js";
import { mockGetLandmarks } from "./mocks/landmarks.js";
import { apiFetch } from "../utils.js";

export async function getLandmarks() {
  if (USE_MOCK_API) return await mockGetLandmarks();

  const token = getToken();

  const response = await apiFetch(getApiUrl(`/api/games`), {
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

export async function createMazeGame(gameId) {
  const token = getToken();

  const response = await apiFetch(getApiUrl(`/api/games/${gameId}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`post game failed: ${response.statusText}`);
  }

  return response.json();
}
