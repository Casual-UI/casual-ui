import { CSlot } from 'casual-types'
import { matKeyboardArrowDown } from '@quasar/extras/material-icons'
import clsx from 'clsx'
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import CIcon from '../basic/icon/CIcon'

interface CExpansionProps {
  /**
   * 图标
   */
  icon?: CSlot
  /**
   * 标题
   */
  title?: CSlot
  /**
   * 自定义箭头
   */
  arrow?: (expandStatus: boolean) => CSlot
  /**
   * 是否展开
   */
  open?: boolean
  /**
   * 设置展开态
   */
  setOpen?: (openStatus: boolean) => void
  /**
   * 折叠内容
   */
  children: CSlot
  /**
   * 是否从上方展开
   */
  reverse?: boolean
}

const CExpansion = ({
  icon,
  title = '',
  open = false,
  arrow,
  children,
  reverse = false,
}: CExpansionProps) => {
  const [innerOpen, setInnerOpen] = useState(true)
  const [initialBodyHeight, setInitialBodyHeight] = useState('auto')

  const realtimeBodyHeigh = useMemo(
    () => (innerOpen ? initialBodyHeight : 0),
    [innerOpen, initialBodyHeight]
  )

  const bodyDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInitialBodyHeight(`${bodyDom.current?.clientHeight}px`)
    setInnerOpen(open)
  }, [])

  const onHeaderClick = useCallback(() => {
    setInnerOpen(!innerOpen)
  }, [innerOpen])

  return (
    <div
      className={clsx('c-expansion', innerOpen && 'c-expansion--expanded')}
      style={
        {
          '--casual-expansion-height': realtimeBodyHeigh,
        } as CSSProperties
      }
    >
      {reverse && <div ref={bodyDom} className="c-expansion--body">
        {children}
      </div>}
      <div className="c-expansion--header" onClick={onHeaderClick}>
        {icon && <div className="c-expansion--icon">{icon}</div>}
        <div className="c-expansion--title">{title}</div>
        <div
          className={clsx(
            'c-expansion--arrow',
            innerOpen && 'c-expansion--arrow-expanded'
          )}
        >
          {arrow ? arrow(innerOpen) : <CIcon content={matKeyboardArrowDown} />}
        </div>
      </div>
      {!reverse && <div ref={bodyDom} className="c-expansion--body">
        {children}
      </div>}
    </div>
  )
}

export default CExpansion

export type { CExpansionProps }
