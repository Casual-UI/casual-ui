import { getContext, hasContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

/**
 * @param {*} key
 * @param {*} val
 * @param {*} defaultVal
 */
export default (key, val, defaultVal, affectAncestor = false) => {
  const hasVal = val !== void 0
  if (hasContext(key)) {
    let contextVal = getContext(key)
    if (!hasVal) {
      return contextVal
    }

    if (affectAncestor) {
      contextVal.set(val)
      return contextVal
    }
    contextVal = writable(val)
    setContext(key, contextVal)

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
