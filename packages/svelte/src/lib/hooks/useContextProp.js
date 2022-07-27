import { getContext, hasContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

/**
 * @param {*} key
 * @param {*} val
 * @param {*} defaultVal
 */
export default (key, val, defaultVal) => {
  const contextVal = val
    ? writable(val)
    : hasContext(key)
    ? getContext(key)
    : writable(defaultVal)
  setContext(key, contextVal)
  return contextVal
}
