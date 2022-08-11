---
title: 勾选器
componentPath: form/CCheckbox
additionalComponentPaths:
  - name: CCheckboxGroup
    path: form/CCheckboxGroup
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const val = ref(false)
</script>
<template>
  <c-checkbox v-model="val" label="同意协议" />
</template>
```

### 尺寸

```vue live
<script setup>
import { ref } from 'vue'
const val = ref('md')
</script>
<template>
  <div class="c-row c-gutter-md c-items-center">
    <c-checkbox
      v-model="val"
      checked-value="xs"
      size="xs"
      label="超小尺寸" />
    <c-checkbox
      v-model="val"
      checked-value="sm"
      size="sm"
      label="小尺寸" />
    <c-checkbox v-model="val" checked-value="md" label="中等尺寸（默认）" />
    <c-checkbox
      v-model="val"
      checked-value="lg"
      size="lg"
      label="大尺寸" />
    <c-checkbox
      v-model="val"
      checked-value="xl"
      size="xl"
      label="超大尺寸" />
  </div>
  <div>当前值：{{ val }}</div>
</template>
```

### 状态

```vue live
<script setup>
import { ref } from 'vue'
const val1 = ref(false)
const val2 = ref(true)
</script>
<template>
  <c-checkbox v-model="val1" label="禁用态" disabled />
  <c-checkbox
    v-model="val2"
    label="禁用态"
    disabled
    class="c-ml-md" />
</template>
```

### 勾选框组

```vue live
<script setup>
import { ref } from 'vue'

const val = ref([])

const options = [
  { label: '苹果', value: 'Apple' },
  { label: '香蕉', value: 'Banana' },
  { label: '橘子', value: 'Orange' },
  { label: '桃子', value: 'Peach' },
]
</script>
<template>
  <c-checkbox-group
    v-model="val"
    :options="options"
    class="c-row c-item-center c-gutter-x-md"
  />
  <div>当前值：{{ val }}</div>
</template>
```
