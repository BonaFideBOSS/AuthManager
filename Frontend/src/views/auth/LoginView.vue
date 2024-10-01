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
        <v-card-title class="text-h4 font-weight-black text-teal">Login</v-card-title>
        <v-card-text class="text-grey">Enter your credentials to continue</v-card-text>
      </div>

      <v-form @submit.prevent="login">
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
            text="Login"
            rounded="pill"
          />
          <v-btn
            :to="{ name: 'register' }"
            block
            variant="text"
            color="medium-emphasis"
            text="Create a new account"
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
import { useRoute, useRouter } from 'vue-router'
import { mdiEmailOutline, mdiEye, mdiEyeOff, mdiLockOutline } from '@mdi/js'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { notificationStore } from '@/stores/notification'

const notification = notificationStore()
const auth = authStore()
const route = useRoute()
const router = useRouter()

const showPassword = ref(false)
const isLoading = ref(false)

const { handleSubmit } = useForm({
  validationSchema: {
    email: 'required|email',
    password: 'required'
  }
})

const email = useField('email')
const password = useField('password')

const login = handleSubmit(async (values) => {
  isLoading.value = true
  try {
    var data = new FormData()
    data.append('email', values.email)
    data.append('password', values.password)

    var response = await fetch(apis.login.url, {
      method: apis.login.method,
      body: data
    })
    response = await response.json()
    const token = `${response?.token_type} ${response?.access_token}`

    auth.login(token, response?.user)
    notification.notify('Successfully logged in!', 'success')

    const redirectURL = route.query.redirect || { name: 'dashboard' }
    router.push(redirectURL)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped></style>
