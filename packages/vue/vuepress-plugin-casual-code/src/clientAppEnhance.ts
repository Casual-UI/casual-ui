import { defineClientAppEnhance } from '@vuepress/client'
import ComponentDoc from './components/ComponentDoc.vue'
import DemoCode from './components/DemoCode.vue'
import HooksApi from './components/HooksApi.vue'
import { CExpansion } from 'casual-ui-vue'
import { defineAsyncComponent } from 'vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('CExpansion', CExpansion)
  app.component('ComponentDoc', ComponentDoc)
  app.component('DemoCode', DemoCode)
  app.component('HooksApi', HooksApi)
  app.config.globalProperties.$resolveCasual = defineAsyncComponent
})
