<template>
  <v-text-field
    :model-value="search"
    label="Search"
    variant="outlined"
    density="compact"
    rounded="pill"
    prepend-inner-icon="$search"
    hide-details
    clearable
    @update:model-value="handleSearch"
    @click:clear="search = ''"
    v-bind="props"
  />
</template>

<script setup>
import { debounce } from '@/utils'

const props = defineProps({})

const search = defineModel()
const handleSearch = debounce((val) => (search.value = val || ''), 500)
</script>

<style lang="scss" scoped></style>
