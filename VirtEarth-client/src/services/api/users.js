import { USE_MOCK_API, getApiUrl } from './config.js';
import { mockLoginWithUserId, mockCreateUser } from './mocks/users.js';

export async function loginWithUserId(userId) {
  if (USE_MOCK_API) {
    return mockLoginWithUserId(userId);
  }

  const response = await fetch(getApiUrl(`/api/users/login/${userId}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  return response.json();
}

export async function createUser(username) {
  if (USE_MOCK_API) {
    return mockCreateUser(username);
  }

  const response = await fetch(getApiUrl('/api/users/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error(`User creation failed: ${response.statusText}`);
  }

  return response.json();
}
