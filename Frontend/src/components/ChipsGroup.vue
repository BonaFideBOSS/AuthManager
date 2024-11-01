<template>
  <div class="d-flex flex-wrap ga-1 my-1">
    <v-chip
      v-for="item in items.slice(0, displayLimit)"
      :key="itemKey ? item[itemKey] : index"
      :text="(titleKey ? item[titleKey] : item).toString()"
      :color="colorKey ? item[colorKey] : color"
      :density="density"
    />
    <v-menu open-on-hover open-on-click v-if="items.length > displayLimit || items.length == 0">
      <template v-slot:activator="{ props }">
        <v-chip
          v-bind="props"
          link
          :density="density"
          :text="
            displayLimit != 0 && items.length != 0
              ? `+${items.length - displayLimit} ${moreLabel}`
              : items.length.toString()
          "
        />
      </template>

      <v-card max-width="300" max-height="300" rounded="lg">
        <v-card-text>{{ items.length }} {{ label }}{{ items.length > 1 ? 's' : '' }}</v-card-text>
        <v-card-text class="d-flex flex-wrap ga-1 pt-0" v-if="items.length > 0">
          <v-chip
            v-for="(item, index) in items"
            :key="itemKey ? item[itemKey] : index"
            :text="(titleKey ? item[titleKey] : item).toString()"
            :color="colorKey ? item[colorKey] : color"
          />
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
defineProps({
  density: { default: 'default' },
  items: { default: [] },
  label: { default: 'item' },
  itemKey: {},
  titleKey: {},
  colorKey: {},
  color: {},
  displayLimit: { default: 0 },
  moreLabel: { default: '' }
})
</script>
