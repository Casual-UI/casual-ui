<script setup lang="ts">
import CLoading from './CLoading.vue'
</script>
<template>
  <div class="c-inner-loading c-flex c-items-center c-justify-center">
    <slot>
      <c-loading />
    </slot>
  </div>
</template>
