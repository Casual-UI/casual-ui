import { CSize, CSlot } from 'casual-types'
import { CIcon, useSize } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'

interface CInfoItemProps {
  /**
   * The icon content.
   * @zh 图标内容
   */
  icon?: string | typeof CIcon
  /**
   * The title.
   * @zh 标题
   */
  title?: string
  /**
   * The subtitle.
   * @zh 副标题
   */
  subtitle?: string
  /**
   * The vertical align direction of left and right content.
   * @zh 左右侧内容纵向对齐方式
   */
  align?: 'start' | 'center' | 'end'
  /**
   * The vertical align direction of icon and title.
   * @zh 图标与标题的对齐方式
   */
  iconAlign?: 'start' | 'center' | 'end'
  /**
   * The size.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * The right content.
   * @zh 右侧追加内容
   */
  append?: CSlot
}

const CInfoItem = ({
  icon,
  title,
  subtitle,
  align = 'start',
  iconAlign = 'start',
  size,
  append,
}: CInfoItemProps) => {
  const contextSize = useSize(size)

  return (
    <div
      className={clsx(
        'c-info-item c-flex c-justify-between',
        `c-items-${align}`
      )}
    >
      <div className={clsx('c-flex c-flex-grow', `c-items-${iconAlign}`)}>
        {icon && (
          <div className={`c-mr-${contextSize}`}>
            {typeof icon === 'string' ? (
              <CIcon
                className="c-info-item--icon"
                content={icon}
              />
            ) : (
              icon
            )}
          </div>
        )}
        <div className="c-flex-grow">
          {title && <div className="c-info-item--title">{title}</div>}
          {subtitle && (
            <div className="c-info-item--subtitle c-mt-sm">{subtitle}</div>
          )}
        </div>
      </div>
      {append && append}
    </div>
  )
}

export default CInfoItem
