---
title: 标签页
componentPath: interact/CTabs
---

### 基础使用

```vue live
<template>
  <c-tabs v-model="activeItem" :items="items">  
    <template #body-面板1>
      面板1内容
    </template> 
    <template #body-面板222222> 
      面板2内容
    </template>
    <template #body-面板3>
      面板3内容
    </template>   
  </c-tabs>
</template>
<script setup>
import { ref } from 'vue'
const items = [
  { name: '面板1' },
  { name: '面板222222' },
  { name: '面板3' }
]
const activeItem = ref('面板1')
</script>
```

### 尺寸

```vue live
<script setup>
import { ref } from 'vue'
const items = [
  { name: '面板1' },
  { name: '面板222222' },
  { name: '面板3' }
]
const activeItem = ref('面板1')
const size = ref('md')
</script>
<template>
  <div class="c-row c-items-center c-wrap c-gutter-md">
    <c-radio v-model="size" label="xs" value="xs" />
    <c-radio v-model="size" label="sm" value="sm" />
    <c-radio v-model="size" label="md" value="md" />
    <c-radio v-model="size" label="lg" value="lg" />
    <c-radio v-model="size" label="xl" value="xl" />
  </div>
  <c-tabs v-model="activeItem" :items="items" :size="size">  
    <template #body-面板1>
      面板1内容
    </template> 
    <template #body-面板222222> 
      面板2内容
    </template>
    <template #body-面板3>
      面板3内容
    </template>   
  </c-tabs>
</template>
```