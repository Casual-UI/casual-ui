import { getContext, hasContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

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
  const contextPosition = hasContext(hKey)
    ? getContext(hKey)
    : writable('center')
  if (!hasContext(hKey)) {
    setContext(hKey, contextPosition)
  }
  if (position) {
    contextPosition.set(position)
  }
  return contextPosition
}

/**
 * @param {'start' | 'center' | 'end'} [position]
 */
export const useVertical = position => {
  const contextPosition = hasContext(vKey)
    ? getContext(vKey)
    : writable('center')
  if (!hasContext(vKey)) {
    setContext(vKey, contextPosition)
  }
  if (position) {
    contextPosition.set(position)
  }
  return contextPosition
}
