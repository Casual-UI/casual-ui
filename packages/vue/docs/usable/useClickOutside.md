---
title: useClickOutSide
hooksPath: usable/useClickOutside
---

### Example

```vue live
<script setup>
import { ref } from 'vue'
import {useClickOutside} from 'casual-ui-vue'
const isOutsideClick = ref(false)
const domRef = ref(null)

useClickOutside({
  elRef: domRef,
  cbInside: () => {
    isOutsideClick.value = false
  },
  cbOutside: () => {
    isOutsideClick.value = true
  },
})
</script>
<template>
  <div ref="domRef" class="click-card">Click inside or outside</div>
  <p>
    Is outside click: <code>{{ isOutsideClick }}</code>
  </p>
</template>
<style scoped>
.click-card {
  background-color: var(--casual-primary);
  padding: 24px 48px;
  color: #fff;
  display: inline-block;
  border-radius: 8px;
}
</style>
```
