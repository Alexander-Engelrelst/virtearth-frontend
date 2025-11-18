import { USE_MOCK_API, getApiUrl } from "./config.js";
import { mockGetLandmarks } from "./mocks/landmarks.js";

export async function getLandmarks() {
  if (USE_MOCK_API) {
    return mockGetLandmarks();
  }
}
