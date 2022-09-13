import type { Directive } from 'vue'

const vDrag: Directive = {
  beforeMount: (el, binding) => {
    let prevX = 0
    let prevY = 0
    const { value } = binding
    const { onLeft, onUp, onDown, onRight } = value || {}
    el.setAttribute('draggable', 'false')
    el.addEventListener('touchstart', (e: any) => {
      prevX = e.pageX
      prevY = e.pageY
    })
    el.addEventListener('mousedown', (e: any) => {
      prevX = e.pageX
      prevY = e.pageY
      const mouseMoveHandler = (e: any) => {
        const deltaX = e.pageX - prevX
        const deltaY = e.pageY - prevY
        if (deltaX !== 0) {
          deltaX > 0 ? onRight?.(deltaX) : onLeft?.(-deltaX)
          prevX = e.pageX
        }
        if (deltaY !== 0) {
          deltaY > 0 ? onUp?.(deltaY) : onDown?.(-deltaY)
          prevY = e.pageY
        }
      }
      document.addEventListener('mousemove', mouseMoveHandler)
      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
      }
      document.addEventListener('mouseup', mouseUpHandler)
    })
  },
  beforeUnmount: el => {},
}

export default vDrag
