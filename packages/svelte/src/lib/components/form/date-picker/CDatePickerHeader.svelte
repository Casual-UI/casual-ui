<script>
  import useSize from '$lib/hooks/useSize'
  import clsx from '$lib/utils/clsx'
  import { createEventDispatcher } from 'svelte'

  /**
   * Current year value.
   * @type {number}
   */
  export let year = new Date().getFullYear()

  /**
   * The current month value.
   * @type {number}
   */
  export let month = new Date().getMonth()

  export let size = undefined

  /**
   * @type {'year' | 'month' | 'day'}
   */
  export let unit = 'day'

  /**
   * @type {[number, number]}
   */
  export let yearRange = [
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
  ]

  /**
   * Determine whether the unit can be changed by click the year or the month value.
   * @type {boolean}
   */
  export let unitSwitchable = true

  const dispatch = createEventDispatcher()

  const contextSize = useSize(size)

  const getCurrentYearMonth = () => {
    const d = new Date()
    d.setDate(1)
    d.setFullYear(year)
    d.setMonth(month)
    return d
  }

  const resetYearMonth = (/** @type {Date} */ d) => {
    year = d.getFullYear()
    month = d.getMonth()
  }
  const toPrevMonth = () => {
    const d = getCurrentYearMonth()
    d.setMonth(month - 1)
    resetYearMonth(d)
  }
  const toNextMonth = () => {
    const d = getCurrentYearMonth()
    d.setMonth(month + 1)
    resetYearMonth(d)
  }

  const toPrevYear = () => {
    const d = getCurrentYearMonth()
    d.setFullYear(year - 1)
    resetYearMonth(d)
  }

  const toNextYear = () => {
    const d = getCurrentYearMonth()
    d.setFullYear(year + 1)
    resetYearMonth(d)
  }

  const toPreviousYearRange = () => {
    const [start, end] = yearRange
    yearRange = [start - 12, end - 12]
  }

  const toNextYearRange = () => {
    const [start, end] = yearRange
    yearRange = [start + 12, end + 12]
  }

  let displayMonth = ''

  const recomputeDispalyMonth = () => {
    const d = new Date()
    d.setDate(1)
    d.setMonth(month)
    displayMonth = d.toLocaleDateString('en-US', { month: 'short' })
  }

  /**
   * @param {'day' | 'month' | 'year'} newUnit
   */
  const changeUnit = newUnit => {
    dispatch('unit-change', newUnit)
  }

  $: month, recomputeDispalyMonth()
  $: isMonth = unit === 'month'
  $: isDay = unit === 'day'
</script>

<div class={`c-date-panel--header c-px-${$contextSize} c-pt-${$contextSize}`}>
  <div class="c-flex c-items-center">
    <slot name="left">
      {#if isDay || isMonth}
        <div
          class="c-icon"
          i-majesticons-chevron-double-left-line
          on:click={toPrevYear}
        />
      {:else}
        <div
          class="c-icon"
          i-majesticons-chevron-double-left-line
          on:click={toPreviousYearRange}
        />
      {/if}
      {#if isDay}
        <div class="c-icon" i-majesticons-chevron-left on:click={toPrevMonth} />
      {/if}
    </slot>
  </div>
  <div
    class={clsx(
      `c-date-panel--year`,
      unit !== 'year' && unitSwitchable && 'c-date-panel--year-switchable'
    )}
  >
    <slot name="title">
      {#if isDay}
        <span on:click|stopPropagation={() => changeUnit('month')}>
          {displayMonth}
        </span>
      {/if}
      &nbsp;
      {#if isDay || isMonth}
        <span on:click|stopPropagation={() => changeUnit('year')}>{year}</span>
      {:else}
        <span>{yearRange[0]} - {yearRange[1]}</span>
      {/if}
    </slot>
  </div>
  <div class="c-flex c-items-center">
    <slot name="right">
      {#if isDay}
        <div
          class="c-icon"
          i-majesticons-chevron-right
          on:click={toNextMonth}
        />
      {/if}
      {#if isDay || isMonth}
        <div
          class="c-icon"
          i-majesticons-chevron-double-right-line
          on:click={toNextYear}
        />
      {:else}
        <div
          class="c-icon"
          i-majesticons-chevron-double-right-line
          on:click={toNextYearRange}
        />
      {/if}
    </slot>
  </div>
</div>
