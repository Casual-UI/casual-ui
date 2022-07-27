<script lang="ts">
  import { CList } from 'casual-ui-svelte'

  const items = [
    { label: 'Apple', id: 1 },
    { label: 'Banana', id: 2 },
    { label: 'Orange', id: 3 },
    { label: 'Peach', id: 4 },
  ]
</script>

<CList {items} divider />
