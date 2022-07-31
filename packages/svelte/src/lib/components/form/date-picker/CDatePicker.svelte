<script>
  import useSize from '$lib/hooks/useSize'
  import clsx from '$lib/utils/clsx'
  import dayjs from 'dayjs'
  import { cubicInOut } from 'svelte/easing'
  import { fly, slide } from 'svelte/transition'
  import CDropdown from '../../CDropdown.svelte'
  import CInput from '../CInput.svelte'
  import CDatePanel from './CDatePanel.svelte'
  import CDatePickerHeader from './CDatePickerHeader.svelte'
  import CMonthPanel from './CMonthPanel.svelte'
  /**
   * The select unit.
   * @type {'year' | 'month' | 'day'}
   */
  export let unit = 'day'

  /**
   * The selected date value. It is recommended to use `bind:value`.
   * @type {Date | null}
   */
  export let value = null

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
   * The formatted range value. It is recommended to use `bind:formattedRangeValue`.
   * @type {[string, string]}
   */
  export let formattedRangeValue = ['', '']

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

  /**
   * Determine use a date range selector or not.
   * @type {boolean}
   */
  export let range = false

  /**
   * Hide the dropdown when date is selected.
   * @type {boolean}
   */
  export let hideOnSelect = false

  /**
   * Get the real formatter. If has `formatter` prop
   * @param {Date | null} d
   */
  const innerFormattor = d => {
    if (!d) return ''
    return formatter ? formatter(d, format) : dayjs(d).format(format)
  }

  const recomputeFormattedValue = () => {
    formattedValue = innerFormattor(value)
  }

  const recomputeFormattedRangeValue = () => {
    const [start, end] = rangeValue
    formattedRangeValue = [innerFormattor(start), innerFormattor(end)]
  }

  $: value, recomputeFormattedValue()

  $: rangeValue, recomputeFormattedRangeValue()

  let show = false

  let displayValue = ''

  const getDisplayValue = () => {
    if (range) {
      const [start, end] = formattedRangeValue

      if (!start && !end) return ''
      displayValue = `${start} - ${end}`
    }
    displayValue = formattedValue
  }

  $: {
    range
    value
    rangeValue
    getDisplayValue()
  }

  const initialUnit = unit

  let year = value ? value.getFullYear() : new Date().getFullYear()
  let month = value ? value.getMonth() : new Date().getMonth()

  /**
   * @type {[number, number]}
   */
  let yearRange = [year, year + 11]

  /**
   * @type {HTMLDivElement}
   */
  let datePickerDontainer

  const onDateSet = () => {
    if (hideOnSelect) {
      show = false
    }
  }

  const contextSize = useSize(size)

  const onClear = () => {
    value = null
    rangeValue = [null, null]
  }

  /**
   * @param {'day' | 'month' | 'year'} newUnit
   */
  const updateUnit = newUnit => {
    if (newUnit === 'day') {
      if (initialUnit !== 'day') {
        return
      }
    }
    unit = newUnit
  }

  /**
   * @param {Date} newDate
   */
  const onMonthChange = newDate => {
    month = newDate.getMonth()
    updateUnit('day')
  }

  let flyConfig = {
    duration: 300,
    easing: cubicInOut,
  }
</script>

<div
  bind:this={datePickerDontainer}
  class={clsx(
    `c-date-picker c-font-${$contextSize} c-date-picker--size-${$contextSize}`,
    disabled && 'c-date-picker--diabled'
  )}
>
  <CDropdown bind:show widthWithinParent={false} {disabled}>
    <CInput
      value={displayValue}
      {disabled}
      readonly
      {placeholder}
      clearable
      validateTrigger="manual"
      on:clear={onClear}
    />
    <svelte:fragment slot="drop-content">
      <CDatePickerHeader
        bind:year
        bind:month
        bind:yearRange
        bind:unit
        unitSwitchable={!range}
      />
      <div
        class={`c-date-picker--panel-wrapper c-px-${$contextSize} c-pb-${$contextSize}`}
      >
        {#if unit === 'day'}
          <CDatePanel
            bind:value
            bind:rangeValue
            {formattedRangeValue}
            {range}
            {year}
            {month}
            formattor={innerFormattor}
          />
        {:else if unit === 'month'}
          <CMonthPanel
            bind:value
            {initialUnit}
            {year}
            on:month-change={e => onMonthChange(e.detail)}
          />
        {/if}
      </div>
    </svelte:fragment>
  </CDropdown>
</div>
