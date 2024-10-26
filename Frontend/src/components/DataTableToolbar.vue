<template>
  <v-toolbar>
    <slot name="prepend"></slot>

    <v-tooltip text="Refresh" open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn :disabled="isLoading" icon="$refresh" @click="refreshAction" v-bind="props" />
      </template>
    </v-tooltip>

    <v-menu :disabled="isLoading" :close-on-content-click="false">
      <template v-slot:activator="{ props: menu }">
        <v-tooltip text="Show/Hide Columns">
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              :icon="mdiTableHeadersEye"
              v-bind="mergeProps(menu, tooltip)"
              :disabled="isLoading"
            />
          </template>
        </v-tooltip>
      </template>
      <v-list density="compact" min-width="250" max-width="300" max-height="300">
        <SelectAllToggler v-model="selectedHeaders" :items="[...Array(columns.length).keys()]" />
        <v-item-group multiple v-model="selectedHeaders">
          <v-item v-for="(col, index) in columns" :key="index" v-slot="{ isSelected, toggle }">
            <v-list-item @click="toggle">
              <template v-slot:prepend>
                <v-list-item-action>
                  <v-checkbox :model-value="isSelected" hide-details density="compact" />
                </v-list-item-action>
              </template>
              <v-list-item-title>{{ col.title }}</v-list-item-title>
            </v-list-item>
          </v-item>
        </v-item-group>
      </v-list>
    </v-menu>

    <slot name="append"></slot>
  </v-toolbar>
</template>

<script setup>
import { mergeProps, onMounted, ref, watch } from 'vue'
import { mdiTableHeadersEye } from '@mdi/js'

import SelectAllToggler from '@/components/SelectAllToggler.vue'

const props = defineProps({
  isLoading: { default: false },
  refreshAction: {},
  columns: { default: [] }
})

const headers = defineModel()
const selectedHeaders = ref([])

onMounted(() => {
  selectedHeaders.value = [...Array(props.columns.length).keys()]
})

watch(selectedHeaders, (val) => {
  headers.value = props.columns.filter((_, i) => val.includes(i))
})
</script>

<style scoped></style>
