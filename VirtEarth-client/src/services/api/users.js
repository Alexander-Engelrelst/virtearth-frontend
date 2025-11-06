import { USE_MOCK_API, getApiUrl } from './config.js';
import { mockCheckUserExists } from './mocks/users.js';

export async function checkUserExists(username) {

  if (USE_MOCK_API) {
    return mockCheckUserExists(username);
  }

  // Make real API call
  const response = await fetch(getApiUrl(`/api/users/exists?username=${encodeURIComponent(username)}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 204) {
    // User does not exist
    return { status: 204, exists: false };
  }

  if (response.status === 400) {
    // Not valid
    return { status: 400, message: 'Invalid username' };
  }

  if (response.status === 409) {
    // Already occupied
    return { status: 409, exists: true };
  }

  // Handle unexpected status codes (500)
  throw new Error(`Unexpected response: ${response.status} ${response.statusText}`);
}
