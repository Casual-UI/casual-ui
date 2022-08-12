---
title: 表格
componentPath: table/CTable
customSlots:
  - name: th-[field]
    custom: true
    description: 自定义表头渲染
    bindings:
      - name: title
        description: 当前列标题
        type:
          name: string
      - name: field
        description: 当前列字段名称
        type:
          name: string
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const tableData = [
  { name: 'Jason', gender: 'male' },
  { name: 'Lucy', gender: 'female' },
]

const tableColumns = [
  { title: '姓名', field: 'name' },
  { title: '性别', field: 'gender' },
]
</script>
<template>
  <c-table
    row-key="name"
    :data="tableData"
    :columns="tableColumns"
  />
</template>
```

### 自定义表头

```vue live
<script setup>
const tableData = [
  { name: 'Jason', gender: 'male' },
  { name: 'Lucy', gender: 'female' },
]

const tableColumns = [
  { title: '姓名', field: 'name' },
  { title: '性别', field: 'gender' },
]
</script>
<template>
  <c-table row-key="name" :data="tableData" :columns="tableColumns">
    <template #th-name="{ title }">
      <span style="color: purple; font-size: 58px">
        {{ title }}
      </span>
    </template>
  </c-table>
</template>
```

### 自定义列单元格

```vue live
<script setup>
const tableData = [
  { name: 'Jason', gender: 'male' },
  { name: 'Lucy', gender: 'female' },
]

const tableColumns = [
  { title: '姓名', field: 'name' },
  { title: '性别', field: 'gender' },
  { title: '操作', field: 'operations' },
]
</script>
<template>
  <c-table row-key="name" :data="tableData" :columns="tableColumns">
    <template #td-operations>
      <c-button label="编辑" size="sm" />
      <c-button label="删除" theme="negative" size="sm" />
    </template>
  </c-table>
</template>
```