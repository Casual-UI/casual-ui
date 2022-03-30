import { CSize } from 'casual-types'
import { useSize } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'

interface CToggleProps {
  /**
   * 文案
   */
  label?: string
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 绑定值，用于<code>v-model</code>绑定用
   */
  value: any
  /**
   * 值变化时触发
   */
  onChange?: (newValue: any) => void
  /**
   * 选中时的值
   */
  checkValue?: any
  /**
   * 未选中时的值
   */
  uncheckValue?: any
  /**
   * 是否禁用
   */
  disabled?: boolean
}

const CToggle = ({
  size,
  label = '',
  value,
  onChange,
  checkValue = true,
  uncheckValue = false,
  disabled = false,
}: CToggleProps) => {
  const realSize = useSize(size)

  const onToggle = () => {
    if (disabled) return
    onChange?.(value === checkValue ? uncheckValue : checkValue)
  }

  return (
    <div
      className={clsx(
        'c-toggle',
        `c-toggle--size-${realSize}`,
        `c-h-${realSize}`,
        `c-font-${realSize}`,
        value === checkValue && 'c-toggle--checked',
        disabled && 'c-toggle--disabled'
      )}
      onClick={onToggle}
    >
      <div className="c-toggle--track">
        <div className="c-toggle--dot"></div>
      </div>
      <div className="c-toggle--label">{label}</div>
    </div>
  )
}

export default CToggle

export type { CToggleProps }
