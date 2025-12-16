import { clearAuthData } from "./auth";

import router from "@/router";

export const formatYear = (year) => {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }

  return `${year} AD`;
};

export async function apiFetch(url, options = {}) {
  const res = await fetch(url, options);

  if (res.status === 401) {
    clearAuthData();
    router.push({ name: "logon" });
  }

  return res;
}
