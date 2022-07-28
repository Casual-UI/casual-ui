<script>
  import { useValidator } from '$lib/hooks/useForm'

  import { useSizeWithoutChangeParent } from '$lib/hooks/useSize'
  import bem from '$lib/utils/bem'
  import clsx from '$lib/utils/clsx'

  /**
   * Determine whether the checkbox is checked or not. It is recommended to use `bind:value`.
   * @type {boolean | string | number=}
   */
  export let value = undefined

  /**
   * The theme color
   * @type {'primary' | 'secondary' | 'warning' | 'negative'}
   */
  export let theme = 'primary'

  /**
   * The size of checkbox.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = void 0

  /**
   * The text label of checkbox.
   * @type {string}
   */
  export let label = ''

  /**
   * The checked value pass to `value` prop when the checkbox is checked.
   * @type {boolean | string | number}
   */
  export let checkedValue = true

  /**
   * Determine whether the checkbox is disabled or not.
   * @type {boolean}
   */
  export let disabled = false

  $: contextSize = useSizeWithoutChangeParent(size)

  const { hasError } = useValidator()

  const onClick = () => {
    if (disabled) return
    value = value === checkedValue ? void 0 : checkedValue
  }
</script>

<div
  class={clsx(
    bem('checkbox', {
      checked: value === checkedValue,
      disabled,
      hasError: $hasError,
    }),
    `c-checkbox--theme-${theme} c-h-${$contextSize} c-font-${$contextSize}`
  )}
  on:click={onClick}
>
  <svg class="c-checkbox--check-wrapper" viewBox="0 0 24 24" aria-hidden="true">
    <path
      class="c-checkbox--checker"
      fill="none"
      d="M1.73,12.91 8.1,19.28 22.79,4.59"
    />
    <!-- TODO: half checked -->
    <!-- <path d="M4,14H20V10H4"></path> -->
  </svg>
  <div class="c-checkbox--label">
    <!-- Customize some label content. Notice that this slot would override the `label` prop -->
    <slot name="label">
      {label}
    </slot>
  </div>
</div>
