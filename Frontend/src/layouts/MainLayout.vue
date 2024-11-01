<template>
  <v-layout>
    <v-app-bar color="teal">
      <v-app-bar-nav-icon @click="expandNav"></v-app-bar-nav-icon>
      <v-app-bar-title>Auth Manager</v-app-bar-title>
      <UserMenu v-if="!isMobile" />
    </v-app-bar>

    <v-navigation-drawer
      color="grey-darken-4"
      v-model="navbarOpened"
      :rail="settings.navRail"
      :scrim="false"
    >
      <UserInfoListItem v-if="isMobile" />
      <v-divider />
      <v-list class="d-flex flex-column ga-1">
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          :prepend-icon="route.meta.icon"
          :title="route.meta.title"
          :to="route.path"
        />
      </v-list>

      <template v-if="isMobile">
        <v-divider />
        <v-list>
          <v-list-item :prepend-icon="mdiAccount" title="My Profile" :to="{ name: 'profile' }" />
        </v-list>
        <v-divider />
        <ThemeSwitcher />
        <v-divider />
        <v-list>
          <v-list-item>
            <LogoutButton />
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-overlay
      style="z-index: 1003"
      v-if="isMobile"
      v-model="navbarOpened"
      scroll-strategy="block"
    />

    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { mdiAccount } from '@mdi/js'

import { authStore } from '@/stores/auth'
import { settingsStore } from '@/stores/settings'
import UserMenu from '@/composables/UserMenu.vue'
import UserInfoListItem from '@/composables/UserInfoListItem.vue'
import ThemeSwitcher from '@/composables/ThemeSwitcher.vue'
import LogoutButton from '@/composables/LogoutButton.vue'

const display = useDisplay()
const auth = authStore()
const settings = settingsStore()
const router = useRouter()

const isMobile = computed(() => display.mobile.value)
const navbarOpened = ref(!isMobile.value)

const routes = router
  .getRoutes()
  .filter(
    (r) => r?.meta?.authRequired && r?.meta?.displayOnNav && auth.isAuthorized(r?.meta?.permission)
  )

function expandNav() {
  if (isMobile.value) {
    settings.navRail = false
    navbarOpened.value = !navbarOpened.value
  } else settings.navRail = !settings.navRail
}
</script>

<style scoped></style>
