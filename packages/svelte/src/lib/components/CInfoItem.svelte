<script>
  import { useSizeWithoutChangeParent } from '$lib/hooks/useSize'

  /**
   * The title of the item.
   * @type {string}
   */
  export let title = ''

  /**
   * The subtitle of the item.
   * @type {string}
   */
  export let subtitle = ''

  /**
   * The vertical align method. Base on the [CSS `align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
   * @type {'start' | 'center' | 'end'}
   */
  export let align = 'center'

  /**
   * The icon and title vertical align method. Also based on the [CSS `align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
   * @type {'start' | 'center' | 'end'}
   */
  export let iconAlign = 'center'

  /**
   * The size of item.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  const contextSize = useSizeWithoutChangeParent(size)
</script>

<div class={`c-info-item c-flex cjustify-between c-items-${align}`}>
  <div class={`c-flex c-flex-grow c-items-${iconAlign}`}>
    <div class={`c-mr-${$contextSize}`}>
      <!-- The icon content -->
      <slot name="icon" />
    </div>
    <div class="c-flex-grow">
      <!-- Customize title content. Notice that this slot would override the `title` prop -->
      <slot name="title">
        <div class="c-info-item--title">
          {title}
        </div>
      </slot>
      <!-- Customize subtitle content. Notice that this slot would override the `subtitle` prop -->
      <slot name="subtitle">
        <div class="c-info-item--subtitle c-mt-sm">
          {subtitle}
        </div>
      </slot>
    </div>
  </div>
  <slot name="append" />
</div>
