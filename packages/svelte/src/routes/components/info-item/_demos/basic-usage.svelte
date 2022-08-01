<script lang="ts">
  import { CInfoItem } from 'casual-ui-svelte'
</script>

<CInfoItem title="Hi, there" subtitle="some description" iconAlign="start">
  <div slot="icon" i-bx-wink-smile text-8 />
  <div slot="append" i-ph-caret-right text-6 />
</CInfoItem>
