<template>
  <v-menu v-if="auth.user" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon>
        <v-avatar :image="`${apis.userAvatarURL}/${auth.user.avatar}`" />
      </v-btn>
    </template>

    <v-card min-width="250" rounded="lg">
      <UserInfoListItem />
      <v-divider />
      <ThemeSwitcher />
      <v-divider />
      <v-list>
        <v-list-item :prepend-icon="mdiAccount" title="My Profile" :to="{ name: 'profile' }" />
      </v-list>
      <v-divider />
      <v-card-actions class="pa-4">
        <LogoutButton />
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { mdiAccount } from '@mdi/js'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import ThemeSwitcher from '@/composables/ThemeSwitcher.vue'
import LogoutButton from '@/composables/LogoutButton.vue'
import UserInfoListItem from '@/composables/UserInfoListItem.vue'

const auth = authStore()
</script>

<style scoped></style>
