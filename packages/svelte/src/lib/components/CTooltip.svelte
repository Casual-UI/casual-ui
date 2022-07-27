<script>
  import useClickOutside from '$lib/hooks/useClickOutside'

  import bem from '$lib/utils/bem'
  /**
   * The content text of tooltip
   * @type {string}
   */
  export let content = ''

  /**
   * The tooltip popup position
   * @type {'top-left' | 'top-right' | 'top' | 'left-top' | 'left' | 'left-bttom' | 'bottom-left' | 'bottom' | 'bottom-right' | 'right-top' | 'right' | 'right-bottom'}
   */
  export let position = 'top'

  /**
   * The trigger method
   * @type {'hover' | 'click' | 'manual'}
   */
  export let trigger = 'hover'

  /**
   * Determine the tooltip content is shown or not. Usful when the trigger method is set to 'manual'
   * @type {boolean}
   */
  export let show = false

  const onMouseEnter = () => {
    if (trigger === 'hover') {
      show = true
    }
  }

  const onMouseLeave = () => {
    if (trigger === 'hover') {
      show = false
    }
  }

  const clickOutside = useClickOutside({
    cbInside: () => {
      if (trigger === 'click') {
        show = !show
      }
    },
    cbOutside: () => {
      if (trigger === 'click') {
        show = false
      }
    },
  })
</script>

<div
  class={bem('tooltip', {
    show,
  })}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  use:clickOutside
>
  <div class="c-tooltip--trigger-content">
    <!-- The trigger content -->
    <slot name="trigger" />
  </div>
  <div
    class={`c-tooltip--popper-content-wrapper c-tooltip--position-${position}`}
    on:click|stopPropagation
  >
    <!-- The tooltip content. Notice that this slot will override the content prop -->
    <slot>
      <div class="c-tooltip--popper-content">
        {content}
      </div>
    </slot>
  </div>
</div>
