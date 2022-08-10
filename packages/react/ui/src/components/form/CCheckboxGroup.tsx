import { CSize } from 'casual-types'
import clsx from 'clsx'
import React, { useMemo, useEffect, useState } from 'react'
import useGutterSize from '../../hooks/useGutterSize'
import CCheckbox, { CCheckboxModel } from './CCheckbox'
import { useFormItemContext } from './CFormContext'

interface CCheckboxGroupProps {
  /**
   * The options array.
   * @zh 选项数组
   */
  options?: Array<{ label: string; value: CCheckboxModel }>
  /**
   * Current selected values.
   * @zh 当前选中值数组
   */
  value: CCheckboxModel[]
  /**
   * Emit when current values change.
   * @zh 勾选值发生变化时触发
   */
  onChange?: (newValue: CCheckboxModel[]) => void
  /**
   * Custom class names.
   * @zh 自定义额外样式类
   */
  className?: string
  /**
   * The size of all checkbox inside this group.
   * @zh 勾选框间隔尺寸
   */
  gutterSize?: CSize
}

const CCheckboxGroup = ({
  options = [],
  value,
  onChange,
  className,
  gutterSize,
}: CCheckboxGroupProps) => {
  const optionsWithCheckStatus = useMemo(
    () =>
      options.map(op => ({
        ...op,
        checked: value.some(v => v === op.value),
      })),
    [options, value]
  )

  const onCheckStatusChange = (val: CCheckboxModel) => {
    const idx = value.findIndex(v => v === val)
    if (idx === -1) {
      onChange?.([...value, val])
      return
    }
    onChange?.([...value.slice(0, idx), ...value.slice(idx + 1)])
  }

  const realGutterSize = useGutterSize(gutterSize)

  const { validateCurrent } = useFormItemContext()

  const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    if (!isFirst) {
      validateCurrent?.(value)
    }
    setIsFirst(false)
  }, [value])

  return (
    <div
      className={clsx(
        'c-checkbox-group',
        className,
        'c-row',
        'c-items-center',
        `c-gutter-${realGutterSize}`
      )}
    >
      {optionsWithCheckStatus.map(op => (
        <CCheckbox
          key={op.value as string}
          value={op.checked}
          label={op.label}
          onChange={() => onCheckStatusChange(op.value)}
        />
      ))}
    </div>
  )
}

export default CCheckboxGroup

export type { CCheckboxGroupProps }
