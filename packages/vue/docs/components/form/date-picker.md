---
title: DatePicker
componentPath: form/date-picker/CDatePicker
propDefaultValueWidth: 200px
---

### Basic Usage

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
    placeholder="Select date"
  />
  <p><strong>date:</strong> {{ date }}</p>
  <p><strong>formattedValue:</strong> {{ formattedValue }}</p>
</template>
```

### Disabled

```vue live
<script setup>
import { ref } from 'vue'
const date1 = ref(null)
const date2 = ref(new Date())
</script>
<template>
  <c-date-picker
    v-model="date1"
    disabled
  />
  <c-date-picker
    v-model="date2"
    disabled
    class="c-ml-md"
  />
</template>
```

### Sizes

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
      placeholder="xs"
      size="xs"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="sm"
      size="sm"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="md (default)"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="lg"
      size="lg"
    />
    <c-date-picker
      v-model="date"
      v-model:formattedValue="formattedValue"
      placeholder="xl"
      size="xl"
    />
  </div>
  <p><strong>date:</strong> {{ date }}</p>
  <p><strong>formattedValue:</strong> {{ formattedValue }}</p>
</template>
```

### Range Select

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
    placeholder="Select range"
  />
  <p><strong>dateRange:</strong> {{ dateRange }}</p>
  <p><strong>formattedRange:</strong> {{ formattedRange }}</p>
</template>
```

### Month & Year

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
        placeholder="Select month"
        format="MMM, YYYY"
        unit="month"
      />
      <p><strong>month:</strong> {{ month }}</p>
      <p><strong>formattedMonth:</strong> {{ formattedMonth }}</p>
    </div>
    <div class="c-col-6">
      <c-date-picker
        v-model="year"
        v-model:formattedValue="formattedYear"
        placeholder="Select year"
        format="YYYY"
        unit="year"
      />
      <p><strong>year:</strong> {{ year }}</p>
      <p><strong>formattedYear:</strong> {{ formattedYear }}</p>
    </div>
  </div>
</template>
```
