<template>
  <AutoComplete
    :prepend-inner-icon="mdiLockOutline"
    v-model="permissions"
    :items="permissionList"
    item-title="name"
    item-value="id"
    label="Permissions"
    variant="outlined"
    clearable
    :multiple="true"
    items-visibility-label="permissions"
    v-bind="props"
  />
</template>

<script setup>
import { ref } from 'vue'
import { mdiLockOutline } from '@mdi/js'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import AutoComplete from '@/components/AutoComplete.vue'

const auth = authStore()
const permissions = defineModel()

const props = defineProps({})

const permissionList = ref([])

function getPermissions(page = 1, limit = 100) {
  var params = { page: page, limit: limit }
  params = new URLSearchParams(params).toString()
  fetch(`${apis.permissionList.url}?${params}`, { headers: { Authorization: auth.token } })
    .then((x) => x.json())
    .then((data) => {
      permissionList.value.push(...data.data)
      if (data.pagination.filtered > permissionList.value.length) getPermissions(page + 1)
    })
}

getPermissions()
</script>

<style scoped></style>
