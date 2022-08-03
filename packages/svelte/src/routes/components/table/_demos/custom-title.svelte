<script lang="ts">
  import { CTable } from 'casual-ui-svelte'
  import CustomTitle from './title-name.svelte'

  const columns = [
    {
      title: CustomTitle,
      field: 'name',
      width: '200px',
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
