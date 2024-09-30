<template>
  <div class="mb-5">
    <h1 class="d-flex align-center ga-2 opacity-80">
      <v-icon :icon="route.meta.icon" size="x-small"></v-icon>
      <span v-text="route.meta.title"></span>
    </h1>
  </div>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="i in dbCount" :key="i.table">
      <v-card variant="outlined" color="secondary" border="sm" rounded="xl" :to="{ name: i.table }">
        <v-card-text class="px-md-10 px-sm-7">
          <div class="d-flex justify-space-between align-center">
            <v-card-title class="ps-0 text-capitalize d-flex align-center ga-3">
              <v-icon :icon="dbCountIcon[i.table]" size="x-large" />
              <span>{{ i.table }}</span>
            </v-card-title>
            <v-card-title class="text-h3 pe-0">{{ i.count }}</v-card-title>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import apis from '@/apis'
import { authStore } from '@/stores/auth'
import { mdiAccountLock, mdiAccountMultiple, mdiLock } from '@mdi/js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const auth = authStore()

const dbCount = ref()
const dbCountIcon = { users: mdiAccountMultiple, roles: mdiAccountLock, permissions: mdiLock }

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
