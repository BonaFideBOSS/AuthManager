<template>
  <v-dialog v-model="dialog" max-width="400" :persistent="isLoading">
    <v-card :title="`Delete ${user ? 'User' : 'Users'}`" :loading="isLoading" rounded="lg">
      <v-card-text>
        Are you sure you want to delete {{ user ? 'this user' : 'the selected users' }}?
      </v-card-text>
      <v-card-actions class="ma-2">
        <v-btn text="Cancel" @click="dialog = false" :disabled="isLoading" />
        <v-btn
          color="red-accent-4"
          variant="flat"
          text="Delete"
          @click="user ? deleteUser() : deleteUserMany()"
          :loading="isLoading"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { notificationStore } from '@/stores/notification'

const auth = authStore()
const notification = notificationStore()

const dialog = defineModel('dialog')
const user = defineModel('user')
const users = defineModel('users', { default: [] })

const props = defineProps({
  reloadFunction: {}
})

const isLoading = ref(false)

watch(dialog, (val) => {
  if (!val) {
    user.value = null
    users.value.length = 0
  }
})

async function deleteUser() {
  isLoading.value = true
  try {
    const user_id = user.value?.id
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

async function deleteUserMany() {
  isLoading.value = true
  try {
    var response = await fetch(apis.userDeleteMany.url, {
      method: apis.userDeleteMany.method,
      headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(users.value)
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
