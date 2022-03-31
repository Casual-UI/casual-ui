---
title: 主题定制
---

### 主题色

```vue live
<script setup>
const colors = ['--casual-primary', '--casual-secondary', '--casual-warning', '--casual-negative']
</script>
<template>
  <div class="c-row c-gutter-md c-items-center c-wrap">
    <div
      v-for="c in colors"
      :key="c"
      class="c-col-3"
    >
      <div
        class="c-rounded-md color-card c-pa-md"
        :style="{
          backgroundColor: `var(${c})`
        }"
      >
        {{ c }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.color-card {
  height: 120px;
  line-height: 120px;
  color: #fff;
  text-align: center;
}
</style>
```

Casual UI提供了两种方式定制主题

### 基于scss方案

### 基于css变量方案

### 变量一览

@[code](../../../styles/src/variables/colors.scss)
