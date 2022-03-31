import { defineClientAppEnhance } from '@vuepress/client'
import ComponentDoc from './components/ComponentDoc.vue'
import DemoCode from './components/DemoCode.vue'
import { CExpansion } from 'casual-ui-vue'
import { defineAsyncComponent } from 'vue'

export default defineClientAppEnhance(({ app }) => {
  app.component(CExpansion.name, CExpansion)
  app.component('ComponentDoc', ComponentDoc)
  app.component('DemoCode', DemoCode)
})
