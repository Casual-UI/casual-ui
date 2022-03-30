---
title: 通知
---

### 使用方式

在根组件（通常是 APP.vue）内引入并使用`<c-notification />`即可

APP.vue

```vue
<template>
  <c-notification />
  <!-- 其他内容 -->
  <router-view />
  <back-to-top />
  <!-- 其他内容 -->
</template>
```

::: tip 提示
请确保`c-notification`实例在整个`createApp`得到的应用内仅全局挂载一次
:::

### 基础使用

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

let count = 0
const openWithCount = () => {
  count++
  open({
    title: `标题${count}`,
    message: '内容',
  })
}
</script>
<template>
  <c-button label="打开通知" @click="openWithCount" />
</template>
```

### 主题

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

const openWithTheme = (theme) => {
  open({
    title: `${theme}主题`,
    message: '内容',
    theme,
  })
}
</script>
<template>
  <c-button label="打开通知" @click="openWithTheme('primary')" />
  <c-button
    theme="secondary"
    label="打开通知"
    @click="openWithTheme('secondary')"
  />
  <c-button
    theme="warning"
    label="打开通知"
    @click="openWithTheme('warning')"
  />
  <c-button
    theme="negative"
    label="打开通知"
    @click="openWithTheme('negative')"
  />
</template>
```

### 方向

```vue live
<script setup>
import {
  matArrowBack,
  matArrowUpward,
  matArrowForward,
  matArrowDownward,
  matFullscreenExit,
} from '@quasar/extras/material-icons'
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

const openWithPosition = (alignX, alignY) => {
  open({
    title: '标题',
    message: '内容',
    alignX,
    alignY,
  })
}
</script>
<template>
  <div class="c-row c-gutter-sm">
    <div>
      <c-button
        icon
        style="transform: rotate(-45deg);"
        @click="openWithPosition('start', 'start')"
      >
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('center', 'start')">
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        style="transform: rotate(45deg);"
        @click="openWithPosition('end', 'start')"
      >
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
  </div>
  <div class="c-row c-gutter-sm">
    <div>
      <c-button icon @click="openWithPosition('start', 'center')">
        <c-icon :content="matArrowBack" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('center', 'center')">
        <c-icon :content="matFullscreenExit" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('end', 'center')">
        <c-icon :content="matArrowForward" />
      </c-button>
    </div>
  </div>
  <div class="c-row c-gutter-sm">
    <div>
      <c-button
        icon
        style="transform: rotate(-45deg);"
        @click="openWithPosition('start', 'end')"
      >
        <c-icon :content="matArrowBack" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('center', 'end')">
        <c-icon :content="matArrowDownward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        style="transform: rotate(45deg);"
        @click="openWithPosition('end', 'end')"
      >
        <c-icon :content="matArrowForward" />
      </c-button>
    </div>
  </div>
</template>

```

### 不自动关闭

通过设置`timeout`为`0`，使得通知不自动关闭

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()
</script>
<template>
  <c-button
    label="打开通知"
    @click="
      open({
        title: '通知',
        message: '这是一个不会自动关闭的通知',
        timeout: 0,
        alignX: 'end',
        alignY: 'center',
      })
    "
  />
</template>
```

### 隐藏关闭按钮&手动关闭

```vue live
<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

let close = ref(null)

const onClick = () => {
  if (!close.value) {
    close.value = open({
      title: '通知',
      message: '这是一个没有关闭图标的通知',
      timeout: 0,
      closeIcon: false,
    }).close
  } else {
    close.value()
    close.value = null
  }
}
</script>
<template>
  <c-button
    :label="close ? '关闭通知' : '打开通知'"
    :theme="close ? 'negative' : 'primary'"
    @click="onClick"
  />
</template>

```

### 动态内容

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'
const { open } = useNotifications()

const openWithDynamicContent = () => {
  const { changeContent } = open({
    title: '标题',
    message: '信息',
    timeout: 7000,
  })
  setTimeout(() => {
    changeContent({
      title: '警告',
      message: '内容更改了哦',
      theme: 'warning',
    })
    setTimeout(() => {
      changeContent({
        title: '错误',
        message: '内容再次更改了哦',
        theme: 'negative',
      })
      setTimeout(() => {
        changeContent({
          title: '再见',
          message: '即将消失',
          theme: 'secondary',
        })
      }, 2000)
    }, 2000)
  }, 2000)
}
</script>
<template>
  <c-button label="打开通知" @click="openWithDynamicContent" />
</template>

```

### $notify 调用

```vue live
<template>
  <c-button
    label="打开通知"
    @click="
      $notify({
        title: '标题',
        message: '这是一条通过$notify打开的通知',
      })
    "
  />
</template>
```
<style lang="scss" scoped>
  :deep(.c-button) + .c-button {
    margin-left: 12px;
  }
</style>