import { apiFetch } from "../utils.js";
import { getApiUrl, USE_MOCK_API } from "./config.js";
import { mockCheckUserExists, mockCreateUser, mockGetUserByUsername, mockLoginWithUserId, } from "./mocks/users.js";

export async function loginWithUserId(userId) {
  if (USE_MOCK_API) {
    return mockLoginWithUserId(userId);
  }

  const response = await apiFetch(getApiUrl(`/api/users/login/${userId}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

  const response = await apiFetch(getApiUrl("/api/users/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error(`User creation failed: ${response.statusText}`);
  }

  return response.json();
}

export async function checkUserExists(username) {
  if (USE_MOCK_API) {
    return mockCheckUserExists(username);
  }

  return await apiFetch(getApiUrl(`/api/users/exists?username=${username}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getUserByUsername(username) {
  if (USE_MOCK_API) {
    return mockGetUserByUsername(username);
  }

  const response = await apiFetch(getApiUrl(`/api/users?newUsername=${username}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Getting user failed: ${response.statusText}`);
  }

  return response.json();
}
