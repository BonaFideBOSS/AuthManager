<template>
  <v-dialog v-model="dialog" max-width="400" :persistent="isLoading">
    <v-card :title="`Delete ${role ? 'Role' : 'Roles'}`" :loading="isLoading" rounded="lg">
      <v-card-text>
        Are you sure you want to delete {{ role ? 'this role' : 'the selected roles' }}?
      </v-card-text>
      <v-card-actions class="ma-2">
        <v-btn text="Cancel" @click="dialog = false" :disabled="isLoading" />
        <v-btn
          color="red-accent-4"
          variant="flat"
          text="Delete"
          @click="role ? deleteRole() : deleteRoleMany()"
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
const role = defineModel('role')
const roles = defineModel('roles', { default: [] })

const props = defineProps({
  reloadFunction: {}
})

const isLoading = ref(false)

watch(dialog, (val) => {
  if (!val) {
    role.value = null
    roles.value.length = 0
  }
})

async function deleteRole() {
  isLoading.value = true
  try {
    const role_id = role.value?.id
    var response = await fetch(`${apis.roleDelete.url}?role_id=${role_id}`, {
      method: apis.roleDelete.method,
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

async function deleteRoleMany() {
  isLoading.value = true
  try {
    var response = await fetch(apis.roleDeleteMany.url, {
      method: apis.roleDeleteMany.method,
      headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(roles.value)
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
