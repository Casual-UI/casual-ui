---
title: 按钮
componentPath: basic/button/CButton
---

### 基础使用

```vue live
<template>
  <c-button label="基础按钮" />
  <c-button label="轮廓按钮" outlined />
</template>
```

### 主题

```vue live
<template>
  <c-button label="主色按钮" theme="primary" />
  <c-button label="辅色按钮" theme="secondary" />
  <c-button label="警告色按钮" theme="warning" />
  <c-button label="消极色按钮" theme="negative" />
  <c-button label="主色按钮" theme="primary" outlined />
  <c-button label="辅色按钮" theme="secondary" outlined />
  <c-button label="警告色按钮" theme="warning" outlined />
  <c-button label="消极色按钮" theme="negative" outlined />
</template>
```
### 形状

```vue live
<template>
  <c-button label="圆角按钮" rounded />
  <c-button label="圆边按钮" round />
</template>

```

### 尺寸

```vue live
<template>
  <c-button label="超小尺寸" size="xs" theme="negative" />
  <c-button label="小尺寸" size="sm" theme="negative" />
  <c-button label="中等尺寸" size="md" theme="negative" />
  <c-button label="大尺寸" size="lg" theme="negative" />
  <c-button label="超大尺寸" size="xl" theme="negative" />
</template>
```

### 状态

```vue live
<template>
  <c-button label="禁用状态" disabled />
  <c-button label="加载状态" loading />
</template>

``` 

### 块级

```vue live
<template>
  <div class="c-mb-md">
    <c-button
      label="块级按钮"
      block
      size="lg"
      theme="warning" />
  </div>
  <div class="c-mb-md">
    <c-button
      label="块级按钮"
      block
      size="lg"
      rounded />
  </div>
  <div>
    <c-button
      label="块级按钮"
      block
      size="lg"
      round
      theme="negative"
      outlined
    />
  </div>
</template>

```

### 自定义Loading实例

```vue live
<template>
  <c-button label="加载中" loading>
    <template #loading>
      <c-loading-audio />
    </template>
  </c-button>
  <c-button
    label="加载中"
    loading
    outlined
    round>
    <template #loading>
      <c-loading-dot />
    </template>
  </c-button>
  <c-button
    label="加载中"
    outlined
    rounded
    loading>
    <template #loading>
      <c-loading-bar />
    </template>
  </c-button>
</template>
```

### 图标按钮

```vue live
<script setup>
import {
  matBuild,
  matCoPresent,
  matDeviceHub,
} from '@quasar/extras/material-icons'
</script>
<template>
  <c-button icon>
    <c-icon :content="matBuild" />
  </c-button>
  <c-button icon theme="secondary">
    <c-icon :content="matBuild" />
  </c-button>
  <c-button icon style="font-size: 24px" theme="warning">
    <c-icon :content="matCoPresent" />
  </c-button>
  <c-button
    outlined
    icon
    style="font-size: 32px"
    theme="negative">
    <c-icon :content="matDeviceHub" />
  </c-button>
</template>
```

<style lang="scss" scoped>
  :deep(.c-button) + .c-button {
    margin-left: 12px;
  }
</style>