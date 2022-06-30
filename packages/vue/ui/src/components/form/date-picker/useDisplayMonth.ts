import { computed } from 'vue'
import type { Ref } from 'vue'

export default (month: Ref<number>) => {
  return {
    displayMonth: computed(() => {
      const d = new Date()
      d.setDate(1)
      d.setMonth(month.value)
      return d.toLocaleDateString('en-US', { month: 'short' })
    }),
  }
}
