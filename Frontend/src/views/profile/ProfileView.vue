<template>
  <div class="mb-5">
    <h1 class="d-flex align-center ga-2 opacity-80">
      <v-icon :icon="route.meta.icon" size="x-small"></v-icon>
      <span v-text="route.meta.title"></span>
    </h1>
  </div>

  <v-card rounded="xl" elevation="0" border="thin" :loading="isLoading">
    <v-tabs v-model="tab" class="border-b-thin" color="teal">
      <v-tab value="account" text="Account" :prepend-icon="mdiAccountOutline" />
      <v-tab value="settings" text="Settings" :prepend-icon="mdiCogOutline" />
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab" :class="{ 'pa-5': isBigScreen }">
        <AccountTab v-model="isLoading" />
        <SettingsTab />
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { mdiAccountOutline, mdiCogOutline } from '@mdi/js'

import AccountTab from './AccountTab.vue'
import SettingsTab from './SettingsTab.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const route = useRoute()
const display = useDisplay()
const isBigScreen = ref(display.smAndUp)
const isLoading = ref(false)

const tab = ref()
</script>

<style scoped></style>
