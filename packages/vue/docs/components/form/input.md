---
title: 输入框
componentPath: form/CInput
eventsNameWidth: 140px
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-input v-model="inputValue" placeholder="预设内容" />
    </div>
    <div>
      <c-input v-model="inputValue" type="password" placeholder="密码输入框" />
    </div>
    <div>
      <c-input v-model="inputValue" rounded placeholder="圆角输入框" />
    </div>
    <div>
      <c-input v-model="inputValue" disabled placeholder="禁用态" />
    </div>
  </div>
</template>
```
### 尺寸

```vue live
<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-input v-model="inputValue" placeholder="超小尺寸" size="xs" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="小尺寸" size="sm" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="中等尺寸（默认）" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="大尺寸" size="lg" />
    </div>
    <div>
      <c-input v-model="inputValue" placeholder="超大尺寸" size="xl" />
    </div>
  </div>
</template>
```

### 可清除

```vue live
<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <c-input v-model="inputValue" placeholder="请输入..." clearable />
</template>
```

### 前置与后置

```vue live
<script setup>
import { matDateRange, matContactPhone } from '@quasar/extras/material-icons'
import { ref } from 'vue'

const value = ref('')
</script>
<template>
  <div class="c-row c-items-center c-gutter-x-lg">
    <div>
      <c-input v-model="value">
        <template #prefix> +234 </template>
        <template #suffix> @someone </template>
      </c-input>
    </div>
    <div>
      <c-input v-model="value" placeholder="suffix图标" clearable>
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

### 加载态

```vue live
<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <div class="c-row c-gutter-x-md">
    <div>
      <c-input v-model="value" loading placeholder="加载中..." />
    </div>
    <div>
      <c-input v-model="value" loading placeholder="加载中...">
        <template #loading>
          <c-loading-bar color="cyan" />
        </template>
      </c-input>
    </div>
  </div>
</template>
```
