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
      <PermissionSelectField
        v-model="permissions"
        density="compact"
        rounded="pill"
        hide-details
        :items-visibility-count="1"
      />
    </v-col>
  </v-row>

  <DataTableToolbar
    v-model:headers="dataStore.data.roleHeaders"
    v-model:density="dataStore.data.roleDensity"
    :is-loading="isLoading"
    :refresh-action="getRoles"
    :columns="columns"
  >
    <template v-slot:prepend>
      <template v-if="actionsManyAllowed">
        <DataTableActionButton
          v-if="canDeleteMany && selectedRoles.length > 0"
          tooltip-label="Delete selected roles"
          :is-loading="isLoading"
          @click="deleteMany"
          icon="$delete"
          size="default"
          :change-color-on-hover="false"
        />

        <v-divider
          v-if="selectedRoles.length > 0"
          class="mx-3 align-self-center"
          vertical
          length="24"
          thickness="2"
        />
      </template>

      <v-tooltip open-on-click text="Create new role" v-if="canCreate">
        <template v-slot:activator="{ props }">
          <v-btn icon="$plus" @click="createRole" v-bind="props" :disabled="isLoading" />
        </template>
      </v-tooltip>
    </template>
  </DataTableToolbar>

  <v-data-table-server
    loading-text="loading roles..."
    :headers="dataStore.data.roleHeaders"
    :density="dataStore.data.roleDensity"
    :items="data"
    :items-length="filtered"
    v-model="selectedRoles"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    v-model:sort-by="sortBy"
    :loading="isLoading"
    @update:options="getRoles"
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
          @click="editRole(item)"
          icon="$edit"
          :density="dataStore.data.roleDensity"
        />
        <DataTableActionButton
          v-if="canDelete && !item.deleted"
          tooltip-label="Delete"
          :is-loading="isLoading"
          @click="deleteRole(item)"
          icon="$delete"
          color-on-hover="red"
          :density="dataStore.data.roleDensity"
        />
      </div>
    </template>

    <template v-slot:item.permissions="{ value }">
      <ChipsGroup
        :items="value"
        item-key="id"
        title-key="name"
        label="permission"
        display-limit="2"
        :density="dataStore.data.roleDensity"
      />
    </template>

    <template v-slot:item.name="{ item }">
      <v-chip
        class="text-no-wrap font-weight-medium"
        :color="item.color"
        :density="dataStore.data.roleDensity"
        :text="item.name"
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
        label="roles"
      />
    </template>
  </v-data-table-server>

  <RoleDialog v-model:dialog="dialogRole" v-model:role="selectedRole" :reload-function="getRoles" />
  <RoleDeleteDialog
    v-model:dialog="dialogDelete"
    v-model:role="selectedRole"
    v-model:roles="selectedRoles"
    :reload-function="getRoles"
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

import RoleDialog from './RoleDialog.vue'
import RoleDeleteDialog from './RoleDeleteDialog.vue'
import PermissionSelectField from './PermissionSelectField.vue'

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
const permissions = ref()

const columns = ref([
  { title: 'Action', value: 'actions', sortable: false },
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Permissions', key: 'permissions', sortable: false },
  { title: 'Created at', key: 'created_at' },
  { title: 'Updated at', key: 'updated_at' }
])

async function getRoles() {
  isLoading.value = true
  try {
    var params = {
      page: page.value,
      limit: itemsPerPage.value,
      query: search.value,
      perms: permissions.value ? permissions.value.join(',') : '',
      sort_by: sortBy.value.at(0)?.key,
      sort_order: sortBy.value.at(0)?.order
    }
    params = new URLSearchParams(params)
    const URL = `${apis.roleList.url}?${params.toString()}`
    var response = await fetch(URL, {
      method: apis.roleList.method,
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
  if (auth.isLoggedIn) getRoles()
})

const selectedRole = ref()
const selectedRoles = ref([])
const dialogRole = ref(false)
const dialogDelete = ref(false)

const canCreate = auth.isAuthorized(apis.roleCreate.permission)
const canUpdate = auth.isAuthorized(apis.roleUpdate.permission)
const canDelete = auth.isAuthorized(apis.roleDelete.permission)
const canDeleteMany = auth.isAuthorized(apis.roleDeleteMany.permission)
const actionsAllowed = canTakeActions([canUpdate, canDelete])
const actionsManyAllowed = canTakeActions([canDeleteMany])
if (!actionsAllowed) columns.value.shift()

function createRole() {
  selectedRole.value = null
  dialogRole.value = true
}

function editRole(role) {
  selectedRole.value = role
  dialogRole.value = true
}

function deleteRole(role) {
  selectedRole.value = role
  dialogDelete.value = true
}

function deleteMany() {
  dialogDelete.value = true
}
</script>

<style scoped></style>
