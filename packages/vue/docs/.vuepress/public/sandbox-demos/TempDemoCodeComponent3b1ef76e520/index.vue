<script setup>
import { matMenu } from '@quasar/extras/material-icons'
import { mdiAbTesting } from '@quasar/extras/mdi-v6'
import { fasFont } from '@quasar/extras/fontawesome-v5'
</script>
<template>
  <div class="demo-icons c-row c-gutter-x-md">
    <c-icon class="icon-item" :content="matMenu" />
    <c-icon class="icon-item" :content="mdiAbTesting" />
    <c-icon class="icon-item" :content="fasFont" />
  </div>
</template>
<style scoped lang="scss">
.demo-icons {
  .icon-item {
    &:nth-child(1) {
      color: blue;
      font-size: 32px;
    }
    &:nth-child(2) {
      color: cyan;
      font-size: 48px;
    }
    &:nth-child(3) {
      color: purple;
      font-size: 72px;
    }
  }
}
</style>
