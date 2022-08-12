---
title: Tabs
componentPath: interact/CTabs
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const items = [{ name: 'Panel1' }, { name: 'Panel2' }, { name: 'Panel3' }]
const activeItem = ref('Panel1')
</script>
<template>
  <c-tabs
    v-model="activeItem"
    :items="items"
  >
    <template #body-Panel1> The content of panel 1 </template>
    <template #body-Panel2> The content of panel 2 </template>
    <template #body-Panel3> The content of panel 3 </template>
  </c-tabs>
</template>
```

### Sizes

```vue live
<script setup>
import { ref } from 'vue'
const items = [{ name: 'Panel1' }, { name: 'Panel2' }, { name: 'Panel3' }]
const activeItem = ref('Panel1')
const size = ref('md')
</script>
<template>
  <div class="c-row c-items-center c-wrap c-gutter-md">
    <c-radio
      v-model="size"
      label="xs"
      value="xs"
      size="xs"
    />
    <c-radio
      v-model="size"
      label="sm"
      value="sm"
      size="sm"
    />
    <c-radio
      v-model="size"
      label="md (default)"
      value="md"
    />
    <c-radio
      v-model="size"
      label="lg"
      value="lg"
      size="lg"
    />
    <c-radio
      v-model="size"
      label="xl"
      value="xl"
      size="xl"
    />
  </div>
  <c-tabs
    v-model="activeItem"
    :items="items"
    :size="size"
  >
    <template #body-Panel1> The content of panel 1 </template>
    <template #body-Panel2> The content of panel 2 </template>
    <template #body-Panel3> The content of panel 3 </template>
  </c-tabs>
</template>
```
