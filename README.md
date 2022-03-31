### Introduction

A casual ui library for both Vue3+ and React17+

[简体中文](./README.zh-cn.md)

### Online Demos & Docs

* [React Docs]()
* [Vue Docs]()

### Install

#### For Vue3 users

* install 

```sh
npm install casual-ui-vue
```

* global use

```js
import { createApp } from 'vue'
import CasualUI from 'casual-ui-vue'
import 'casual/style.css'

const app = createApp()
app.use(CasualUI)
app.mount('#app')
```

* single use

```vue
<!-- SomeComponent.vue -->
<script setup>
import { CButton } from 'casual-ui-vue'
</script>
<template>
  <c-button label="A Button" />
</template>
```
#### For React17+ users

* install

```sh
npm install casual-ui-react
```

* usage

```js
import { CButton } from 'casual-ui-react'

function SomeComponent() {

  return <OButton label="A Button" />
}
```

### Contributing

[CONTRIBUTING](./CONTRIBUTING.md)

### Thanks

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