<script lang="ts">
  import { page } from '$app/stores'

  import { CExpansion } from '$lib'
  import CTooltip from '$lib/components/CTooltip.svelte'
  import casualConfig from './casual.config'
  import CopyBtn from './CopyBtn.svelte'
  import Link from './Link.svelte'
  import { attributeAtom } from './utils/attributeAtom'

  export let code = ''
  export let html = ''
  export let component: any = undefined
  export let title = ''
  export let id = ''
  export let hideSandboxIcon = false
  export let hideEditIcon = false

  let showLink = false
</script>

<div
  class="casual-ui-svelte--doc-item"
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
    <Link to={`#${id}`}>
      <div flex items-center>
        {title}
        {#if showLink}
          <div i-eva-link-2-fill ml-2 />
        {/if}
      </div>
    </Link>

    <div class="c-flex c-gutter-x-xs">
      {#if !hideEditIcon}
        <CTooltip content="Edit this demo on github">
          <Link
            slot="trigger"
            to={`https://github.com/Blackman99/casual-ui/edit/main/packages/svelte/src/routes/${$page.routeId}/_demos/${id}.svelte`}
            external
            hideExternalIcon
          >
            <div i-fluent-text-bullet-list-square-edit-20-regular />
          </Link>
        </CTooltip>
      {/if}
      {#if !hideSandboxIcon}
        <CTooltip content="Try on stackbliz playground">
          <Link
            slot="trigger"
            to={casualConfig.sandboxUrl}
            external
            hideExternalIcon
          >
            <div i-heroicons-outline-code text-4 cursor-pointer />
          </Link>
        </CTooltip>
      {/if}
    </div>
  </div>
  {#if component}
    <div p-4 bg-white box-border>
      <svelte:component this={component} />
    </div>
  {/if}
  <!-- The middle content -->
  <slot />
  {#if code}
    <CExpansion
      reverse
      on:toggled
      on:ready
      headerStyle="position: sticky; bottom: 0;"
    >
      <div slot="title" fs-14>Expand/Fold Code</div>
      <CopyBtn {code} fs-14 md:text-4>
        {@html html}
      </CopyBtn>
      <div i-vscode-icons-file-type-svelte slot="icon" />
    </CExpansion>
  {/if}
</div>
