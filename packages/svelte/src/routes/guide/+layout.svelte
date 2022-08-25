<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import DocLayout from '$theme/DocLayout.svelte'
  import Sidebar from '$theme/Sidebar.svelte'
  import SlugNav from '$theme/SlugNav.svelte'
  import { session } from '$app/stores'

  $: anchors = ($session as any).anchors || []
  export let sidebar: any = []
</script>

<DocLayout pages={sidebar}>
  <Sidebar slot="left" links={sidebar} />
  <slot />

  <SlugNav slot="right" addtionItems={anchors} />
</DocLayout>
