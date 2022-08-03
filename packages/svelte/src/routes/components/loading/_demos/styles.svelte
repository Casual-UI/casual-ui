<script lang="ts">
  import { CLoading } from 'casual-ui-svelte'
</script>

<div flex gap-4 items-center>
  <CLoading style="font-size: 2em;color: pink;" />
  <CLoading style="font-size: 4em;color: cyan;" thickness={7} />
  <CLoading style="font-size: 8em;color: purple;" thickness={10} />
</div>
