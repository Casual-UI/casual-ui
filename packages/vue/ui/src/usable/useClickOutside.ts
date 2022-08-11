import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

/**
 * Outside click options
 * @zh 外部点击选项
 */
interface UseClickOutsideOptions {
  /**
   * The dom element or vue component that need to be listened.
   * @zh 需要被监听的元素，需要通过ref="elRef"绑定的Ref值
   */
  elRef: Ref<any>
  /**
   * The callback that emit when the click is inside target element.
   * @zh 当点击发生在目标元素内部时的回调
   */
  cbInside?: () => void
  /**
   * The callback that emit when the click is outside target element.
   * @zh 当点击发生在目标元素外部时的回调
   */
  cbOutside?: () => void
}

/**
 * Listen to some element's inside and outside click.
 * @zh 监听元素内部、外部点击
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
    // elRef can be a dom element or a Vue component
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
