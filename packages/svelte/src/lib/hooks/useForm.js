import { getContext } from 'svelte'
import useContextProp, { useWithoutAffectAncestor } from './useContextProp'
import useSize, { useSizeWithoutChangeParent } from './useSize'

const hasErrorKey = Symbol('hasError')
const validateCurrentKey = Symbol('validateCurrent')
const clearCurrentKey = Symbol('clearCurrent')
const labelAlignKey = Symbol('labelAlign')
const gutterSizeKey = Symbol('gutterSize')
const labelDirectionKey = Symbol('labelDirection')
const colKey = Symbol('col')
const labelWidthKey = Symbol('labelWidth')

/**
 * @param {object} params
 * @param {'left' | 'center' | 'right'} [params.labelAlign]
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [params.size]
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [params.gutterSize]
 * @param {string} [params.labelWidth]
 * @param {number} [params.col]
 * @param {'row' | 'row-reverse' | 'column' | 'column-reverse'} [params.labelDirection]
 */
const useFormProps = (
  { gutterSize, labelAlign, size, labelDirection, col, labelWidth } = {},
  breakParent = false
) => {
  const user = breakParent ? useWithoutAffectAncestor : useContextProp
  const sizeUser = breakParent ? useSizeWithoutChangeParent : useSize
  return {
    contextLabelWidth: user(labelWidthKey, labelWidth, '80px'),
    contextCol: user(colKey, col, 6),
    contextLabelDirection: user(labelDirectionKey, labelDirection, 'row'),
    contextGutterSize: user(gutterSizeKey, gutterSize, 'md'),
    contextSize: sizeUser(size),
    contextLabelAlign: useWithoutAffectAncestor(
      labelAlignKey,
      labelAlign,
      'left'
    ),
  }
}

const useValidator = () => {
  /**
   * @type {() => void=}
   */
  const validateCurrent = getContext(validateCurrentKey)

  /**
   * @type {() => void=}
   */
  const clearCurrent = getContext(clearCurrentKey)

  /**
   * @type {import('svelte/types/runtime/store').Writable<string | false>=}
   */
  const hasError = getContext(hasErrorKey)
  return {
    validateCurrent,
    clearCurrent,
    hasError,
  }
}

export {
  useFormProps,
  useValidator,
  hasErrorKey,
  validateCurrentKey,
  clearCurrentKey,
}
