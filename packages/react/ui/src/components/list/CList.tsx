import { CSize } from 'casual-types'
import { useSize } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'
import { CSizeContext } from '../../hooks/useSize'
import CItem from './CItem'

interface CListProps {
  /**
   * 列表项
   */
  items?: any[]
  /**
   * 列表项的唯一键值
   */
  itemKey?: string
  /**
   * 是否可点击
   */
  clickable?: boolean
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 计算列表项是否处于激活态的函数
   */
  activeFn?: (item: any) => boolean
  /**
   * 自定义无数据时内容
   */
  customNoData?: JSX.Element | string
  /**
   * 项点击触发
   */
  onItemClick?: (item: any) => void
  /**
   * 项之间是否具有分割线
   */
  divider?: boolean
}

const CList = ({
  items = [],
  itemKey = 'id',
  clickable = false,
  size,
  customNoData,
  activeFn = () => false,
  onItemClick,
  divider = false,
}: CListProps) => {
  const contextSize = useSize(size)

  return (
    <CSizeContext.Provider value={contextSize}>
      <div className={clsx('c-list', divider && 'c-list--with-divider')}>
        {items.length === 0 &&
          (customNoData ? (
            customNoData
          ) : (
            <div className={clsx('c-list--empty', `c-px-${contextSize}`)}>
              No Data
            </div>
          ))}
        {items.map(item => (
          <CItem
            key={item[itemKey]}
            label={item.label}
            clickable={clickable}
            active={activeFn(item)}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </CSizeContext.Provider>
  )
}

export default CList

export type { CListProps }
