import React from 'react'
import { CSize, CSlot, CTheme } from 'casual-types'
import { useTheme, useSize } from 'casual-ui-react'
import { matClose } from '@quasar/extras/material-icons'
import clsx from 'clsx'
import CIcon from '../icon/CIcon'
interface CTagProps {
  /**
   * The label text.
   * @zh 标签内文字
   */
  label?: string
  /**
   * The theme color.
   * @zh 主题
   */
  theme?: CTheme
  /**
   * The size of tag.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether the tag has rounded border or not.
   * @zh 是否为圆角
   */
  rounded?: boolean
  /**
   * Determine whether the tag has a close icon or not.
   * @zh 是否可关闭，设置为<code>true</code>会展示一个关闭图标
   */
  closeable?: boolean
  /**
   * Customize the prefix content
   * @zh 自定义前置内容
   */
  prefix?: CSlot
  /**
   * Emit when the close icon clicked.
   * @zh 点击关闭图标触发
   */
  onClose?: () => void
}

const CTag = ({
  theme,
  prefix,
  label,
  closeable = false,
  size,
  rounded = false,
  onClose,
}: CTagProps) => {
  const realTheme = useTheme(theme)
  const realSize = useSize(size)

  return (
    <div
      className={clsx(
        'c-tag',
        `c-tag--theme-${realTheme}`,
        `c-h-${realSize}`,
        `c-font-${realSize}`,
        `c-px-${realSize}`,
        rounded && `c-rounded-${realSize}`
      )}
    >
      <div className="c-tag--prefix">{prefix && prefix}</div>
      <div className="c-tag--label">{label}</div>
      {closeable && (
        <div
          className={clsx('c-tag--close-icon', 'c-ml-sm')}
          onClick={e => {
            e.stopPropagation()
            onClose?.()
          }}
        >
          <CIcon content={matClose} />
        </div>
      )}
    </div>
  )
}

export default CTag

export type { CTagProps }
