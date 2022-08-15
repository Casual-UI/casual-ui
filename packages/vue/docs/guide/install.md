---
title: Install
---

### Install Dependencies

```sh
# use yarn
yarn add casual-ui-vue

# use npm
npm install casual-ui-vue

# use pnpm
pnpm install casual-ui-vue
```

### Global Usage

- Import Styles & Use as a Plugin

```js
import { createApp } from 'vue'
import App from './App.vue'
import CasualUIVue from 'casual-ui-vue' // import global plugin
import 'casual-ui-vue/dist/style.css' // import styles

const app = createApp(App)

app.use(CasualUIVue) // use plugin
```

- Directly use in vue files

```vue
<template>
  <c-button label="A Button" />
</template>
```

### Usage on Demand

- Import styles in client entry file

```js
import 'casual-ui-vue/style.css'
```

- Use in vue files

```vue
<script setup>
import { CButton } from 'casual-ui-vue'
</script>
<template>
  <c-button label="A Button" />
</template>
```
