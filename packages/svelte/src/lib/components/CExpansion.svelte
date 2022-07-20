<script>
  import clsx from '../utils/clsx'
  import bem from '../utils/bem'
  import { createEventDispatcher, onMount, tick } from 'svelte'

  /**
   * The title of the expansion
   * @type {string}
   */
  export let title = ''

  /**
   * Determine whether the expansion is expanded or not
   * @type {boolean}
   */
  export let expanded = false

  /**
   * Determine the expand direction, `false` means down, `true` means up
   * @type {boolean}
   */
  export let reverse = false

  /**
   * The panel body dom
   * @type {HTMLDivElement}
   */
  let bodyDom

  /**
   * The initial height of panel body
   */
  let initialBodyHeight = 'auto'

  /**
   * The real height of panel body
   */
  $: realtimeBodyHeigh = expanded ? initialBodyHeight : 0

  const dispatch = createEventDispatcher()

  function onHeaderClick() {
    expanded = !expanded
    /**
     * Emit when the expand status change
     */
    dispatch('toggle')
  }

  let initialExpaned = expanded
  if (!initialExpaned) {
    expanded = true
  }

  onMount(() => {
    initialBodyHeight = `${bodyDom.clientHeight}px`
    expanded = initialExpaned
    tick().then(() => {
      /**
       * Emit when the initial height compute is done
       */
      dispatch('ready')
    })
  })

  const setHeight = () => {}
</script>

<div
  class={bem('expansion', {
    expanded,
  })}
  style={`--casual-expansion-height:${realtimeBodyHeigh};`}
>
  {#if reverse}
    <div bind:this={bodyDom} class="c-expansion--body">
      <!-- Expansion body content -->
      <slot {setHeight} />
    </div>
  {/if}
  <!-- The header click function, emit the expand status exchange -->
  <div class="c-expansion--header" on:click|stopPropagation={onHeaderClick}>
    {#if $$slots.icon}
      <div class="c-expansion--icon">
        <!-- The content before title -->
        <slot name="icon" />
      </div>
    {/if}
    <div class="c-expansion--title">
      <!-- Customize the title content -->
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
      <!-- Customize the arrow dom -->
      <slot name="arrow">
        <div i-ph-caret-down-light />
      </slot>
    </div>
  </div>
  {#if !reverse}
    <div bind:this={bodyDom} class="c-expansion--body">
      <!--  Expansion body content -->
      <slot {setHeight} />
    </div>
  {/if}
</div>
