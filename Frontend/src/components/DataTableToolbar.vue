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
            <v-badge
              :content="`${selectedHeaders.length}/${columns.length}`"
              :offset-x="10"
              :offset-y="10"
              :model-value="selectedHeaders.length != columns.length"
            >
              <v-btn
                v-bind="mergeProps(menu, tooltip)"
                :disabled="isLoading"
                :icon="mdiTableHeadersEye"
              />
            </v-badge>
          </template>
        </v-tooltip>
      </template>
      <v-list density="compact" min-width="250" max-width="300" max-height="300">
        <SelectAllToggler v-model="selectedHeaders" :items="[...Array(columns.length).keys()]" />
        <v-item-group multiple v-model="selectedHeaders">
          <v-item v-for="(col, index) in columns" :key="index" v-slot="{ isSelected, toggle }">
            <v-list-item @click="toggle">
              <template v-slot:prepend>
                <v-checkbox-btn :model-value="isSelected" hide-details />
              </template>
              <v-list-item-title>{{ col.title }}</v-list-item-title>
            </v-list-item>
          </v-item>
        </v-item-group>
      </v-list>
    </v-menu>

    <v-tooltip text="Toggle Density" open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn
          :disabled="isLoading"
          :icon="mdiLandRowsHorizontal"
          @click="changeDensity"
          v-bind="props"
        />
      </template>
    </v-tooltip>

    <slot name="append"></slot>
  </v-toolbar>
</template>

<script setup>
import { mergeProps, onMounted, ref, watch, nextTick } from 'vue'
import { mdiLandRowsHorizontal, mdiTableHeadersEye } from '@mdi/js'

import SelectAllToggler from '@/components/SelectAllToggler.vue'

const props = defineProps({
  isLoading: { default: false },
  refreshAction: {},
  columns: { default: [] }
})

const headers = defineModel('headers')
const density = defineModel('density', { default: 'default' })
const selectedHeaders = ref([])

function getMatchingIndexes(list1, list2) {
  return list1
    .map((item, index) => {
      const isInList2 = list2.findIndex((item2) => item.key === item2.key) !== -1
      return isInList2 ? index : -1
    })
    .filter((index) => index !== -1)
}

onMounted(() => {
  if (headers.value) {
    selectedHeaders.value = getMatchingIndexes(props.columns, headers.value)
  } else {
    selectedHeaders.value = [...Array(props.columns.length).keys()]
  }
})

watch(selectedHeaders, (val) => {
  headers.value = props.columns.filter((_, i) => val.includes(i))
})

const colDensities = { default: 'px-4', comfortable: 'px-3', compact: 'px-1' }

function changeDensity() {
  if (!density.value) density.value = 'default'
  else if (density.value == 'default') density.value = 'comfortable'
  else if (density.value == 'comfortable') density.value = 'compact'
  else if (density.value == 'compact') density.value = 'default'

  nextTick(() => {
    const colDensity = colDensities[density.value]
    headers.value.forEach((col) => {
      const alignClasses = col.align
        ? col.align.split(' ').filter((cls) => !cls.startsWith('px'))
        : []
      alignClasses.push(` ${colDensity}`)
      col.align = alignClasses.join(' ')
    })
  })
}
</script>

<style scoped></style>
