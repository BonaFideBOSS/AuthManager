<template>
  <v-list>
    <v-list-item :prepend-icon="mdiThemeLightDark" @click="theme.toggleTheme" title="Theme">
      <template v-slot:append>
        <v-switch
          inset
          v-model="theme.currentTheme"
          false-value="dark"
          true-value="light"
          :false-icon="mdiWeatherNight"
          :true-icon="mdiWhiteBalanceSunny"
          :color="theme.currentTheme == 'light' ? 'amber' : 'accent'"
          hide-details
          density="compact"
        />
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { mdiThemeLightDark, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js'

import { themeStore } from '@/stores/theme'

const theme = themeStore()
</script>

<style scoped></style>
