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

  /**
   * The vertical context. Determine whether the carousel moving vertical.
   */
  export const verticalKey = Symbol('c-carousel-vertical')

  /**
   * The auto play interval key.
   */
  export const intervalKey = Symbol('c-carousel-interval')

  /**
   * To next function key.
   */
  export const toNextKey = Symbol('c-carousel-to-next')

  /**
   * The timeout flag key.
   */
  export const timeoutKey = Symbol('c-carousel-timeout-flag')
</script>

<script>
  import useContextProp from '$lib/hooks/useContextProp'

  import bem from '$lib/utils/bem'
  import clsx from '$lib/utils/clsx'
  import { setContext } from 'svelte'
  import { cubicInOut } from 'svelte/easing'
  import { writable } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import CButton from '../CButton.svelte'

  /**
   * The container height.
   * @type {string}
   */
  export let height = '300px'

  /**
   * The theme of indicators and arrow controls.
   * @type {'primary' | 'secondary' | 'warning' | 'negative'}
   */
  export let theme = 'primary'

  /**
   * The auto play interval. If it set to a value less than 0. The auto play will be disabled.
   * @type {number}
   */
  export let interval = 0

  /**
   * The current active slider index (from 0). You can use `bind:activeIndex`.
   * @type {number}
   */
  export let activeIndex = 0

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

  /**
   * Determine whether the sliders can be infinity loop.
   * @type {boolean}
   */
  export let infinity = false

  /**
   * Determine the arrow controls shown timing.
   * @type {'always' | 'hover' | 'never'}
   */
  export let arrowTiming = 'always'

  const direction = writable('forward')

  const slides = writable([])

  const activeIndexStore = writable(activeIndex)

  const verticalContext = writable(vertical)

  const intervalContext = writable(interval)

  const timeoutFlag = writable(null)

  setContext(slidesKey, slides)
  setContext(activeIndexKey, activeIndexStore)
  setContext(directionKey, direction)
  setContext(verticalKey, verticalContext)
  setContext(intervalKey, intervalContext)
  setContext(timeoutKey, timeoutFlag)

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

  let showArrow = arrowTiming === 'always'

  const onContainerMouseEnter = () => {
    if (arrowTiming === 'hover') {
      showArrow = true
    }
  }

  const onContainerMouseLeave = () => {
    if (arrowTiming === 'hover') {
      showArrow = false
    }
  }

  setContext(toNextKey, toNext)

  $: {
    $activeIndexStore = activeIndex
  }

  $: {
    $verticalContext = vertical
  }

  export { toPrev, toNext, toIndex }
</script>

<div
  class={bem('carousel', {
    vertical,
  })}
  style={`height: ${height}`}
  on:mouseenter={onContainerMouseEnter}
  on:mouseleave={onContainerMouseLeave}
>
  <div
    class={`c-carousel--indicators c-flex c-items-${indicatorsPositionVertical} c-justify-${indicatorsPositionHorizontal}`}
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
                `c-carousel--indicator-item--${theme}`,
                i === activeIndex && 'c-carousel--indicator-item--active'
              )}
              on:click={() => toIndex(i)}
            />
          </div>
        {/each}
      </slot>
    </div>
  </div>

  {#if showArrow && (infinity || activeIndex > 0)}
    <div
      class="c-carousel--control c-carousel--control--prev"
      transition:fade={{ duration: 300, easing: cubicInOut }}
      on:click={toPrev}
    >
      <!-- Customize the to previous slide control content -->
      <slot name="control-prev">
        <CButton icon flat {theme}>
          <div i-ooui-previous-ltr />
        </CButton>
      </slot>
    </div>
  {/if}

  {#if showArrow && (infinity || activeIndex < $slides.length - 1)}
    <div
      class="c-carousel--control c-carousel--control--next"
      transition:fade={{ duration: 300, easing: cubicInOut }}
      on:click={toNext}
    >
      <!-- Customize the to next slide control content -->
      <slot name="control-next">
        <CButton icon flat {theme}>
          <div i-ooui-previous-rtl />
        </CButton>
      </slot>
    </div>
  {/if}

  <div class="c-carousel--sliders">
    <!-- The slides content. It is recommended to use [CCarouselSlider](/components/carousel-slider) -->
    <slot />
  </div>
</div>
