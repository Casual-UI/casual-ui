<script lang="ts">
  import { page } from '$app/stores'
  import Doc from './Doc.svelte'
  import ComponentApi from './ComponentAPI.svelte'
  export let demos: any = []
  export let componentAPI: any = {}
  export let demosCodeHTML: any = {}
  export let slugNav: any
</script>

{#if demos.length}
  {#each demos as { title, name, comp, group } (`${$page.routeId}-${name}`)}
    <Doc
      {title}
      component={comp}
      id={name}
      {group}
      {...demosCodeHTML[name]}
      {demosCodeHTML}
      on:ready={() => slugNav?.computedTargetPositions()}
      on:toggled={() => slugNav?.computedTargetPositions()}
    />
  {/each}
{/if}

{#if componentAPI}
  <ComponentApi api={componentAPI} />
{/if}
