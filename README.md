# Casual UI

<img src="./packages/vue/docs/.vuepress/public/logo.svg" style="width: 200px;" />

## Introduction

A components lib for React17, Vue3, Svelte3

[简体中文](./README.zh_CN.md)

## Features

- Small size
- Written in TS
- Support for dark mode
- Support for customize theme color
- Strong and flexible config form

## Online Demos & Docs

- [Casual UI - React](https://casual-ui-react.donsen.site/) (Currently only Chinese. Sorry about the inconvenience.)
- [Casual UI - Vue](https://casual-ui-vue.donsen.site/) (Currently only Chinese. Sorry about the inconvenience.)
- [Casual UI - Svelte](https://casual-ui-svelte.donsen.site/) (Currently only English. Sorry about the inconvenience.)

## Install

### For Vue3+ users

- install

```sh
npm install casual-ui-vue
```

- global use

```js
import { createApp } from 'vue'
import CasualUI from 'casual-ui-vue'
import 'casual-ui-vue/dist/style.css'

const app = createApp()
app.use(CasualUI)
app.mount('#app')
```

- single use

**Notice：single usage also need import style**

```vue
<!-- SomeComponent.vue -->
<script setup>
import { CButton } from 'casual-ui-vue'
</script>
<template>
  <c-button label="A Button" />
</template>
```

### For React17+ users

- install

```sh
npm install casual-ui-react
```

- import styles in your entry file

```js
import 'casual-ui-react/dist/style.css'
```

- usage

```js
import { CButton } from 'casual-ui-react'

function SomeComponent() {
  return <OButton label="A Button" />
}
```

### For Svelte3+ users

- install

```sh
npm install -D casual-ui-svelte
```

- import styles in your entry file

```js
import 'casual-ui-svelte/style.css'
```

- use in .svelte files

```html
<script>
  import { CButton } from 'casual-ui-svelte'
</script>
<CButton label="A Button" />
```

## Contributing

[CONTRIBUTING](./CONTRIBUTING.md)

## Thanks

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
![Svelte](./badges/svelte.svg)

## LICENSE

[MIT](./LICENSE)
