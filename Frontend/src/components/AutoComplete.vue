<template>
  <v-autocomplete
    v-model="model"
    v-on:update:search="filterItems"
    v-bind="props"
    clearable
    persistent-clear
  >
    <template v-slot:prepend-item v-if="multiple">
      <SelectAllToggler
        v-model="model"
        :items="filteredItems"
        :total-item-count="items.length"
        :value="itemValue"
      />
    </template>

    <template v-slot:selection="{ item, index }">
      <SelectItemVisibility
        v-model="model"
        :item="item"
        :index="index"
        :count="itemsVisibilityCount"
        :label="itemsVisibilityLabel"
      />
    </template>
  </v-autocomplete>
</template>

<script setup>
import { ref } from 'vue'

import SelectAllToggler from '@/components/SelectAllToggler.vue'
import SelectItemVisibility from '@/components/SelectItemVisibility.vue'

const model = defineModel()

const props = defineProps({
  multiple: { default: false },
  items: {},
  itemValue: {},
  itemsVisibilityCount: { default: 3 },
  itemsVisibilityLabel: {}
})

const filteredItems = ref(props.items)

function filterItems(query) {
  if (query) {
    filteredItems.value = props.items.filter((role) =>
      role.name.toLowerCase().includes(query.toLowerCase())
    )
  } else filteredItems.value = props.items
}
</script>

<style scoped></style>
