import React, { useEffect } from 'react'
import clsx from 'clsx'
import { CSize } from 'casual-types'
import useGutterSize, { CGutterSizeContext } from '../../hooks/useGutterSize'
import useSize, { CSizeContext } from '../../hooks/useSize'
import CRadio from './CRadio'
import { useFormItemContext } from './CFormContext'

interface CRadioGroupProps {
  /**
   * 当前选中值
   */
  value: any
  /**
   * 当前选中值变化时触发的回调
   */
  onChange?: (value: any) => void
  /**
   * 选项数组
   */
  options: { value: string | number; label: string }[]
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 选项间距
   */
  gutterSize?: CSize
}
const CRadioGroup = ({
  size,
  onChange,
  gutterSize,
  options = [],
  value,
}: CRadioGroupProps) => {
  const realGutterSize = useGutterSize(gutterSize)
  const { validateCurrent } = useFormItemContext()
  useEffect(() => {
    if (value) {
      validateCurrent?.(value)
    }
  }, [value])
  return (
    <CGutterSizeContext.Provider value={realGutterSize}>
      <CSizeContext.Provider value={useSize(size)}>
        <div
          className={clsx(
            'c-flex',
            'c-items-center',
            'c-wrap',
            `c-gutter-${realGutterSize}`
          )}
        >
          {options.map(option => (
            <CRadio
              key={option.value}
              value={value}
              onChange={v => {
                onChange?.(v)
              }}
              selectedValue={option.value}
              label={option.label}
            />
          ))}
        </div>
      </CSizeContext.Provider>
    </CGutterSizeContext.Provider>
  )
}
export default CRadioGroup
export type { CRadioGroupProps }
