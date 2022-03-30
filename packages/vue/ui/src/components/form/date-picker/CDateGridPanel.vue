<script setup lang="ts">
defineProps<{
  items: number[]
  isActive: (item: number) => boolean
  displayFormatter: (item: number) => string
}>()

defineEmits<{
  (e: 'itemClick', item: any): void
}>()
</script>
<template>
  <div :class="['c-date-picker--panel']">
    <div
      :class="[
        `c-date-picker--panel-body`,
        'c-grid',
        'c-grid-col-4',
        'c-grid-row-3',
      ]"
    >
      <div
        v-for="item in items"
        :key="item"
        :class="[
          'c-date-picker--panel-cell',
          { 'c-date-picker--panel-cell--is-selected': isActive(item) },
        ]"
        @click.stop="$emit('itemClick', item)"
      >
        <div class="c-date-picker--panel-cell--inner">
          {{ displayFormatter(item) }}
        </div>
      </div>
    </div>
  </div>
</template>
