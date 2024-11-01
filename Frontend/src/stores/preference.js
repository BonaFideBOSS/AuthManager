import { ref } from 'vue'
import { defineStore } from 'pinia'

export const preferenceStore = defineStore(
  'preference',
  () => {
    const data = ref({})
    return { data }
  },
  { persist: true }
)
