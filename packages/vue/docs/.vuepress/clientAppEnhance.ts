import { defineClientAppEnhance } from '@vuepress/client'
import CasualUI from 'casual-ui-vue'
import IconsPreviewer from './components/IconsPreviewer.vue'

export default defineClientAppEnhance(({ app }) => {
  app.use(CasualUI)
  app.component('IconsPreviewer', IconsPreviewer)
})
