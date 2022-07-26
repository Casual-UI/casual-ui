<script lang="ts">
  import { CInput } from 'casual-ui-svelte'

  let value = ''
</script>

<CInput
  {value}
  placeholder="Enter something and see the clear icon"
  clearable
/>
