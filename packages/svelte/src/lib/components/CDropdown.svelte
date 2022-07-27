<script>
  import useClickOutside from '$lib/hooks/useClickOutside'
  import clsx from '$lib/utils/clsx'

  /**
   * The dropdown shown status. It is recommended to use `bind:show`.
   * @type {boolean}
   */
  export let show = false

  /**
   * Determine whether the dropdown is disabled or not.
   * @type {boolean}
   */
  export let disabled = false

  /**
   * Does the dropdown content maintain the same width with parent.
   * @type {boolean}
   */
  export let widthWithinParent = true

  /**
   * If set to `true`. Hover parent would not trigger dropdwon show.
   * @type {boolean}
   */
  export let manual = false

  const clickOutside = useClickOutside({
    cbInside: () => {
      if (disabled || manual) return
      show = !show
    },
    cbOutside: () => {
      if (disabled || manual) return
      show = false
    },
  })
</script>

<div use:clickOutside class={clsx('c-dropdown', show && 'c-dropdown--dropped')}>
  <div class="c-dropdown--trigger">
    <!-- The trigger content -->
    <slot />
  </div>
  <div
    class={clsx(
      'c-dropdown--drop-content',
      !widthWithinParent && 'c-dropdown--drop-content-auto-width'
    )}
  >
    <!-- The dropdown content -->
    <slot name="drop-content" />
  </div>
</div>
