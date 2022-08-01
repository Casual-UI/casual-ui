<script>
  import { CInfoItem, CList } from 'casual-ui-svelte'

  let activeFruite = ''

  const items = [
    {
      label: 'Apple',
      description: 'Do you want some apple?',
      icon: 'i-openmoji-red-apple',
    },
    {
      label: 'Banana',
      description: 'How about some banana?',
      icon: 'i-openmoji-banana',
    },
    {
      label: 'Grapes',
      description: 'Would you like some grapes?',
      icon: 'i-openmoji-grapes',
    },
  ]
</script>

<CList
  clickable
  {items}
  activeFn={item => activeFruite === item.label}
  on:item-click={e => (activeFruite = e.detail.label)}
>
  <CInfoItem
    slot="item"
    let:itemObj
    let:isActive
    iconAlign="start"
    title={itemObj.label}
    subtitle={itemObj.description}
  >
    <div slot="icon" {...{ [itemObj.icon]: '' }} text-10 />

    <div slot="append">
      {#if isActive}
        <div text-primary text-8 i-fluent-checkmark-12-filled />
      {/if}
    </div>
  </CInfoItem>
</CList>
