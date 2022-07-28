import { hasContext, getContext } from 'svelte'
import { writable } from 'svelte/store'
import useContextProp from './useContextProp'

/**
 * The size context key
 */
export const key = Symbol('c-size')

/**
 * @param size {import('casual-types').CSize | undefined}
 */
export default size => useContextProp(key, size, 'md')

/**
 * @param size {import('casual-types').CSize | undefined}
 */
export const useSizeWithoutChangeParent = size =>
  size ? writable(size) : hasContext(size) ? getContext(size) : writable('md')
