---
title: Input
componentPath: form/CInput
eventsNameWidth: 140px
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-input
        v-model="inputValue"
        placeholder="Enter something"
      />
    </div>
    <div>
      <c-input
        v-model="inputValue"
        type="password"
        placeholder="Password input"
      />
    </div>
    <div>
      <c-input
        v-model="inputValue"
        rounded
        placeholder="Rounded input"
      />
    </div>
    <div>
      <c-input
        v-model="inputValue"
        disabled
        placeholder="Disabled input"
      />
    </div>
  </div>
</template>
```

### Sizes

```vue live
<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-input
        v-model="inputValue"
        placeholder="xs input"
        size="xs"
      />
    </div>
    <div>
      <c-input
        v-model="inputValue"
        placeholder="sm input"
        size="sm"
      />
    </div>
    <div>
      <c-input
        v-model="inputValue"
        placeholder="md (default) input"
      />
    </div>
    <div>
      <c-input
        v-model="inputValue"
        placeholder="lg input"
        size="lg"
      />
    </div>
    <div>
      <c-input
        v-model="inputValue"
        placeholder="xl input"
        size="xl"
      />
    </div>
  </div>
</template>
```

### Clearable

```vue live
<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <c-input
    v-model="inputValue"
    placeholder="Enter something"
    clearable
  />
</template>
```

### Prefix & Suffix

```vue live
<script setup>
import { matDateRange, matContactPhone } from '@quasar/extras/material-icons'
import { ref } from 'vue'

const value = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-x-lg">
    <div>
      <c-input
        v-model="value"
        placeholder="prefix and suffix"
      >
        <template #prefix> +234 </template>
        <template #suffix> @someone </template>
      </c-input>
    </div>
    <div>
      <c-input
        v-model="value"
        placeholder="Suffix Icon"
        clearable
      >
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
```

### Loading

```vue live
<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <div>
      <c-input
        v-model="value"
        loading
        placeholder="加载中..."
      />
    </div>
    <div>
      <c-input
        v-model="value"
        loading
        placeholder="加载中..."
      >
        <template #loading>
          <c-loading-bar color="cyan" />
        </template>
      </c-input>
    </div>
  </div>
</template>
```
