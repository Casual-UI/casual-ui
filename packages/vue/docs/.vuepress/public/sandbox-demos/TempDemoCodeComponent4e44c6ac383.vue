<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <c-radio v-model="val" label="苹果" value="Apple" />
    <c-radio v-model="val" label="香蕉" value="Banana" />
    <c-radio v-model="val" label="桃子" value="Peach" />
    <c-radio v-model="val" label="葡萄" value="Grape" />
  </div>
  <div class="c-mt-md">当前选中值：{{ val }}</div>
</template>
