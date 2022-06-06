<template>
  <div class="c-row c-gutter-x-sm">
    <div v-for="n in 6" :key="n" class="c-col-2">
      <div>col-2 + gutter-sm</div>
    </div>
  </div>
  <div class="c-row c-gutter-x-md c-mt-md">
    <div v-for="n in 4" :key="n" class="c-col-3">
      <div>col-3 + gutter-md</div>
    </div>
  </div>
  <div class="c-row c-gutter-x-lg c-mt-md">
    <div v-for="n in 3" :key="n" class="c-col-4">
      <div>col-4 + gutter-lg</div>
    </div>
  </div>
</template>
<style scoped>
.c-col-2 > div ,
.c-col-3 > div ,
.c-col-4 > div {
  border: 1px solid #333;
  background-color: var(--casual-primary);
  padding: 12px 0;
  color: #fff;
  text-align: center;
}
</style>
