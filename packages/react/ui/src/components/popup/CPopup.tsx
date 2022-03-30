/* eslint-disable react/display-name */
import { CSlot } from 'casual-types'
import clsx from 'clsx'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
interface CPopupProps {
  /**
   * 弹出层是否弹出
   */
  value: boolean
  /**
   * 水平对齐方式
   */
  horizontalAlign?: 'start' | 'center' | 'end'
  /**
   * 垂直对齐方式
   */
  verticalAlign?: 'start' | 'center' | 'end'
  /**
   * 弹出层内容
   */
  children: CSlot
  /**
   * 自定义类名
   */
  className?: string
}

const CPopup = ({
  value,
  horizontalAlign = 'center',
  verticalAlign = 'center',
  children,
  className,
}: CPopupProps) => {
  return (
    <div className={clsx('c-popup', value && 'c-popup--show', className)}>
      <CSSTransition
        in={value}
        timeout={300}
        classNames="c-dialog-backdrop"
        unmountOnExit
      >
        <div className="c-popup--backdrop"></div>
      </CSSTransition>
      <div
        className={clsx(
          'c-popup--content-wrapper',
          `c-items-${horizontalAlign}`,
          `c-justify-${verticalAlign}`
        )}
      >
        <div className={clsx('c-popup--content')}>{children}</div>
      </div>
    </div>
  )
}

export default CPopup
export type { CPopupProps }
