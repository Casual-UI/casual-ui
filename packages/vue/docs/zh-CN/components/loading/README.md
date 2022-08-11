---
title: 加载中
componentPath: basic/loading/CLoading
---

### 基础使用

```vue live
<template>
  <c-loading />
</template>
```

### 尺寸

通过直接设置css的`font-size`属性，使用不同尺寸的加载态

```vue live
<template>
  <c-loading style="font-size: 24px;" />
  <c-loading style="font-size: 100px;" />
  <c-loading style="font-size: 10vw;" />
</template>
```

### 颜色

直接设置css的`color`属性，设置不同的颜色

```vue live
<template>
  <div style="font-size: 6em;">
    <c-loading style="color: rgb(0, 184, 118);" />
    <c-loading style="color: orange;" />
    <c-loading style="color: #FF0080;" />
  </div>
</template>
```

::: tip 提示
因为`color`与`font-size`属性是可继承的  
你也可以通过直接定义父容器的`color`以及`font-size`属性来达到相同的效果

```vue live
<template>
  <span style="color: blue;font-size: 6em;">
    <c-loading />
  </span>
</template>
```

:::

### 厚度

```vue live
<template>
  <div style="font-size: 6em; color: #FF0080;">
    <c-loading :thickness="2" />
    <c-loading :thickness="5" />
    <c-loading :thickness="10" />
  </div>
</template>
```

### 不同的加载动画

```vue live
<template>
  <div class="o-flex c-wrap c-items-center c-gutter-md" style="font-size: 3em;">
    <c-loading style="color: #FF0080" />
    <c-loading-audio style="color: #9c27b0" />
    <c-loading-dot style="color: #ff9800" />
    <c-loading-bar style="color: #2196f3" />
    <c-loading-spin-box style="color: #f44336" />
    <c-loading-clock style="color: #00bcd4" />
    <c-loading-comment style="color: #FF0080" />
    <c-loading-cube style="color:#3f51b5" />
    <c-loading-dots style="color:blue" />
    <c-loading-bars style="color:#03a9f4" />
    <c-loading-gear style="color:#00bcd4" />
    <c-loading-lattice style="color:#009688" />
    <c-loading-heart style="color:#4caf50" />
    <c-loading-hourglass style="color:#8bc34a" />
    <c-loading-infinity style="color:#1976d2" />
    <c-loading-circle-bars style="color:#f44336" />
    <c-loading-orbit style="color:#2196f3" />
    <c-loading-oval style="color:#9c27b0" />
    <c-loading-pie style="color:#ff5722" />
    <c-loading-puff style="color:#26A69A" />
    <c-loading-wifi style="color:#795548" />
    <c-loading-rings style="color:#9e9e9e" />
    <c-loading-tail style="color:#607d8b" />
  </div>
</template>
```
