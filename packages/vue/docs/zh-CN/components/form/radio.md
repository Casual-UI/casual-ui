---
title: 单选器
componentPath: form/CRadio
additionalComponentPaths:
  - name: CRadioGroup
    path: form/CRadioGroup
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <c-radio v-model="val" label="苹果" value="Apple" />
    <c-radio v-model="val" label="香蕉" value="Banana" />
    <c-radio v-model="val" label="桃子" value="Peach" />
    <c-radio v-model="val" label="葡萄" value="Grape" />
  </div>
  <div class="c-mt-md">当前选中值：{{ val }}</div>
</template>
```

### 尺寸

```vue live
<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <c-radio
      v-model="val"
      label="超小尺寸"
      value="xs"
      size="xs" />
    <c-radio
      v-model="val"
      label="小尺寸"
      value="sm"
      size="sm" />
    <c-radio v-model="val" label="中等尺寸（默认）" value="md" />
    <c-radio
      v-model="val"
      label="大尺寸"
      value="lg"
      size="lg" />
    <c-radio
      v-model="val"
      label="超大尺寸"
      value="xl"
      size="xl" />
  </div>
  <div class="c-mt-md">当前选中值：{{ val }}</div>
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
  <div class="c-row c-gutter-x-md">
    <c-radio v-model="val1" label="禁用态" disabled />
    <c-radio v-model="val2" label="禁用态" disabled />
  </div>
</template>
```

### 单选器组

```vue live
<script setup>
import { ref } from 'vue'

const selectedFruit = ref('Apple')
const fruits = [
  { label: '苹果', value: 'Apple' },
  { label: '香蕉', value: 'Banana' },
  { label: '桃子', value: 'Peach' },
  { label: '葡萄', value: 'Grape' },
]
</script>
<template>
  {{ selectedFruit }}
  <c-radio-group v-model="selectedFruit" :options="fruits" />
</template>
```