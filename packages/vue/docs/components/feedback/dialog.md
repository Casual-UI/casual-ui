---
title: 对话框
componentPath: popup/CDialog
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog v-model="show" title="你好">
    <div>你好，世界</div>
  </c-dialog>
  <c-button label="打开对话框" @click="show = true" />
</template>

```

### 宽度&高度

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="你好"
    width="60vw"
    body-height="60vh"
  >
    <div>你好，世界</div>
  </c-dialog>
  <c-button label="打开对话框" @click="show = true" />
</template>
```

### 无关闭图标

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="你好"
    width="60vw"
    body-height="60vh"
    :close-icon="false"
  >
    <div>你好，世界</div>
  </c-dialog>
  <c-button label="打开对话框（按esc键关闭）" @click="show = true" />
</template>
```

### 底部按钮

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="你好"
    show-confirm-btn
    show-cancel-btn
    confirm-btn-label="确认"
    cancel-btn-label="取消"
  >
    <div>你好，世界</div>
  </c-dialog>
  <c-button label="打开对话框" @click="show = true" />
</template>
```

### 位置

```vue live
<script setup>
import {
  matArrowBack,
  matArrowUpward,
  matArrowForward,
  matArrowDownward,
  matFullscreenExit,
} from '@quasar/extras/material-icons'
import { ref } from 'vue'
const show = ref(false)

const horizontalAlign = ref('center')
const verticalAlign = ref('center')

const openWithPosition = (h, v) => {
  horizontalAlign.value = h
  verticalAlign.value = v
  show.value = true
}
</script>
<template>
  <c-dialog
    v-model="show"
    title="你好"
    :horizontal-align="horizontalAlign"
    :vertical-align="verticalAlign"
  >
    <div>你好，世界</div>
  </c-dialog>
  <div class="c-row c-gutter-sm">
    <div>
      <c-button
        icon
        style="transform: rotate(-45deg)"
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
        style="transform: rotate(45deg)"
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
        style="transform: rotate(-45deg)"
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
        style="transform: rotate(45deg)"
        @click="openWithPosition('end', 'end')"
      >
        <c-icon :content="matArrowForward" />
      </c-button>
    </div>
  </div>
</template>
```

### 通过插槽自定义一些内容

```vue live
<script setup>
import { ref } from 'vue'
import { matPeople } from '@quasar/extras/material-icons'
const show = ref(false)
</script>
<template>
  <c-dialog v-model="show">
    <template #title>
      <img class="title-icon" src="/logo-dark.svg" />
    </template>
    <template #close-icon>
      <c-icon :content="matPeople" />
    </template>
    <template #footer-actions>
      <div>
        <c-button
          size="sm"
          label="关闭"
          theme="negative"
          @click="show = false"
        />
        <c-button
          size="sm"
          label="关闭"
          theme="warning"
          @click="show = false"
        />
      </div>
    </template>
  </c-dialog>
  <c-button label="打开对话框" @click="show = true" />
</template>
<style scoped>
.title-icon {
  width: 80px;
}
</style>
```

### 模拟抽屉

```vue live
<script setup>
import { ref } from 'vue'
const left = ref(false)
const top = ref(false)
const right = ref(false)
const bottom = ref(false)
</script>
<template>
  <c-dialog
    v-model="left"
    exchange-animation-direction
    title="左侧抽屉"
    :rounded="false"
    :custom-style="{
      height: '100vh'
    }"
    width="80vw"
    vertical-align="center"
    horizontal-align="start">
    内容
  </c-dialog>
  <c-dialog
    v-model="right"
    exchange-animation-direction
    title="右侧抽屉"
    :rounded="false"
    width="80vw"
    :custom-style="{
      height: '100vh'
    }"
    vertical-align="center"
    horizontal-align="end">
    内容
  </c-dialog>
  <c-dialog
    v-model="top"
    title="顶部抽屉"
    :rounded="false"
    width="100vw"
    vertical-align="start"
    horizontal-align="center">
    内容
  </c-dialog>
  <c-dialog
    v-model="bottom"
    title="底部抽屉"
    :rounded="false"
    width="100vw"
    vertical-align="end"
    horizontal-align="center">
    内容
  </c-dialog>
  <div class="c-row c-items-center c-wrap c-gutter-md">
    <div>
      <c-button label="打开左侧抽屉" @click="left = true" />
    </div>
    <div>
      <c-button label="打开顶部抽屉" @click="top = true" />
    </div>
    <div>
      <c-button label="打开右侧抽屉" @click="right = true" />
    </div>
    <div>
      <c-button label="打开底部抽屉" @click="bottom = true" />
    </div>
  </div>
</template>
```