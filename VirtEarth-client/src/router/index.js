import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),               // use createWebHashHistory() if you prefer # URLs
  routes: [
    { path: '/', name: 'logon', component: () => import('@/pages/Logon.vue') },
    { path: '/dashboard', name: 'dashboard', component: () => import('@/pages/Dashboard.vue') },
  ],
})
