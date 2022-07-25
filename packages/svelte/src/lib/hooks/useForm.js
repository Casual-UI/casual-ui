import useContextProp from './useContextProp'
import useSize from './useSize'

export const labelAlignKey = Symbol('labelAlign')
export const gutterSizeKey = Symbol('gutterSize')
export const labelDirectionKey = Symbol('labelDirection')
export const colKey = Symbol('col')
export const labelWidthKey = Symbol('labelWidth')

/**
 * @param {object} params
 * @param {'left' | 'center' | 'right'} [params.labelAlign]
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [params.size]
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [params.gutterSize]
 * @param {string} [params.labelWidth]
 * @param {number} [params.col]
 * @param {'row' | 'row-reverse' | 'column' | 'column-reverse'} [params.labelDirection]
 */
const useFormProps = ({
  gutterSize,
  labelAlign,
  size,
  labelDirection,
  col,
  labelWidth,
} = {}) => {
  return {
    contextLabelWidth: useContextProp(labelWidthKey, labelWidth, '100px'),
    contextCol: useContextProp(colKey, col, 6),
    contextLabelDirection: useContextProp(
      labelDirectionKey,
      labelDirection,
      'row'
    ),
    contextGutterSize: useContextProp(gutterSizeKey, gutterSize, 'md'),
    contextSize: useSize(size),
    contextLabelAlign: useContextProp(labelAlignKey, labelAlign, 'left'),
  }
}

export { useFormProps }
