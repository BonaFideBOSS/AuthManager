import { nextTick, ref } from 'vue'
import { defineStore } from 'pinia'

export const notificationStore = defineStore('notification', () => {
  const show = ref(false)
  const notificationMessage = ref()
  const notificationColor = ref()
  const notificationTimeout = ref(5000)

  function notify(message, color, timeout = 5000) {
    show.value = false
    nextTick(() => {
      show.value = true
      notificationMessage.value = message
      notificationColor.value = color
      notificationTimeout.value = timeout
    })
  }

  return { show, notificationMessage, notificationColor, notificationTimeout, notify }
})
