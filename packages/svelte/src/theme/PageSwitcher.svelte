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
  py-2
  px-4
  md:py-4
  md:px-6
  border-e9e9e9
  dark:border-383838
  border-1
  rounded-2
  hover:border-primary
  dark="hover:border-primary"
  transition
  transition-all
  {...attributeAtom($$restProps)}
>
  <div text-t-2 text-3 dark:text-838383>
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
      <div i-ph-caret-double-left mr-1 />
    {/if}
    {page}
    {#if direction === 'right'}
      <div ml-1 i-ph-caret-double-right />
    {/if}
  </div>
</div>
