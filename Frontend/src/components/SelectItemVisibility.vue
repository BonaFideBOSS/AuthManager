<template>
  <v-chip v-if="index <= count && selectedItems.length <= count" size="small">
    {{ item.title }}
  </v-chip>
  <span v-if="index === count">{{ selectedItems.length }} {{ label }}</span>
</template>

<script setup>
const selectedItems = defineModel({ default: [] })

defineProps({
  item: {},
  index: {},
  count: { default: 3 },
  label: { default: 'items' }
})
</script>

<style lang="scss" scoped></style>
