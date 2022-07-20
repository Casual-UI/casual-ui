<script>
  import clsx from '../utils/clsx'
  import bem from '../utils/bem'
  import { createEventDispatcher, onMount, tick } from 'svelte'
  import { slide } from 'svelte/transition'

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
   * Custom header style
   * @type {string}
   */
  export let headerStyle = ''

  /**
   * The panel body dom
   * @type {HTMLDivElement}
   */
  let bodyDom

  const dispatch = createEventDispatcher()

  function onHeaderClick() {
    expanded = !expanded
  }

  function onTransitionEnd() {
    /**
     * Dispatch when the toggle transition end
     */
    dispatch('toggled')
  }

  onMount(() => {
    tick().then(() => {
      /**
       * Emit when the initial height compute is done
       */
      dispatch('ready')
    })
  })

  const resetHeight = () => {}
</script>

<div
  class={bem('expansion', {
    expanded,
  })}
>
  {#if reverse && expanded}
    <div
      transition:slide
      on:introend={onTransitionEnd}
      on:outroend={onTransitionEnd}
      bind:this={bodyDom}
      class="c-expansion--body"
    >
      <!-- Expansion body content -->
      <slot {resetHeight} />
    </div>
  {/if}
  <!-- The header click function, emit the expand status exchange -->
  <div
    class="c-expansion--header"
    style={headerStyle}
    on:click|stopPropagation={onHeaderClick}
  >
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
  {#if !reverse && expanded}
    <div
      on:introend={onTransitionEnd}
      on:outroend={onTransitionEnd}
      bind:this={bodyDom}
      class="c-expansion--body"
    >
      <!--  Expansion body content -->
      <slot {resetHeight} />
    </div>
  {/if}
</div>
