import { ref } from 'vue'
import type { Ref } from 'vue'

type DateRange = [Date | null, Date | null]
export default (customRange?: Ref<DateRange>) => {
  const range = customRange
    ? customRange
    : ref<DateRange>([new Date(), new Date()])

  const setStart = (startDate: Date) => {
    const [, endDate] = range.value
    range.value = [startDate, endDate]
  }

  const senEnd = (endDate: Date) => {
    const [startDate] = range.value
    range.value = [startDate, endDate]
  }

  return {
    range,
    setStart,
    senEnd,
  }
}
