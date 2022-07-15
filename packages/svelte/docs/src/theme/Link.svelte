<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { attributeAtom } from '$theme/utils/attributeAtom'

  export let label = ''
  export let to = '/'
  export let external = false
  export let hideExternalIcon = false
  export let customClass = ''
  /**
   * Whehter compare $page with to prop
   */
  export let computeActiveByPageUrl = true

  const onClick = () => {
    if (external) {
      window.open(to, '_blank')
      return
    }
    goto(to)
  }
</script>

<div
  cursor-pointer
  inline-flex
  items-center
  {...attributeAtom($$restProps)}
  hover="opacity-60"
  {...attributeAtom({
    'text-primary': computeActiveByPageUrl && $page.url.href.includes(to),
  })}
  on:click={onClick}
  class={customClass}
>
  <div flex items-center>
    <slot>{label}</slot>
  </div>
  {#if external && !hideExternalIcon}
    <div i-eva-external-link-outline />
  {/if}
</div>
