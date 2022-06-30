# Casual UI Vue

## Demos & Docs

[Casual UI - Vue](https://casual-ui-vue.donsen.site/)

## Install

```bash
# vai npm
npm install casual-ui-vue

# via yarn
yarn install casual-ui-vue

# via pnpm
pnpm install casual-ui-vue
```

## Usage

### Import styles

```js
import 'casual-ui-vue/dist/style.css'
```

### Global usage

```js
import { createApp } from 'vue'
import App from 'App.vue'
import CasualUI from 'casual-ui-vue'

const app = createApp(App)

app.use(CasualUI)

app.mount('#app')
```

### Local Usage

```html
<script setup>
  import { CButton } from 'casual-ui-vue'
</script>
<template>
  <c-button label="A Button" />
</template>
```
