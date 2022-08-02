<script lang="ts">
  import type { SvelteComponentDoc } from 'sveltedoc-parser'
  import ApiList from './APIList.svelte'

  export let api: SvelteComponentDoc

  $: propId = `${api.name} Props`
  $: eventId = `${api.name} Events`
  $: slotsId = `${api.name} Slots`
  $: exportName = `${api.name} Exports`

  $: exprotsList = api.data?.filter(d => d.kind === 'const') || []

  $: propList = api.data?.filter(d => d.kind === 'let') || []
</script>

<ApiList title={propId} id="props" apiList={propList} isProp />
<ApiList title={eventId} id="events" apiList={api.events} />
<ApiList title={slotsId} id="slots" apiList={api.slots} isSlot />
<ApiList title={exportName} id="exports" apiList={exprotsList} />
