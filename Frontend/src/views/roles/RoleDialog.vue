<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
    :persistent="isLoading"
    :fullscreen="!$vuetify.display.smAndUp"
  >
    <v-form @submit.prevent="isNewRole ? createRole() : updateRole()">
      <v-card :loading="isLoading" :rounded="$vuetify.display.smAndUp ? 'lg' : '0'">
        <v-card-title class="d-flex justify-space-between align-center">
          <div v-text="isNewRole ? 'Create new role' : 'Edit role'"></div>
          <v-btn icon="$close" variant="text" @click="dialog = false" :disabled="isLoading" />
        </v-card-title>

        <v-divider class="mb-4" />

        <v-card-text>
          <v-text-field
            :prepend-inner-icon="mdiAccountLockOutline"
            v-model="name.value.value"
            :error-messages="name.errorMessage.value"
            label="Name"
            class="mb-2"
            variant="outlined"
            clearable
            persistent-clear
          />

          <v-select
            :prepend-inner-icon="mdiPaletteOutline"
            v-model="color.value.value"
            clearable
            persistent-clear
            label="Color"
            :items="colors"
            variant="outlined"
            class="mb-2"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props">
                <template v-slot:title>
                  <v-chip
                    class="font-weight-medium"
                    :color="item.value"
                    :text="item.title"
                    density="compact"
                  />
                </template>
              </v-list-item>
            </template>

            <template v-slot:selection="{ item }">
              <v-chip class="font-weight-medium" :color="item.value" :text="item.title" />
            </template>
          </v-select>

          <PermissionSelectField v-model="permissions.value.value" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="ma-2">
          <v-btn type="button" text="Cancel" @click="dialog = false" :disabled="isLoading" />
          <v-btn
            type="submit"
            :color="isNewRole ? 'success' : 'primary'"
            variant="flat"
            :text="isNewRole ? 'Create' : 'Update'"
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
import PermissionSelectField from './PermissionSelectField.vue'
import { mdiAccountLockOutline, mdiPaletteOutline } from '@mdi/js'

const auth = authStore()
const notification = notificationStore()

const dialog = defineModel()

const props = defineProps({
  role: { default: null },
  reloadFunction: {}
})

const colors = ['primary', 'secondary', 'accent', 'error', 'info', 'success', 'warning']

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: {
    name: 'required',
    color: `one_of:${colors}`,
    permissions: ''
  }
})

const name = useField('name')
const color = useField('color')
const permissions = useField('permissions')

const isLoading = ref(false)
const isNewRole = ref(false)

watch(dialog, (val) => {
  if (val && props.role) {
    setValues(props.role)
    permissions.setValue(props.role.permissions.map((perm) => perm.id))
    isNewRole.value = false
  } else {
    handleReset()
    permissions.resetField({ value: [] })
    isNewRole.value = true
  }
})

const createRole = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    var response = await fetch(apis.roleCreate.url, {
      method: apis.roleCreate.method,
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

const updateRole = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    const role_id = props.role?.id
    var response = await fetch(`${apis.roleUpdate.url}?role_id=${role_id}`, {
      method: apis.roleUpdate.method,
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
