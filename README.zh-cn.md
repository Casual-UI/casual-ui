### 介绍

一个随意编写的支持Vue3+以及React17+的组件库

### 在线示例 & 文档

* React 文档（暂不支持访问）
* [Vue 文档](https://casual-ui-vue.donsen.site/)

### 安装 & 使用

#### Vue3用户

* 安装依赖 

```sh
npm install casual-ui-vue
```

* 全局使用

```js
import { createApp } from 'vue'
import CasualUI from 'casual-ui-vue'
import 'casual/style.css'

const app = createApp()
app.use(CasualUI)
app.mount('#app')
```

* 局部使用

```vue
<!-- SomeComponent.vue -->
<script setup>
import { CButton } from 'casual-ui-vue'
</script>
<template>
  <c-button label="一个按钮" />
</template>
```

#### React17+用户

* 安装依赖

```sh
npm install casual-ui-react
```

* 使用

```js
import { CButton } from 'casual-ui-react'

function SomeComponent() {

  return <OButton label="A Button" />
}
```

### 参与贡献

[贡献指南](./CONTRIBUTING.md)

### 鸣谢

![Vue](./badges/vue.svg)
![Vite](./badges/vite.svg)
![Sass](./badges/sass.svg)
![PNPM](./badges/pnpm.svg)
![React](./badges/react.svg)
![ESLint](./badges/eslint.svg)
![Quasar](./badges/quasar.svg)
![Stylelint](./badges/stylelint.svg)
![Vuepress](./badges/vuepress.svg)
![Javascript](./badges/javascript.svg)
![Docusaurus](./badges/docusaurus.svg)
![VSCode](./badges/vscode.svg)

### LICENSE

MIT