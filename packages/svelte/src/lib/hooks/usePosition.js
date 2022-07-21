import { getContext, hasContext, setContext } from 'svelte'

/**
 * The position horizontal context key
 */
export const hKey = Symbol('c-position')

/**
 * The position vertical context key
 */
export const vKey = Symbol('c-position')

/**
 * @param {'start' | 'center' | 'end'} [position]
 * This function determine whether to use the context position or the position prop
 *
 * The position prop will have a higher priority and will override the ancestors' position
 */
export const useHorizontal = position => {
  if (position) {
    setContext(hKey, position)
    return position
  }
  return hasContext(hKey) ? getContext(hKey) : 'center'
}

/**
 * @param {'start' | 'center' | 'end'} [position]
 */
export const useVertical = position => {
  if (position) {
    setContext(vKey, position)
    return position
  }
  return hasContext(vKey) ? getContext(vKey) : 'center'
}
