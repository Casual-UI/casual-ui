<script>
  import { useValidator } from '$lib/hooks/useForm'
  import useSize from '$lib/hooks/useSize'
  import clsx from '$lib/utils/clsx'

  /**
   * The radio selected status. It is recommended to use `bind:value`.
   * @type {boolean | string | number}
   */
  export let value = false

  /**
   * The selected value.
   * @type {boolean | string | number}
   */
  export let selectedValue = true

  /**
   * The label text.
   * @type {string}
   */
  export let label = ''

  /**
   * The size of radio. Notice that the default value is `'md'` instead of `undefined`
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * Determine whether the radio is disabled or not.
   */
  export let disabled = false

  $: contextSize = useSize(size)

  const { hasError, validateCurrent, clearCurrent } = useValidator()

  const onClick = () => {
    if (disabled || value === selectedValue) return
    value = selectedValue
  }
</script>

<div
  class={clsx(
    `c-radio c-font-${$contextSize} c-h-${$contextSize} c-radio--size-${$contextSize}`,
    value === selectedValue && 'c-radio--selected',
    disabled && 'c-radio--disabled',
    $hasError && 'c-radio--has-error'
  )}
  on:click={onClick}
>
  <svg
    class="c-radio--circle-wrapper"
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      d="M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
    />
    <path
      class="c-radio--inner-circle"
      d="M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
    />
  </svg>
  <div class="c-radio--label">
    {label}
  </div>
</div>
