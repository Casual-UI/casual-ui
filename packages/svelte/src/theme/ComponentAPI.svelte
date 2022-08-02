<script lang="ts">
  import Doc from '$theme/Doc.svelte'
  import type { SvelteComponentDoc } from 'sveltedoc-parser'
  import ApiList from './APIList.svelte'
  import Description from './Description.svelte'
  import InlineCode from './InlineCode.svelte'
  import VariableName from './VariableName.svelte'

  export let api: SvelteComponentDoc

  $: propId = `${api.name} Props`
  $: eventId = `${api.name} Events`
  $: slotsId = `${api.name} Slots`
</script>

<ApiList title={propId} id="props" apiList={api.data} />
<ApiList title={eventId} id="props" apiList={api.events} />
<ApiList title={slotsId} id="props" apiList={api.slots} isSlot />
