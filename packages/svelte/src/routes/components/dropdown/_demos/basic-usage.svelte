<script lang="ts">
  import { CButton, CDropdown } from 'casual-ui-svelte'
</script>

<CDropdown>
  <CButton label="Here's some trigger content" />
  <div slot="drop-content" p-4>Here's some drop content</div>
</CDropdown>
