---
title: Expansion
componentPath: interact/CExpansion
---

### Basic Usage

```vue live
<template>
  <c-expansion title="Open to expand/fold">
    <div class="c-px-lg">
      <p>Hello, world</p>
    </div>
  </c-expansion>
</template>
```

### Title Icon

```vue live
<script setup>
import { matPeople } from '@quasar/extras/material-icons'
</script>
<template>
  <c-expansion
    title="A custom icon"
    :icon="matPeople"
  >
    <div class="c-px-lg">
      <p>Hello, world</p>
    </div>
  </c-expansion>
  <c-expansion title="A custom icon with icon slot">
    <template #icon>
      <img
        style="width: 80px;"
        src="/logo-dark.svg"
      />
    </template>
    <div class="c-px-lg">
      <p>Hello, world</p>
    </div>
  </c-expansion>
</template>
```

### Custom Arrow

```vue live
<script setup>
import {
  matPeople,
  matNaturePeople,
  matArrowCircleDown,
} from '@quasar/extras/material-icons'
</script>
<template>
  <c-expansion title="A custom arrow">
    <template #arrow>
      <c-icon :content="matArrowCircleDown" />
    </template>
    <div class="c-px-lg">
      <p>Hello, world</p>
    </div>
  </c-expansion>
  <c-expansion title="Different custom arrow with expand/fold status">
    <template #arrow="{ expandStatus }">
      <c-icon :content="expandStatus ? matPeople : matNaturePeople" />
    </template>
    <div class="c-px-lg">
      <p>Hello, world</p>
    </div>
  </c-expansion>
</template>
```

### Expand From Top

```vue live
<script setup>
import { CExpansion } from 'casual-ui-vue'
</script>
<template>
  <CExpansion
    title="Expanded from top"
    reverse
  >
    <p>Some content</p>
  </CExpansion>
</template>
```
