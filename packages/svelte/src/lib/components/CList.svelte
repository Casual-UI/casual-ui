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
   * Determine whether item in list is clickable or not.
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
   * Determine whether there is a divider between every item.
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
    <!-- Customize the empty content -->
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
        <!-- 
          Customize item 
          @param {any} itemObj the item obj that holds the whole item data.
          @param {boolean} isClickable Determine whether the item is clickable or not.
          @param {boolean} isActive Determine whether the item is active or not.
        -->
        <slot
          name="item"
          itemObj={item}
          isClickable={clickable}
          isActive={activeFn && activeFn(item)}
        >
          {item.label}
        </slot>
      </CItem>
    {/each}
  {/if}
</div>
