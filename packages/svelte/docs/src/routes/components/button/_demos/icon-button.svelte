<script lang="ts">
  import CButton from 'casual-ui-svelte/src/components/CButton.svelte'
</script>

<div>
  <CButton icon style="font-size: 2rem;">
    <div i-carbon-apple />
  </CButton>
  <CButton icon style="font-size: 4rem;" outlined theme="warning">
    <div i-icon-park-outline-banana />
  </CButton>
  <CButton icon style="font-size: 6rem;" theme="negative">
    <div i-icon-park-outline-peach />
  </CButton>
</div>
