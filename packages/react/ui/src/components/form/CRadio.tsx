import React from 'react'
import { CSize } from 'casual-types'
import { useSize } from 'casual-ui-react'
import clsx from 'clsx'
import { useFormItemContext } from './CFormContext'

type CRadioModel = boolean | string | number

interface CRadioProps {
  /**
   * The current value.
   * @zh 当前值
   */
  value: CRadioModel
  /**
   * Emit when the current value change.
   * @zh 值发生变化时触发
   */
  onChange?: (newValue: CRadioModel) => void
  /**
   * The value used for checked status.
   * @zh 选中时的值
   */
  selectedValue?: CRadioModel
  /**
   * The label text.
   * @zh 文字
   */
  label?: string
  /**
   * The size of radio.
   * @zh 尺寸
   */
  size?: CSize
  /**
   *  Determine whether the radio is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
}

const CRadio = ({
  label = '',
  size,
  value,
  selectedValue = true,
  onChange,
  disabled = false,
}: CRadioProps) => {
  const realSize = useSize(size)
  const { hasError } = useFormItemContext()
  return (
    <div
      className={clsx(
        'c-radio',
        `c-font-${realSize}`,
        `c-h-${size}`,
        `c-radio--size-${size}`,
        value === selectedValue && 'c-radio--selected',
        disabled && 'c-radio--disabled',
        hasError && 'c-radio--has-error'
      )}
      onClick={() => {
        if (disabled) return
        onChange?.(value === selectedValue ? '' : selectedValue)
      }}
    >
      <svg
        className="c-radio--circle-wrapper"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"></path>
        <path
          className="c-radio--inner-circle"
          d="M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
        ></path>
      </svg>
      <div className="c-radio--label">{label}</div>
    </div>
  )
}

export default CRadio

export type { CRadioProps, CRadioModel }
