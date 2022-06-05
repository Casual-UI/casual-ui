import { CLoading } from 'casual-ui-vue'
import { createApp } from 'vue'
import type { Directive } from 'vue'

const createLoading = (el: any, customStyles = {}) => {
  const loadingContainer = document.createElement('div')
  loadingContainer.dataset.cLoadingApp = ''
  loadingContainer.className =
    'c-inner-loading c-flex c-items-center c-justify-center'
  Object.entries(customStyles).forEach(([key, value]: any) => {
    loadingContainer.style[key] = value
  })

  el.append(loadingContainer)
  createApp(CLoading).mount(loadingContainer)
  return () => {
    loadingContainer.remove()
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
      el.querySelector('[data-c-loading-app]').remove()
    }
  },
}

export { vLoading }
