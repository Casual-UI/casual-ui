import { createContext, useContext, useMemo } from 'react'
import { Required } from 'utility-types'

type Validator = (value: any) => string | false | Promise<string | false>

interface Validators {
  [key: string]: Validator[]
}

interface Errors {
  [key: string]: string | false
}

interface CFormContextProps {
  col?: number
  labelWidth?: string
  labelDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  labelAlign?: 'left' | 'right' | 'center'
  addValidator?: (field: string, newValidator: Validator[]) => void
  validateAll?: () => Promise<void> | void
  clearAll?: () => void
  validateField?: (field: string, value: any) => void | Promise<void>
  clearField?: (field: string) => void
  errors?: Errors
}

interface CFormItemContextProps {
  clearCurrent?: () => void
  validateCurrent?: (v: any) => void
  hasError?: false | string
}

export const CFormContext = createContext<CFormContextProps>({
  col: 6,
  labelWidth: '100px',
  labelAlign: 'left',
  labelDirection: 'row',
})

export const CFormItemContext = createContext<CFormItemContextProps>({})

export const useFormContext = (customValue: CFormContextProps) => {
  const contextValue = useContext(CFormContext)
  return useMemo<
    Required<
      CFormContextProps,
      'col' | 'labelAlign' | 'labelDirection' | 'labelWidth'
    >
  >(
    () => ({
      ...contextValue,
      ...{
        labelAlign: customValue.labelAlign || contextValue.labelAlign || 'left',
        labelWidth:
          customValue.labelWidth || contextValue.labelWidth || '100px',
        labelDirection:
          customValue.labelDirection || contextValue.labelDirection || 'row',
        col: customValue.col || contextValue.col || 6,
      },
    }),
    [customValue, contextValue]
  )
}

export const useFormItemContext = (
  customValue: CFormItemContextProps = {}
) => ({
  ...useContext(CFormItemContext),
  ...customValue,
})

export type { Validator, Validators, Errors }
