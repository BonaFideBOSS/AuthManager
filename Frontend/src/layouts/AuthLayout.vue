<template>
  <v-layout class="h-100" :class="theme.currentTheme == 'light' && isBigScreen ? 'bg-teal-lighten-5' : ''">
    <div class="d-sm-flex justify-center align-center w-100">
      <slot></slot>
    </div>
  </v-layout>
</template>

<script setup>
import { themeStore } from '@/stores/theme'
import { computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const theme = themeStore()
const display = useDisplay()

const isBigScreen = computed(() => display.smAndUp.value)
</script>

<style scoped></style>
