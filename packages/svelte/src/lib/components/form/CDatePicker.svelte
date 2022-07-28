<script>
  /**
   * The select unit.
   * @type {'year' | 'month' | 'day'}
   */
  export let unit = 'day'

  /**
   * The selected date value. It is recommended to use `bind:value`.
   * @type {Date=}
   */
  export let value = undefined

  /**
   * The formatted display value. It is recommended to use `bind:formattedValue`.
   * @type {string}
   */
  export let formattedValue = ''

  /**
   * The date range value. This prop is used when in range select mode.  It is recommended to use `bind:rangeValue`.
   * @type {[Date | null, Date | null]}
   */
  export let rangeValue = [null, null]

  /**
   * The display format. For more information visit [Dayjs](https://day.js.org/docs/en/display/format#list-of-all-available-formats)
   */
  export let format = 'YYYY-MM-DD'

  /**
   * Custom formatter function.
   * @type {(d: Date | null, format: string) => string=}
   */
  export let formatter = undefined

  /**
   * The size of date picker. Notice that the default is `'md'` instead of `undefined`
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The placeholder. Same as [CInput](/components/input)
   * @type {string}
   */
  export let placeholder = ''

  /**
   * Determine whether the date picker is disabled or not.
   * @type {boolean}
   */
  export let disabled = false
</script>
