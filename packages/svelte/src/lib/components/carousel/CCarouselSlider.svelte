<script>
  import { getContext } from 'svelte'
  import { linear } from 'svelte/easing'
  import { activeIndexKey, directionKey, slidesKey } from './CCarousel.svelte'

  const slides = getContext(slidesKey)
  const direction = getContext(directionKey)
  const activeIndex = getContext(activeIndexKey)
  const currentIndex = $slides.length

  $slides.push(currentIndex)
  $slides = $slides

  /**
   * @param {*} node
   * @param {*} params
   */
  const carousel = (node, params) => {
    const { leave } = params
    return {
      duration: 300,
      easing: linear,
      css: (/** @type {number} */ t) => {
        const isForward = $direction === 'forward'
        /**
         * @type {number | string}
         */
        let x = ''
        if (isForward) {
          if (leave) {
            x = -100 + 100 * t
          } else {
            x = 100 - 100 * t
          }
        } else {
          if (leave) {
            x = 100 - 100 * t
          } else {
            x = -100 + 100 * t
          }
        }
        return `transform: translateX(${x}%);`
      },
    }
  }
</script>

{#if currentIndex === $activeIndex}
  <div
    class="c-carousel--slider-item"
    in:carousel
    out:carousel={{ leave: true }}
  >
    <slot />
  </div>
{/if}
