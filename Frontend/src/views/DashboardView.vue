<template>
  <div class="mb-5">
    <h1 class="d-flex align-center ga-2 opacity-80">
      <v-icon :icon="route.meta.icon" size="x-small"></v-icon>
      <span v-text="route.meta.title"></span>
    </h1>
  </div>

  <v-row dense>
    <v-col cols="12" sm="6" md="4" v-for="(value, key, index) in tables" :key="index">
      <v-skeleton-loader type="image" v-if="!dbCount" />
      <v-card
        v-if="dbCount"
        variant="outlined"
        color="secondary"
        border="sm"
        rounded="xl"
        :to="{ name: key }"
      >
        <v-card-text class="px-sm-5">
          <div class="d-flex ga-2 justify-space-between align-center">
            <v-card-title class="px-0 text-capitalize d-flex align-center ga-3 opacity-100">
              <v-icon :icon="value" />
              <span>{{ key }}</span>
            </v-card-title>
            <v-card-title class="text-h4 px-0">
              {{ dbCount.find((c) => c.table == key).count }}
            </v-card-title>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { mdiAccountLock, mdiAccountMultiple, mdiLock } from '@mdi/js'

const route = useRoute()
const auth = authStore()

const dbCount = ref()
const tables = ref({ users: mdiAccountMultiple, roles: mdiAccountLock, permissions: mdiLock })

async function getDbCount() {
  try {
    var response = await fetch(apis.dbCount.url, {
      method: apis.dbCount.method,
      headers: { Authorization: auth.token }
    })
    response = await response.json()
    dbCount.value = response.data
  } catch (error) {
    console.log(error)
  }
}

getDbCount()
</script>

<style scoped></style>
