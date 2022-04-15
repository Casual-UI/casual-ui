import { CInnerLoading } from 'casual-ui-vue'
import { createApp } from 'vue'
import type { Directive } from 'vue'

const createLoading = (el: any) => {
  const loadingContainer = document.createElement('div')
  el.append(loadingContainer)
  createApp(CInnerLoading).mount(loadingContainer)
}

const vLoading: Directive = {
  created: (el, binding) => {
    el.style.position = 'relative'
    if (binding.value) {
      createLoading(el)
    }
  },
  beforeUpdate: (el, binding) => {
    if (binding.value) {
      createLoading(el)
    } else {
      el.querySelector('[data-v-app]').remove()
    }
  },
}

export { vLoading }
