---
title: Checkbox
componentPath: form/CCheckbox
additionalComponentPaths:
  - name: CCheckboxGroup
    path: form/CCheckboxGroup
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const val = ref(false)
</script>
<template>
  <c-checkbox
    v-model="val"
    label="Agree to agreement"
  />
</template>
```

### Sizes

```vue live
<script setup>
import { ref } from 'vue'
const val = ref('md')
</script>
<template>
  <div class="c-row c-gutter-md c-items-center">
    <c-checkbox
      v-model="val"
      checked-value="xs"
      size="xs"
      label="xs"
    />
    <c-checkbox
      v-model="val"
      checked-value="sm"
      size="sm"
      label="sm"
    />
    <c-checkbox
      v-model="val"
      checked-value="md"
      label="md (default)"
    />
    <c-checkbox
      v-model="val"
      checked-value="lg"
      size="lg"
      label="lg"
    />
    <c-checkbox
      v-model="val"
      checked-value="xl"
      size="xl"
      label="xl"
    />
  </div>
  <div>Current value: {{ val }}</div>
</template>
```

### Disabled

```vue live
<script setup>
import { ref } from 'vue'
const val1 = ref(false)
const val2 = ref(true)
</script>
<template>
  <c-checkbox
    v-model="val1"
    label="Disabled"
    disabled
  />
  <c-checkbox
    v-model="val2"
    label="Disabled"
    disabled
    class="c-ml-md"
  />
</template>
```

### CheckboxGroup

```vue live
<script setup>
import { ref } from 'vue'

const val = ref([])

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Banana', value: 'Banana' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Peach', value: 'Peach' },
]
</script>
<template>
  <c-checkbox-group
    v-model="val"
    :options="options"
    class="c-row c-item-center c-gutter-x-md"
  />
  <div>Current value: {{ val }}</div>
</template>
```
