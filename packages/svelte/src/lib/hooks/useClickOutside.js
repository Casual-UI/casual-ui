import { onMount } from 'svelte'

/**
 * @param {object} params
 * @param {*} params.dom any DOM Element
 * @param {() => void} [params.cbInside] This would be called when the click event emit in the dom element
 * @param {() => void} [params.cbOutside] This would be called when the click event emit outside the dom element
 */
export default ({ dom, cbInside, cbOutside }) => {
  /**
   *
   * @param {any} e
   */
  const clickHandler = e => {
    if (!e.target || !dom) return
    if (dom.contains(e.target)) {
      cbInside?.()
    } else {
      cbOutside?.()
    }
  }
  window.addEventListener('click', clickHandler)
  return () => {
    window.removeEventListener('click', clickHandler)
  }
}
