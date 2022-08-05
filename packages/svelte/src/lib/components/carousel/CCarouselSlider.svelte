<script>
  import { getContext } from 'svelte'
  import { activeItemKey } from './CCarousel.svelte'

  /**
   * The identical key of this slider.
   * @type {string}
   */
  export let name

  const contextActiveName = getContext(activeItemKey)
</script>

{#if name === $contextActiveName}
  <div class="c-carousel--slider-item">
    <slot />
  </div>
{/if}
