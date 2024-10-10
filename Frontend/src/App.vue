<template>
  <component :is="route?.meta?.layout || 'div'">
    <RouterView />
    <NotificationBar
      v-model="notification.show"
      :message="notification.notificationMessage"
      :color="notification.notificationColor"
      :timeout="notification.notificationTimeout"
    />
  </component>
</template>

<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'

import { notificationStore } from '@/stores/notification'
import { authStore } from '@/stores/auth'
import NotificationBar from '@/components/NotificationBar.vue'

const route = useRoute()
const router = useRouter()

const auth = authStore()
const notification = notificationStore()

const { fetch: originalFetch } = window
window.fetch = async (...args) => {
  try {
    let [resource, config] = args
    let response = await originalFetch(resource, config)
    if (!response.ok) {
      var message = await response.json()
      message = message?.message
      if (!message) message = 'Failed to get a proper response from the server'
      notification.notify(message, 'error')
      if (response.status == 401) setTimeout(() => auth.logout(), 500)
      if (response.status == 403) {
        setTimeout(() => {
          router.push({ name: 'dashboard' })
        }, 500)
      }
      return Promise.reject(message)
    }
    return response
  } catch {
    notification.notify('Failed to get a response from the server', 'error')
    if (!['register', 'login'].includes(route.name)) {
      setTimeout(() => auth.logout(), 500)
    }
  }
}
</script>

<style></style>
