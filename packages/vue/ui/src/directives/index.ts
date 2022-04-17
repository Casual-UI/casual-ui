import { CInnerLoading } from 'casual-ui-vue'
import { createApp } from 'vue'
import type { Directive } from 'vue'

const createLoading = (el: any, arg: any) => {
  const loadingContainer = document.createElement('div')
  el.append(loadingContainer)
  createApp(CInnerLoading).mount(loadingContainer)
  if (arg) {
    for (const key in arg as any) {
      loadingContainer.style[key as any] = arg[key]
    }
  }
}

const vLoading: Directive = {
  created: (el, binding) => {
    el.style.position = 'relative'
    if (binding.value) {
      createLoading(el, binding.arg)
    }
  },
  beforeUpdate: (el, binding) => {
    if (binding.value) {
      createLoading(el, binding.arg)
    } else {
      el.querySelector('[data-v-app]').remove()
    }
  },
}

export { vLoading }
