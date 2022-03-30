---
title: 图标
componentPath: basic/icon/CIcon
---

OPay UI推荐使用[@quasar/extras](https://github.com/quasarframework/quasar/tree/dev/extras)

### 使用

* 安装`@quasar/extras`

```sh
yarn add @quasar/extras
```

* 组件中

```vue
<script setup>
import { mdiAccount } from '@quasar/extras/mdi-v6'
</script>
<template>
  <c-icon :content="mdiAccount" />
</template>
```

### 颜色和尺寸

```vue live
<script setup>
import { matMenu } from '@quasar/extras/material-icons'
import { mdiAbTesting } from '@quasar/extras/mdi-v6'
import { fasFont } from '@quasar/extras/fontawesome-v5'
</script>
<template>
  <div class="demo-icons c-row c-gutter-x-md">
    <c-icon class="icon-item" :content="matMenu" />
    <c-icon class="icon-item" :content="mdiAbTesting" />
    <c-icon class="icon-item" :content="fasFont" />
  </div>
</template>
<style scoped lang="scss">
.demo-icons {
  .icon-item {
    &:nth-child(1) {
      color: blue;
      font-size: 32px;
    }
    &:nth-child(2) {
      color: cyan;
      font-size: 48px;
    }
    &:nth-child(3) {
      color: purple;
      font-size: 72px;
    }
  }
}
</style>
```
