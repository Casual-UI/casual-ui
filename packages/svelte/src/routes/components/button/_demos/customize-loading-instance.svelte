<script lang="ts">
  import { CLoadingBar, CButton, CLoadingHourglass } from 'casual-ui-svelte'
</script>

<CButton loading label="Loading...">
  <CLoadingHourglass slot="loading" />
</CButton>
<CButton loading label="Loading..." theme="secondary">
  <CLoadingBar slot="loading" />
</CButton>
