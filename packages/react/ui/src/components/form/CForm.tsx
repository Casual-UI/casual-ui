import React, { forwardRef, useState, useImperativeHandle, Ref } from 'react'
import clsx from 'clsx'
import {
  CFormContext,
  Validator,
  Validators,
  Errors,
  useFormContext,
} from './CFormContext'
import useSize, { CSizeContext } from '../../hooks/useSize'
import { CSize, CSlot } from 'casual-types'
import useGutterSize, { CGutterSizeContext } from '../../hooks/useGutterSize'
import CFormItem, { CFormItemProps } from './CFormItem'
import CLoadingBars from '../basic/loading/CLoadingBars'

interface CFormProps {
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 尺寸
   */
  gutterSize?: CSize
  /**
   * 每个表单项所占列数
   */
  col?: number
  /**
   * 文字与表单排列方向
   */
  labelDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  /**
   * 文本提示宽度
   */
  labelWidth?: string
  /**
   * 文字对齐方向，表现为text-align的值
   */
  labelAlign?: 'left' | 'right' | 'center'
  /**
   * 表单当前值
   */
  value: any
  /**
   * 表单项
   */
  items: CFormItemProps[]
  /**
   * 自定义内容
   */
  children?: CSlot
  /**
   * 表单是否处于验证中
   */
  validating?: boolean
  /**
   * 表单验证中状态变更
   */
  onValidatingChange?: (validating: boolean) => void
}
const FormWithoutForward = (
  {
    size,
    col = 6,
    labelWidth = '100px',
    labelAlign,
    labelDirection,
    children,
    value,
    gutterSize,
    items = [],
    validating,
    onValidatingChange,
  }: CFormProps,
  ref: Ref<{
    validateAll: () => void | Promise<void>
    clearAll: () => void
  }>
) => {
  const validators: Validators = {}

  const addValidator = (field: string, newValidator: Validator[]) => {
    validators[field] = newValidator
  }

  const [errors, setErrors] = useState<Errors>()

  const clearAll = () => {
    setErrors({})
  }

  const realGutterSize = useGutterSize(gutterSize)

  const clearField = (field: string) => {
    setErrors({
      ...errors,
      [field]: false,
    })
  }

  const validateField = async (field: string) => {
    const fieldRules = validators[field]
    let hasError: string | false = false
    if (fieldRules) {
      for (const rule of fieldRules) {
        const error = await rule(value[field])
        if (error) {
          hasError = error
          break
        }
      }
    }
    setErrors({
      ...errors,
      [field]: hasError,
    })
  }

  const validateAll = async () => {
    onValidatingChange?.(true)
    const errors: Errors = {}
    for (const field in validators) {
      const rules = validators[field]
      for (const rule of rules) {
        const error = await rule(value[field])
        if (error) {
          errors[field] = error
          break
        }
      }
    }
    setErrors(errors)
    onValidatingChange?.(false)
  }

  const formContextValue = useFormContext({
    col,
    labelAlign,
    labelWidth,
    labelDirection,
    validateAll,
    addValidator,
    clearField,
    validateField,
    clearAll,
    errors,
  })

  useImperativeHandle(ref, () => ({
    validateAll,
    clearAll,
  }))

  return (
    <CFormContext.Provider value={formContextValue}>
      <CGutterSizeContext.Provider value={realGutterSize}>
        <CSizeContext.Provider value={useSize(size)}>
          <div
            className={clsx(
              'c-form',
              'c-row',
              'c-item-center',
              'c-wrap',
              `c-gutter-${realGutterSize}`
            )}
          >
            {items.map((item, i) => (
              <CFormItem key={item.field ? item.field : i} {...item} />
            ))}
            {children}
            {validating && (
              <div className="c-form--validating-loading c-flex c-items-center c-justify-center">
                <CLoadingBars />
              </div>
            )}
          </div>
        </CSizeContext.Provider>
      </CGutterSizeContext.Provider>
    </CFormContext.Provider>
  )
}
const CForm = forwardRef(FormWithoutForward)
export default CForm
export type { CFormProps }
