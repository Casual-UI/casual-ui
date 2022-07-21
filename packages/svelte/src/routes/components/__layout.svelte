<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit'
  export async function load({ fetch }: LoadEvent) {
    const res = await fetch('/components.json')

    const props = await res.json()
    return {
      status: res.status,
      props,
    }
  }
</script>

<script lang="ts">
  import Sidebar from '$theme/Sidebar.svelte'
  import { page, session } from '$app/stores'
  import SlugNav from '$theme/SlugNav.svelte'
  import ComponentApi from './_components/ComponentAPI.svelte'
  import Doc from '$theme/Doc.svelte'
  import DocLayout from '$theme/DocLayout.svelte'

  export let sidebar: {
    to: string
    label: string
  }[]

  $: sessionData = $session as any

  $: demos = Array.isArray(sessionData.demos) ? sessionData.demos : []

  let computedTargetPositions: any

  let slugNav: SlugNav
</script>

<DocLayout pages={sidebar}>
  <Sidebar slot="left" links={sidebar} />
  <svelte:fragment>
    <slot />
    {#if demos.length}
      {#each demos as { title, name, comp } (`${$page.routeId}-${name}`)}
        <Doc
          {title}
          component={comp}
          id={name}
          {...sessionData.demosCodeHTML[name]}
          on:ready={() => slugNav?.computedTargetPositions()}
          on:toggled={() => slugNav?.computedTargetPositions()}
        />
      {/each}
    {/if}

    {#if sessionData.componentAPI}
      <ComponentApi api={sessionData.componentAPI} />
    {/if}
  </svelte:fragment>
  <SlugNav bind:this={slugNav} {demos} slot="right" />
</DocLayout>
