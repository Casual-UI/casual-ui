import { CSize, CSlot } from 'casual-types'
import { useSize } from 'casual-ui-react'
import clsx from 'clsx'
import React from 'react'
import { CSizeContext } from '../../hooks/useSize'
import CItem from './CItem'

interface CListProps {
  /**
   * List item config array.
   * @zh 列表项配置
   */
  items?: any[]
  /**
   * The key of each item.
   * @zh 列表项的唯一键值
   */
  itemKey?: string
  /**
   * Determine whether the items is clickable or not.
   * @zh 列表项是否可点击
   */
  clickable?: boolean
  /**
   * The size
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Function to determine whether item is in active status or not.
   * @zh 计算列表项是否处于激活态的函数
   */
  activeFn?: (item: any) => boolean
  /**
   * Customize the content display when no items is provided.
   * @zs 自定义无数据时内容
   */
  customNoData?: JSX.Element | string
  /**
   * Emit when the item is clicked.
   * @zh 项点击触发
   */
  onItemClick?: (item: any) => void
  /**
   * Determine whether to use a divider between each item or not.
   * @zh 项之间是否具有分割线
   */
  divider?: boolean
  /**
   * Custom item render.
   * @zh 自定义项渲染
   */
  itemRender?: (params: {
    item: any
    clickable?: boolean
    size?: CSize
    onItemClick?: (item: any) => void
    active?: boolean
    divider?: boolean
  }) => CSlot
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
  itemRender,
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
          >
            {itemRender &&
              itemRender({
                item,
                active: activeFn(item),
                onItemClick,
                clickable,
                size,
                divider,
              })}
          </CItem>
        ))}
      </div>
    </CSizeContext.Provider>
  )
}

export default CList

export type { CListProps }
