import { createRouter, createWebHistory } from "vue-router";

import { isAuthenticated } from "@/services/auth.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "logon",
      component: () => import("@/pages/Logon.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/pages/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/game",
      name: "game",
      component: () => import("@/pages/GameScreen.vue"),
      meta: { requiresAuth: false }, // TODO change auth
    }
  ],
});

// Navigation guard to enforce authentication
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authenticated) {
    next({ name: "logon" });
  }
  // Check if route requires guest (unauthenticated user)
  else if (to.meta.requiresGuest && authenticated) {
    next({ name: "dashboard" });
  }
  // Allow navigation
  else {
    next();
  }
});

export default router;
