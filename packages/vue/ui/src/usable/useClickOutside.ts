import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

/**
 * 外部点击选项
 */
interface UseClickOutsideOptions {
  /**
   * 需要被监听的元素，需要通过ref="elRef"绑定的Ref值
   */
  elRef: Ref<any>
  /**
   * 当点击发生在目标元素内部时的回调
   */
  cbInside?: () => void
  /**
   * 当点击发生在目标元素外部时的回调
   */
  cbOutside?: () => void
}

/**
 * 监听元素内部、外部点击
 */
const useClickOutside = ({
  elRef,
  cbInside,
  cbOutside,
}: UseClickOutsideOptions) => {
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

export default useClickOutside

export type { UseClickOutsideOptions }
