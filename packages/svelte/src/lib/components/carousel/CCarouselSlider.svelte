<script>
  import { getContext, onDestroy } from 'svelte'
  import { linear } from 'svelte/easing'
  import {
    activeIndexKey,
    directionKey,
    hoveringKey,
    intervalKey,
    pausesKey,
    resumesKey,
    slideringKey,
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
  const hovering = getContext(hoveringKey)
  const slidering = getContext(slideringKey)

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

  let start = Date.now()

  let remain = $interval

  const onIntroStart = () => {
    $slidering = true
    remain = $interval
  }

  const onIntroEnd = () => {
    $slidering = false
    remain = $interval
    if ($interval && toNext && !$hovering) {
      start = Date.now()
      if ($timeoutFlag) {
        clearTimeout($timeoutFlag)
      }
      $timeoutFlag = setTimeout(toNext, remain)
    }
  }

  /**
   * @type {Array<() => void>}
   */
  const pauses = getContext(pausesKey)

  /**
   * @type {Array<() => void>}
   */
  const resumes = getContext(resumesKey)

  const pause = () => {
    if ($activeIndex !== currentIndex) return
    if ($timeoutFlag) {
      clearTimeout($timeoutFlag)
      remain = $interval - (Date.now() - start)
    }
  }

  if (pauses && Array.isArray(pauses)) {
    pauses.push(pause)
  }

  const resume = () => {
    if ($activeIndex !== currentIndex) return
    if (remain < 4) return
    if (remain === $interval) {
      start = Date.now()
    }
    $timeoutFlag = setTimeout(toNext, remain)
  }

  if (resumes && Array.isArray(resumes)) {
    resumes.push(resume)
  }

  onDestroy(() => {
    if ($timeoutFlag) {
      clearTimeout($timeoutFlag)
    }
    pauses.splice(
      pauses.findIndex(p => p === pause),
      1
    )
    resumes.splice(
      resumes.findIndex(r => r === resume),
      1
    )
  })
</script>

{#if currentIndex === $activeIndex}
  <div
    class="c-carousel--slider-item"
    in:carousel
    out:carousel={{ leave: true }}
    on:introstart={onIntroStart}
    on:introend={onIntroEnd}
  >
    <slot />
  </div>
{/if}
