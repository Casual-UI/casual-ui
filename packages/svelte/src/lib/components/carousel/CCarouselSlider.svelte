<script>
  import { getContext } from 'svelte'
  import { activeIndexKey, slidesKey } from './CCarousel.svelte'

  const slides = getContext(slidesKey)

  const activeIndex = getContext(activeIndexKey)
  const currentIndex = $slides.length

  $slides.push(currentIndex)
  $slides = $slides
  console.log(currentIndex, $slides)
</script>

{#if currentIndex === $activeIndex}
  <div class="c-carousel--slider-item">
    <slot />
  </div>
{/if}
