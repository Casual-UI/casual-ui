<script setup>
import { matPeople } from '@quasar/extras/material-icons'
</script>
<template>
  <c-expansion title="标题左侧图标" :icon="matPeople">
    <div class="c-px-lg">
      <p>代码能够运行并满足业务要求是最低标准</p>
    </div>
  </c-expansion>
  <c-expansion title="自定义icon插槽图标">
    <template #icon>
      <img style="width: 80px;" src="/logo-dark.svg" />
    </template>
    <div class="c-px-lg">
      <p>代码能够运行并满足业务要求是最低标准</p>
    </div>
  </c-expansion>
</template>
