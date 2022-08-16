import React, { useCallback, useContext, useEffect } from 'react'
import { useTransition, animated, config } from 'react-spring'
import useTimer from './useTimer'
import { CarouselContext } from './CarouselContext'

type Direction = 'forward' | 'backward'

const TransitionWrapper = ({
  direction,
  activeIndex,
  currentIndex,
  children,
  toNext,
  interval,
  vertical,
}: {
  direction: Direction
  activeIndex: number
  currentIndex: number
  children: any
  toNext: () => void
  interval: number
  vertical: boolean
}) => {
  const { reset, begin, resume, pause } = useTimer(toNext, interval)

  const { hovering, pauses, resumes, setSliding } = useContext(CarouselContext)

  pauses.push(
    useCallback(() => {
      if (activeIndex === currentIndex) {
        pause()
      }
    }, [activeIndex, currentIndex, pause])
  )
  resumes.push(
    useCallback(() => {
      if (activeIndex === currentIndex) {
        resume()
      }
    }, [activeIndex, currentIndex, resume])
  )

  const transition = useTransition(activeIndex === currentIndex, {
    from: {
      x: direction === 'forward' ? 100 : -100,
    },
    delay: 0,
    config: config.default,
    enter: {
      x: 0,
    },
    leave: {
      x: direction === 'forward' ? -100 : 100,
    },
    onStart: () => {
      setSliding(true)
    },
    onRest({ value: { x } }: any) {
      reset()
      if (x !== 0 || activeIndex !== currentIndex) {
        return
      }
      if (!hovering) {
        begin()
      }
      setSliding(false)
    },
  })

  return transition(
    ({ x }, item) =>
      item && (
        <animated.div
          className="c-carousel--slider-item"
          style={{
            transform: x.to(x => `translate${vertical ? 'Y' : 'X'}(${x}%)`),
          }}
        >
          {children}
        </animated.div>
      )
  )
}

export default TransitionWrapper