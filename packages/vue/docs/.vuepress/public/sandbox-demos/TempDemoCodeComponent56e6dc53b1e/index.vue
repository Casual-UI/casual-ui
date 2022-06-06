<script setup>
import { reactive } from 'vue'

const checkStatus = reactive({
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
})
</script>
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-toggle v-model="checkStatus.xs" size="xs" label="超小" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.sm" size="sm" label="小型" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.md" size="md" label="中等（默认）" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.lg" size="lg" label="大型" />
    </div>
    <div>
      <c-toggle v-model="checkStatus.xl" size="xl" label="超大" />
    </div>
  </div>
  状态： <code>{{ checkStatus }}</code>
</template>
