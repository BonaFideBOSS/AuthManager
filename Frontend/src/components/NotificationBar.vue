<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="timeout"
    timer="true"
    transition="slide-x-reverse-transition"
    location="top right"
  >
    <div class="d-flex align-center">
      <v-icon start :icon="icons[color] || mdiBell"></v-icon>
      {{ message }}
    </div>

    <template v-slot:actions>
      <v-btn @click="show = false" icon="$cancel" size="small"></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { mdiBell, mdiCancel, mdiThumbUp } from '@mdi/js'

const show = defineModel()

defineProps({
  message: {},
  color: {},
  timeout: { default: 5000 }
})

const icons = {
  success: '$success',
  error: mdiCancel,
  info: '$info',
  warning: '$warning',
  secondary: mdiThumbUp
}
</script>

<style scoped></style>
