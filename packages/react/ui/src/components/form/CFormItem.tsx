import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { CRule, CSize, CLabelDirection } from 'casual-types'
import { CFormItemContext, useFormContext } from './CFormContext'
import useSize, { CSizeContext } from '../../hooks/useSize'
import useGutterSize, { CGutterSizeContext } from '../../hooks/useGutterSize'

interface CFormItemProps {
  /**
   * 对应表单中的项的名称
   */
  field?: string
  /**
   * 文本提示
   */
  label?: string
  /**
   * 文本提示宽度
   */
  labelWidth?: string
  /**
   * 文本提示与表单元素对齐方向
   */
  labelDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /**
   * 文本提示对齐方向，表现为text-align的值
   */
  labelAlign?: 'left' | 'right' | 'center'
  /**
   * 表单项所占列数，该值可覆盖父级表单的col属性
   */
  col?: number
  /**
   * 具体的表单组件
   */
  children?: JSX.Element
  /**
   * 验证规则
   */
  rules?: CRule[]
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 元素间隔尺寸
   */
  gutterSize?: CSize
}
const CFormItem = ({
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
}: CFormItemProps) => {
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
    if (hasError === false) {
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
              {children}
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
export default CFormItem
export type { CFormItemProps }
