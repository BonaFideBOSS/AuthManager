import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import { notificationStore } from './notification'

export const authStore = defineStore(
  'auth',
  () => {
    const token = ref()
    const user = ref()
    const router = useRouter()
    const notification = notificationStore()

    const isLoggedIn = computed(() => token.value && user.value)

    function isAuthorized(permission = null) {
      if (!permission) return true
      return user.value?.roles.some((role) => role?.permissions.some((p) => permission == p.name))
    }

    function login(auth_token, auth_user) {
      token.value = auth_token
      user.value = auth_user
    }

    function logout(message = null, color = null) {
      if (token.value || user.value) {
        token.value = null
        user.value = null
        router.push({ name: 'login' })
        message = typeof message != 'string' ? 'Successfully logged out!' : message
        notification.notify(message, color)
      }
    }

    return { token, user, isLoggedIn, isAuthorized, login, logout }
  },
  { persist: true }
)
