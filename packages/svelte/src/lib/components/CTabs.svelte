<script>
  import useSize from '$lib/hooks/useSize'
  import clsx from '$lib/utils/clsx'
  import { tick } from 'svelte'
  import { cubicIn, cubicInOut } from 'svelte/easing'

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

  let nextIdx = -1
  let currentIdx = -1

  let reverse = false

  /**
   * @param {{ name: string }} item
   */
  const onHeaderClick = async item => {
    currentIdx = items.findIndex(item2 => item2.name === activeItem)
    nextIdx = items.findIndex(item2 => item2.name === item.name)
    reverse = nextIdx < currentIdx
    activeItem = item.name
  }

  /**
   *
   * @param {*} node
   * @param {*} params
   */
  const tab = (node, { mode, name }) => {
    return {
      easing: cubicInOut,
      duration: 300,
      /**
       * @param {number} t
       */
      css: t => {
        let x
        if (mode === 'in') {
          if (reverse) {
            x = -(100 - 100 * t)
          } else {
            x = 100 - 100 * t
          }
        } else {
          if (!reverse) {
            x = -100 + 100 * t
          } else {
            x = 100 - 100 * t
          }
        }
        if (panelPadding && mode === 'out') {
          node.classList.add(`c-pa-${$contextSize}`)
        }
        return `${
          mode === 'out'
            ? 'position: absolute;top:0;left:0;right:0;bottom:0;'
            : ''
        }transform: translateX(${x}px);opacity:${t};`
      },
    }
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
    {#each items as item, i (item.name)}
      {#if activeItem === item.name}
        <div
          class="c-tabs--body-item"
          in:tab={{
            mode: 'in',
            name: item.name,
          }}
          out:tab={{
            mode: 'out',
            name: item.name,
          }}
        >
          <svelte:component this={item.body} />
        </div>
      {/if}
    {/each}
  </div>
</div>
