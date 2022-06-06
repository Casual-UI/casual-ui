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
