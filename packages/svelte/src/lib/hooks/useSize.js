import { getContext, hasContext, setContext } from 'svelte'

/**
 * The size context key
 */
export const key = Symbol('c-size')

/**
 * @param size {import('casual-types').CSize | undefined}
 */
export default size => {
  if (size) {
    setContext(key, size)
    return size
  }
  return hasContext(key) ? getContext(key) : 'md'
}
