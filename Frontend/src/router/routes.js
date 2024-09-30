import apis from '@/apis'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { mdiAccount, mdiAccountLock, mdiAccountMultiple, mdiLock } from '@mdi/js'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
      icon: '$home',
      layout: MainLayout,
      authRequired: true,
      displayOnNav: true
    },
    component: () => import('@/views/DashboardView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login', layout: AuthLayout, authRequired: false, displayOnNav: false },
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: 'Register', layout: AuthLayout, authRequired: false, displayOnNav: false },
    component: () => import('@/views/auth/RegisterView.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      title: 'User Manager',
      icon: mdiAccountMultiple,
      layout: MainLayout,
      authRequired: true,
      displayOnNav: true,
      permission: apis.userList.permission
    },
    component: () => import('@/views/users/UserListView.vue')
  },
  {
    path: '/roles',
    name: 'roles',
    meta: {
      title: 'Role Manager',
      icon: mdiAccountLock,
      layout: MainLayout,
      authRequired: true,
      displayOnNav: true,
      permission: apis.roleList.permission
    },
    component: () => import('@/views/roles/RoleListView.vue')
  },
  {
    path: '/permissions',
    name: 'permissions',
    meta: {
      title: 'Permission Manager',
      icon: mdiLock,
      layout: MainLayout,
      authRequired: true,
      displayOnNav: true,
      permission: apis.roleList.permission
    },
    component: () => import('@/views/permissions/PermissionListView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'My Profile',
      icon: mdiAccount,
      layout: MainLayout,
      authRequired: true,
      displayOnNav: false
    },
    component: () => import('@/views/profile/ProfileView.vue')
  }
]

routes.push({
  path: '/:catchAll(.*)',
  name: 'error',
  meta: { title: 'Page not found', layout: MainLayout, authRequired: true },
  component: () => import('@/views/ErrorView.vue')
})

export default routes
