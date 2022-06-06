<template>
  <div class="c-grid c-grid-col-4 c-grid-row-4 c-grid-gap-md custom-grid">
    <div v-for="n in 16" :key="n" class="custom-grid--item">
      {{ n }}
    </div>
  </div>
</template>
<style scoped>
.custom-grid--item {
  text-align: center;
  background: var(--casual-primary);
  color: #fff;
  height: 80px;
  line-height: 80px;
}
</style>
