---
title: Radio
componentPath: form/CRadio
additionalComponentPaths:
  - name: CRadioGroup
    path: form/CRadioGroup
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <c-radio
      v-model="val"
      label="Apple"
      value="Apple"
    />
    <c-radio
      v-model="val"
      label="Banana"
      value="Banana"
    />
    <c-radio
      v-model="val"
      label="Peach"
      value="Peach"
    />
    <c-radio
      v-model="val"
      label="Grapes"
      value="Grape"
    />
  </div>
  <div class="c-mt-md">Current value: {{ val }}</div>
</template>
```

### Sizes

```vue live
<script setup>
import { ref } from 'vue'
const val = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <c-radio
      v-model="val"
      label="xs"
      value="xs"
      size="xs"
    />
    <c-radio
      v-model="val"
      label="sm"
      value="sm"
      size="sm"
    />
    <c-radio
      v-model="val"
      label="md (default)"
      value="md"
    />
    <c-radio
      v-model="val"
      label="lg"
      value="lg"
      size="lg"
    />
    <c-radio
      v-model="val"
      label="xl"
      value="xl"
      size="xl"
    />
  </div>
  <div class="c-mt-md">Current value: {{ val }}</div>
</template>
```

### Status

```vue live
<script setup>
import { ref } from 'vue'
const val1 = ref(false)
const val2 = ref(true)
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <c-radio
      v-model="val1"
      label="Disabled"
      disabled
    />
    <c-radio
      v-model="val2"
      label="Disabled"
      disabled
    />
  </div>
</template>
```

### RadioGroup

```vue live
<script setup>
import { ref } from 'vue'

const selectedFruit = ref('Apple')
const fruits = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Banana', value: 'Banana' },
  { label: 'Peach', value: 'Peach' },
  { label: 'Grapes', value: 'Grape' },
]
</script>
<template>
  Current value: {{ selectedFruit }}
  <c-radio-group
    v-model="selectedFruit"
    :options="fruits"
  />
</template>
```
