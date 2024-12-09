<template>
  <v-dialog v-model="dialog" max-width="400" :persistent="isLoading">
    <v-card
      :title="`Delete ${permission ? 'Permission' : 'Permissions'}`"
      :loading="isLoading"
      rounded="lg"
    >
      <v-card-text>
        Are you sure you want to delete
        {{ permission ? 'this permission' : 'the selected permissions' }}?
      </v-card-text>
      <v-card-actions class="ma-2">
        <v-btn text="Cancel" @click="dialog = false" :disabled="isLoading" />
        <v-btn
          color="red-accent-4"
          variant="flat"
          text="Delete"
          @click="permission ? deletePermission() : deletePermissionMany()"
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
const permission = defineModel('permission')
const permissions = defineModel('permissions')

const props = defineProps({
  reloadFunction: {}
})

const isLoading = ref(false)

watch(dialog, (val) => {
  if (!val) {
    permission.value = null
    permissions.value.length = 0
  }
})

async function deletePermission() {
  isLoading.value = true
  try {
    const permission_id = permission.value?.id
    var response = await fetch(`${apis.permissionDelete.url}?permission_id=${permission_id}`, {
      method: apis.permissionDelete.method,
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

async function deletePermissionMany() {
  isLoading.value = true
  try {
    var response = await fetch(apis.permissioneleteMany.url, {
      method: apis.permissioneleteMany.method,
      headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(permissions.value)
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
