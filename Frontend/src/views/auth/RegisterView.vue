<template>
  <v-card
    :loading="isLoading"
    class="w-100 px-sm-7 py-sm-8 pa-2"
    :class="$vuetify.display.smAndUp ? '' : 'd-flex flex-column h-100'"
    elevation="0"
    :rounded="$vuetify.display.smAndUp ? 'xl' : '0'"
    :max-width="$vuetify.display.smAndUp ? '380' : ''"
  >
    <div class="my-auto">
      <div class="text-center">
        <v-card-title class="text-h4 font-weight-black text-teal">Register</v-card-title>
        <v-card-text class="text-grey">Please fill the form</v-card-text>
      </div>

      <v-form @submit.prevent="register">
        <v-card-text class="pb-0">
          <v-text-field
            :prepend-inner-icon="mdiEmailOutline"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            type="email"
            name="email"
            label="Email"
            class="mb-3"
            variant="outlined"
          />

          <v-text-field
            :prepend-inner-icon="mdiAccountOutline"
            v-model="username.value.value"
            :error-messages="username.errorMessage.value"
            name="username"
            label="Username"
            class="mb-3"
            variant="outlined"
            counter="16"
          />

          <v-text-field
            :prepend-inner-icon="mdiLockOutline"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            variant="outlined"
            :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            name="password"
            class="mb-3"
            @click:append-inner="showPassword = !showPassword"
          />
        </v-card-text>

        <v-card-actions class="d-flex flex-column ga-2">
          <v-btn
            type="submit"
            color="teal"
            block
            size="large"
            variant="flat"
            :loading="isLoading"
            text="Register"
            rounded="pill"
          />
          <v-btn
            :to="{ name: 'login' }"
            block
            variant="text"
            color="medium-emphasis"
            text="Login"
            rounded="pill"
          />
        </v-card-actions>
      </v-form>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { mdiAccountOutline, mdiEmailOutline, mdiEye, mdiEyeOff, mdiLockOutline } from '@mdi/js'

import apis from '@/apis'
import { notificationStore } from '@/stores/notification'

const notification = notificationStore()
const router = useRouter()

const showPassword = ref(false)
const isLoading = ref(false)

const { handleSubmit } = useForm({
  validationSchema: {
    email: 'required|email',
    username: 'required|min:4|max:16',
    password: 'required|min:6'
  }
})

const email = useField('email')
const username = useField('username')
const password = useField('password')

const register = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    var response = await fetch(apis.register.url, {
      method: apis.register.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    response = await response.json()
    if (response?.success) {
      notification.notify(response?.message, 'success')
      router.push({ name: 'dashboard' })
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped></style>
