---
title: 列表
componentPath: list/CList
additionalComponentPaths:
  - name: CItem
    path: list/CItem
  - name: CInfoItem
    path: list/CInfoItem
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
  <c-list
    :items="items"
    divider
  />
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
    @item-click="item => (activeItem = item.label)"
  />
</template>
```

### 自定义项

下面是用`c-info-item`组件作为`item`插槽实现的自定义列表项

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
  { title: '通知', subtitle: '一些通知相关的内容', icon: matOfflineBolt },
  { title: '个人', subtitle: '一些个人相关的内容', icon: matPersonAddAlt1 },
  { title: '设置', subtitle: '一些系统相关的设置', icon: matSettings },
  { title: '退出', subtitle: '用于退出登录', icon: matSettingsPower },
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
