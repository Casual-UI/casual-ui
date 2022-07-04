---
title: 下拉
componentPath: interact/CDropdown
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dropdown v-model="show">
    <c-button label="点击展开下拉" />
    <template #drop-content>
      <p>一些下拉内容</p>
    </template>
  </c-dropdown>
</template>
```

### 自定义内容宽度

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dropdown
    v-model="show"
    :width-within-parent="false"
  >
    <c-button label="点击展开下拉" />
    <template #drop-content>
      <div class="custom-width">自定义内容宽度</div>
    </template>
  </c-dropdown>
</template>
<style scoped>
.custom-width {
  width: 400px;
  padding: 24px;
}
</style>
```

### 手动控制

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-button
    label="点击收起/展开下拉"
    @click="show = !show"
  />
  <c-dropdown
    v-model="show"
    manual
    :width-within-parent="false"
  >
    <h3>点击左边按钮收起/展开下拉</h3>
    <template #drop-content>
      <div class="custom-width">自定义内容宽度</div>
    </template>
  </c-dropdown>
</template>
<style scoped>
.custom-width {
  width: 400px;
  padding: 24px;
}
</style>
```
