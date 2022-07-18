<script lang="ts">
  import Doc from '$theme/Doc.svelte'
  import Link from '$theme/Link.svelte'
  import type { SvelteComponentDoc } from 'sveltedoc-parser'
  import InlineCode from './InlineCode.svelte'

  export let api: SvelteComponentDoc

  $: propId = `${api.name} Props`
  $: eventId = `${api.name} Events`
  $: slotsId = `${api.name} Slots`

  console.log(api)
</script>

<Doc title={propId} id="props">
  {#if api.data?.length}
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
  {:else}
    No data
  {/if}
</Doc>

<Doc title={eventId} id="events">
  {#if api.events?.length}
    <ul m-0 fs-14>
      {#each api.events as { name, description }}
        <li>
          <span bg-primary bg-opacity-20 rounded-1 px-2 py-1>{name}</span>
          <p text-t-2>
            {description}
          </p>
        </li>
      {/each}
    </ul>
  {:else}
    <div text-t-2 px-4 pb-4>No data</div>
  {/if}
</Doc>

<Doc title={slotsId} id="slots" mb-16>
  {#if api.slots?.length}
    <ul m-0 fs-14>
      {#each api.slots as { name, description }}
        <li>
          <span bg-primary bg-opacity-20 rounded-1 px-2 py-1>{name}</span>
          <p text-t-2>
            {description}
          </p>
        </li>
      {/each}
    </ul>
  {:else}
    <div text-t-2 px-4 pb-4>No data</div>
  {/if}
</Doc>
