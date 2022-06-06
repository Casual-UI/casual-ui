<script setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
</script>
<template>
  <c-toggle v-model="checked1" label="禁用态" disabled />
  <c-toggle
    v-model="checked2"
    label="禁用态"
    disabled
    class="c-ml-md" />
</template>
