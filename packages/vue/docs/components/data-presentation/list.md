---
title: List
componentPath: list/CList
additionalComponentPaths:
  - name: CItem
    path: list/CItem
  - name: CInfoItem
    path: list/CInfoItem
---

### Basic Usage

```vue live
<script setup>
const items = [
  { label: 'Banana' },
  { label: 'Orange' },
  { label: 'Apple' },
  { label: 'Grapes' },
]
</script>
<template>
  <c-list :items="items" />
</template>
```

### Sizes

```vue live
<script setup>
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const items = [
  { label: 'Banana' },
  { label: 'Orange' },
  { label: 'Apple' },
  { label: 'Grapes' },
]
const size = ref('md')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div
      v-for="s in sizes"
      :key="s"
    >
      <c-radio
        v-model="size"
        :label="s"
        :value="s"
      />
    </div>
  </div>
  <c-list
    :items="items"
    :size="size"
  />
</template>
```

### With Divider

```vue live
<script setup>
const items = [
  { label: 'Banana' },
  { label: 'Orange' },
  { label: 'Apple' },
  { label: 'Grapes' },
]
</script>
<template>
  <c-list
    :items="items"
    divider
  />
</template>
```

### Clickable & Active Status

```vue live
<script setup>
import { ref } from 'vue'

const items = [
  { label: 'Banana' },
  { label: 'Orange' },
  { label: 'Apple' },
  { label: 'Grapes' },
]
const activeItem = ref('Banana')
</script>
<template>
  <c-list
    :items="items"
    clickable
    :active-fn="item => item.label === activeItem"
    @item-click="item => (activeItem = item.label)"
  />
</template>
```

### Customize Item Content

This is an example for using `c-info-item` as `item`

```vue live
<script setup>
import { ref } from 'vue'
import {
  matCheck,
  matSettingsPower,
  matPersonAddAlt1,
  matOfflineBolt,
  matSettings,
} from '@quasar/extras/material-icons'
const items = [
  { title: 'Notification', subtitle: 'Some notification description', icon: matOfflineBolt },
  { title: 'Personal', subtitle: 'Some personal description', icon: matPersonAddAlt1 },
  { title: 'Settings', subtitle: 'Some settings description', icon: matSettings },
  { title: 'Exit', subtitle: 'Some exit description', icon: matSettingsPower },
]
const activeItem = ref('')
</script>
<template>
  <c-list
    :items="items"
    clickable
    :active-fn="item => item.title === activeItem"
    @item-click="item => (activeItem = item.title)"
  >
    <template #item="{ isActive, clickable, item }">
      <c-info-item v-bind="item">
        <template
          v-if="isActive"
          #append
        >
          <c-icon
            :content="matCheck"
            class="c-text-primary checked-icon"
          />
        </template>
      </c-info-item>
    </template>
  </c-list>
</template>
<style
  scoped
  lang="scss"
>
.checked-icon {
  font-size: 28px;
}
</style>
```
