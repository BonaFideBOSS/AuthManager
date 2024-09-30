import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import { authStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to) => {
  const title = to?.meta?.title ? ` - ${to.meta.title}` : ''
  document.title = `Auth Manager${title}` || 'Auth Manager'

  const auth = authStore()
  const publicPages = ['login', 'register']

  if (to?.meta?.authRequired && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (!auth.isAuthorized(to?.meta?.permission)) {
    return { name: 'dashboard' }
  }

  if (auth.isLoggedIn && publicPages.includes(to.name)) {
    return { name: 'dashboard' }
  }
})

export default router
