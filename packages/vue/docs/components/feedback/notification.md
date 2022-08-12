---
title: Notification
---

### Use Guide

Add `c-notification` in root or global layout.

For example, in APP.vue

```vue
<template>
  <c-notification />
  <!-- Some other root/global content -->
  <router-view />
  <!-- Assume this is your back to top component -->
  <back-to-top />
  <!-- Some other root/global content -->
</template>
```

::: danger Attention
Please make sure `c-notification` only used once in whole application.
:::

### Basic Usage

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

let count = 0
const openWithCount = () => {
  count++
  open({
    title: `The number ${count}`,
    message: 'Hello, world',
  })
}
</script>
<template>
  <c-button label="Open notification" @click="openWithCount" />
</template>
```

### Themes

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

const openWithTheme = (theme) => {
  open({
    title: `Theme ${theme}`,
    message: 'Hello, world',
    theme,
  })
}
</script>
<template>
  <div class="c-row c-items-center c-wrap c-gutter-md">
    <div>
      <c-button label="Open primary notification" @click="openWithTheme('primary')" />
    </div>
    <div>
      <c-button
        theme="secondary"
        label="Open secondary notification"
        @click="openWithTheme('secondary')"
      />
    </div>
    <div>
      <c-button
        theme="warning"
        label="Open warning notification"
        @click="openWithTheme('warning')"
      />
    </div>
    <div>
      <c-button
        theme="negative"
        label="Open negative notification"
        @click="openWithTheme('negative')"
      />
    </div>
  </div>
</template>
```

### Directions

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
    title: 'Title',
    message: 'message',
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

### Disable Auto Close

Set `timeout` to `0` to disable the auto close.

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()
</script>
<template>
  <c-button
    label="Open notification"
    @click="
      open({
        title: 'Title',
        message: 'This is a notification that won\'t auto close',
        timeout: 0,
        alignX: 'end',
        alignY: 'center',
      })
    "
  />
</template>
```

### Hide Close Icon & Manual Close

```vue live
<script setup>
import { ref } from 'vue'
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

let close = ref(null)

const onClick = () => {
  if (!close.value) {
    close.value = open({
      title: 'Title',
      message: 'This is a notification that only can be closed by manual',
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
    :label="close ? 'Close notification' : 'Open notification'"
    :theme="close ? 'negative' : 'primary'"
    @click="onClick"
  />
</template>

```

### Dynamic Content

```vue live
<script setup>
import { useNotifications } from 'casual-ui-vue'
const { open } = useNotifications()

const openWithDynamicContent = () => {
  const { changeContent } = open({
    title: 'Title',
    message: 'message',
    timeout: 7000,
  })
  setTimeout(() => {
    changeContent({
      title: 'Warning',
      message: 'Content changed!',
      theme: 'warning',
    })
    setTimeout(() => {
      changeContent({
        title: 'Error',
        message: 'Content changed again!',
        theme: 'negative',
      })
      setTimeout(() => {
        changeContent({
          title: 'Goodbye',
          message: 'About to disappear',
          theme: 'secondary',
        })
      }, 2000)
    }, 2000)
  }, 2000)
}
</script>
<template>
  <c-button label="Open dynamic notification" @click="openWithDynamicContent" />
</template>

```

### Call by $notify 

```vue live
<template>
  <c-button
    label="Open notification"
    @click="
      $notify({
        title: 'Title',
        message: 'This is notification opened by $notify',
      })
    "
  />
</template>
```