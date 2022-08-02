<script>
  import useSize from '$lib/hooks/useSize'
  import useTheme from '$lib/hooks/useTheme'
  import clsx from '$lib/utils/clsx'
  import { createEventDispatcher } from 'svelte'

  /**
   * The text content of the tag
   * @type {string}
   */
  export let label = ''

  /**
   * The color theme of tag
   * @type {'primary' | 'secondary' | 'warning' | 'negative'}
   */
  export let theme = 'primary'

  /**
   * The size of tag. Notice that default value is `'md'` not `undefined`
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * Determine whether the tag has a rounded border or not
   * @type {boolean}
   */
  export let rounded = false

  /**
   * If set to `true`. The tag will have a close icon which can be clicked an emit `close` event
   * @type {boolean}
   */
  export let closeable = false

  $: contextTheme = useTheme(theme)
  $: contextSize = useSize(size)

  const dispatch = createEventDispatcher()

  const onClose = () => {
    /**
     * Emit when the close icon clicked
     */
    dispatch('close')
  }
</script>

<div
  class={clsx(
    'c-tag',
    `c-tag--theme-${$contextTheme}`,
    `c-h-${$contextSize}`,
    `c-font-${$contextSize}`,
    `c-px-${$contextSize}`,
    rounded && `c-rounded-${$contextSize}`
  )}
>
  <div class="c-tag--prefix">
    <!-- Customize prefix content -->
    <slot name="prefix" />
  </div>
  <div class="c-tag--label">
    {label}
  </div>
  {#if closeable}
    <div class="c-tag--close-icon c-ml-xs" on:click|stopPropagation={onClose}>
      <div class="c-icon" i-carbon-close />
    </div>
  {/if}
</div>
