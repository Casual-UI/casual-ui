import ComponentDoc from './components/ComponentDoc.vue'
import DemoCode from './components/DemoCode.vue'
import HooksApi from './components/HooksApi.vue'
import { defineAsyncComponent } from 'vue'
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app }) {
    app.component('ComponentDoc', ComponentDoc as any)
    app.component('DemoCode', DemoCode as any)
    app.component('HooksApi', HooksApi as any)
    app.config.globalProperties.$resolveCasual = defineAsyncComponent
  },
})
