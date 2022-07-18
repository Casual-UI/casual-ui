<script lang="ts">
  import { CExpansion } from '$casual'
  import CopyBtn from './CopyBtn.svelte'
  import Link from './Link.svelte'
  import { attributeAtom } from './utils/attributeAtom'

  export let code = ''
  export let html = ''
  export let component: any = undefined
  export let title = ''
  export let id = ''

  let showLink = false
</script>

<div
  border-e9e9e9
  border-1
  rounded-2
  mb-8
  hover:shadow-md
  {...attributeAtom($$restProps)}
>
  <div {id} relative top--26 />
  <div
    flex
    justify-between
    items-center
    rounded-t-2
    pt-4
    px-4
    text-4
    font-bold
    pb-5
    on:mouseenter={() => (showLink = true)}
    on:mouseleave={() => (showLink = false)}
  >
    <div class="casual-doc-item">
      <Link to={`#${id}`}>
        <div flex items-center>
          {title}
          {#if showLink}
            <div i-eva-link-2-fill ml-2 />
          {/if}
        </div>
      </Link>
    </div>
  </div>
  {#if component}
    <div p-4 bg-white>
      <svelte:component this={component} />
    </div>
  {/if}
  <!-- The middle content -->
  <slot />
  {#if code}
    <CExpansion reverse on:toggle on:ready>
      <div slot="title" fs-14>Expand/Fold Code</div>
      <div relative>
        {@html html}
        <div absolute top-4 right-4>
          <CopyBtn {code} />
        </div>
      </div>
      <div i-vscode-icons-file-type-svelte slot="icon" />
    </CExpansion>
  {/if}
</div>

<style>
  .casual-doc-item:tar {
  }
</style>
