---
title: 折叠器
componentPath: interact/CExpansion
---

### 基础示例

```vue live
<template>
  <c-expansion title="点我打开/关闭">
    <div class="c-px-lg">
      <p>代码能够运行并满足业务要求是最低标准</p>
    </div>
  </c-expansion>
</template>
```

### 标题图标

```vue live
<script setup>
import { matPeople } from '@quasar/extras/material-icons'
</script>
<template>
  <c-expansion title="标题左侧图标" :icon="matPeople">
    <div class="c-px-lg">
      <p>代码能够运行并满足业务要求是最低标准</p>
    </div>
  </c-expansion>
  <c-expansion title="自定义icon插槽图标">
    <template #icon>
      <img style="width: 80px;" src="/logo-dark.svg" />
    </template>
    <div class="c-px-lg">
      <p>代码能够运行并满足业务要求是最低标准</p>
    </div>
  </c-expansion>
</template>
```

### 自定义箭头

```vue live
<script setup>
import { matPeople, matNaturePeople, matArrowCircleDown } from '@quasar/extras/material-icons'
</script>
<template>
  <c-expansion title="自定义arrow插槽图标">
    <template #arrow>
      <c-icon :content="matArrowCircleDown" />
    </template>
    <div class="c-px-lg">
      <p>你可以通过<code>expandStatus</code>为展开/折叠状态设置不同的icon</p>
    </div>
  </c-expansion>
  <c-expansion title="自定义arrow插槽图标">
    <template #arrow="{ expandStatus }">
      <c-icon :content="expandStatus ? matPeople : matNaturePeople" />
    </template>
    <div class="c-px-lg">
      <p>你可以通过<code>expandStatus</code>为展开/折叠状态设置不同的icon</p>
    </div>
  </c-expansion>
</template>
```
