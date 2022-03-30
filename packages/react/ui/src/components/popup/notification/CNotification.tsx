import React from 'react'
import { createPortal } from 'react-dom'
import CPopup from '../CPopup'
import useNotification from './useNotification'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CNotificationItem from './CNotificationItem'
import { PositionGroup } from 'casual-types'
import {
  clearSiblingsTransition,
  getNextSiblings,
  getPrevSiblings,
} from './utils'

const CNotification = () => {
  const { closeByPositionGroupAndID, notifications } = useNotification()

  const onItemExit = (node: HTMLElement, groupName: PositionGroup) => {
    const nextSiblings = getNextSiblings(node)
    const prevSiblings = getPrevSiblings(node)
    if (groupName.endsWith('start')) {
      nextSiblings.forEach(sibling => {
        sibling.classList.add('c-notification--with-transition')
        sibling.style.transform = `translate(0, calc(-100% - 12px))`
      })
    }

    if (groupName.endsWith('center')) {
      nextSiblings.forEach(sibling => {
        sibling.classList.add('c-notification--with-transition')
        sibling.style.transform = `translate(0, calc((-100% - 12px) / 2))`
      })
      prevSiblings.forEach(sibling => {
        sibling.classList.add('c-notification--with-transition')
        sibling.style.transform = `translate(0, calc((100% + 12px) / 2))`
      })
    }

    if (groupName.endsWith('end')) {
      prevSiblings.forEach(sibling => {
        sibling.classList.add('c-notification--with-transition')
        sibling.style.transform = `translate(0, calc(100% + 12px))`
      })
    }
  }

  const onItemEnter = (node: HTMLElement, group: PositionGroup) => {
    if (group.endsWith('center')) {
      const prevSiblings = getPrevSiblings(node)
      if (prevSiblings.length > 0) {
        node.style.position = 'absolute'
      }
      prevSiblings.forEach(sibling => {
        sibling.classList.add('c-notification--with-transition')
        sibling.style.transform = `translate(0, calc((-100% - 12px) / 2))`
      })
    }
  }

  return createPortal(
    <div className="c-notification">
      {Object.entries(notifications).map(([groupName, { x, y, items }]) => {
        return (
          <CPopup
            key={groupName}
            value={false}
            horizontalAlign={x}
            verticalAlign={y}
            className="c-popup--notification"
          >
            <TransitionGroup className="c-notification--item-list">
              {items.map((item, i) => (
                <CSSTransition
                  key={item.id}
                  timeout={300}
                  classNames={{
                    enter: `c-notification-${x}-${y}-enter-from`,
                    enterActive: `c-notification-${x}-${y}-enter-active ${
                      y === 'center' && i > 0
                        ? 'c-notification-normal-center'
                        : 'c-notification-normal'
                    }`,
                    exitActive: `c-notification-${x}-${y}-leave-to c-notification--with-transition`,
                  }}
                  onEnter={node => onItemEnter(node, `${x} ${y}`)}
                  onEntered={clearSiblingsTransition}
                  onExit={node => onItemExit(node, `${x} ${y}`)}
                  onExited={clearSiblingsTransition}
                >
                  <CNotificationItem
                    {...item}
                    onClose={() =>
                      closeByPositionGroupAndID(`${x} ${y}`, item.id)
                    }
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </CPopup>
        )
      })}
    </div>,
    document.body
  )
}

export default CNotification
