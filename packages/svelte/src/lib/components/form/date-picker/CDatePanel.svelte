<script>
  import { weeks } from 'casual-i18n'
  /**
   * @type {number}
   */
  export let year

  /**
   * @type {number}
   */
  export let month

  /**
   * @type {Date | null}
   */
  export let value

  /**
   * @type {[Date | null, Date | null]}
   */
  export let rangeValue = [null, null]

  /**
   * @type {[string, string]}
   */
  export let formattedRangeValue = ['', '']

  /**
   * @type {(d: Date | null) => string}
   */
  export let formattor

  /**
   * @type {boolean}
   */
  export let range

  const getCurrentYearMonth = () => {
    const d = new Date()
    d.setDate(1)
    d.setFullYear(year)
    d.setMonth(month)
    return d
  }

  /**
   * @param date {number}
   */
  const setDate = date => {
    const d = getCurrentYearMonth()
    d.setDate(date)
    const target = formattor(d)
    if (range) {
      const [start, end] = rangeValue
      const [fStart] = formattedRangeValue
      if (!start) {
        rangeValue = [d, end]
        return
      }
      if (!end) {
        rangeValue = fStart < target ? [start, d] : [d, start]
        return
      }
      return
    }
    value = d
  }

  /**
   * @type { {items: number[]; start: number; end: number } }
   */
  let dates = {
    items: [],
    start: 0,
    end: 0,
  }

  const recomputeDates = () => {
    const d = new Date()
    d.setFullYear(year)
    d.setMonth(month)
    d.setDate(1)
    const weekNum = d.getDay()
    const leftPads = Array(weekNum % 7)
      .fill('')
      .map((_, i) => -i)
      .reverse()
    d.setMonth(month + 1)
    d.setDate(0)

    const middle = Array(d.getDate())
      .fill(0)
      .map((_, i) => i + 1)

    // 右边补空位
    const rightPads = Array(42 - leftPads.length - middle.length)
      .fill('')
      .map((_, i) => middle.length + i + 1)

    const items = [...leftPads, ...middle, ...rightPads]
    dates = {
      items,
      start: leftPads.length,
      end: leftPads.length + middle.length,
    }
  }

  $: {
    year
    month
  }
</script>

<div class={`c-date-panel c-date-picker--panel`}>
  <div class="c-date-panel--body">
    {#each weeks as w}
      <div class="c-date-panel--week-item">
        {w}
      </div>
    {/each}
    {#each dates.items as d}
      <div class={`c-date-panel--date-item`}>
        <!-- TODO: implement rest -->
      </div>
    {/each}
  </div>
</div>
