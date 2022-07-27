<script lang="ts">
  import { CButton, CDropdown } from 'casual-ui-svelte'
</script>

<CDropdown widthWithinParent={false}>
  <CButton label="Here's some trigger content" />
  <div slot="drop-content" p-4 class="custom-width">
    Here's some custom width drop content
  </div>
</CDropdown>

<style>
  .custom-width {
    width: 320px;
  }
</style>
