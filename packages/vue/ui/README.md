# OPay UI Vue

基于Vue3的OPay组件库

## 安装

```bash
# 使用NPM
npm install casual-ui-vue

# 使用YARN
yarn install casual-ui-vue

# 使用PNPM
pnpm install casual-ui-vue
```

## 使用

### 导入样式（必须）

```js
import 'casual-ui-vue/dist/style.css'
```

### 全局使用

```js
import { createApp } from 'vue'
import App from 'App.vue'
import OpayUI from 'casual-ui-vue'

const app = createApp(App)

app.use(OpayUI)

app.mount('#app')
```

### 局部使用

```html
<script setup>
import { CButton } from 'casual-ui-vue'
</script>
<template>
  <c-button label="按钮" />
</template>
```