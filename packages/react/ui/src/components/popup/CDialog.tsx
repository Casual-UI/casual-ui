import { CSlot, PositionGroup } from 'casual-types'
import { matClose } from '@quasar/extras/material-icons'
import clsx from 'clsx'
import React, { CSSProperties, useEffect } from 'react'
import CButton from '../basic/button/CButton'
import CIcon from '../basic/icon/CIcon'
import CPopup from './CPopup'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { useMemo } from 'react'

interface CDialogProps {
  /**
   * The dialog open status.
   * @zh 对话框是否打开
   */
  value: boolean
  /**
   * Emit when the dialog open status change.
   * @zh 打开/关闭触发
   */
  onChange?: (newValue: boolean) => void
  /**
   * Title
   * @zh 标题
   */
  title?: string
  /**
   * Customize the title content.
   * @zh 自定义标题
   */
  customTitle?: CSlot
  /**
   * The dialog width.
   * @zh 宽度
   */
  width?: string
  /**
   * The dialog content height. Which doesn't include header and action footer.
   * @zh 对话框体高度，不包含头部以及底部动作按钮
   */
  bodyHeight?: string
  /**
   * Determine whether the content has padding or not.
   * @zh 是否具有内容内边距
   */
  bodyPadding?: boolean
  /**
   * Determine whether the dialog has rounded border or not.
   * @zh 是否表现为圆角
   */
  rounded?: boolean
  /**
   * Determine whether to show the close icon or not.
   * @zh 是否展示关闭图标
   */
  closeIcon?: boolean
  /**
   * The horizontal align position of dialog.
   * @zh 水平位置
   */
  horizontalAlign?: 'start' | 'center' | 'end'
  /**
   * The vertical align position of dialog.
   * @zh 垂直位置
   */
  verticalAlign?: 'start' | 'center' | 'end'
  /**
   * Some additional custom CSS classes.
   * @zh 自定义对话框DOM样式类
   */
  customClass?: string
  /**
   * Some additional custom CSS styles.
   * @zh 自定义对话框DOM样式
   */
  customStyle?: CSSProperties
  /**
   * Determine whether to show the cancel button or not.
   * @zh 是否展示取消按钮
   */
  showCancelBtn?: boolean
  /**
   * The cancel button text.
   * @zh 取消按钮文字
   */
  cancelBtnLabel?: string
  /**
   * Determine whether to show the confirm button or not.
   * @zh 是否展示确认按钮
   */
  showConfirmBtn?: boolean
  /**
   * The confirm button text.
   * @zh 确认按钮文字
   */
  confirmBtnLabel?: string
  /**
   * Customize the header content.
   * @zh 自定义头部内容
   */
  customHeader?: CSlot
  /**
   * Customize the close icon.
   * @zh 自定义关闭图标
   */
  customCloseIcon?: CSlot
  /**
   * The dialog content.
   * @zh 对话框内容
   */
  children?: CSlot
  /**
   * Customize the footer content.
   * @zh 自定义底部
   */
  customFooter?: CSlot
  /**
   * Customize the footer action buttons.
   * @zh 自定义底部操作按钮
   */
  customFooterActions?: CSlot

  /**
   * Determine whether to close the dialog on backdrop clicked or not.
   * @zh 是否点击遮罩关闭对话框
   */
  closeOnClickBackdrop?: boolean

  /**
   * Determine whether to exchange the open animation order.
   * @zh 是否交换对话框动画顺序
   */
  exchangeAnimationDirection?: boolean
}

const CDialog = ({
  value,
  onChange,
  title = '',
  width = '480px',
  bodyHeight = 'auto',
  bodyPadding = true,
  rounded = true,
  closeIcon = true,
  horizontalAlign = 'center',
  verticalAlign = 'center',
  customClass,
  customStyle = {},
  cancelBtnLabel = 'Cancel',
  confirmBtnLabel = 'Confirm',
  showCancelBtn = false,
  showConfirmBtn = false,
  customHeader,
  customCloseIcon,
  children,
  customFooter,
  customFooterActions,
  customTitle,
  closeOnClickBackdrop = true,
  exchangeAnimationDirection = false,
}: CDialogProps) => {
  useEffect(() => {
    const listenKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && value) {
        onChange?.(false)
      }
    }
    window.addEventListener('keyup', listenKeyboard)
    return () => {
      window.removeEventListener('keyup', listenKeyboard)
    }
  }, [value])

  const getContent = (
    customContent: CSlot | undefined,
    defaultContent: CSlot
  ) => (customContent ? customContent : defaultContent)

  const roundedClass = useMemo(() => {
    const classMap = new Map<PositionGroup, string>([
      ['start start', `c-rounded-br-md`],
      ['start center', 'c-rounded-r-md'],
      ['start end', 'c-rounded-tr-md'],
      ['center start', 'c-rounded-b-md'],
      ['center center', 'c-rounded-md'],
      ['center end', 'c-rounded-t-md'],
      ['end start', 'c-rounded-bl-md'],
      ['end center', 'c-rounded-l-md'],
      ['end end', 'c-rounded-tl-md'],
    ])

    return classMap.get(`${horizontalAlign} ${verticalAlign}`) || ''
  }, [horizontalAlign, verticalAlign])

  return createPortal(
    <CPopup
      value={value}
      onChange={onChange}
      horizontalAlign={horizontalAlign}
      verticalAlign={verticalAlign}
      className="c-popup--dialog"
      closeOnClickBackdrop={closeOnClickBackdrop}
    >
      <CSSTransition
        in={value}
        timeout={300}
        classNames={
          exchangeAnimationDirection ? 'c-dialog-reverse' : 'c-dialog'
        }
        unmountOnExit
      >
        <div
          className={clsx(
            'c-dialog',
            rounded && roundedClass,
            customClass && customClass
          )}
          style={{
            width,
            ...customStyle,
          }}
        >
          <div className="c-dialog--header">
            {getContent(
              customHeader,
              <>
                <div className="c-dialog--title">
                  {getContent(customTitle, title)}
                </div>
                <div
                  className="c-dialog--close-btn"
                  onClick={() => onChange?.(false)}
                >
                  {customCloseIcon
                    ? customCloseIcon
                    : closeIcon && <CIcon content={matClose} />}
                </div>
              </>
            )}
          </div>
          <div
            className={clsx(
              'c-dialog--content',
              bodyPadding && 'c-px-md c-pb-md'
            )}
            style={{
              height: bodyHeight,
            }}
          >
            {children}
          </div>
          <div className="c-dialog--footer">
            {getContent(
              customFooter,
              <div className="c-row c-gutter-x-sm">
                {getContent(
                  customFooterActions,
                  <>
                    <div>
                      {showCancelBtn && (
                        <CButton
                          label={cancelBtnLabel}
                          flat
                          rounded={rounded}
                        />
                      )}
                    </div>
                    <div>
                      {showConfirmBtn && (
                        <CButton
                          label={confirmBtnLabel}
                          theme="primary"
                          rounded={rounded}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </CPopup>,
    document.body
  )
}

export default CDialog

export type { CDialogProps }
