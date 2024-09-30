<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="3">
      <p class="mb-0 text-center text-lg-start" v-text="paginationInfo"></p>
    </v-col>
    <v-col cols="12" lg="6">
      <v-pagination density="comfortable" v-model="page" :length="pageCount" :total-visible="6" />
    </v-col>
    <v-col cols="12" lg="3">
      <v-select
        density="compact"
        v-model="itemsPerPage"
        :label="`${label} per page`"
        :items="perPageOptions"
        item-title="label"
        item-value="value"
        variant="outlined"
        hide-details
      ></v-select>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'

const page = defineModel('page')
const itemsPerPage = defineModel('itemsPerPage')

const props = defineProps({
  itemsCount: { default: 0 },
  total: { default: 0 },
  filtered: { default: 0 },
  label: { default: 'items' },
  perPageOptions: {
    default: [
      { label: '10', value: 10 },
      { label: '25', value: 25 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }
    ]
  }
})

const pageCount = computed(() => Math.ceil(props.filtered / itemsPerPage.value))

const paginationInfo = computed(() => {
  var label = props.label.toLowerCase()
  const start = props.itemsCount > 0 ? itemsPerPage.value * (page.value - 1) + 1 : 0
  var end = start - 1 + props.itemsCount
  end = end < 0 ? 0 : end
  var info = `Showing ${start} to ${end} of ${props.filtered} ${label}`
  if (props.total != props.filtered) info += ` (filtered from ${props.total} ${label})`
  return info
})
</script>

<style></style>
