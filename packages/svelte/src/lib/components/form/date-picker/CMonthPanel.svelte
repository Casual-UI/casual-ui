<script>
  import { createEventDispatcher } from 'svelte'

  import CGridPanel from './CGridPanel.svelte'

  /**
   * @type {Date | null}
   */
  export let value = null

  /**
   * @type {'day' | 'month' | 'year'}
   */
  export let initialUnit

  /**
   * @type {number}
   */
  export let year = new Date().getFullYear()

  /**
   * @param {number} month
   */
  const getDisplayMonth = month => {
    const d = new Date()
    d.setDate(1)
    d.setFullYear(year)
    d.setMonth(month)
    return d.toLocaleDateString('en-US', { month: 'short' })
  }

  /**
   * @param {number} month
   */
  const isSelected = month => {
    if (!value) {
      return false
    }
    const d = new Date(value.getTime())
    d.setFullYear(year)
    d.setMonth(month)
    return d.getTime() === value.getTime()
  }

  const items = Array(12)
    .fill(0)
    .map((_, i) => i)

  const dispatch = createEventDispatcher()

  /**
   * @param {number} month
   */
  const onMonthClick = month => {
    value = new Date(year, month, value ? value.getDate() : 1)
    dispatch('month-change', value)
  }
</script>

<CGridPanel
  {items}
  isActive={isSelected}
  reverseTransition={initialUnit === 'day'}
  displayFormattor={getDisplayMonth}
  on:item-click={e => onMonthClick(e.detail)}
/>
