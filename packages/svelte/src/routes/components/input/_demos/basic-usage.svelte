<script lang="ts">
  import { CInput } from 'casual-ui-svelte'

  let value = ''
</script>

<div mb-4><b>Normal Input</b></div>
<CInput {value} placeholder="Enter something" />

<div my-4><b>Rounded Input</b></div>
<CInput rounded {value} placeholder="Enter something" />
