<script lang="ts">
  import { session } from '$app/stores'
  import Link from './Link.svelte'

  $: sessionData = $session as any

  let scrollY: number

  let activeId = ''

  $: {
    scrollY
    computeActiveId()
  }

  function computeActiveId() {
    // TODO: compute the active id then show the active bar
  }
</script>

<svelte:window bind:scrollY />

{#if sessionData.demos}
  <ul m-o p-0 list-none fs-14 leading-7 border-l border-e9e9e9 relative>
    <li font-bold pl-4>On this page</li>
    {#each sessionData.demos as demo}
      <li pl-4>
        <Link to={`#${demo.name}`} computeActiveByPageUrl={false}>
          <div>
            {demo.title}
          </div>
        </Link>
      </li>
    {/each}
  </ul>
{/if}
