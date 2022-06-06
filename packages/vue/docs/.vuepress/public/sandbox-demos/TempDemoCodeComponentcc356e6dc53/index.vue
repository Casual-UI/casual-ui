<script setup>
import { ref } from 'vue'
const val1 = ref(false)
const val2 = ref(true)
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <c-radio v-model="val1" label="禁用态" disabled />
    <c-radio v-model="val2" label="禁用态" disabled />
  </div>
</template>
