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
