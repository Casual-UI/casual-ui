---
title: v-loading
---

### 使用

```vue live
<script setup>
import { ref } from 'vue'
const loading = ref(false)
</script>
<template>
  <c-toggle v-model="loading" label="点击打开/关闭Loading" />
  <div
    v-loading="loading"
    class="loading-container"
  >
  </div>
</template>
<style lang="scss" scoped>
.loading-container {
  height: 30vh;
}
</style>
```

### 自定义样式

通过data-casual-样式名="样式值"，来设置loading容器的样式

```vue live
<script setup>
import { ref } from 'vue'
const loading = ref(false)
</script>
<template>
  <c-toggle v-model="loading" label="点击打开/关闭Loading" />
  <div
    v-loading="loading"
    class="loading-container"
    data-casual-background-color="rgba(0, 0, 0, .7)"
    data-casual-font-size="4rem"
    data-casual-color="cyan">
  </div>
</template>
<style lang="scss" scoped>
.loading-container {
  height: 30vh;
}
</style>
```