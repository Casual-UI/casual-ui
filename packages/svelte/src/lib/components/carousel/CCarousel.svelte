<script context="module">
  /**
   * Records the names of this carousel.
   */
  export const slidesKey = Symbol('c-carousel-names')

  /**
   * The current index.
   */
  export const activeIndexKey = Symbol('c-carousel-active-index')

  /**
   * The move direction. Can be `'forward'` or `'backward'`
   */
  export const directionKey = Symbol('c-carousel-direction')
</script>

<script>
  import bem from '$lib/utils/bem'
  import clsx from '$lib/utils/clsx'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import CButton from '../CButton.svelte'

  /**
   * The container height.
   * @type {string}
   */
  export let height = '300px'

  /**
   * The current active slider index (from 0). You can use `bind:activeIndex`.
   * @type {number}
   */
  export let activeIndex = 0

  /**
   * Determine the indicators horizontal position.
   * @type {'start' | 'center' | 'end'}
   */
  export let indicatorsPositionHorizontal = 'end'

  /**
   * Determine the indicators vertical position.
   * @type {'start' | 'center' | 'end'}
   */
  export let indicatorsPositionVertical = 'center'

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

  /**
   * Determine whether the sliders can be infinity loop.
   * @type {boolean}
   */
  export let infinity = false

  const direction = writable('forward')

  const slides = writable([])

  const activeIndexStore = writable(activeIndex)
  setContext(slidesKey, slides)
  setContext(activeIndexKey, activeIndexStore)
  setContext(directionKey, direction)

  /**
   * Goto specific slider
   * @param {number} idx
   */
  const toIndex = idx => {
    if (idx < activeIndex) {
      if (idx >= 0) {
        $direction = 'backward'
        activeIndex = idx
        return
      }
      if (infinity) {
        $direction = 'backward'
        activeIndex = $slides.length - 1
      }
      return
    }
    if (idx > activeIndex) {
      if (idx < $slides.length) {
        $direction = 'forward'
        activeIndex = idx
        return
      }
      if (infinity) {
        $direction = 'forward'
        activeIndex = 0
      }
    }
  }

  /**
   * Go to previous slide. If current is the first slide and `infinity` is `true`. Will goto the last slide.
   */
  const toPrev = () => toIndex(activeIndex - 1)

  /**
   * Go to previous slide. If current is the last and `infinity` is `true`. Will goto the first slide.
   */
  const toNext = () => toIndex(activeIndex + 1)

  $: {
    $activeIndexStore = activeIndex
  }

  export { toPrev, toNext, toIndex }
</script>

<div
  class={bem('carousel', {
    vertical,
  })}
  style={`height: ${height}`}
>
  <div
    class={`c-carousel--indicators c-flex c-items-${indicatorsPositionHorizontal} c-justify-${indicatorsPositionVertical}`}
  >
    <div
      class={`c-carousel--indicators-container c-gutter-sm c-flex c-${indicatorsAlignDirection}`}
    >
      <!--
        Customize the indicators content.

        @param {string[]} names The names array of this carousel.
      -->
      <slot name="indicators">
        {#each $slides as _, i}
          <div>
            <div
              class={clsx(
                `c-carousel--indicator-item`,
                i === activeIndex && 'c-carousel--indicator-item--active'
              )}
              on:click={() => toIndex(i)}
            />
          </div>
        {/each}
      </slot>
    </div>
  </div>

  {#if infinity || activeIndex > 0}
    <div
      class="c-carousel--control c-carousel--control--prev"
      on:click={toPrev}
    >
      <!-- Customize the to previous slider control content -->
      <slot name="control-prev">
        <CButton icon flat>
          <div i-ooui-previous-ltr />
        </CButton>
      </slot>
    </div>
  {/if}

  {#if infinity || activeIndex < $slides.length - 1}
    <div
      class="c-carousel--control c-carousel--control--next"
      on:click={toNext}
    >
      <!-- Customize the to next slider control content -->
      <slot name="control-next">
        <CButton icon flat>
          <div i-ooui-previous-rtl />
        </CButton>
      </slot>
    </div>
  {/if}

  <div class="c-carousel--sliders">
    <!-- The sliders. It is recommended to use [CCarouselSlider](/components/carousel-slider) -->
    <slot />
  </div>
</div>
