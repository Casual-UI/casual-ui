---
title: 抽屉
componentPath: popup/CDrawer
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <CButton
    label="点击打开抽屉"
    @click="show = true"
  />

  <CDrawer
    title="你好"
    v-model="show"
  >
    我是一些抽屉内容
  </CDrawer>
</template>
```

### 不同位置

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
    title="你好"
    :position="position"
    v-model="show"
  >
    我是一些抽屉内容
  </c-drawer>
</template>
```
