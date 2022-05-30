import CasualUI from 'casual-ui-vue'
import IconsPreviewer from './src/components/IconsPreviewer.vue'
import { defineClientConfig } from '@vuepress/client'
import { CNotification } from 'casual-ui-vue'

export default defineClientConfig({
  enhance({ app }) {
    app.use(CasualUI)
    app.component('IconsPreviewer', IconsPreviewer)
  },
  rootComponents: [CNotification as any],
})
