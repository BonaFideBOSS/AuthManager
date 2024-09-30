import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'

export const themeStore = defineStore(
  'theme',
  () => {
    const theme = useTheme()

    const currentTheme = ref('light')

    function toggleTheme() {
      currentTheme.value = currentTheme.value == 'light' ? 'dark' : 'light'
      theme.global.name.value = currentTheme.value
    }

    onMounted(() => {
      theme.global.name.value = currentTheme.value
    })

    return { currentTheme, toggleTheme }
  },
  { persist: true }
)
