import React, { useState } from 'react'
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
}
const CForm = ({
  size,
  col = 6,
  labelWidth = '100px',
  labelAlign,
  labelDirection,
  children,
  value,
  gutterSize,
  items = [],
}: CFormProps) => {
  const [validators, setValidators] = useState<Validators>({})

  const addValidator = (field: string, newValidator: Validator[]) => {
    setValidators({
      ...validators,
      [field]: newValidator,
    })
  }

  const [errors, setErrors] = useState<Errors>({})

  const validateAll = async () => {
    const errors = {}
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
    if (fieldRules) {
      for (const rule of fieldRules) {
        const error = await rule(value[field])
        if (error) {
          setErrors({
            ...errors,
            [field]: error,
          })
        }
      }
    }
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
    errors,
  })

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
          </div>
        </CSizeContext.Provider>
      </CGutterSizeContext.Provider>
    </CFormContext.Provider>
  )
}
export default CForm
export type { CFormProps }
