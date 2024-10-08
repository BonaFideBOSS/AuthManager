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
      <RoleSelectField
        v-model="roles"
        density="compact"
        rounded="pill"
        hide-details
        :items-visibility-count="1"
      />
    </v-col>
  </v-row>

  <v-toolbar>
    <template v-if="actionsManyAllowed">
      <v-tooltip
        text="Delete selected permissions"
        v-if="canDeleteMany && selectedPermissions.length > 0"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            :disabled="isLoading"
            icon="$delete"
            @click="deletePermissionMany"
            v-bind="props"
          />
        </template>
      </v-tooltip>
      <v-divider
        v-if="selectedPermissions.length > 0"
        class="mx-3 align-self-center"
        vertical
        length="24"
        thickness="2"
      />
    </template>

    <v-tooltip text="Create new role" v-if="canCreate">
      <template v-slot:activator="{ props }">
        <v-btn icon="$plus" @click="createPermission" v-bind="props" :disabled="isLoading" />
      </template>
    </v-tooltip>

    <v-tooltip text="Refresh">
      <template v-slot:activator="{ props }">
        <v-btn icon="$refresh" @click="getPermissions" v-bind="props" :disabled="isLoading" />
      </template>
    </v-tooltip>
  </v-toolbar>

  <v-data-table-server
    loading-text="loading permissions..."
    :headers="columns"
    :items="data"
    :items-length="filtered"
    v-model="selectedPermissions"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :loading="isLoading"
    @update:options="getPermissions"
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
              @click="editPermission(item)"
              variant="text"
              size="small"
            />
          </template>
        </v-hover>
        <v-hover v-if="canDelete">
          <template v-slot:default="{ isHovering, props }">
            <v-btn
              :disabled="isLoading"
              v-bind="props"
              :color="isHovering ? 'red-accent-4' : ''"
              icon="$delete"
              @click="deletePermission(item)"
              variant="text"
              size="small"
            />
          </template>
        </v-hover>
      </div>
    </template>

    <template v-slot:item.roles="{ value }">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-chip v-bind="props" link>{{ value.length }}</v-chip>
        </template>

        <v-card max-width="300" max-height="300" rounded="lg">
          <v-card-text>{{ value.length }} roles</v-card-text>
          <v-card-text class="d-flex flex-wrap ga-1 pt-0" v-if="value.length > 0">
            <v-chip v-for="role in value" :key="role.id">
              {{ role.name }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>

    <template v-slot:item.name="{ value }">
      <v-chip class="text-no-wrap font-weight-medium" density="comfortable" :text="value" />
    </template>

    <template v-slot:item.created_at="{ value }">
      <span class="text-no-wrap">
        {{ timelapse(value) }}
        <v-tooltip activator="parent" :text="date.format(value, 'fullDateTime12h')"></v-tooltip>
      </span>
    </template>

    <template v-slot:item.updated_at="{ value }">
      <span class="text-no-wrap">
        {{ timelapse(value) }}
        <v-tooltip activator="parent" :text="date.format(value, 'fullDateTime12h')"></v-tooltip>
      </span>
    </template>

    <template v-slot:bottom>
      <DataTablePagination
        class="mt-2"
        v-model:page="page"
        v-model:items-per-page="itemsPerPage"
        :items-count="data.length"
        :total="total"
        :filtered="filtered"
        label="permissions"
      />
    </template>
  </v-data-table-server>

  <PermissionDialog
    v-model="dialogPermission"
    :permission="selectedPermission"
    :reload-function="getPermissions"
  />
  <PermissionDeleteDialog
    v-model="dialogDelete"
    :permission="selectedPermission"
    :reload-function="getPermissions"
  />
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDate } from 'vuetify/lib/framework.mjs'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { notificationStore } from '@/stores/notification'
import { canTakeActions, timelapse } from '@/utils'
import DataTablePagination from '@/components/DataTablePagination.vue'
import SearchField from '@/components/SearchField.vue'
import PermissionDialog from './PermissionDialog.vue'
import PermissionDeleteDialog from './PermissionDeleteDialog.vue'
import RoleSelectField from '@/views/users/RoleSelectField.vue'

const route = useRoute()
const auth = authStore()
const notification = notificationStore()
const date = useDate()

const isLoading = ref(false)
const data = ref([])
const total = ref(0)
const filtered = ref(0)
const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref([{ key: 'updated_at', order: 'desc' }])
const roles = ref()

const columns = ref([
  { title: 'Action', value: 'actions', sortable: false },
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Roles', key: 'roles', sortable: false },
  { title: 'Created at', key: 'created_at' },
  { title: 'Updated at', key: 'updated_at' }
])

async function getPermissions() {
  isLoading.value = true
  try {
    var params = {
      page: page.value,
      limit: itemsPerPage.value,
      query: search.value,
      roles: roles.value ? roles.value.join(',') : '',
      sort_by: sortBy.value.at(0)?.key,
      sort_order: sortBy.value.at(0)?.order
    }
    params = new URLSearchParams(params)
    const URL = `${apis.permissionList.url}?${params.toString()}`
    var response = await fetch(URL, {
      method: apis.permissionList.method,
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
  if (auth.isLoggedIn) getPermissions()
})

const selectedPermission = ref()
const selectedPermissions = ref([])
const dialogPermission = ref(false)
const dialogDelete = ref(false)

const canCreate = auth.isAuthorized(apis.permissionCreate.permission)
const canUpdate = auth.isAuthorized(apis.permissionUpdate.permission)
const canDelete = auth.isAuthorized(apis.permissionDelete.permission)
const canDeleteMany = auth.isAuthorized(apis.permissioneleteMany.permission)
const actionsAllowed = canTakeActions([canUpdate, canDelete])
const actionsManyAllowed = canTakeActions([canDeleteMany])
if (!actionsAllowed) columns.value.shift()

function createPermission() {
  selectedPermission.value = null
  dialogPermission.value = true
}

function editPermission(permission) {
  selectedPermission.value = permission
  dialogPermission.value = true
}

function deletePermission(permission) {
  selectedPermission.value = permission
  dialogDelete.value = true
}

async function deletePermissionMany() {
  isLoading.value = true
  try {
    var response = await fetch(apis.permissioneleteMany.url, {
      method: apis.permissioneleteMany.method,
      headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedPermissions.value)
    })
    response = await response.json()
    notification.notify(response.message, 'success')
    getPermissions()
    selectedPermissions.value.length = 0
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
