<script setup>
import { matDateRange, matContactPhone } from '@quasar/extras/material-icons'
import { ref } from 'vue'

const value = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-x-lg">
    <div>
      <c-input v-model="value">
        <template #prefix> +234 </template>
        <template #suffix> @someone </template>
      </c-input>
    </div>
    <div>
      <c-input v-model="value" placeholder="suffix图标" clearable>
        <template #prefix>
          <c-icon :content="matContactPhone" />
        </template>
        <template #suffix>
          <c-icon :content="matDateRange" />
        </template>
      </c-input>
    </div>
  </div>
</template>
