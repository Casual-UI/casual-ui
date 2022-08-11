---
title: 切换器/开关
componentPath: form/CToggle
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
<template>
  <c-toggle v-model="checked" label="打开通知" />
</template>
```

### 尺寸

```vue live
<script setup>
import { reactive } from 'vue'

const checkStatus = reactive({
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
})
</script>
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-toggle v-model="checkStatus.xs" size="xs" label="超小" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.sm" size="sm" label="小型" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.md" size="md" label="中等（默认）" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.lg" size="lg" label="大型" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.xl" size="xl" label="超大" />
    </div>
  </div>
  状态： <code>{{ checkStatus }}</code>
</template>
```

### 状态

```vue live
<script setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
</script>
<template>
  <c-toggle v-model="checked1" label="禁用态" disabled />
  <c-toggle
    v-model="checked2"
    label="禁用态"
    disabled
    class="c-ml-md" />
</template>
```
