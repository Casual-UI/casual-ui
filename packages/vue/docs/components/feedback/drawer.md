---
title: Drawer
componentPath: popup/CDrawer
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <CButton
    label="Click to open drawer"
    @click="show = true"
  />

  <CDrawer
    title="Hi, there"
    v-model="show"
  >
    Some drawer content
  </CDrawer>
</template>
```

### Positions

```vue live
<script setup>
import { ref } from 'vue'
import {
  matArrowBack,
  matArrowUpward,
  matArrowForward,
  matArrowDownward,
} from '@quasar/extras/material-icons'

const show = ref(false)
const position = ref('left')

function openWithPosition(pos) {
  position.value = pos
  show.value = true
}
</script>

<template>
  <div class="c-flex c-gutter-md c-wrap">
    <div>
      <c-button
        icon
        @click="openWithPosition('left')"
      >
        <c-icon :content="matArrowBack" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        @click="openWithPosition('top')"
      >
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        @click="openWithPosition('right')"
      >
        <c-icon :content="matArrowForward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        @click="openWithPosition('bottom')"
      >
        <c-icon :content="matArrowDownward" />
      </c-button>
    </div>
  </div>

  <c-drawer
    title="Hi, there"
    :position="position"
    v-model="show"
  >
    I'm some drawer content
  </c-drawer>
</template>
```
