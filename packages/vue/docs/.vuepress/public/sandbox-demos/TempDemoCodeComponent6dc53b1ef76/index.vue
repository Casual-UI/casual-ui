<script setup>
import { ref } from 'vue'

const selectedValue = ref('')

const options = [
  { label: '0 - 50', value: 0 },
  { label: '5 - 100', value: 1 },
  { label: '100 - 200', value: 2 },
  { label: '200 - 500', value: 3 },
  { label: '500 - 1000', value: 4 },
]
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-select
        v-model="selectedValue"
        size="xs"
        placeholder="超小尺寸"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        size="sm"
        placeholder="小尺寸"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        placeholder="中等尺寸（默认）"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        size="lg"
        placeholder="大尺寸"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        size="xl"
        placeholder="超大尺寸"
        :options="options"
      />
    </div>
  </div>
</template>
