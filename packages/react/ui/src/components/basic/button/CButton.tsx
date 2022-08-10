import React, { CSSProperties } from 'react'
import clsx from 'clsx'
import CLoading from '../loading/CLoading'
import { useSizeThemeClass } from 'casual-ui-react'
import { CSize, CSlot, CTheme } from 'casual-types'

interface CButtonProps {
  /**
   * The label text of button.
   * @zh 按钮里的文字
   */
  label?: string
  /**
   * Determine whether the button has a outlined style or not.
   * @zh 是否表现为轮廓按钮
   */
  outlined?: boolean
  /**
   * Determine whether the button is disabled or not. If set to <code>true</code>. The <code>onClick</code> event won't trigger.
   * @zh 是否禁用，如果禁用，则不会触发<code>onClick</code>方法
   */
  disabled?: boolean
  /**
   * The size of button.
   * @zh 按钮尺寸
   */
  size?: CSize
  /**
   * Determine the button has a rounded border or not.
   * @zh 是否具有圆角样式
   */
  rounded?: boolean
  /**
   * Determine the button has half circle border or not.
   * @zh 是否具有半圆形边框样式
   */
  round?: boolean
  /**
   * Determine whether the button display as block element or not.
   * @zh 是否为块级元素表现
   */
  block?: boolean
  /**
   * The button theme color.
   * @zh 按钮主题
   */
  theme?: CTheme
  /**
   * Determine whether the button is in loading or not.
   * @zh 按钮是否处于加载中状态
   */
  loading?: boolean
  /**
   * Determine whether the button display as a icon button.
   * @zh 是否表现为图标按钮
   */
  icon?: boolean
  /**
   * Determine whether the button has flat style or not.
   * @zh 是否为扁平按钮
   */
  flat?: boolean
  /**
   * Customize the button style.
   * @zh 自定义样式
   */
  style?: CSSProperties
}

interface CButtonJSXProps {
  /**
   * Customize the button additional class names.
   * @zh 额外样式类
   */
  className?: string
  /**
   * The click event
   * @zh 点击事件触发
   */
  onClick?: () => void
  /**
   * Customize the loading icon content.
   * @zh 是否使用自定义其他加载动画
   */
  customLoading?: JSX.Element
  /**
   * Customize the button content. This prop will override the <code>label</code> prop.
   * @zh 子元素内容，该项会覆盖<code>label</code>属性
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
