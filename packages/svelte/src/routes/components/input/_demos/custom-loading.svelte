<script lang="ts">
  import { CLoadingWifi, CInput, CLoadingBars } from 'casual-ui-svelte'

  let value = ''
</script>

<CInput {value} placeholder="Custom loading" loading>
  <CLoadingWifi slot="loading" />
</CInput>

<CInput {value} placeholder="Custom loading" loading>
  <CLoadingBars slot="loading" />
</CInput>
