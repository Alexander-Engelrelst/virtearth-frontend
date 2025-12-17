import { clearAuthData } from "./auth";

import router from "@/router";

const HTTP_UNAUTHORIZED = 401

export const formatYear = (year) => {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }

  return `${year} AD`;
};

export async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);

  if (res.status === HTTP_UNAUTHORIZED) {
    clearAuthData();
    router.push({ name: "logon" });
  }

  return res;
}
