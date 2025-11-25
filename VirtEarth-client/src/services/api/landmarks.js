import { USE_MOCK_API, getApiUrl } from "./config.js";
import { mockGetLandmarks, mockGetContinents } from "./mocks/landmarks.js";

export async function getLandmarks() {
  if (USE_MOCK_API) return mockGetLandmarks();
}

export async function getContinents() {
  if (USE_MOCK_API) return mockGetContinents();
}
