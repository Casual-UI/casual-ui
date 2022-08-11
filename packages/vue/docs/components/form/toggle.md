---
title: Toggle
componentPath: form/CToggle
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
<template>
  <c-toggle
    v-model="checked"
    label="Turn on something"
  />
</template>
```

### Sizes

```vue live
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
      <c-toggle
        v-model="checkStatus.xs"
        size="xs"
        label="xs"
      />
    </div>
    <div>
      <c-toggle
        v-model="checkStatus.sm"
        size="sm"
        label="sm"
      />
    </div>
    <div>
      <c-toggle
        v-model="checkStatus.md"
        size="md"
        label="md"
      />
    </div>
    <div>
      <c-toggle
        v-model="checkStatus.lg"
        size="lg"
        label="lg"
      />
    </div>
    <div>
      <c-toggle
        v-model="checkStatus.xl"
        size="xl"
        label="xl"
      />
    </div>
  </div>
  Current Value: <code>{{ checkStatus }}</code>
</template>
```

### Disabled

```vue live
<script setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)
</script>
<template>
  <c-toggle
    v-model="checked1"
    label="Disabled off"
    disabled
  />
  <c-toggle
    v-model="checked2"
    label="Disabled on"
    disabled
    class="c-ml-md"
  />
</template>
```
