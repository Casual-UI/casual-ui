<script lang="ts">
  import { goto } from '$app/navigation'
  import { attributeAtom } from 'casual-utils'

  export let title = ''
  export let page = ''
  export let link = ''
</script>

<div
  on:click={() => goto(link)}
  cursor-pointer
  select-none
  px-4
  py-2
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
  <div text-primary fs-14 mt-1>
    {page}
  </div>
</div>
