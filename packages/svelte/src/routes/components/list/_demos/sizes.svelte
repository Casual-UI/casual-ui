<script lang="ts">
  import { CRadioGroup, CList } from 'casual-ui-svelte'

  const items = [
    { label: 'Apple', id: 1 },
    { label: 'Banana', id: 2 },
    { label: 'Orange', id: 3 },
    { label: 'Peach', id: 4 },
  ]

  const options = [
    { label: 'xs', value: 'xs' },
    { label: 'sm', value: 'sm' },
    { label: 'md', value: 'md' },
    { label: 'lg', value: 'lg' },
    { label: 'xl', value: 'xl' },
  ]

  let selectedSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
</script>

<CRadioGroup bind:value={selectedSize} {options} />

<CList {items} size={selectedSize} />
