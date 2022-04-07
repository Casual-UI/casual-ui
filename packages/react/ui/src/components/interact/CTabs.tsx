import React, { useState } from 'react'
import clsx from 'clsx'
import { CSize, CSlot } from 'casual-types'
import { useSize } from 'casual-ui-react'

interface CTabItem {
  name: string
  content?: CSlot
}

interface CTabsProps {
  /**
   * 面板项配置
   */
  items: CTabItem[]
  /**
   * 当前激活的面板项名称
   */
  currentTab: string
  /**
   * 面板项切换时触发事件
   */
  onTabChange?: (tab: string) => void
  /**
   * 尺寸
   */
  size?: CSize
  /**
   * 面板是否具有根据跟随size的内边距
   */
  panelPadding?: boolean
}
const CTabs = ({
  items,
  currentTab,
  onTabChange,
  size,
  panelPadding = false,
}: CTabsProps) => {
  const realSize = useSize(size)
  const [isForward, setIsForward] = useState(true)
  const updateModelValue = (newTab: string) => {
    const currentIdx = items.findIndex(item => item.name === currentTab)
    const newIdx = items.findIndex(item => item.name === newTab)
    if (newIdx < currentIdx) {
      setIsForward(true)
    } else {
      setIsForward(false)
    }
    onTabChange?.(newTab)
  }

  return (
    <div className={clsx('c-tabs')}>
      <div className="c-tabs--header-item c-row c-items-center">
        {items.map(item => (
          <div
            key={item.name}
            className={clsx(
              `c-h-${realSize}`,
              `c-font-${realSize}`,
              `c-px-${realSize}`,
              currentTab === item.name && 'c-tabs--header-item-active'
            )}
            onClick={() => updateModelValue(item.name)}
          >
            {item.content ? item.content : item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
export default CTabs
export type { CTabsProps }
