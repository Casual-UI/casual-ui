<script lang="ts">
  import { useSize, bem } from 'casual-ui-svelte'
  import type { CSize, CTheme } from 'casual-types'
  import clsx from 'clsx'
  import { attributeAtom } from 'casual-utils'
  import { createEventDispatcher } from 'svelte'
  import CLoading from './CLoading.svelte'

  /**
   * The text of the button. You can also use the default slot to cover this prop
   */
  export let label = ''
  /**
   * Determine button use outlined style or not.
   */
  export let outlined = false

  /**
   * Determine the button has a rounded border or not
   */
  export let rounded = false

  /**
   * Determine the button is disalbed or not.
   */
  export let disabled = false

  /**
   * The size of the button.
   */
  export let size: CSize | undefined = undefined

  /**
   * Determine the button has a half circle round border or not.
   */
  export let round = false

  /**
   * Determine the button take up full width or not.
   */
  export let block = false

  /**
   * Determine the button is in loading state or not.
   */
  export let loading = false

  /**
   * Determine the button show as a icon button, a full circle style.
   */
  export let icon = false

  /**
   * The color theme of the button.
   */
  export let theme: CTheme = 'primary'

  $: realSize = useSize(size)

  const dispatch = createEventDispatcher()
</script>

<button
  class={`${bem('button', {
    round,
    outlined,
    disabled,
    loading,
    block,
    icon,
  })} ${clsx(
    `c-button--theme-${theme}`,
    rounded && `c-rounded-${realSize}`,
    `c-font-${realSize}`,
    `c-h-${realSize}`,
    `c-px-${realSize}`
  )}`}
  {disabled}
  {...attributeAtom($$restProps)}
  on:click={() => dispatch('click')}
>
  <div class="c-button--content-wrapper">
    <slot>
      {label}
    </slot>
    {#if loading}
      <span>&nbsp;</span>
      <slot name="loading">
        <CLoading />
      </slot>
    {/if}
  </div>
</button>
