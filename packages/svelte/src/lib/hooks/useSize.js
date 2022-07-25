import useContextProp from './useContextProp'

/**
 * The size context key
 */
export const key = Symbol('c-size')

/**
 * @param size {import('casual-types').CSize | undefined}
 */
export default size => useContextProp(key, size, 'md')
