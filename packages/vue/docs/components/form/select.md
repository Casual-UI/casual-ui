---
title: Select
componentPath: form/CSelect
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'

const selectedValue = ref('')

const options = [
  { label: '0 - 50', value: 0 },
  { label: '50 - 100', value: 1 },
  { label: '100 - 200', value: 2 },
  { label: '200 - 500', value: 3 },
  { label: '500 - 1000', value: 4 },
]
</script>
<template>
  <c-select
    v-model="selectedValue"
    placeholder="Select something"
    :options="options"
  />
  <c-select
    v-model="selectedValue"
    rounded
    placeholder="Rounded Select"
    :options="options"
    class="c-ml-md"
  />
</template>
```

### Sizes

```vue live
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
        placeholder="xs select"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        size="sm"
        placeholder="sm select"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        placeholder="md select (default)"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        size="lg"
        placeholder="lg select"
        :options="options"
      />
    </div>
    <div>
      <c-select
        v-model="selectedValue"
        size="xl"
        placeholder="xl select"
        :options="options"
      />
    </div>
  </div>
</template>
```

### Disabled

```vue live
<script setup>
import { ref } from 'vue'

const val = ref('')
const options = [
  { label: '0 - 50', value: 0 },
  { label: '5 - 100', value: 1 },
  { label: '100 - 200', value: 2 },
  { label: '200 - 500', value: 3 },
  { label: '500 - 1000', value: 4 },
]
</script>
<template>
  <c-select
    v-model="val"
    :options="options"
    placeholder="Disabled select"
    disabled
  />
</template>
```

### Clearable

```vue live
<script setup>
import { ref } from 'vue'

const selectedValue = ref('')

const options = [
  { label: '0 - 50', value: 0 },
  { label: '50 - 100', value: 1 },
  { label: '100 - 200', value: 2 },
  { label: '200 - 500', value: 3 },
  { label: '500 - 1000', value: 4 },
]
</script>
<template>
  <c-select
    v-model="selectedValue"
    placeholder="Clearable something"
    :options="options"
    clearable
  />
</template>
```

### Multiple

```vue live
<script setup>
import { ref } from 'vue'

const selectedValue = ref([])

const options = [
  { label: '0 - 50', value: 0 },
  { label: '50 - 100', value: 1 },
  { label: '100 - 200', value: 2 },
  { label: '200 - 500', value: 3 },
  { label: '500 - 1000', value: 4 },
]
</script>
<template>
  <c-select
    v-model="selectedValue"
    placeholder="Multiple select"
    :options="options"
    clearable
    multiple
  />
</template>
```
