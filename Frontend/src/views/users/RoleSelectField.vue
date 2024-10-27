<template>
  <AutoComplete
    :prepend-inner-icon="mdiAccountLockOutline"
    v-model="roles"
    :items="roleList"
    item-title="name"
    item-value="id"
    label="Roles"
    variant="outlined"
    clearable
    persistent-clear
    :multiple="true"
    items-visibility-label="roles"
    :items-visibility-count="1"
    v-bind="props"
    :loading="isLoading"
  />
</template>

<script setup>
import { ref } from 'vue'
import { mdiAccountLockOutline } from '@mdi/js'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import AutoComplete from '@/components/AutoComplete.vue'

const auth = authStore()
const roles = defineModel()

const props = defineProps({})

const roleList = ref([])
const isLoading = ref(true)

function getRoles(page = 1, limit = 100) {
  var params = { page: page, limit: limit }
  params = new URLSearchParams(params).toString()
  fetch(`${apis.roleList.url}?${params}`, { headers: { Authorization: auth.token } })
    .then((x) => x.json())
    .then((data) => {
      roleList.value.push(...data.data)
      if (data.pagination.filtered > roleList.value.length) getRoles(page + 1)
    })
    .then(() => {
      isLoading.value = false
    })
}

getRoles()
</script>

<style scoped></style>
