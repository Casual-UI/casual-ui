import { computed, Ref } from 'vue'

export default (month: Ref<number>) => {
  return {
    displayMonth: computed(() => {
      const d = new Date()
      d.setMonth(month.value)
      return d.toLocaleDateString('en-US', { month: 'short' })
    }),
  }
}
