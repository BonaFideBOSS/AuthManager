<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props: hover }">
      <v-tooltip :text="tooltipLabel" open-on-click>
        <template v-slot:activator="{ props: tooltip }">
          <v-btn
            variant="text"
            v-bind="mergeProps(hover, tooltip)"
            :disabled="isLoading"
            :color="isHovering && changeColorOnHover ? colorOnHover : ''"
            :icon="icon"
            @click="onClick"
            :size="size"
            :density="density"
          />
        </template>
      </v-tooltip>
    </template>
  </v-hover>
</template>

<script setup>
import { mergeProps } from 'vue'

defineProps({
  tooltipLabel: {},
  isLoading: { default: false },
  changeColorOnHover: { default: true },
  colorOnHover: { default: 'primary' },
  onClick: {},
  icon: {},
  size: { default: 'small' },
  density: { default: 'default' }
})
</script>

<style scoped></style>
