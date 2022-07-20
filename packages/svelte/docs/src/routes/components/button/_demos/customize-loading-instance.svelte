<script lang="ts">
  import CButton from 'casual-ui-svelte/src/components/CButton.svelte'
  import CLoadingBar from 'casual-ui-svelte/src/components/loadings/CLoadingBar.svelte'
  import CLoadingHourglass from 'casual-ui-svelte/src/components/loadings/CLoadingHourglass.svelte'
</script>

<CButton loading label="Loading...">
  <CLoadingHourglass slot="loading" />
</CButton>
<CButton loading label="Loading..." theme="secondary">
  <CLoadingBar slot="loading" />
</CButton>
