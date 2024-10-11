<template>
  <div class="mb-5">
    <h1 class="d-flex align-center ga-2 opacity-80">
      <v-icon :icon="route.meta.icon" size="x-small"></v-icon>
      <span v-text="route.meta.title"></span>
    </h1>
  </div>

  <v-row align="center" justify="start" class="mb-2" dense>
    <v-col cols="12" sm="6" md="4" lg="3">
      <div class="d-flex ga-2 align-center">
        <v-icon icon="$filter" color="medium-emphasis" />
        <SearchField v-model="search" />
      </div>
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="3">
      <v-select
        :prepend-inner-icon="mdiDeleteSweepOutline"
        v-model="excludeDeleted"
        label="Show Deleted Users"
        :items="[
          { label: 'Yes', key: false },
          { label: 'No', key: true }
        ]"
        item-title="label"
        item-value="key"
        variant="outlined"
        density="compact"
        rounded="pill"
        hide-details
      />
    </v-col>

    <v-col cols="12" sm="6" md="4" lg="3">
      <RoleSelectField v-model="roles" density="compact" rounded="pill" hide-details />
    </v-col>
  </v-row>

  <DataTableToolbar
    v-model="headers"
    :is-loading="isLoading"
    :refresh-action="getUsers"
    :columns="columns"
  >
    <template v-slot:prepend v-if="actionsManyAllowed">
      <v-tooltip text="Delete selected users" v-if="canDeleteMany && selectedUsers.length > 0">
        <template v-slot:activator="{ props }">
          <v-btn :disabled="isLoading" icon="$delete" @click="deleteMany" v-bind="props" />
        </template>
      </v-tooltip>

      <v-divider
        v-if="selectedUsers.length > 0"
        class="mx-3 align-self-center"
        vertical
        length="24"
        thickness="2"
      />
    </template>
  </DataTableToolbar>

  <v-data-table-server
    loading-text="loading users..."
    :headers="headers"
    :items="data"
    :items-length="filtered"
    v-model="selectedUsers"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :loading="isLoading"
    @update:options="getUsers"
    :disable-sort="isLoading"
    must-sort
    hover
    :show-select="actionsManyAllowed"
    :header-props="{ class: 'text-no-wrap' }"
  >
    <template v-slot:item.actions="{ item }">
      <div class="text-no-wrap">
        <v-hover v-if="canUpdate">
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              :disabled="isLoading"
              v-bind="props"
              :color="isHovering ? 'primary' : ''"
              icon="$edit"
              @click="editUser(item)"
              variant="text"
              size="small"
            />
          </template>
        </v-hover>
        <v-hover v-if="canDelete && !item.deleted">
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              :disabled="isLoading"
              v-bind="props"
              icon="$delete"
              @click="deleteUser(item)"
              variant="text"
              :color="isHovering ? 'red-accent-4' : ''"
              size="small"
            />
          </template>
        </v-hover>
      </div>
    </template>

    <template v-slot:item.username="{ value }">
      <div class="text-no-wrap">
        <v-avatar :image="`${apis.userAvatarURL}/${value.avatar}`" start />
        <span class="font-weight-medium" v-text="value.username"></span>
      </div>
    </template>

    <template v-slot:item.roles="{ value }">
      <div class="d-flex flex-wrap ga-1 my-1">
        <v-chip
          v-for="role in value"
          :key="role.id"
          :color="role.color"
          density="compact"
          :text="role.name"
        />
        <span v-if="value.length == 0">-</span>
      </div>
    </template>

    <template v-slot:item.created_at="{ value }">
      <span class="text-no-wrap">
        {{ timelapse(value) }}
        <v-tooltip activator="parent" :text="date.format(value, 'fullDateTime12h')" />
      </span>
    </template>

    <template v-slot:item.updated_at="{ value }">
      <span class="text-no-wrap">
        {{ timelapse(value) }}
        <v-tooltip activator="parent" :text="date.format(value, 'fullDateTime12h')" />
      </span>
    </template>

    <template v-slot:item.deleted="{ item }">
      <v-tooltip
        :text="item.deleted ? date.format(item.deleted_at, 'fullDateTime12h') : 'Not deleted'"
      >
        <template v-slot:activator="{ props }">
          <v-icon
            v-bind="props"
            icon="$delimiter"
            :color="item.deleted ? 'red' : 'green'"
            size="x-small"
          />
        </template>
      </v-tooltip>
    </template>

    <template v-slot:bottom>
      <DataTablePagination
        class="mt-2"
        v-model:page="page"
        v-model:items-per-page="itemsPerPage"
        :items-count="data.length"
        :total="total"
        :filtered="filtered"
        label="users"
      />
    </template>
  </v-data-table-server>

  <UserDialog v-model:dialog="dialogUser" v-model:user="selectedUser" :reload-function="getUsers" />
  <UserDeleteDialog
    v-model:dialog="dialogDelete"
    v-model:user="selectedUser"
    v-model:users="selectedUsers"
    :reload-function="getUsers"
  />
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDate } from 'vuetify/lib/framework.mjs'
import { mdiDeleteSweepOutline } from '@mdi/js'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { canTakeActions, timelapse } from '@/utils'
import DataTableToolbar from '@/components/DataTableToolbar.vue'
import DataTablePagination from '@/components/DataTablePagination.vue'
import SearchField from '@/components/SearchField.vue'

import UserDialog from './UserDialog.vue'
import UserDeleteDialog from './UserDeleteDialog.vue'
import RoleSelectField from './RoleSelectField.vue'

const route = useRoute()
const auth = authStore()
const date = useDate()

const isLoading = ref(false)
const headers = ref([])
const data = ref([])
const total = ref(0)
const filtered = ref(0)
const search = ref('')
const excludeDeleted = ref(true)
const roles = ref()
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref([{ key: 'updated_at', order: 'desc' }])

const columns = ref([
  { title: 'Action', value: 'actions', sortable: false },
  { title: 'Id', key: 'id' },
  {
    title: 'User',
    key: 'username',
    value: (user) => ({ avatar: user.avatar, username: user.username })
  },
  { title: 'Email', key: 'email' },
  { title: 'Roles', key: 'roles', sortable: false },
  { title: 'Created at', key: 'created_at' },
  { title: 'Updated at', key: 'updated_at' },
  { title: 'Deleted', key: 'deleted' }
])

async function getUsers() {
  isLoading.value = true
  try {
    var params = {
      page: page.value,
      limit: itemsPerPage.value,
      query: search.value,
      exclude_deleted: excludeDeleted.value,
      roles: roles.value ? roles.value.join(',') : '',
      sort_by: sortBy.value.at(0)?.key,
      sort_order: sortBy.value.at(0)?.order
    }
    params = new URLSearchParams(params)
    const URL = `${apis.userList.url}?${params.toString()}`
    var response = await fetch(URL, {
      method: apis.userList.method,
      headers: { Authorization: auth.token }
    })
    response = await response.json()
    data.value = response?.data
    total.value = response?.pagination?.total
    filtered.value = response?.pagination?.filtered
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  if (auth.isLoggedIn) getUsers()
})

const selectedUser = ref(null)
const selectedUsers = ref([])
const dialogUser = ref(false)
const dialogDelete = ref(false)

const canUpdate = auth.isAuthorized(apis.userUpdate.permission)
const canDelete = auth.isAuthorized(apis.userDelete.permission)
const canDeleteMany = auth.isAuthorized(apis.userDeleteMany.permission)
const actionsAllowed = canTakeActions([canUpdate, canDelete])
const actionsManyAllowed = canTakeActions([canDeleteMany])
if (!actionsAllowed) columns.value.shift()

function editUser(user) {
  selectedUser.value = user
  dialogUser.value = true
}

function deleteUser(user) {
  selectedUser.value = user
  dialogDelete.value = true
}

function deleteMany() {
  dialogDelete.value = true
}
</script>

<style scoped></style>
