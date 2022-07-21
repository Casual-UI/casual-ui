<script>
  import { useHorizontal, useVertical } from '$lib/hooks/usePosition'
  import bem from '$lib/utils/bem'
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { cubicIn, circInOut, cubicOut } from 'svelte/easing'

  /**
   * Determine whether the popup is shown or not
   * @type {boolean}
   */
  export let show = false

  /**
   * Determine the popup horizontal align direction. This prop use the [align-items CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
   *
   * @type {'start' | 'center' | 'end' | undefined}
   */
  export let horizontalAlign = undefined

  /**
   * Determine the popup vertical align direction. This prop use the [justify-content CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
   *
   * @type {'start' | 'center' | 'end' | undefined}
   */
  export let verticalAlign = undefined

  /**
   * Some custom addtional class names
   *
   * @type {string}
   */
  export let customClass = ''

  $: hAlign = useHorizontal(horizontalAlign)
  $: vAlign = useVertical(verticalAlign)

  /**
   * @type {*}
   */
  let popupContainer

  onMount(() => {
    document.body.append(popupContainer)
  })
</script>

<div
  class={`${bem('popup', {
    show,
  })} ${customClass}`}
  bind:this={popupContainer}
>
  {#if show}
    <div transition:fade class="c-popup--backdrop" />
    <div
      out:fade
      in:fly={{
        delay: 250,
        duration: 300,
        y: -50,
        easing: cubicOut,
      }}
      class={`c-popup--content-wrapper c-items-${hAlign} c-justify-${vAlign}`}
    >
      <div class="c-popup--content">
        <!-- The popup content -->
        <slot />
      </div>
    </div>
  {/if}
</div>
