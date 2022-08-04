<script lang="ts">
  import { CTable } from 'casual-ui-svelte'
  import FruitIcon from './FruitIcon.svelte'

  const columns = [
    {
      title: 'Name',
      field: 'name',
      width: '400px',
      cell: FruitIcon,
    },
    {
      title: 'Description',
      field: 'description',
    },
  ]

  const fruites = [
    { name: 'Apple', description: 'Apple is red' },
    { name: 'Banana', description: 'Banana is yellow' },
    { name: 'Grapes', description: 'Grapes is purple' },
  ]
</script>

<CTable data={fruites} {columns} />
