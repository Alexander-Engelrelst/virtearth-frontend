const STORAGE_KEYS = {
  USER_ID: "userId",
  USERNAME: "username",
  JWT_TOKEN: "jwtToken",
};

export function getUserId() {
  return localStorage.getItem(STORAGE_KEYS.USER_ID);
}

export function getUsername() {
  return localStorage.getItem(STORAGE_KEYS.USERNAME);
}

export function getToken() {
  return sessionStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
}

export function saveAuthData(userId, username, token) {
  localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  localStorage.setItem(STORAGE_KEYS.USERNAME, username);
  sessionStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
}

export function clearAuthData() {
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
  localStorage.removeItem(STORAGE_KEYS.USERNAME);
  sessionStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
}

export function isAuthenticated() {
  return !!getToken() && !!getUserId();
}

export function hasPartialAuth() {
  return !!getUserId() && !getToken();
}
