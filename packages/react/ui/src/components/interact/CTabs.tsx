import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { CSize, CSlot } from 'casual-types'
import { useSize } from 'casual-ui-react'

type SlotWithNext = (setNextName: (nextName: string) => void) => JSX.Element

interface CTabItem {
  /**
   * The name
   * @zh 名称
   */
  name: string
  /**
   * The panel content
   * @zh 面板内容
   */
  content?: CSlot | SlotWithNext
  /**
   * Customize the header content
   * @zh 自定义头部
   */
  header?: CSlot
}

interface CTabsProps {
  /**
   * Tab panels config
   * @zh 面板项配置
   */
  items: CTabItem[]
  /**
   * Current active tab name.
   * @zh 当前激活的面板项名称
   */
  activeTab: string
  /**
   * Emit when the active name change.
   * @zh 面板项切换时触发事件
   */
  onTabChange?: (tab: string) => void
  /**
   * The size
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether the panel has padding.
   * @zh 面板是否具有根据跟随size的内边距
   */
  panelPadding?: boolean
  /**
   * Customize the body style.
   * @zh 自定义面板体样式
   */
  bodyStyle?: React.CSSProperties
  /**
   * Customize the header content.
   * @zh 自定义头部部分
   */
  customHeader?: SlotWithNext
}
const CTabs = ({
  items,
  activeTab,
  onTabChange,
  size,
  panelPadding = true,
  bodyStyle,
  customHeader,
}: CTabsProps) => {
  const realSize = useSize(size)

  const [activeBarLeft, setActiveBarLeft] = useState('0')
  const [activeBarWidth, setActiveBarWidth] = useState('0')

  const header = useRef<HTMLDivElement>(null)

  const [nextName, setNextName] = useState(activeTab)

  const [enterClass, setEnterClass] = useState('')
  const [leaveClass, setLeaveClass] = useState('')

  useEffect(() => {
    if (!customHeader) {
      if (!header.current) return

      const activeItem = header.current.querySelector<HTMLDivElement>(
        '.c-tabs--header-item-active'
      )
      if (!activeItem) return
      setActiveBarLeft(`${activeItem.offsetLeft}px`)
      setActiveBarWidth(`${activeItem.offsetWidth}px`)
    }
    const currentIdx = items.findIndex(item => item.name === activeTab)
    const newIdx = items.findIndex(item => item.name === nextName)
    if (newIdx < currentIdx) {
      // backwards
      setEnterClass('c-date-panel-reverse-enter-active')
      setLeaveClass(
        `c-date-panel-reverse-leave-active c-date-panel-reverse-leave-initial c-pa-${realSize}`
      )
    } else {
      // forwards
      setEnterClass('c-date-panel-enter-active')
      setLeaveClass(
        `c-date-panel-leave-active c-date-panel-leave-initial c-pa-${realSize}`
      )
    }
    setTimeout(() => {
      onTabChange?.(nextName)
    }, 300)
  }, [nextName])

  return (
    <div className={clsx('c-tabs')}>
      {customHeader ? (
        customHeader(setNextName)
      ) : (
        <div
          ref={header}
          className="c-tabs--header c-row c-items-center"
        >
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
              onClick={() => setNextName(item.name)}
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
      )}
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
                {item.content
                  ? typeof item.content === 'function'
                    ? item.content(setNextName)
                    : item.content
                  : item.name}
              </div>
            )
        )}
      </div>
    </div>
  )
}
export default CTabs
export type { CTabsProps }
