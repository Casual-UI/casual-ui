---
title: 日期选择器
componentPath: form/date-picker/CDatePicker
propDefaultValueWidth: 200px
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const date = ref(null)
const formattedValue = ref('')
</script>
<template>
  <c-date-picker
    v-model="date"
    v-model:formattedValue="formattedValue"
    placeholder="请选择日期"
  />
  <p>
    <strong>date:</strong> {{ date }}
  </p>
  <p>
    <strong>formattedValue:</strong> {{ formattedValue }}
  </p>
</template>
```

### 禁用态

```vue live
<script setup>
import { ref } from 'vue'
const date1 = ref(null)
const date2 = ref(new Date())
</script>
<template>
  <c-date-picker v-model="date1" disabled />
  <c-date-picker v-model="date2" disabled class="c-ml-md" />
</template>
```

### 尺寸

```vue live
<script setup>
import { ref } from 'vue'
const date = ref(null)
const formattedValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="超小尺寸"
      size="xs"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="小尺寸"
      size="sm"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="中等尺寸（默认）"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="大尺寸"
      size="lg"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="超大尺寸"
      size="xl"
    />
  </div>
  <p>
    <strong>date:</strong> {{ date }}
  </p>
  <p>
    <strong>formattedValue:</strong> {{ formattedValue }}
  </p>
</template>
```

### 日期段选择

```vue live
<script setup>
import { ref } from 'vue'
const dateRange = ref([null, null])
const formattedRange = ref(['', ''])
</script>
<template>
  <c-date-picker
    v-model:dateRange="dateRange"
    v-model:formattedDateRange="formattedRange"
    range
    placeholder="请选择日期段"
  />
  <p>
    <strong>dateRange:</strong> {{ dateRange }}
  </p>
  <p>
    <strong>formattedRange:</strong> {{ formattedRange }}
  </p>
</template>
```

### 选择月份、年份

```vue live
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
```