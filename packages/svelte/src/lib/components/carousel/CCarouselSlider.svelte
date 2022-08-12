<script>
  import { getContext } from 'svelte'
  import { linear } from 'svelte/easing'
  import {
    activeIndexKey,
    directionKey,
    intervalKey,
    slidesKey,
    timeoutKey,
    toNextKey,
    verticalKey,
  } from './CCarousel.svelte'

  const slides = getContext(slidesKey)
  const direction = getContext(directionKey)
  const activeIndex = getContext(activeIndexKey)
  const vertical = getContext(verticalKey)
  const interval = getContext(intervalKey)
  const toNext = getContext(toNextKey)
  const timeoutFlag = getContext(timeoutKey)
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
        return `transform: translate${$vertical ? 'Y' : 'X'}(${x}%);`
      },
    }
  }

  let timeout = Date.now()

  const onIntroEnd = () => {
    if ($interval && toNext) {
      if ($timeoutFlag) {
        clearTimeout($timeoutFlag)
      }
      timeout = Date.now()
      $timeoutFlag = setTimeout(toNext, $interval)
    }
  }

  const onHover = () => {
    if ($timeoutFlag) {
      timeout = Date.now() - timeout
      clearTimeout($timeoutFlag)
    }
  }

  const onLeave = () => {
    $timeoutFlag = setTimeout(toNext, $interval - timeout)
  }
</script>

{#if currentIndex === $activeIndex}
  <div
    class="c-carousel--slider-item"
    in:carousel
    out:carousel={{ leave: true }}
    on:introend={onIntroEnd}
    on:mouseenter={onHover}
    on:mouseleave={onLeave}
  >
    <slot />
  </div>
{/if}
