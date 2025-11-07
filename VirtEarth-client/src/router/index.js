import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/auth.js'

const router = createRouter({
  history: createWebHistory(),               // use createWebHashHistory() if you prefer # URLs
  routes: [
    { path: '/', name: 'logon', component: () => import('@/pages/Logon.vue'), meta: { requiresGuest: true } },
    { path: '/dashboard', name: 'dashboard', component: () => import('@/pages/Dashboard.vue'), meta: { requiresAuth: true } },
  ],
})

// Navigation guard to enforce authentication
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated()

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authenticated) {
    console.log('Route requires auth, redirecting to logon...')
    next({ name: 'logon' })
  }
  // Check if route requires guest (unauthenticated user)
  else if (to.meta.requiresGuest && authenticated) {
    console.log('Route requires guest, redirecting to dashboard...')
    next({ name: 'dashboard' })
  }
  // Allow navigation
  else {
    next()
  }
})

export default router
