<template>
  <v-list-item title="Select All" @click="toggle">
    <template v-slot:prepend>
      <v-checkbox-btn
        :indeterminate="areSomeSelected && !areAllSelected"
        :model-value="areAllSelected"
      />
    </template>
  </v-list-item>

  <v-divider class="mt-2"></v-divider>
</template>

<script setup>
import { computed } from 'vue'

const selectedItems = defineModel({ default: [] })

const props = defineProps({
  items: { default: [] },
  value: { default: null }
})

const areAllSelected = computed(() => {
  return selectedItems.value.length === props.items.length
})

const areSomeSelected = computed(() => {
  return selectedItems.value.length > 0
})

function toggle() {
  const items = props.value ? props.items.map((item) => item[props.value]) : props.items
  selectedItems.value = areAllSelected.value ? [] : [...new Set([...selectedItems.value, ...items])]
}
</script>

<style lang="scss" scoped></style>
