<script setup>
import { ref } from 'vue'
const month = ref(null)
const formattedMonth = ref('')
const year = ref(null)
const formattedYear = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <div class="c-col-6">
      <c-date-picker
        v-model="month"
        v-model:formattedValue="formattedMonth"
        placeholder="请选择月份"
        format="MMM, YYYY"
        unit="month"
      />
      <p>
        <strong>month:</strong> {{ month }}
      </p>
      <p>
        <strong>formattedMonth:</strong> {{ formattedMonth }}
      </p>
    </div>
    <div class="c-col-6">
      <c-date-picker
        v-model="year"
        v-model:formattedValue="formattedYear"
        placeholder="请选择年份"
        format="YYYY"
        unit="year"
      />
      <p>
        <strong>year:</strong> {{ year }}
      </p>
      <p>
        <strong>formattedYear:</strong> {{ formattedYear }}
      </p>
    </div>
  </div>
</template>
