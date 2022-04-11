import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export default ({
  elRef,
  cbInside,
  cbOutside,
}: {
  elRef: Ref<any>
  cbInside?: () => void
  cbOutside?: () => void
}) => {
  let el: any

  const clickHandler = (e: MouseEvent) => {
    if (!e.target || !el) return
    if (el.contains(e.target as any)) {
      cbInside?.()
    } else {
      cbOutside?.()
    }
  }

  onMounted(() => {
    // ref绑定对象可能是组件或者DOM
    el = elRef.value?.$el || elRef.value
    if (!el) return

    window.addEventListener('click', clickHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('click', clickHandler)
  })
}
