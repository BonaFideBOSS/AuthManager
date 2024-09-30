<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    :persistent="isLoading"
    :fullscreen="!$vuetify.display.smAndUp"
    scrollable
  >
    <v-form @submit.prevent="isNewUser ? createUser() : updateUser()">
      <v-card :loading="isLoading" :rounded="$vuetify.display.smAndUp ? 'lg' : '0'">
        <v-card-title class="d-flex justify-space-between align-center">
          <div v-text="isNewUser ? 'Create new user' : 'Edit user'"></div>
          <v-btn icon="$close" variant="text" @click="dialog = false" :disabled="isLoading" />
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-row align="center">
            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-avatar
                v-if="avatar.value.value"
                :image="`${apis.userAvatarURL}/${avatar.value.value}`"
                size="80"
              />
            </v-col>

            <v-col cols="12" sm="6" class="d-flex justify-center">
              <v-btn @click="avatarDialog = true" text="Change avatar" variant="tonal" />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :prepend-inner-icon="mdiAccountOutline"
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Username"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :prepend-inner-icon="mdiEmailOutline"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                label="Email"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                :prepend-inner-icon="mdiLockOutline"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                label="Password"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <RoleSelectField v-model="roles.value.value" />
            </v-col>
          </v-row>

          <v-switch
            v-model="deleted.value.value"
            :color="deleted.value.value ? 'red-accent-4' : ''"
            :label="`Deleted: ${deleted.value.value ? 'Yes' : 'No'}`"
            hide-details
          ></v-switch>
        </v-card-text>

        <v-divider />

        <v-card-actions class="ma-2">
          <v-btn type="button" text="Cancel" @click="dialog = false" :disabled="isLoading" />
          <v-btn
            type="submit"
            :color="isNewUser ? 'success' : 'primary'"
            variant="flat"
            :text="isNewUser ? 'Create' : 'Update'"
            :loading="isLoading"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <AvatarSelectorDialog v-model:dialog="avatarDialog" v-model:avatar="avatar.value.value" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { mdiAccountOutline, mdiEmailOutline, mdiLockOutline } from '@mdi/js'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { notificationStore } from '@/stores/notification'
import AvatarSelectorDialog from '@/views/AvatarSelectorDialog.vue'
import RoleSelectField from './RoleSelectField.vue'

const auth = authStore()
const notification = notificationStore()

const dialog = defineModel()
const avatarDialog = ref(false)

const props = defineProps({
  user: { default: null },
  reloadFunction: {}
})

const { handleSubmit, handleReset, setValues } = useForm({
  validationSchema: {
    email: 'required|email',
    username: 'required|min:4,max:16',
    password: 'required|min:6'
  }
})

const avatar = useField('avatar')
const username = useField('username')
const email = useField('email')
const password = useField('password')
const deleted = useField('deleted')
const roles = useField('roles')

const isLoading = ref(false)
const isNewUser = ref(false)

watch(dialog, (val) => {
  if (val && props.user) {
    setValues(props.user)
    roles.setValue(props.user.roles.map((role) => role.id))
    isNewUser.value = false
  } else {
    handleReset()
    roles.resetField({ value: [] })
    isNewUser.value = true
  }
})

const createUser = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    var response = await fetch(apis.userCreate.url, {
      method: apis.userCreate.method,
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

const updateUser = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    const user_id = props.user?.id
    var response = await fetch(`${apis.userUpdate.url}?user_id=${user_id}`, {
      method: apis.userUpdate.method,
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
