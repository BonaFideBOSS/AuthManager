<template>
  <v-list v-if="auth.user">
    <v-list-item
      class="pa-4"
      :prepend-avatar="`${apis.userAvatarURL}/${auth.user.avatar}`"
      :subtitle="auth.user.email"
      :title="auth.user.username"
    />
  </v-list>
</template>

<script setup>
import apis from '@/apis'
import { authStore } from '@/stores/auth'

const auth = authStore()
</script>

<style lang="scss" scoped></style>
