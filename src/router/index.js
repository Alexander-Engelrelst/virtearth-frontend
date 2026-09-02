import { createRouter, createWebHistory } from "vue-router";

import { isAuthenticated } from "../services/auth.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "logon",
      component: () => import("../pages/Logon.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../pages/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

// Authentication on each route
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();

  if (to.meta.requiresAuth && !authenticated) {
    next({ name: "logon" });
  } else if (to.meta.requiresGuest && authenticated) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
