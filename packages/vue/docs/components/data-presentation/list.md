---
title: 列表
componentPath: list/CList
additionalComponentPaths:
  - name: CItem
    path: list/CItem
---

### 基础使用

```vue live
<script setup>
const items = [
  { label: '香蕉' },
  { label: '橘子' },
  { label: '苹果' },
  { label: '葡萄' },
]
</script>
<template>
  <c-list :items="items" />
</template>
```

### 尺寸

```vue live
<script setup>
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const items = [
  { label: '香蕉' },
  { label: '橘子' },
  { label: '苹果' },
  { label: '葡萄' },
]
const size = ref('md')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div
      v-for="s in sizes"
      :key="s">
      <c-radio
        v-model="size"
        :label="s"
        :value="s" />
    </div>
  </div>
  <c-list :items="items" :size="size" />
</template>
```

### 带分割线

```vue live
<script setup>
const items = [
  { label: '香蕉' },
  { label: '橘子' },
  { label: '苹果' },
  { label: '葡萄' },
]
</script>
<template>
  <c-list :items="items" divider />
</template>
```

### 可点击 & 激活态

```vue live
<script setup>
import { ref } from 'vue'
const items = [
  { label: '香蕉' },
  { label: '橘子' },
  { label: '苹果' },
  { label: '葡萄' },
]
const activeItem = ref('香蕉')
</script>
<template>
  <c-list
    :items="items"
    clickable
    :active-fn="item => item.label === activeItem"
    @item-click="item => activeItem = item.label" />
</template>
```