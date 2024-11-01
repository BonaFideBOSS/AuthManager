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

  <DataTableToolbar
    v-model:headers="dataStore.data.permissionHeaders"
    v-model:density="dataStore.data.permissionDensity"
    :is-loading="isLoading"
    :refresh-action="getPermissions"
    :columns="columns"
  >
    <template v-slot:prepend>
      <template v-if="actionsManyAllowed">
        <DataTableActionButton
          v-if="canDeleteMany && selectedPermissions.length > 0"
          tooltip-label="Delete selected permissions"
          :is-loading="isLoading"
          @click="deleteMany"
          icon="$delete"
          size="default"
          :change-color-on-hover="false"
        />

        <v-divider
          v-if="selectedPermissions.length > 0"
          class="mx-3 align-self-center"
          vertical
          length="24"
          thickness="2"
        />
      </template>

      <v-tooltip text="Create new role" v-if="canCreate" open-on-click>
        <template v-slot:activator="{ props }">
          <v-btn icon="$plus" @click="createPermission" v-bind="props" :disabled="isLoading" />
        </template>
      </v-tooltip>
    </template>
  </DataTableToolbar>

  <v-data-table-server
    loading-text="loading permissions..."
    :headers="dataStore.data.permissionHeaders"
    :density="dataStore.data.permissionDensity"
    :items="data"
    :items-length="filtered"
    v-model="selectedPermissions"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :loading="isLoading"
    @update:options="getPermissions"
    :disable-sort="isLoading"
    must-sort
    hover
    :show-select="actionsManyAllowed"
    :header-props="{ class: 'text-no-wrap' }"
  >
    <template v-slot:item.actions="{ item }">
      <div class="text-no-wrap">
        <DataTableActionButton
          v-if="canUpdate"
          tooltip-label="Edit"
          :is-loading="isLoading"
          @click="editPermission(item)"
          icon="$edit"
          :density="dataStore.data.permissionDensity"
        />
        <DataTableActionButton
          v-if="canDelete && !item.deleted"
          tooltip-label="Delete"
          :is-loading="isLoading"
          @click="deletePermission(item)"
          icon="$delete"
          color-on-hover="red"
          :density="dataStore.data.permissionDensity"
        />
      </div>
    </template>

    <template v-slot:item.roles="{ value }">
      <ChipsGroup
        :items="value"
        item-key="id"
        title-key="name"
        color-key="color"
        label="role"
        :density="dataStore.data.permissionDensity"
      />
    </template>

    <template v-slot:item.name="{ value }">
      <v-chip
        class="text-no-wrap font-weight-medium"
        :density="dataStore.data.permissionDensity"
        :text="value"
      />
    </template>

    <template v-slot:item.created_at="{ value }">
      <span class="text-no-wrap">
        {{ timelapse(value) }}
        <v-tooltip activator="parent" :text="date.format(value, 'fullDateTime12h')" open-on-click />
      </span>
    </template>

    <template v-slot:item.updated_at="{ value }">
      <span class="text-no-wrap">
        {{ timelapse(value) }}
        <v-tooltip activator="parent" :text="date.format(value, 'fullDateTime12h')" open-on-click />
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
    v-model:dialog="dialogPermission"
    v-model:permission="selectedPermission"
    :reload-function="getPermissions"
  />
  <PermissionDeleteDialog
    v-model:dialog="dialogDelete"
    v-model:permission="selectedPermission"
    v-model:permissions="selectedPermissions"
    :reload-function="getPermissions"
  />
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDate } from 'vuetify/lib/framework.mjs'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { preferenceStore } from '@/stores/preference'
import { canTakeActions, timelapse } from '@/utils'
import DataTableToolbar from '@/components/DataTableToolbar.vue'
import DataTablePagination from '@/components/DataTablePagination.vue'
import DataTableActionButton from '@/components/DataTableActionButton.vue'
import SearchField from '@/components/SearchField.vue'
import ChipsGroup from '@/components/ChipsGroup.vue'

import PermissionDialog from './PermissionDialog.vue'
import PermissionDeleteDialog from './PermissionDeleteDialog.vue'
import RoleSelectField from '@/views/users/RoleSelectField.vue'

const route = useRoute()
const auth = authStore()
const date = useDate()
const dataStore = preferenceStore()

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

function deleteMany() {
  dialogDelete.value = true
}
</script>

<style scoped></style>
