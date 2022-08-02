import { getContext, hasContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

/**
 * @param {*} key
 * @param {*} val
 * @param {*} defaultVal
 */
export default (key, val, defaultVal) => {
  const hasVal = val !== void 0
  if (hasContext(key)) {
    const contextVal = getContext(key)
    if (!hasVal) {
      return contextVal
    }
    contextVal.set(val)
    return contextVal
  }
  const contextVal = writable(val ? val : defaultVal)
  setContext(key, contextVal)
  return contextVal
}

/**
 * @param {*} key
 * @param {*} val
 * @param {*} defaultVal
 */
export const useWithoutAffectAncestor = (key, val, defaultVal) => {
  const hasVal = val !== void 0
  if (!hasContext(key)) {
    const contextVal = writable(hasVal ? val : defaultVal)
    setContext(key, contextVal)
    return contextVal
  }
  return writable(hasVal ? val : defaultVal)
}
