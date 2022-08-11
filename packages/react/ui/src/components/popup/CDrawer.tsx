import CDialog from './CDialog'
import React, { useMemo } from 'react'
import { CPosition, CSlot } from 'casual-types'

type Position = 'left' | 'top' | 'right' | 'bottom'

interface CDrawerProps {
  /**
   * The shown status of drawer.
   * @zh 抽屉的展示状态
   */
  show?: boolean

  /**
   * Emit when the shown status change.
   * @zh 抽屉展示状态变化触发
   */
  onShowChange?: (newShow: boolean) => void

  /**
   * The drawer position.
   * @zh 抽屉的弹出位置
   */
  position?: Position

  /**
   * The title of drawer.
   * @zh 抽屉标题
   */
  title?: string

  /**
   * The width of drawer. This prop can only take effect when the position is left or right.
   * @zh 抽屉宽度，该属性仅在左/右位置时可用
   */
  width?: string

  /**
   * The height of drawer. This prop can only take effect when the position is top or bottom.
   * 抽屉高度，该属性仅在上/下位置时可用
   */
  bodyHeight?: string

  /**
   * Determine whether to close the drawer when clicked on the backdrop.
   * @zh 是否点击遮罩收起抽屉
   */
  closeOnClickBackdrop?: boolean

  /**
   * Customize the title content.
   * @zh 自定义标题
   */
  customTitle?: CSlot

  /**
   * Customize the close icon.
   * @zh 自定义关闭图标
   */
  customCloseIcon?: CSlot

  /**
   * The content.
   * @zh 抽屉内容
   */
  children?: CSlot
}

const hMap = new Map<Position, CPosition>([
  ['left', 'start'],
  ['top', 'center'],
  ['right', 'end'],
  ['bottom', 'center'],
])

const vMap = new Map<Position, CPosition>([
  ['left', 'center'],
  ['top', 'start'],
  ['right', 'center'],
  ['bottom', 'end'],
])

const CDrawer = ({
  show = false,
  onShowChange,
  position = 'left',
  title = '',
  customTitle,
  customCloseIcon,
  width = '20vw',
  bodyHeight = '20vh',
  closeOnClickBackdrop = true,
  children,
}: CDrawerProps) => {
  const isLeftOrRight = useMemo(
    () => position === 'left' || position === 'right',
    [position]
  )

  return (
    <CDialog
      value={show}
      exchangeAnimationDirection={isLeftOrRight}
      onChange={onShowChange}
      title={title}
      horizontalAlign={hMap.get(position)}
      verticalAlign={vMap.get(position)}
      customTitle={customTitle}
      customCloseIcon={customCloseIcon}
      width={isLeftOrRight ? width : '100vw'}
      bodyHeight={isLeftOrRight ? 'auto' : bodyHeight}
      closeOnClickBackdrop={closeOnClickBackdrop}
      customStyle={
        isLeftOrRight
          ? {
              height: '100vh',
            }
          : {}
      }
    >
      {children && children}
    </CDialog>
  )
}

export default CDrawer
