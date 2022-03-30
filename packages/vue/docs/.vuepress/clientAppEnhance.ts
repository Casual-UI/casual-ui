import { defineClientAppEnhance } from '@vuepress/client'
import ComponentDoc from './components/ComponentDoc.vue'
import DemoCode from './components/DemoCode.vue'
import OpayUI from 'casual-ui-vue'
import IconsPreviewer from './components/IconsPreviewer.vue'
import { defineAsyncComponent } from 'vue'

export default defineClientAppEnhance(({ app }) => {
  app.use(OpayUI)
  app.component('ComponentDoc', ComponentDoc)
  app.component('DemoCode', DemoCode)
  app.component('IconsPreviewer', IconsPreviewer)
  const globalComponents = import.meta.glob('./.temp/.casual/**/*.vue')
  Object.entries(globalComponents).forEach(([key, importFunc]) => {
    const name = key.split('/').at(-1)?.replace(/\.vue/, '')
    if (!name) return
    app.component(name, defineAsyncComponent(importFunc))
  })
})
