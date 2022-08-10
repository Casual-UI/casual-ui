import React, { CSSProperties } from 'react'
import clsx from 'clsx'
import CLoading from '../loading/CLoading'
import { useSizeThemeClass } from 'casual-ui-react'
import { CSize, CSlot, CTheme } from 'casual-types'

interface CButtonProps {
  /**
   * 按钮里的文案
   */
  label?: string
  /**
   * 是否表现为轮廓样式，默认：`false`
   * @default false
   */
  outlined?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 按钮尺寸
   */
  size?: CSize
  /**
   * 是否为圆角
   */
  rounded?: boolean
  /**
   * 是否为圆弧
   */
  round?: boolean
  /**
   * 是否为块级
   */
  block?: boolean
  /**
   * 按钮主题
   */
  theme?: CTheme
  /**
   * 按钮是否处于加载中状态
   */
  loading?: boolean
  /**
   * 是否表现为图标按钮
   */
  icon?: boolean
  /**
   * 是否为扁平按钮
   */
  flat?: boolean
  /**
   * 自定义样式
   */
  style?: CSSProperties
}

interface CButtonJSXProps {
  /**
   * 额外样式类
   */
  className?: string
  /**
   * 点击事件触发
   */
  onClick?: () => void
  /**
   * 是否使用自定义其他加载动画
   */
  customLoading?: JSX.Element
  /**
   * 子元素内容，该项会覆盖<code>label</code>属性
   */
  children?: CSlot
}

const CButton = ({
  size = 'md',
  theme,
  label = '',
  className = '',
  outlined = false,
  disabled = false,
  rounded = false,
  round = false,
  block = false,
  loading = false,
  onClick,
  customLoading,
  flat = false,
  icon = false,
  children,
  style,
}: CButtonProps & CButtonJSXProps) => {
  return (
    <button
      style={style}
      className={clsx(
        ...useSizeThemeClass({ size, theme, prefix: 'c-button' }),
        block && 'c-button--block',
        rounded && `c-rounded-${size}`,
        round && 'c-button--round',
        outlined && 'c-button--outlined',
        loading && 'c-button--loading',
        icon && 'c-button--icon',
        flat && 'c-button--flat',
        `c-font-${size}`,
        `c-px-${size}`,
        `c-h-${size}`,
        className
      )}
      disabled={disabled}
      onClick={() => {
        if (!disabled && !loading) onClick?.()
      }}
    >
      <div className="c-button--focus-helper"></div>
      <div className={clsx('c-button--content-wrapper')}>
        {children ? children : label}
        {loading && (
          <>
            <span>&nbsp;</span>
            {customLoading ? customLoading : <CLoading />}
          </>
        )}
      </div>
    </button>
  )
}

export default CButton
