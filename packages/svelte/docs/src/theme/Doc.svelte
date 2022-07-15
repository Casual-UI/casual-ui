<script lang="ts">
  import { CExpansion } from '$casual'
  import Link from './Link.svelte'

  export let code: string | undefined = undefined
  export let component: any = undefined
  export let title = ''
  export let id = ''

  let showLink = false
</script>

<div border-e9e9e9 border-1 rounded-2 mb-8 hover:shadow-md>
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
    <CExpansion reverse>
      <div slot="title" fs-14>Expand/Fold Code</div>
      <div>
        {@html code}
      </div>
      <div i-vscode-icons-file-type-svelte slot="icon" />
    </CExpansion>
  {/if}
</div>

<style>
  .casual-doc-item:tar {
  }
</style>
