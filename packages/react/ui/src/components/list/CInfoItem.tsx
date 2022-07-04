import { CSize, CSlot } from 'casual-types'
import { CIcon, useSize } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'

interface CInfoItemProps {
  /**
   * 图标，可以是图标字符串或者CIcon组件JSX
   */
  icon?: string | typeof CIcon
  /**
   * 标题
   */
  title?: string
  /**
   * 副标题
   */
  subtitle?: string
  /**
   * 左右侧内容纵向对齐方式
   */
  align?: 'start' | 'center' | 'end'
  /**
   * 图标与标题的对齐方式
   */
  iconAlign?: 'start' | 'center' | 'end'
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 右侧追加内容
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
