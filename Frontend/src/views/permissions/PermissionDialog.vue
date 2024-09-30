<template>
  <v-dialog v-model="dialog" max-width="400" :persistent="isLoading">
    <v-form @submit.prevent="isNewPermission ? createPermission() : updatePermission()">
      <v-card :loading="isLoading" rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div v-text="isNewPermission ? 'Create new permission' : 'Edit permission'"></div>
          <v-btn icon="$close" variant="text" @click="dialog = false" :disabled="isLoading" />
        </v-card-title>

        <v-divider class="mb-4" />

        <v-card-text>
          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Name"
            variant="outlined"
            clearable
          />
        </v-card-text>

        <v-divider />

        <v-card-actions class="ma-2">
          <v-btn type="button" text="Cancel" @click="dialog = false" :disabled="isLoading" />
          <v-btn
            type="submit"
            :color="isNewPermission ? 'success' : 'primary'"
            variant="flat"
            :text="isNewPermission ? 'Create' : 'Update'"
            :loading="isLoading"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { notificationStore } from '@/stores/notification'
import { mdiLockOutline } from '@mdi/js'

const auth = authStore()
const notification = notificationStore()

const dialog = defineModel()

const props = defineProps({
  permission: { default: null },
  reloadFunction: {}
})

const { handleSubmit } = useForm({
  validationSchema: {
    name: 'required'
  }
})

const name = useField('name')

const isLoading = ref(false)
const isNewPermission = ref(false)

watch(dialog, (val) => {
  if (val && props.permission) {
    name.setValue(props.permission.name)
    isNewPermission.value = false
  } else {
    name.resetField()
    isNewPermission.value = true
  }
})

const createPermission = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    var response = await fetch(apis.permissionCreate.url, {
      method: apis.permissionCreate.method,
      headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
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
})

const updatePermission = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    const permission_id = props.permission?.id
    var response = await fetch(`${apis.permissionUpdate.url}?permission_id=${permission_id}`, {
      method: apis.permissionUpdate.method,
      headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
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
})
</script>

<style scoped></style>
