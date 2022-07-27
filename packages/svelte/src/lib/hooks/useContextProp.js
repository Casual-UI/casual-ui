import { getContext, hasContext, setContext } from 'svelte'
import { get, writable } from 'svelte/store'

/**
 * @param {*} key
 * @param {*} val
 * @param {*} defaultVal
 */
export default (key, val, defaultVal) => {
  if (hasContext(key)) {
    const contextVal = getContext(key)
    if (val === void 0) {
      return contextVal
    }
    contextVal.set(val)
    return contextVal
  }
  const contextVal = writable(val ? val : defaultVal)
  setContext(key, contextVal)
  return contextVal
}
