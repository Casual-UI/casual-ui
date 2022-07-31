<script setup lang="ts">
import { computed, toRefs } from 'vue'
import CDateGridPanel from './CDateGridPanel.vue'

interface OYearPanelProps {
  modelValue: Date | null
  yearRange: [number, number]
}

const props = withDefaults(defineProps<OYearPanelProps>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', newValue: Date | null): void
}>()

const { yearRange } = toRefs(props)
const years = computed(() => {
  const start = yearRange.value[0]
  const end = yearRange.value[1]
  const years = []
  for (let i = start; i <= end; i++) {
    years.push(i)
  }
  return years
})

const isSelected = (year: number) => {
  return props.modelValue?.getFullYear() === year
}
const displayFormatter = (year: number) => year + ''
</script>
<template>
  <c-date-grid-panel
    :is-active="isSelected"
    :items="years"
    :display-formatter="displayFormatter"
    @item-click="
      year => {
        emit(
          'update:modelValue',
          new Date(
            year,
            modelValue?.getMonth() || 0,
            modelValue?.getDate() || 1
          )
        )
      }
    "
  />
</template>
