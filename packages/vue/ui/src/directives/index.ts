import { CLoading } from 'casual-ui-vue'
import { createApp } from 'vue'
import type { Directive } from 'vue'

const createLoading = (el: any) => {
  const loadingContainer = document.createElement('div')
  loadingContainer.dataset.cLoadingApp = ''
  loadingContainer.className =
    'c-inner-loading c-flex c-items-center c-justify-center'
  Object.entries(el.dataset)
    .filter(([key]) => key.startsWith('casual'))
    .forEach(([key, value]: any) => {
      const name = key.replace(/^casual/, '')
      loadingContainer.style[name[0].toLowerCase() + name.slice(1)] = value
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
      createLoading(el)
    }
  },
  beforeUpdate: (el, binding) => {
    if (binding.value) {
      createLoading(el)
    } else {
      el.querySelector('[data-c-loading-app]').remove()
    }
  },
}

export { vLoading }
