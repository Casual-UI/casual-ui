<script setup>
import { matPeople, matNaturePeople, matArrowCircleDown } from '@quasar/extras/material-icons'
</script>
<template>
  <c-expansion title="自定义arrow插槽图标">
    <template #arrow>
      <c-icon :content="matArrowCircleDown" />
    </template>
    <div class="c-px-lg">
      <p>你可以通过<code>expandStatus</code>为展开/折叠状态设置不同的icon</p>
    </div>
  </c-expansion>
  <c-expansion title="自定义arrow插槽图标">
    <template #arrow="{ expandStatus }">
      <c-icon :content="expandStatus ? matPeople : matNaturePeople" />
    </template>
    <div class="c-px-lg">
      <p>你可以通过<code>expandStatus</code>为展开/折叠状态设置不同的icon</p>
    </div>
  </c-expansion>
</template>
