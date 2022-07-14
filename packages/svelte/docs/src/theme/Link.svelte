<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { attributeAtom } from 'casual-utils'

  export let label = ''
  export let to = '/'
  export let external = false
  export let hideExternalIcon = false

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
  inline-block
  inline-flex
  items-center
  {...attributeAtom($$restProps)}
  hover="opacity-60"
  {...attributeAtom({
    'text-primary': $page.url.href.includes(to),
  })}
  on:click={onClick}
>
  <div>
    <slot>{label}</slot>
  </div>
  {#if external && !hideExternalIcon}
    <div i-eva-external-link-outline />
  {/if}
</div>
