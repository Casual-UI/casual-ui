<script lang="ts">
  import { goto } from '$app/navigation'
  import { attributeAtom } from '$theme/utils/attributeAtom'

  export let title = ''
  export let page = ''
  export let link = ''

  export let direction: 'left' | 'right' = 'left'
</script>

<div
  on:click={() => goto(link)}
  cursor-pointer
  select-none
  py-4
  px-6
  border-e9e9e9
  border-1
  rounded-2
  hover:border-primary
  transition
  transition-all
  {...attributeAtom($$restProps)}
>
  <div text-t-2 text-3>
    {title}
  </div>
  <div
    flex
    items-center
    text-primary
    fs-14
    mt-2
    {...attributeAtom({
      'justify-end': direction === 'right',
    })}
  >
    {#if direction === 'left'}
      <div i-ph-caret-double-left mr-2 />
    {/if}
    {page}
    {#if direction === 'right'}
      <div ml-2 i-ph-caret-double-right />
    {/if}
  </div>
</div>
