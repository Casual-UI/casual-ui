---
title: 工具提示
componentPath: popup/CTooltip
---

### 使用

```vue live
<template>
  <c-tooltip content="一些tooltip信息">
    <c-button label="Hover Me" />
  </c-tooltip>
</template>
```

### 位置

```vue live
<template>
  <div class="tooltips">
    <c-tooltip position="left" content="一些tooltip信息">
      <c-button label="左侧" />
    </c-tooltip>
    <c-tooltip content="一些tooltip信息">
      <c-button label="上方（默认）" />
    </c-tooltip>
    <c-tooltip position="bottom" content="一些tooltip信息">
      <c-button label="下方" />
    </c-tooltip>
    <c-tooltip position="right" content="一些tooltip信息">
      <c-button label="右侧" />
    </c-tooltip>
  </div>
</template>
<style scoped lang="scss">
.tooltips {
  display: flex;
  div {
    margin-right: 12px;
  }
}
</style>
```

### 自定义内容

```vue live
<template>
  <c-tooltip position="right" trigger="click">
    <c-button label="点我" />
    <template #popup>
      <div class="custom-content">
        哇，可以使用任何元素作为自定义内容哦
        <c-button rounded outlined label="自定义按钮" />
      </div>
    </template>
  </c-tooltip>
</template>
<style scoped lang="scss">
.custom-content {
  white-space: nowrap;
  background: #333;
  padding: 12px;
  color: #fff;
}
</style>
```

### 触发方式

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)

const toggleShow = () => {
  show.value = !show.value
}
</script>
<template>
  <div class="popups">
    <c-tooltip content="你好，世界">
      <c-button outlined rounded label="悬浮（默认）" />
    </c-tooltip>
    <c-tooltip trigger="click" content="你好，世界">
      <c-button rounded label="点击" />
    </c-tooltip>
    <div>
      <c-button label="手动" @click="toggleShow" />
      <c-tooltip v-model:show="show" trigger="manual" content="你好，世界">
        点击左侧按钮手动触发
      </c-tooltip>
    </div>
  </div>
</template>
<style scoped lang="scss">
.popups {
  display: flex;
  div + div {
    margin-left: 12px;
  }
}
</style>
```
