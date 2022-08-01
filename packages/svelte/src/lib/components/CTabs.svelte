<script>
  import useSize from '$lib/hooks/useSize'
  import clsx from '$lib/utils/clsx'
  import { tick } from 'svelte'
  import { flip } from 'svelte/animate'
  import { cubicIn } from 'svelte/easing'
  import { crossfade, fly } from 'svelte/transition'

  /**
   * The items config. If a config don't has `title` prop. Will use `name` as tab title.
   * @type {Array<{ name: string; title?: string; body: import('svelte/types/runtime').ComponentType }>}
   */
  export let items = []

  /**
   * The current active tab name
   * @type {string}
   */
  export let activeItem = ''

  /**
   * The size of tabs. Notice that the default value is `'md'` instead of `undefined`
   * @type {'xs' | 'sm' | 'md' | 'lg' | 'xl'=}
   */
  export let size = undefined

  /**
   * Determien whether the panel body has a padding or not.
   * @type {boolean}
   */
  export let panelPadding = true

  /**
   * Customize the body style.
   * @type {string}
   */
  export let bodyStyle = ''

  const contextSize = useSize(size)

  /**
   * @type {HTMLDivElement}
   */
  let header

  /**
   * @type {any}
   */
  const slots = $$slots

  let activeBarLeft = 0
  let activeBarWidth = 0

  const computeActiveBar = async () => {
    await tick()
    if (!header) return
    /**
     * @type {*}
     */
    const activeItem = header.querySelector('.c-tabs--header-item-active')
    if (!activeItem) return
    activeBarLeft = activeItem.offsetLeft
    activeBarWidth = activeItem.offsetWidth
  }

  $: activeItem, computeActiveBar()

  let reverse = false

  /**
   * @param {{ name: string }} item
   */
  const onHeaderClick = item => {
    const currentIdx = items.findIndex(item2 => item2.name === activeItem)
    const nextIdx = items.findIndex(item2 => item2.name === item.name)
    activeItem = item.name
    reverse = currentIdx > nextIdx
  }

  /**
   * @type {*}
   */
  const tab = () => {
    return {}
  }

  /**
   * @param {*} e
   */
  const onStart = e => {
    e.target.classList.add(
      reverse
        ? 'c-date-panel-reverse-enter-active'
        : 'c-date-panel-enter-active'
    )
  }

  /**
   * @param {*} e
   */
  const onStartEnd = e => {
    e.target.classList.remove(
      reverse
        ? 'c-date-panel-reverse-enter-active'
        : 'c-date-panel-enter-active'
    )
  }

  /**
   * @param {*} e
   */
  const onOutStart = e => {
    e.target.classList.add(
      reverse
        ? 'c-date-panel-reverse-leave-active'
        : 'c-date-panel-leave-active'
    )
  }

  /**
   * @param {*} e
   */
  const onOutEnd = e => {
    e.target.classList.remove(
      reverse
        ? 'c-date-panel-reverse-leave-active'
        : 'c-date-panel-leave-active'
    )
  }
</script>

<div class="c-tabs">
  <div bind:this={header} class="c-tabs--header c-row c-items-center">
    {#each items as item}
      <div
        class={clsx(
          `c-tabs--header-item c-h-${$contextSize} c-font-${$contextSize} c-px-${$contextSize}`,
          activeItem === item.name && 'c-tabs--header-item-active'
        )}
        on:click={() => onHeaderClick(item)}
      >
        {#if slots[`header-${item.name}`]}
          {slots[`header-${item.name}`]}
        {:else}
          <span>
            {item.title ? item.title : item.name}
          </span>
        {/if}
        {#if slots[`icon-${item.name}`]}
          {slots[`icon-${item.name}`]}
        {/if}
      </div>
    {/each}
    <div
      class="c-tabs--header-active-bar"
      style={`left: ${activeBarLeft}px;width: ${activeBarWidth}px;`}
    />
  </div>
  <div
    class={clsx('c-tabs--body', panelPadding && `c-pa-${$contextSize}`)}
    style={bodyStyle}
  >
    {#each items as item (item.name)}
      {#if activeItem === item.name}
        <div
          class="c-tabs--body-item"
          transition:tab
          on:introstart={onStart}
          on:introend={onStartEnd}
          on:outrostart={onOutStart}
          on:outroend={onOutEnd}
        >
          <svelte:component this={item.body} />
        </div>
      {/if}
    {/each}
  </div>
</div>
