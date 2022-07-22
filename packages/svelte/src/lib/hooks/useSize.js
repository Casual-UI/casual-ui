import { getContext, hasContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

/**
 * The size context key
 */
export const key = Symbol('c-size')

/**
 * @param size {import('casual-types').CSize | undefined}
 */
export default size => {
  const contextSize = hasContext(key) ? getContext(key) : writable('md')
  if (!hasContext(key)) {
    setContext(key, contextSize)
  }
  if (size) {
    contextSize.set(size)
  }
  return contextSize
}
