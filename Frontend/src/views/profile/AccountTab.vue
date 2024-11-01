<template>
  <v-tabs-window-item value="account">
    <v-row>
      <v-col cols="12" sm="6" v-if="auth.user">
        <v-card variant="text" border="thin" rounded="xl">
          <v-card-text>
            <div class="text-center">
              <v-avatar
                v-if="avatar.value.value"
                :image="`${apis.userAvatarURL}/${avatar.value.value}`"
                size="100"
              />

              <div>
                <v-card-title class="pb-0">{{ username.value.value }}</v-card-title>
                <v-card-subtitle>{{ email.value.value }}</v-card-subtitle>
              </div>
            </div>

            <div
              class="my-3 d-flex flex-wrap ga-1 justify-center"
              v-if="auth.user.roles.length > 0"
            >
              <v-chip
                v-for="role in auth.user.roles"
                :key="role.id"
                :text="role.name"
                :color="role.color"
              />
            </div>

            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                  <span>Id</span>
                </template>
                <template v-slot:append>
                  <span>{{ auth.user.id }}</span>
                </template>
              </v-list-item>
              <v-list-item
                v-for="i in Object.entries({
                  'Created at': auth.user.created_at,
                  'Updated at': auth.user.updated_at,
                  'Last logged-in at': auth.user.last_login_at
                })"
                :key="i.at(0)"
              >
                <template v-slot:prepend>
                  <span>{{ i.at(0) }}</span>
                </template>
                <template v-slot:append>
                  <v-tooltip
                    open-on-click
                    location="left"
                    :text="date.format(i.at(1), 'fullDateTime12h')"
                  >
                    <template v-slot:activator="{ props }">
                      <span v-bind="props" v-text="timelapse(i.at(1))"></span>
                    </template>
                  </v-tooltip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <form @submit.prevent="updateAccount">
          <v-row>
            <v-slide-y-transition>
              <v-col cols="12" v-if="!isSubmitDisabled">
                <v-alert title="You have unsaved changes" type="warning" variant="tonal" />
              </v-col>
            </v-slide-y-transition>

            <v-col cols="12" class="mb-3" :class="{ 'text-center': !$vuetify.display.smAndUp }">
              <v-btn
                @click="avatarDialog = true"
                text="Change avatar"
                variant="tonal"
                :disabled="isLoading"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                :prepend-inner-icon="mdiAccountOutline"
                v-model="username.value.value"
                :error-messages="username.errorMessage.value"
                label="Username"
                variant="outlined"
                :disabled="isLoading"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                :prepend-inner-icon="mdiEmailOutline"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                type="email"
                label="Email"
                variant="outlined"
                :disabled="isLoading"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                :prepend-inner-icon="mdiLockOutline"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                name="password"
                variant="outlined"
                @click:append-inner="showPassword = !showPassword"
                clearable
                persistent-clear
                :disabled="isLoading"
              />
            </v-col>

            <v-col cols="12" class="text-end">
              <v-btn
                color="success"
                type="submit"
                text="Save changes"
                :disabled="isSubmitDisabled"
                :loading="isLoading"
                :block="!$vuetify.display.smAndUp"
                size="large"
              />
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-tabs-window-item>

  <AvatarSelectorDialog v-model:dialog="avatarDialog" v-model:avatar="avatar.value.value" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { mdiAccountOutline, mdiEmailOutline, mdiEye, mdiEyeOff, mdiLockOutline } from '@mdi/js'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { notificationStore } from '@/stores/notification'
import AvatarSelectorDialog from '@/views/AvatarSelectorDialog.vue'
import { useDate } from 'vuetify/lib/framework.mjs'
import { timelapse } from '@/utils'

const auth = authStore()
const notification = notificationStore()
const date = useDate()

const isLoading = defineModel({ default: false })
const avatarDialog = ref(false)
const showPassword = ref(false)

const { handleSubmit, errors } = useForm({
  validationSchema: {
    email: 'required|email',
    username: 'required|min:4|max:16',
    password: 'min:6'
  }
})

const avatar = useField('avatar')
const username = useField('username')
const email = useField('email')
const password = useField('password')

if (auth.user) {
  avatar.setValue(auth.user.avatar)
  username.setValue(auth.user.username)
  email.setValue(auth.user.email)
}
password.setValue(null)

const isSubmitDisabled = computed(() => {
  if (auth.user) {
    if (Object.keys(errors.value).length > 0) return true
    if (avatar.value.value != auth.user.avatar) return false
    if (username.value.value != auth.user.username) return false
    if (email.value.value != auth.user.email) return false
    if (password.value.value) return false
  }
  return true
})

async function getUser() {
  isLoading.value = true
  try {
    var response = await fetch(apis.accountRead.url, {
      method: apis.accountRead.method,
      headers: { Authorization: auth.token }
    })
    response = await response.json()
    auth.user = response.data
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
getUser()

const updateAccount = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    var response = await fetch(apis.accountUpdate.url, {
      method: apis.accountUpdate.method,
      headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    response = await response.json()
    auth.user = response.data
    notification.notify(response.message, 'success')
    password.setValue(null)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped></style>
