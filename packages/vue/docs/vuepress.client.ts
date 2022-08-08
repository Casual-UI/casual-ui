import CasualUI from 'casual-ui-vue'
import { defineClientConfig } from '@vuepress/client'
import { CNotification } from 'casual-ui-vue'
import 'uno.css'

export default defineClientConfig({
  enhance({ app }) {
    app.use(CasualUI as any)
  },
  rootComponents: [CNotification as any],
})
