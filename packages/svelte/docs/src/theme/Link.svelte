<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { attributeAtom } from '$theme/utils/attributeAtom'

  export let label = ''
  export let to = '/'
  export let external = false
  export let hideExternalIcon = false
  export let customClass = ''

  const onClick = () => {
    if (external) {
      window.open(to, '_blank')
      return
    }
    // if (to.startsWith('#')) {
    //   const target: any = document.querySelector(to)
    //   if (!target) return
    //   window.scrollTo(0, (target.offsetTop as number) - 90)
    //   return
    // }
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
    'text-primary': $page.url.href.includes(to),
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
