import clsx from 'clsx'
import React, { CSSProperties } from 'react'

interface CIconProps {
  /**
   * svg内容，格式为<code>d[@@style][@@transform]|viewBox</code>
   */
  content: string
  /**
   * 自定义样式类
   */
  className?: string
  /**
   * 自定义行内样式
   */
  style?: CSSProperties
  /**
   * 点击触发
   */
  onClick?: () => void
}

const CIcon = ({ content, className, style, onClick }: CIconProps) => {
  const [def, viewBox = '0 0 24 24'] = content.split('|')
  return (
    <span className={clsx('c-icon', className)} style={style} onClick={onClick}>
      <svg
        viewBox={viewBox}
        dangerouslySetInnerHTML={{
          __html: def
            .split('&&')
            .map(pathAttrs => {
              const [d, style, transform] = pathAttrs.split('@@')
              return `<path d="${d}" style="${style ? style : ''}" ${
                transform ? `transform="${transform}"` : ''
              }></path>`
            })
            .join(''),
        }}
      ></svg>
    </span>
  )
}

export default CIcon
export type { CIconProps }
