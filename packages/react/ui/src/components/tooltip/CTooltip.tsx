import React, { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { CSlot } from 'casual-types'
import { useClickOutside } from 'casual-ui-react'
interface CTooltipProps {
  /**
   * 弹出的内容文字，如果设置了<code>popup</code>插槽，则会覆盖该项
   */
  content?: CSlot
  /**
   * 弹出位置
   */
  position?: 'top' | 'right' | 'left' | 'bottom'
  /**
   * 触发方式
   */
  trigger?: 'hover' | 'click' | 'manual'
  /**
   * 是否展示弹出内容，用于<code>trigger = 'manual'</code>时
   */
  show?: boolean
  /**
   * 切换展示/收起状态
   */
  toggleShow?: (newShow: boolean) => void
  /**
   * 默认内容
   */
  children: CSlot
}

const CTooltip = ({
  content = '',
  position = 'top',
  trigger = 'hover',
  show = false,
  toggleShow,
  children,
}: CTooltipProps) => {
  const [innerShow, setInnerShow] = useState(show)

  useEffect(() => {
    if (trigger === 'manual') {
      toggleShow?.(innerShow)
    }
  }, [innerShow, trigger])

  useEffect(() => {
    if (trigger === 'manual') {
      setInnerShow(show)
    }
  }, [show, trigger])

  const onMouseEnter = () => {
    if (trigger === 'hover') {
      setInnerShow(true)
    }
  }
  const onMouseLeave = () => {
    if (trigger === 'hover') {
      setInnerShow(false)
    }
  }

  const onClick = () => {
    if (trigger === 'click') {
      setInnerShow(!innerShow)
    }
  }

  const tooltipDom = useRef<HTMLInputElement>(null)

  useClickOutside({
    domRef: tooltipDom,
    cbOutside: () => {
      if (trigger === 'click') {
        setInnerShow(false)
      }
    },
  })

  return (
    <div
      ref={tooltipDom}
      className={clsx('c-tooltip', innerShow && 'c-tooltip--show')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="c-tooltip--trigger-content">{children}</div>
      <div
        className={clsx(
          'c-tooltip--popper-content-wrapper',
          `c-tooltip--position-${position}`
        )}
        onClick={e => e.stopPropagation()}
      >
        <div className="c-tooltip--popper-content">{content}</div>
      </div>
    </div>
  )
}

export default CTooltip
