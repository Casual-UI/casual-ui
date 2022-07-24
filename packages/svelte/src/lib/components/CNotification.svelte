<script>
  import {
    notifications,
    closeByPositionGroupAndID,
  } from '$lib/hooks/useNotification'
  import CPopup from './CPopup.svelte'
  import { circOut, cubicInOut, linear } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  /**
   * @type {(...parmas: any) => any}
   */
  const notification = (node, params, intro) => {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform
    return {
      duration: 300,
      easing: circOut,
      // @ts-ignore
      css: t => `
        transform: ${transform} translateX(${100 - t * 100}px);
        opacity: ${t};
      `,
    }
  }

  const [send, receive] = crossfade({
    duration: 300,
    easing: circOut,
    fallback: notification,
  })

  /**
   * @type {import('svelte/transition').slide}
   */
  const countDownBar = (node, params) => ({
    duration: params ? params.duration || 3000 : 3000,
    easing: linear,
    css: t => `
      stroke-dashoffset: ${0 - 63 * t};
    `,
  })
</script>

{#each Object.entries($notifications) as [groupName, { x, y, items }] (groupName)}
  <CPopup
    horizontalAlign={x}
    verticalAlign={y}
    customClass="c-popup--notification c-notification"
  >
    <div class="c-notification--item-list">
      {#each items as item (item.id)}
        <div
          animate:flip={{ duration: 300, easing: cubicInOut }}
          in:receive={{ key: item.id }}
          out:send={{ key: item.id }}
          class={`c-notification--item-card c-notification--item-theme-${item.theme}`}
        >
          <div class="c-notification--header">
            <div class="c-notification--title">
              {item.title}
            </div>
            {#if item.closeIcon}
              <div
                class="c-notification--close-icon"
                on:click={() => closeByPositionGroupAndID(groupName, item.id)}
              >
                <svg class="c-notification--countdown-bar" viewBox="0 0 24 24">
                  {#if item.timeout && item.timeout > 0}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="transparent"
                      class="c-notification--countdown-bar-circle c-notification--countdown-bar-circle-with-initial-state"
                      in:countDownBar={{ duration: item.timeout }}
                    />
                  {/if}
                </svg>
                <div
                  i-majesticons-close
                  class="c-notification--close-icon-icon"
                />
              </div>
            {/if}
          </div>
          <div class="c-notification--message">
            {item.message}
          </div>
        </div>
      {/each}
    </div>
  </CPopup>
{/each}
