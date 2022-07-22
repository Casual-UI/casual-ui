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
  import Attention from '$theme/Attention.svelte'
  import Link from '$theme/Link.svelte'

  export let sidebar: {
    to: string
    label: string
  }[]

  $: sessionData = $session as any

  $: demos = Array.isArray(sessionData.demos) ? sessionData.demos : []

  let slugNav: SlugNav
</script>

<DocLayout pages={sidebar}>
  <Sidebar slot="left" links={sidebar} />
  <svelte:fragment>
    <Attention mb-8 type="primary" title="Before you read">
      It is worth mentioning that all demos in this documentation using
      <Link
        text-primary
        label="UnoCSS"
        to="https://github.com/unocss/unocss"
        external
      /> for demos' styles.

      <br />
      And
      <Link
        text-primary
        external
        to="https://github.com/unocss/unocss/tree/main/packages/preset-icons/"
        label="UnoCSS preset-icons"
      /> for icons used in demos.
      <br />
      It is recommended to read the relative docs before you start.
    </Attention>
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
