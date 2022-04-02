import React from 'react'
import clsx from 'clsx'

interface CDateGridPanelProps {
  items: number[]
  isActive: (item: number) => boolean
  displayFormatter: (item: number) => string
  onItemClick?: (item: number) => void
}
const CDateGridPanel = ({
  items,
  isActive,
  displayFormatter,
  onItemClick,
}: CDateGridPanelProps) => {
  return (
    <div className="c-date-picker--panel">
      <div className="c-grid c-date-picker--panel-body c-grid-col-4 c-grid-row-3">
        {items.map(item => (
          <div
            key={item}
            className={clsx(
              'c-date-picker--panel-cell',
              isActive(item) && 'c-date-picker--panel-cell--is-selected'
            )}
            onClick={e => {
              e.stopPropagation()
              onItemClick?.(item)
            }}
          >
            <div className="c-date-picker--panel-cell--inner">
              {displayFormatter(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CDateGridPanel
export type { CDateGridPanelProps }
