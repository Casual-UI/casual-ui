---
title: Slider
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const val = ref(50)
</script>
<template>
  <c-slider v-model="val" />
</template>
```