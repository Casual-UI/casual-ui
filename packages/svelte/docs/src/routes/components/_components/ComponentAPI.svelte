<script lang="ts">
  import Doc from '$theme/Doc.svelte'
  import Link from '$theme/Link.svelte'
  import type { SvelteComponentDoc } from 'sveltedoc-parser'
  import InlineCode from './InlineCode.svelte'

  export let api: SvelteComponentDoc

  $: propId = `${api.name} Props`
</script>

{#if api.data?.length}
  <Doc title={propId} id="props">
    <ul m-0 fs-14>
      {#each api.data as { defaultValue, name, type, description }}
        <li>
          <span bg-primary bg-opacity-20 rounded-1 px-2 py-1>{name}</span>
          <InlineCode>
            {type?.text}
          </InlineCode>
          <span>default: <InlineCode>{defaultValue}</InlineCode></span>
          <p text-t-2>
            {description}
          </p>
        </li>
      {/each}
    </ul>
  </Doc>
{/if}
