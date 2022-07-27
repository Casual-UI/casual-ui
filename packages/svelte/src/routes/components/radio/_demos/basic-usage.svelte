<script lang="ts">
  import { CRadio } from 'casual-ui-svelte'

  let gender = ''
</script>

<CRadio bind:value={gender} label="Male" selectedValue="male" />
<CRadio bind:value={gender} label="Female" selectedValue="female" />
