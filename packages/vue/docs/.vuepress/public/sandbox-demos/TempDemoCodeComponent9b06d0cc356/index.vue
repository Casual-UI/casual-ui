<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-input v-model="inputValue" placeholder="超小尺寸" size="xs" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="小尺寸" size="sm" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="中等尺寸（默认）" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="大尺寸" size="lg" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="超大尺寸" size="xl" />
    </div>
  </div>
</template>
