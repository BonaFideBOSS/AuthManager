<template>
  <v-btn
    color="red-darken-4"
    :prepend-icon="mdiLogout"
    block
    variant="flat"
    @click="auth.logout"
    text="Logout"
  />
</template>

<script setup>
import { mdiLogout } from '@mdi/js'

import { authStore } from '@/stores/auth'

const auth = authStore()
</script>

<style lang="scss" scoped></style>
