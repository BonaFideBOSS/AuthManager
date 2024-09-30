<template>
  <v-tabs-window-item value="settings">
    <v-list>
      <v-list-item
        :prepend-icon="mdiThemeLightDark"
        title="Theme"
        subtitle="Switch the theme of application between light and dark mode"
      >
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
            @click="theme.toggleTheme"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-tabs-window-item>
</template>

<script setup>
import { mdiThemeLightDark, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js'

import { themeStore } from '@/stores/theme'

const theme = themeStore()
</script>

<style lang="scss" scoped></style>
