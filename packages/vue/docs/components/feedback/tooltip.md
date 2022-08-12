---
title: Tooltip
componentPath: popup/CTooltip
---

### Usage

```vue live
<template>
  <c-tooltip content="Some tooltip message">
    <c-button label="Hover Me" />
  </c-tooltip>
</template>
```

### Positions

```vue live
<script setup>
const positions = [
  'top-left',
  'top',
  'top-right',
  'right-top',
  'right',
  'right-bottom',
  'bottom-left',
  'bottom',
  'bottom-right',
  'left-top',
  'left',
  'left-bottom',
]
</script>
<template>
  <div class="tooltips">
    <c-tooltip
      v-for="p in positions"
      :content="`A message rom position ${p}`"
      :position="p"
    >
      {{ p }}
    </c-tooltip>
  </div>
</template>
<style scoped>
.tooltips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.tooltips > div {
  line-height: 3em;
  text-align: center;
  background-color: var(--casual-primary);
  color: #eee;
}
</style>
```

### Custom Content

```vue live
<template>
  <c-tooltip
    position="right"
    trigger="click"
  >
    <c-button label="Click Me" />
    <template #popup>
      <div class="custom-content">
        I'm a custom content.
        <c-button
          rounded
          flat
          label="Even with a button"
        />
      </div>
    </template>
  </c-tooltip>
</template>
<style scoped>
.custom-content {
  white-space: nowrap;
  background: #333;
  padding: 12px;
  color: #fff;
}
</style>
```

### Trigger Methods

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
    <c-tooltip content="Hello, world">
      <c-button
        outlined
        rounded
        label="Hover (default)"
      />
    </c-tooltip>
    <c-tooltip
      trigger="click"
      content="Hello, world"
    >
      <c-button
        rounded
        label="Click"
      />
    </c-tooltip>
    <div>
      <c-button
        label="Manual"
        flat
        @click="toggleShow"
      />
      <c-tooltip
        v-model:show="show"
        trigger="manual"
        content="Hello, world"
        style="margin-left: 12px;"
      >
        Click the left button
      </c-tooltip>
    </div>
  </div>
</template>
<style scoped>
.popups {
  display: flex;
}
div + div {
  margin-left: 12px;
}
</style>
```
