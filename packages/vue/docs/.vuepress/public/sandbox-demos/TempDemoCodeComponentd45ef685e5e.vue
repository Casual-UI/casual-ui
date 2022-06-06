<script setup>
const colors = ['--casual-primary', '--casual-secondary', '--casual-warning', '--casual-negative']
</script>
<template>
  <div class="c-row c-gutter-md c-items-center c-wrap">
    <div
      v-for="c in colors"
      :key="c"
      class="c-col-3"
    >
      <div
        class="c-rounded-md color-card c-pa-md"
        :style="{
          backgroundColor: `var(${c})`
        }"
      >
        {{ c }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.color-card {
  height: 120px;
  line-height: 120px;
  color: #fff;
  text-align: center;
}
</style>
