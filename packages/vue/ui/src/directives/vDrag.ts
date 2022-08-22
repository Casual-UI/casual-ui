import type { Directive } from 'vue'

const vDrag: Directive = {
  beforeMount: el => {
    el._casualDragContext = {
      previous: {},
    }
    el.setAttribute('draggable', '')
    el.addEventListener('dragstart', (e: any) => {
      console.log('drag start: ', e)
    })
    el.addEventListener('drag', (e: any) => {
      console.log('drag: ', e)
    })
    el.addEventListener('dragend', (e: any) => {
      console.log('drag end: ', e)
    })
  },
}

export default vDrag
