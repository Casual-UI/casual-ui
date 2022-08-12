---
title: Table
componentPath: table/CTable
customSlots:
  - name: th-[field]
    description: Customize the header content
    bindings:
      - name: title
        description: The title
        type:
          name: string
      - name: field
        description: The key of row data
        type:
          name: string
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const tableData = [
  { name: 'Jason', gender: 'male' },
  { name: 'Lucy', gender: 'female' },
]

const tableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Gender', field: 'gender' },
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

### Customize Header

```vue live
<script setup>
const tableData = [
  { name: 'Jason', gender: 'male' },
  { name: 'Lucy', gender: 'female' },
]

const tableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Gender', field: 'gender' },
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

### Customize Column

```vue live
<script setup>
const tableData = [
  { name: 'Jason', gender: 'male' },
  { name: 'Lucy', gender: 'female' },
]

const tableColumns = [
  { title: 'Name', field: 'name' },
  { title: 'Gender', field: 'gender' },
  { title: 'Operations', field: 'operations' },
]
</script>
<template>
  <c-table row-key="name" :data="tableData" :columns="tableColumns">
    <template #td-operations>
      <c-button label="Edit" round size="sm" />
      <c-button label="Delete" round theme="negative" size="sm" />
    </template>
  </c-table>
</template>
```