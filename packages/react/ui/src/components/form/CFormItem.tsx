import clsx from 'clsx'
import React, {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  useImperativeHandle,
  Ref,
} from 'react'
import { CRule, CSize, CLabelDirection, CSlot } from 'casual-types'
import { CFormItemContext, useFormContext } from './CFormContext'
import useSize, { CSizeContext } from '../../hooks/useSize'
import useGutterSize, { CGutterSizeContext } from '../../hooks/useGutterSize'

interface CFormItemProps {
  /**
   * The field this form item. It need to be a key of whole form data.
   * @zh 对应表单中的项的名称
   */
  field?: string
  /**
   * The text label
   * @zh 表单项文本
   */
  label?: string
  /**
   * The label width
   * @zh 文本宽度
   */
  labelWidth?: string
  /**
   * The direction of label and form component.  It is based on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction">flex-direction</a>
   * @zh 文本与表单元素对齐方向 基于<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction">flex-direction</a>实现
   */
  labelDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /**
   * The label align method.  It is based on <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-align">text-align</a>
   * @zh 文本对齐方式，表现为<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-align">text-align</a>的值
   */
  labelAlign?: 'left' | 'right' | 'center'
  /**
   * The col span of this form item.
   * @zh 表单项所占列数
   */
  col?: number
  /**
   * The form component.
   * @zh 具体的表单组件
   */
  children?:
    | JSX.Element
    | ((context: {
        validateCurrent: (value: any) => void
        clearCurrent: () => void
        hasError: false | string
      }) => CSlot)
  /**
   * The validators.
   * @zh 验证规则
   */
  rules?: CRule[]
  /**
   * The size
   * @zh 尺寸
   */
  size?: CSize
  /**
   * The gutter size.
   * @zh 元素间隔尺寸
   */
  gutterSize?: CSize
}
const CFormItemWithoutForwardRef = (
  {
    field,
    label,
    size,
    gutterSize,
    labelWidth,
    labelAlign,
    labelDirection,
    rules,
    col,
    children,
  }: CFormItemProps,
  ref: Ref<{
    clearCurrent: () => void
    validateCurrent: (value: any) => void | Promise<void>
    hasError: false | string
  }>
) => {
  const formContextValue = useFormContext({
    labelAlign,
    labelDirection,
    labelWidth,
    col,
  })

  if (field && rules) {
    formContextValue.addValidator?.(field, rules)
  }

  const validateCurrent = (v: any) => {
    if (field) {
      formContextValue.validateField?.(field, v)
    }
  }

  const hasError = useMemo(() => {
    if (!formContextValue.errors) return false
    if (!field) return false
    return formContextValue.errors[field]
  }, [formContextValue.errors, field])

  const clearCurrent = () => {
    if (field) {
      formContextValue.clearField?.(field)
    }
  }

  useImperativeHandle(ref, () => ({
    validateCurrent,
    clearCurrent,
    hasError,
  }))

  const realSize = useSize(size)

  const getLabelMarginPosition = (direction: CLabelDirection) => {
    return new Map<CLabelDirection, 't' | 'b' | 'l' | 'r'>([
      ['row', 'r'],
      ['row-reverse', 'l'],
      ['column', 'b'],
      ['column-reverse', 't'],
    ]).get(direction)
  }

  const [innerErrorMessage, setInnerErrorMessage] = useState(hasError)

  useEffect(() => {
    if (!hasError) {
      setTimeout(() => {
        setInnerErrorMessage('')
      }, 200)
      return
    }
    setInnerErrorMessage(hasError)
  }, [hasError])

  return (
    <CFormItemContext.Provider
      value={{
        hasError,
        clearCurrent,
        validateCurrent,
      }}
    >
      <CSizeContext.Provider value={realSize}>
        <CGutterSizeContext.Provider value={useGutterSize(gutterSize)}>
          <div
            className={clsx(
              'c-form-item',
              `c-col-${formContextValue.col}`,
              `c-${formContextValue.labelDirection}`,
              `c-col-${formContextValue.col}`,
              formContextValue.labelDirection === 'column' ||
                formContextValue.labelDirection === 'column-reverse'
                ? 'c-items-start'
                : 'c-items-center'
            )}
          >
            <div
              className={clsx(
                'c-form-item--label',
                `c-font-${realSize}`,
                `c-m${getLabelMarginPosition(
                  formContextValue.labelDirection
                )}-${realSize}`,
                `c-text-${formContextValue.labelAlign}`
              )}
              style={{
                width: formContextValue.labelWidth,
              }}
            >
              {label}
            </div>
            <div className="c-form-item--content-wrapper c-flex c-items-center">
              {typeof children === 'function'
                ? children({ validateCurrent, clearCurrent, hasError })
                : children}
              <div
                className={clsx(
                  'c-form-item--error-tip',
                  hasError
                    ? 'c-form-item--error-tip--show'
                    : 'c-form-item--error-tip--hidden'
                )}
              >
                {innerErrorMessage}
              </div>
            </div>
          </div>
        </CGutterSizeContext.Provider>
      </CSizeContext.Provider>
    </CFormItemContext.Provider>
  )
}

const CFormItem = forwardRef(CFormItemWithoutForwardRef)

export default CFormItem
export type { CFormItemProps }
