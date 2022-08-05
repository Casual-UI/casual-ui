<script context="module">
  /**
   * Determien the current active item name.
   */
  export const activeItemKey = Symbol('c-carousel-active-item')

  /**
   * Records the names of this carousel.
   */
  export const namesKey = Symbol('c-carousel-names')
</script>

<script>
  import bem from '$lib/utils/bem'

  import clsx from '$lib/utils/clsx'

  import { setContext } from 'svelte'

  import { writable } from 'svelte/store'

  /**
   * The current active slider name. It is recommended to use `bind:activeName`.
   * @type {string}
   */
  export let activeName = ''

  /**
   * Determine the indicators horizontal position.
   * @type {'start' | 'center' | 'end'}
   */
  export let indicatorsPositionHorizontal = 'center'

  /**
   * Determine the indicators vertical position.
   * @type {'start' | 'center' | 'end'}
   */
  export let indicatorsPositionVertical = 'end'

  /**
   * Determine the idicators align direction.
   *
   * This prop use [CSS `flex-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
   * @type {'row' | 'row-reverse' | 'column' | 'column-reverse'}
   */
  export let indicatorsAlignDirection = 'row'

  /**
   * Determine whether the transition direction is vertical or not.
   * @type {boolean}
   */
  export let vertical = false

  const contextActiveName = writable(activeName)

  const contextNames = writable([])

  setContext(activeItemKey, contextActiveName)

  $: {
    $contextActiveName = activeName
  }
</script>

<div
  class={bem('carousel', {
    vertical,
  })}
>
  <div
    class={`c-carousel--indicators c-flex c-items-${indicatorsPositionHorizontal} c-justify-${indicatorsPositionVertical}`}
  >
    <div
      class={`c-carousel--indicators-container c-flex c-${indicatorsAlignDirection}`}
    >
      <!--
        Customize the indicators content.

        @param {string[]} names The names array of this carousel.
      -->
      <slot name="indicators" names={$contextNames}>
        {#each $contextNames as name}
          <div
            class={clsx(
              `c-carousel--indicator-item`,
              activeName === name && 'c-carousel--indicator-item--active'
            )}
          />
        {/each}
      </slot>
    </div>
  </div>

  <div class="c-carousel--control-prev">
    <!-- Customize the to previous slider control content -->
    <slot name="control-prev">
      <div i-ooui-previous-ltr />
    </slot>
  </div>

  <div class="c-carousel--control-next">
    <!-- Customize the to next slider control content -->
    <slot name="control-next">
      <div i-ooui-previous-rtl />
    </slot>
  </div>

  <div class="c-carousel--sliders">
    <!-- The sliders. It is recommended to use [CCarouselSlider](/components/carousel-slider) -->
    <slot />
  </div>
</div>
