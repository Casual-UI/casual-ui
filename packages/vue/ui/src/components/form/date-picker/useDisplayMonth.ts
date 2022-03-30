import { computed, Ref } from 'vue'

export default (year: Ref<number>, month: Ref<number>) => {
  return {
    displayMonth: computed(() => {
      const d = new Date()
      d.setFullYear(year.value)
      d.setMonth(month.value)
      return d.toLocaleDateString('en-US', { month: 'short' })
    }),
  }
}
