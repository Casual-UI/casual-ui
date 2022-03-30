<script setup lang="ts">
import { computed, toRefs } from 'vue'
import CDateGridPanel from './CDateGridPanel.vue'

interface OMonthPanelProps {
  modelValue: Date | null
  year?: number
}

const props = withDefaults(defineProps<OMonthPanelProps>(), {
  modelValue: () => new Date(),
  year: new Date().getFullYear(),
})

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: Date | null): void
}>()

const { year, modelValue } = toRefs(props)

const getDisplayMonth = (month: number) => {
  const d = new Date()
  d.setFullYear(year.value)
  d.setMonth(month)
  return d.toLocaleDateString('en-US', { month: 'short' })
}

const isSelected = (month: number) => {
  if (!modelValue.value) return false
  const d = new Date(modelValue.value?.getTime())
  d.setFullYear(year.value)
  d.setMonth(month)
  return d.getTime() === modelValue.value.getTime()
}

const items = computed(() =>
  Array(12)
    .fill(0)
    .map((_, i) => i)
)
</script>
<template>
  <c-date-grid-panel
    :is-active="isSelected"
    :items="items"
    :display-formatter="getDisplayMonth"
    @item-click="
      month => {
        emit(
          'update:modelValue',
          new Date(year, month, modelValue?.getDate() || 1)
        )
      }
    "
  />
</template>
