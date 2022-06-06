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
