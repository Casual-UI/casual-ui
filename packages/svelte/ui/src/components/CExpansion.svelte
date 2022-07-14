<script lang="ts">
  import { bem } from 'casual-ui-svelte'
  import { onMount } from 'svelte'

  /**
   * The icon
   */
  export let icon = ''
  export let title = ''
  export let expanded = false

  let bodyDom: HTMLDivElement
  let initialBodyHeight = 'auto'

  $: realtimeBodyHeigh = expanded ? initialBodyHeight : 0

  const onHeaderClick = () => {
    expanded = !expanded
  }

  const setHeight = () => {}

  let initialExpaned = expanded
  if (initialExpaned) {
    expanded = false
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
      class={bem('expansion--arrow', {
        expanded,
      })}
    >
      <slot name="arrow">arrow</slot>
    </div>
  </div>
  <div bind:this={bodyDom} class="c-expansion--body">
    <slot {setHeight} />
  </div>
</div>
