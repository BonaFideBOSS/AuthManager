<template>
  <v-dialog v-model="dialog" max-width="800" :fullscreen="!$vuetify.display.smAndUp" scrollable>
    <v-card :loading="isLoading" :rounded="$vuetify.display.smAndUp ? 'lg' : '0'">
      <v-card-title class="d-flex justify-space-between align-center">
        <div>Avatars</div>
        <v-btn icon="$close" variant="text" @click="dialog = false" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <div class="d-flex flex-wrap ga-2 justify-center" v-if="avatars">
          <v-btn
            v-for="avatar in avatars"
            :key="avatar"
            @click="selectedAvatar = avatar"
            icon
            :size="$vuetify.display.smAndUp ? '80' : '60'"
            variant="flat"
            :color="selectedAvatar == avatar ? 'green' : ''"
          >
            <v-avatar
              :image="`${apis.userAvatarURL}/${avatar}`"
              :size="$vuetify.display.smAndUp ? '80' : '60'"
            />
          </v-btn>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="ma-2">
        <v-btn type="button" text="Cancel" @click="dialog = false" />
        <v-btn @click="selectAvatar" text="Select" color="primary" variant="flat" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

import apis from '@/apis'
import { authStore } from '@/stores/auth'

const auth = authStore()

const dialog = defineModel('dialog')
const avatar = defineModel('avatar')

const avatars = ref([])
const avatarsLoaded = ref(false)
const selectedAvatar = ref()
const isLoading = ref(true)

function selectAvatar() {
  avatar.value = selectedAvatar.value
  dialog.value = false
}

async function getAvatars() {
  try {
    var response = await fetch(apis.avatarGet.url, {
      method: apis.avatarGet.method,
      headers: { Authorization: auth.token }
    })
    response = await response.json()
    avatars.value = response.data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

watch(dialog, () => {
  selectedAvatar.value = avatar.value
  if (dialog.value && !avatarsLoaded.value) {
    getAvatars()
    avatarsLoaded.value = true
  }
})
</script>

<style scoped></style>
