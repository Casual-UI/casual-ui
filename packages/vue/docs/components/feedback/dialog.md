---
title: Dialog
componentPath: popup/CDialog
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog v-model="show" title="Hi, there">
    <div>Hello, world</div>
  </c-dialog>
  <c-button label="Open Dialog" @click="show = true" />
</template>

```

### Height & Width

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="Hi, there"
    width="60vw"
    body-height="60vh"
  >
    <div>Hello, world</div>
  </c-dialog>
  <c-button label="Open Dialog" @click="show = true" />
</template>
```

### Without Close Icon

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="Hi, there"
    width="60vw"
    body-height="60vh"
    :close-icon="false"
  >
    <div>Hello, world</div>
  </c-dialog>
  <c-button label="Open Dialog（Press ESC to close）" @click="show = true" />
</template>
```

### Footer Actions

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
<template>
  <c-dialog
    v-model="show"
    title="Hi, there"
    show-confirm-btn
    show-cancel-btn
    confirm-btn-label="Confirm"
    cancel-btn-label="Cancel"
  >
    <div>Hello, world</div>
  </c-dialog>
  <c-button label="Open Dialog" @click="show = true" />
</template>
```

### Positions

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
    title="Hi, there"
    :horizontal-align="horizontalAlign"
    :vertical-align="verticalAlign"
  >
    <div>Hello, world</div>
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

### Customize Content With Slots

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
          label="Close"
          theme="negative"
          @click="show = false"
        />
        <c-button
          size="sm"
          label="Close"
          theme="warning"
          @click="show = false"
        />
      </div>
    </template>
  </c-dialog>
  <c-button label="Open Dialog" @click="show = true" />
</template>
<style scoped>
.title-icon {
  width: 80px;
}
</style>
```

### Drawer Simulation

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
    title="Left Drawer"
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
    title="Right Drawer"
    :rounded="false"
    width="80vw"
    :custom-style="{
      height: '100vh'
    }"
    vertical-align="center"
    horizontal-align="end">
    Content
  </c-dialog>
  <c-dialog
    v-model="top"
    title="Top Drawer"
    :rounded="false"
    width="100vw"
    vertical-align="start"
    horizontal-align="center">
    Content
  </c-dialog>
  <c-dialog
    v-model="bottom"
    title="Bottom Drawer"
    :rounded="false"
    width="100vw"
    vertical-align="end"
    horizontal-align="center">
    Content
  </c-dialog>
  <div class="c-row c-items-center c-wrap c-gutter-md">
    <div>
      <c-button label="Open left drawer" @click="left = true" />
    </div>
    <div>
      <c-button label="Open top drawer" @click="top = true" />
    </div>
    <div>
      <c-button label="Open right drawer" @click="right = true" />
    </div>
    <div>
      <c-button label="Open bottom drawer" @click="bottom = true" />
    </div>
  </div>
</template>
```