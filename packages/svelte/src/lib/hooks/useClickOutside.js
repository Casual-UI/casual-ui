import { onMount } from 'svelte'

/**
 * @param {object} params
 * @param {() => void} [params.cbInside] This would be called when the click event emit in the dom element
 * @param {() => void} [params.cbOutside] This would be called when the click event emit outside the dom element
 * @return {import('svelte/types/runtime/action').Action}
 */
export default ({ cbInside, cbOutside }) => {
  /**
   * @type {import('svelte/types/runtime/action').Action}
   */
  return node => {
    /**
     *
     * @param {*} e
     */
    const clickHandler = e => {
      if (!e.target || !node) return
      if (node.contains(e.target)) {
        cbInside?.()
      } else {
        cbOutside?.()
      }
    }

    window.addEventListener('click', clickHandler)

    /**
     * @type {import('svelte/types/runtime/action').ActionReturn}
     */
    return {
      destroy() {
        window.removeEventListener('click', clickHandler)
      },
    }
  }
}
