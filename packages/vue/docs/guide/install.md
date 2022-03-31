---
title: 安装
---

### 安装依赖

```sh
# use yarn
yarn add casual-ui-vue

# use npm
npm instal casual-ui-vue

# use pnpm
pnpm install casual-ui-vue
```

### 全局使用

* 入口文件引入样式以及注册全局插件

```js
import { createApp } from 'vue'
import App from './App.vue'
import CasualUIVue from 'casual-ui-vue' // 引入全局Vue3插件
import 'casual-ui-vue/style.css' // 引入样式文件

const app = createApp(App)

app.use(CasualUIVue) // 使用插件
```

* 组件中使用

```vue
<template>
  <c-button label="按钮" />
</template>
```

### 局部使用

* 入口文件引入样式

```js
import 'casual-ui-vue/style.css'
```

* 组件中使用

```vue
<script setup>
import { CButton } from 'casual-ui-vue'
</script>
<template>
  <c-button label="按钮" />
</template>
```
