<template>
  <v-dialog v-model="dialog" max-width="400" :persistent="isLoading">
    <v-card title="Delete User" :loading="isLoading" rounded="lg">
      <v-card-text> Are you sure you want to delete this user? </v-card-text>
      <v-card-actions class="ma-2">
        <v-btn text="Cancel" @click="dialog = false" :disabled="isLoading" />
        <v-btn
          color="red-accent-4"
          variant="flat"
          text="Delete"
          @click="deleteUser"
          :loading="isLoading"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { notificationStore } from '@/stores/notification'

const auth = authStore()
const notification = notificationStore()

const dialog = defineModel()

const props = defineProps({
  user: { default: null },
  reloadFunction: {}
})

const isLoading = ref(false)

async function deleteUser() {
  isLoading.value = true
  try {
    const user_id = props.user?.id
    var response = await fetch(`${apis.userDelete.url}?user_id=${user_id}`, {
      method: apis.userDelete.method,
      headers: { Authorization: auth.token }
    })
    response = await response.json()
    notification.notify(response.message, 'success')
    dialog.value = false
    props.reloadFunction()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
