---
title: 标签
componentPath: basic/CTag
---


### 基础使用

```vue live
<template>
  <c-tag label="标签一" />
</template>
```

### 主题

```vue live
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-tag label="主色（默认）" />
    </div>
    <div>
      <c-tag label="辅色" theme="secondary" rounded />
    </div>
    <div>
      <c-tag label="警告色" theme="warning" />
    </div>
    <div>
      <c-tag label="消极色" theme="negative" />
    </div>
  </div>
</template>
```

### 圆角

```vue live
<template>
  <c-tag rounded label="圆角标签" />
</template>
```

### 尺寸

```vue live
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-tag label="超小标签" size="xs" />
    </div>
    <div>
      <c-tag label="小标签" size="sm" />
    </div>
    <div>
      <c-tag label="中等（默认）标签" />
    </div>
    <div>
      <c-tag label="大标签" size="lg" />
    </div>
    <div>
      <c-tag label="超大标签" size="xl" />
    </div>
  </div>
</template>
```

### 可关闭

```vue live
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-tag
        closeable
        label="可关闭"
        size="xs"
        theme="secondary" />
    </div>
    <div>
      <c-tag closeable label="可关闭" size="sm" />
    </div>
    <div>
      <c-tag closeable label="可关闭" theme="warning" />
    </div>
    <div>
      <c-tag closeable label="可关闭" size="lg" />
    </div>
    <div>
      <c-tag
        closeable
        label="可关闭"
        size="xl"
        theme="negative" />
    </div>
  </div>
</template>
```
