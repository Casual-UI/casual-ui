<script setup>
import { ref } from 'vue'
const val1 = ref(false)
const val2 = ref(true)
</script>
<template>
  <c-checkbox v-model="val1" label="禁用态" disabled />
  <c-checkbox
    v-model="val2"
    label="禁用态"
    disabled
    class="c-ml-md" />
</template>
