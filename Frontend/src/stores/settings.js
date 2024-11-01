import { ref } from 'vue'
import { defineStore } from 'pinia'

export const settingsStore = defineStore(
  'settings',
  () => {
    const navRail = ref(true)

    return { navRail }
  },
  { persist: true }
)
