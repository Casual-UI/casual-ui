---
title: Dropdown
componentPath: interact/CDropdown
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dropdown v-model="show">
    <c-button label="Click to show dropdown" />
    <template #drop-content>
      <p>Some dropdown content</p>
    </template>
  </c-dropdown>
</template>
```

### Content Width

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dropdown
    v-model="show"
    :width-within-parent="false"
  >
    <c-button label="Click to show dropdown" />
    <template #drop-content>
      <div class="custom-width">
        Some long content.
        Some long content.
        Some long content.
        Some long content.
      </div>
    </template>
  </c-dropdown>
</template>
<style scoped>
.custom-width {
  width: 400px;
  padding: 24px;
}
</style>
```

### Manual Control

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-button
    :label="`Click top ${show ? 'close' : 'open'} dropdown`"
    :theme="show ? 'negative' : 'primary'"
    @click="show = !show"
  />
  <c-dropdown
    v-model="show"
    manual
    :width-within-parent="false"
  >
    <h3>Click the button</h3>
    <template #drop-content>
      <div class="custom-width">
        Some long content.
        Some long content.
        Some long content.
        Some long content.
      </div>
    </template>
  </c-dropdown>
</template>
<style scoped>
h3 {
  margin-left: 12px;
}
.custom-width {
  width: 400px;
  padding: 24px;
}
</style>
```
