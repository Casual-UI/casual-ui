import { getContext, hasContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

/**
 * @param {*} key
 * @param {*} val
 * @param {*} defaultVal
 */
export default (key, val, defaultVal) => {
  const contextVal = hasContext(key) ? getContext(key) : writable(defaultVal)
  if (!hasContext(key)) {
    setContext(key, contextVal)
  }
  if (val) {
    contextVal.set(val)
  }
  return contextVal
}
