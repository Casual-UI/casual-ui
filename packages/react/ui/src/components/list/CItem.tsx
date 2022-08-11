import { CSize, CSlot } from 'casual-types'
import { useSize } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'

interface CItemProps {
  /**
   * The label text.
   * @zh 文字
   */
  label?: string | number
  /**
   * The size
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether the item is clickable or not.
   * @zh 是否表现为可点击交互
   */
  clickable?: boolean
  /**
   * Determine whether the item is in active status.
   * @zh 是否处于激活态
   */
  active?: boolean
  /**
   * Emit when item is clicked.
   * @zh 点击事件触发
   */
  onClick?: () => void
  /**
   * Customize content
   * @zh 自定义内容
   */
  children?: CSlot
}

const CItem = ({
  label = '',
  size,
  clickable = false,
  active = false,
  onClick,
  children,
}: CItemProps) => {
  const contextSize = useSize(size)

  return (
    <div
      className={clsx(
        'c-item',
        clickable && 'c-item--clickable',
        active && 'c-item--active',
        `c-font-${contextSize}`,
        `c-pa-${contextSize}`
      )}
      onClick={e => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {children ? children : label}
    </div>
  )
}

export default CItem

export type { CItemProps }
