import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { CSize, CSlot } from 'casual-types'
import { useSize } from 'casual-ui-react'

interface CTabItem {
  /**
   * 名称
   */
  name: string
  /**
   * 面板内容
   */
  content?: CSlot
  /**
   * 自定义头部
   */
  header?: CSlot
}

interface CTabsProps {
  /**
   * 面板项配置
   */
  items: CTabItem[]
  /**
   * 当前激活的面板项名称
   */
  activeTab: string
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
  /**
   * 自定义面板体样式
   */
  bodyStyle?: React.CSSProperties
}
const CTabs = ({
  items,
  activeTab,
  onTabChange,
  size,
  panelPadding = true,
  bodyStyle,
}: CTabsProps) => {
  const realSize = useSize(size)

  const [activeBarLeft, setActiveBarLeft] = useState('0')
  const [activeBarWidth, setActiveBarWidth] = useState('0')

  const header = useRef<HTMLDivElement>(null)

  const [nextName, setNextName] = useState(activeTab)

  const [enterClass, setEnterClass] = useState('')
  const [leaveClass, setLeaveClass] = useState('')

  const updateModelValue = (newTab: string) => {
    setNextName(newTab)
  }

  useEffect(() => {
    if (!header.current) return

    const activeItem = header.current.querySelector<HTMLDivElement>(
      '.c-tabs--header-item-active'
    )
    if (!activeItem) return
    setActiveBarLeft(`${activeItem.offsetLeft}px`)
    setActiveBarWidth(`${activeItem.offsetWidth}px`)
    const currentIdx = items.findIndex(item => item.name === activeTab)
    const newIdx = items.findIndex(item => item.name === nextName)
    if (newIdx < currentIdx) {
      // backwards
      setEnterClass('c-date-panel-reverse-enter-active')
      setLeaveClass(`c-date-panel-reverse-leave-active c-pa-${realSize}`)
    } else {
      // forwards
      setEnterClass('c-date-panel-enter-active')
      setLeaveClass(`c-date-panel-leave-active c-pa-${realSize}`)
    }
    setTimeout(() => {
      onTabChange?.(nextName)
    }, 300)
  }, [nextName])

  return (
    <div className={clsx('c-tabs')}>
      <div ref={header} className="c-tabs--header c-row c-items-center">
        {items.map(item => (
          <div
            key={item.name}
            className={clsx(
              'c-tabs--header-item',
              `c-h-${realSize}`,
              `c-font-${realSize}`,
              `c-px-${realSize}`,
              nextName === item.name && 'c-tabs--header-item-active'
            )}
            onClick={() => updateModelValue(item.name)}
          >
            {item.header ? item.header : item.name}
          </div>
        ))}
        <div
          className="c-tabs--header-active-bar"
          style={{
            left: activeBarLeft,
            width: activeBarWidth,
          }}
        ></div>
      </div>
      <div
        style={bodyStyle}
        className={clsx('c-tabs--body', panelPadding && `c-pa-${realSize}`)}
      >
        {items.map(
          item =>
            (activeTab === item.name || nextName === item.name) && (
              <div
                key={item.name}
                className={clsx(
                  'c-tabs--body-item',
                  activeTab === nextName
                    ? ''
                    : item.name === nextName
                    ? enterClass
                    : leaveClass
                )}
              >
                {item.content ? item.content : item.name}
              </div>
            )
        )}
      </div>
    </div>
  )
}
export default CTabs
export type { CTabsProps }
