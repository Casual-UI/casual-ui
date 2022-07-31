<script>
  import clsx from '$lib/utils/clsx'

  import { createEventDispatcher } from 'svelte'
  import { cubicInOut } from 'svelte/easing'
  import { fly } from 'svelte/transition'

  /**
   * @type {any[]}
   */
  export let items = []

  /**
   * @type {(item: any) => boolean}
   */
  export let isActive

  /**
   * @type {boolean}
   */
  export let reverseTransition = false

  /**
   * @type {(item: any) => string}
   */
  export let displayFormattor = item => item

  const dispatch = createEventDispatcher()
</script>

<div
  transition:fly={{
    duration: 300,
    easing: cubicInOut,
    x: reverseTransition ? 100 : -100,
  }}
  class="c-date-picker--panel"
>
  <div class="c-date-picker--panel-body c-grid c-grid-col-4 c-grid-row-3">
    {#each items as item}
      <div
        class={clsx(
          `c-date-picker--panel-cell`,
          isActive(item) && 'c-date-picker--panel-cell--is-selected'
        )}
        on:click|stopPropagation={() => dispatch('item-click', item)}
      >
        <div class="c-date-picker--panel-cell--inner">
          {displayFormattor(item)}
        </div>
      </div>
    {/each}
  </div>
</div>
