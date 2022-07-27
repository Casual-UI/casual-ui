<script>
  import useSize from '$lib/hooks/useSize'
  import bem from '$lib/utils/bem'
  import clsx from '$lib/utils/clsx'
  import { createEventDispatcher } from 'svelte'
  import CItem from './CItem.svelte'

  /**
   * The list items data.
   * @type {any[]}
   */
  export let items = []

  /**
   * Determine wether item in list is clickable or not.
   * @type {boolean}
   */
  export let clickable = false

  /**
   * The size of list.
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * The function that compute the active status of item.
   * @type {(item: any) => boolean=}
   */
  export let activeFn = undefined

  /**
   * Determine wether there is a divider between every item.
   * @type {boolean}
   */
  export let divider = false

  const dispatch = createEventDispatcher()

  $: contextSize = useSize(size)

  /**
   *
   * @param {*} item
   */
  const onItemClick = item => {
    dispatch('item-click', item)
  }
</script>

<div
  class={bem('list', {
    withDivider: divider,
  })}
>
  {#if !items || items.length === 0}
    <slot name="empty">
      <div class={`c-list--empty c-px-${$contextSize}`}>No Data</div>
    </slot>
  {:else}
    {#each items as item}
      <CItem
        {clickable}
        active={activeFn && activeFn(item)}
        on:click={() => onItemClick(item)}
      >
        <slot
          name="item"
          itemObj={item}
          iisClickable={clickable}
          isActive={activeFn && activeFn(item)}
        >
          {item.label}
        </slot>
      </CItem>
    {/each}
  {/if}
</div>
