<script lang="ts">
  import { bem } from 'casual-ui-svelte'
  import { attributeAtom } from 'casual-utils'
  import clsx from 'clsx'
  import { onMount } from 'svelte'

  /**
   * The icon at the left of the title
   */
  export let icon = ''
  /**
   * The title of the expansion
   */
  export let title = ''
  /**
   * Determine whether the expansion is expanded or not
   */
  export let expanded = false
  /**
   * 折叠方向是否相反
   */
  export let reverse = false

  let bodyDom: HTMLDivElement
  let initialBodyHeight = 'auto'

  $: realtimeBodyHeigh = expanded ? initialBodyHeight : 0

  const onHeaderClick = () => {
    expanded = !expanded
  }

  const setHeight = () => {}

  let initialExpaned = expanded
  if (!initialExpaned) {
    expanded = true
  }

  onMount(() => {
    initialBodyHeight = `${bodyDom?.clientHeight}px`
    expanded = initialExpaned
  })
</script>

<div
  class={bem('expansion', {
    expanded,
  })}
  style={`--casual-expansion-height:${realtimeBodyHeigh};`}
>
  {#if reverse}
    <div bind:this={bodyDom} class="c-expansion--body">
      <slot {setHeight} />
    </div>
  {/if}
  <div class="c-expansion--header" on:click|stopPropagation={onHeaderClick}>
    {#if icon || $$slots.icon}
      <div class="c-expansion--icon">
        <slot name="icon">
          {icon}
        </slot>
      </div>
    {/if}
    <div class="c-expansion--title">
      <slot name="title">
        {title}
      </slot>
    </div>
    <div
      class={clsx(
        'c-expansion--arrow',
        expanded && 'c-expansion--arrow-expanded'
      )}
    >
      <slot name="arrow">
        <div i-ph-caret-down-light />
      </slot>
    </div>
  </div>
  {#if !reverse}
    <div bind:this={bodyDom} class="c-expansion--body">
      <slot {setHeight} />
    </div>
  {/if}
</div>
