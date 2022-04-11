import React from 'react'
import clsx from 'clsx'
import { CTheme } from 'casual-types'
import { matClose } from '@quasar/extras/material-icons'
import CIcon from '../../basic/icon/CIcon'

interface CNotificationItemProps {
  id: number
  theme?: CTheme
  title?: string
  closeIcon?: boolean
  message?: string
  onClose?: () => void
  timeout?: number
}

const CNotificationItem = ({
  theme,
  title,
  timeout = 3000,
  message,
  closeIcon = true,
  onClose,
}: CNotificationItemProps) => {
  return (
    <div
      className={clsx(
        'c-notification--item-card',
        `c-notification--item-theme-${theme}`
      )}
    >
      <div className="c-notification--header">
        <div className="c-notification--title">{title}</div>
        {closeIcon && (
          <div className="c-notification--close-icon" onClick={onClose}>
            <svg className="c-notification--countdown-bar" viewBox="0 0 24 24">
              {timeout && timeout > 0 && (
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className={clsx(
                    'c-notification--countdown-bar-circle',
                    'c-with-close-count-down',
                    'c-notification--countdown-bar-circle-with-initial-state'
                  )}
                  style={{
                    animationDuration: `${timeout / 1000}s`,
                  }}
                />
              )}
            </svg>
            <CIcon
              content={matClose}
              className="c-notification--close-icon-icon"
            />
          </div>
        )}
      </div>
      <div className="c-notification--message">{message}</div>
    </div>
  )
}

export default CNotificationItem

export type { CNotificationItemProps }
