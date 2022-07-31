<script>
  import { createEventDispatcher } from 'svelte'

  import CGridPanel from './CGridPanel.svelte'

  /**
   * @type {Date | null}
   */
  export let value = null

  /**
   * @type {[number, number]}
   */
  export let yearRange

  /**
   * @type {number[]}
   */
  let years = []

  const getYears = () => {
    const [start, end] = yearRange
    for (let i = start; i <= end; i++) {
      years.push(i)
    }
    years = years
  }

  /**
   * @param {number} year
   */
  const isSelected = year => {
    return value ? value.getFullYear() === year : false
  }

  const dispatch = createEventDispatcher()

  /**
   * @param {number} year
   */
  const onYearClick = year => {
    if (value) {
      value = new Date(year, value.getMonth(), value.getDate())
    } else {
      value = new Date(year, 0, 1)
    }

    dispatch('year-change', value)
  }

  $: {
    yearRange
    getYears()
  }
</script>

<CGridPanel
  isActive={isSelected}
  items={years}
  displayFormattor={year => year}
  on:item-click={e => onYearClick(e.detail)}
/>
