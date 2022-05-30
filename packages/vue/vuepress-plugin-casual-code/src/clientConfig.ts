import ComponentDoc from './components/ComponentDoc.vue'
import DemoCode from './components/DemoCode.vue'
import HooksApi from './components/HooksApi.vue'
import { CExpansion } from 'casual-ui-vue'
import { defineAsyncComponent } from 'vue'
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CExpansion', CExpansion)
    app.component('ComponentDoc', ComponentDoc)
    app.component('DemoCode', DemoCode)
    app.component('HooksApi', HooksApi)
    app.config.globalProperties.$resolveCasual = defineAsyncComponent
  },
})