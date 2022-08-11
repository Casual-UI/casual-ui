import { CSlot } from 'casual-types'
import { useClickOutside } from 'casual-ui-react'
import clsx from 'clsx'
import React, { useRef } from 'react'
interface CDropdownProps {
  /**
   * The dropdown shown status.
   * @zh 是否展开
   */
  value: boolean
  /**
   * Emit when the shown status change.
   * @zh 展开状态发生变化时触发
   */
  onChange?: (newValue: boolean) => void
  /**
   * The trigger content.
   * @zh 默认触发内容
   */
  children: CSlot
  /**
   * The dropdown content
   * @zh 下拉内容
   */
  dropContent: CSlot

  /**
   * Determine whether the dropdown is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
  /**
   * Determine whether the content maintain the same width with parent or not.
   * @zh 是否自动与默认内容保持一致宽度
   */
  widthWithinParent?: boolean
  /**
   * Determine whether to enable manual control or not.
   * @zh 是否手动控制
   */
  manual?: boolean
}
const CDropdown = ({
  value,
  onChange,
  children,
  dropContent,
  disabled = false,
  widthWithinParent = true,
  manual = false,
}: CDropdownProps) => {
  const dropdownDom = useRef(null)
  useClickOutside({
    domRef: dropdownDom,
    cbInside: () => {
      if (disabled || manual) return
      onChange?.(true)
    },
    cbOutside: () => {
      if (disabled || manual) return
      onChange?.(false)
    },
  })
  return (
    <div
      ref={dropdownDom}
      className={clsx('c-dropdown', value && 'c-dropdown--dropped')}
    >
      <div className="c-dropdown--trigger">{children}</div>
      <div
        className={clsx(
          'c-dropdown--drop-content',
          !widthWithinParent && 'c-dropdown--drop-content-auto-width'
        )}
      >
        {dropContent}
      </div>
    </div>
  )
}
export default CDropdown
export type { CDropdownProps }
