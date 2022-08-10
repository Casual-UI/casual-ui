import {
  matNavigateBefore,
  matNavigateNext,
} from '@quasar/extras/material-icons'
import { CSlot, CTheme } from 'casual-types'
import clsx from 'clsx'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CButton from '../basic/button/CButton'
import CIcon from '../basic/icon/CIcon'
import { useTransition, animated, config } from 'react-spring'
import Fade from '../transition/Fade'

interface CCarouselProps {
  /**
   * 容器的高度
   */
  height?: string

  /**
   * 主题色，会影响指示器以及箭头控制器的颜色
   */
  theme?: CTheme

  /**
   * 自动播放间隔，若该值大于0会以该值启动自动播放
   */
  interval?: number

  /**
   * 当前激活的轮播下标
   */
  activeIndex?: number

  /**
   * 当前激活的轮播变化时触发
   */
  onActiveIndexChange?: (newIndex: number) => void

  /**
   * 指示器的横向位置
   */
  indicatorsPositionHorizontal?: 'start' | 'center' | 'end'

  /**
   * 指示器的纵向位置
   */
  indicatorsPositionVertical?: 'start' | 'center' | 'end'

  /**
   * 指示器排列方向
   */
  indicatorsAlignDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

  /**
   * 是否纵向过渡
   */
  vertical?: boolean

  /**
   * 是否无限循环
   */
  infinity?: boolean

  /**
   * 箭头展示时机
   */
  arrowTiming?: 'always' | 'hover' | 'never'

  /**
   * 自定义指示器内容
   */
  customIndicators?: CSlot

  /**
   * 自定义前一个箭头控制器
   */
  customArrowPrev?: CSlot

  /**
   * 自定义后一个箭头控制器
   */
  customArrowNext?: CSlot

  /**
   * 内容，建议使用<code>CCarouselSlider</code>
   */
  children: any[]
}

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
  const [timeoutFlag, setTimeoutFlag] = useState<null | ReturnType<
    typeof setTimeout
  >>(null)
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
    onRest({ value: { x } }: any) {
      if (x !== 0 || activeIndex !== currentIndex) {
        if (timeoutFlag) {
          clearTimeout(timeoutFlag)
          setTimeoutFlag(null)
        }
        return
      }
      if (interval > 0) {
        setTimeoutFlag(
          setTimeout(() => {
            toNext()
            if (timeoutFlag) {
              clearTimeout(timeoutFlag)
            }
            setTimeoutFlag(null)
          }, interval)
        )
      }
    },
  })

  useEffect(() => {
    return () => {
      if (timeoutFlag) {
        clearTimeout(timeoutFlag)
      }
    }
  }, [timeoutFlag])

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

const CCarousel = ({
  height = '300px',
  theme = 'primary',
  interval = 0,
  activeIndex = 0,
  onActiveIndexChange,
  indicatorsAlignDirection = 'row',
  indicatorsPositionHorizontal = 'center',
  indicatorsPositionVertical = 'end',
  vertical = false,
  infinity = false,
  arrowTiming = 'always',
  customIndicators,
  customArrowPrev,
  customArrowNext,
  children,
}: CCarouselProps) => {
  const [direction, setDirection] = useState<Direction>('forward')

  const [showArrow, setShowArrow] = useState(arrowTiming === 'always')

  const showPrevArrow = useMemo(
    () => showArrow && (infinity || activeIndex > 0),
    [showArrow, infinity, activeIndex]
  )

  const showNextArrow = useMemo(
    () => showArrow && (infinity || activeIndex < children.length - 1),
    [showArrow, infinity, activeIndex]
  )

  const onMouseEnter = () => {
    if (arrowTiming === 'hover') {
      setShowArrow(true)
    }
  }

  const onMouseLeave = () => {
    if (arrowTiming === 'hover') {
      setShowArrow(false)
    }
  }

  const toIndex = useCallback(
    (idx: number) => {
      if (idx < activeIndex) {
        setDirection('backward')
        if (idx >= 0) {
          onActiveIndexChange?.(idx)
          return
        }
        if (infinity) {
          onActiveIndexChange?.(children.length - 1)
        }
        return
      }
      if (idx > activeIndex) {
        setDirection('forward')
        if (idx < children.length) {
          onActiveIndexChange?.(idx)
          return
        }
        if (infinity) {
          onActiveIndexChange?.(0)
        }
      }
    },
    [activeIndex, infinity]
  )

  const toPrev = useCallback(() => toIndex(activeIndex - 1), [activeIndex])

  const toNext = useCallback(() => toIndex(activeIndex + 1), [activeIndex])

  const slides = useMemo(
    () =>
      children.map((c, i) => (
        <TransitionWrapper
          key={i}
          children={c}
          direction={direction}
          activeIndex={activeIndex}
          currentIndex={i}
          toNext={toNext}
          interval={interval}
          vertical={vertical}
        />
      )),
    [children, activeIndex, direction]
  )

  return (
    <div
      className={clsx('c-carousel', vertical && 'c-carousel--vertical')}
      style={{
        height,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={clsx(
          'c-carousel--indicators',
          'c-flex',
          `c-items-${indicatorsPositionVertical}`,
          `c-justify-${indicatorsPositionHorizontal}`
        )}
      >
        <div
          className={clsx(
            'c-carousel--indicators-container',
            'c-gutter-sm',
            'c-flex',
            `c-${indicatorsAlignDirection}`
          )}
        >
          {customIndicators
            ? customIndicators
            : children.map((_, i) => (
                <div key={`indicators-${i}`}>
                  <div
                    className={clsx(
                      'c-carousel--indicator-item',
                      `c-carousel--indicator-item--${theme}`,
                      i === activeIndex && 'c-carousel--indicator-item--active'
                    )}
                    onClick={() => toIndex(i)}
                  ></div>
                </div>
              ))}
        </div>
      </div>
      <Fade show={showPrevArrow}>
        <div
          className="c-carousel--control c-carousel--control--prev"
          onClick={toPrev}
        >
          {customArrowPrev ? (
            customArrowPrev
          ) : (
            <CButton
              flat
              icon
              theme={theme}
            >
              <CIcon content={matNavigateBefore} />
            </CButton>
          )}
        </div>
      </Fade>
      <Fade show={showNextArrow}>
        <div
          className="c-carousel--control c-carousel--control--next"
          onClick={toNext}
        >
          {customArrowNext ? (
            customArrowNext
          ) : (
            <CButton
              flat
              icon
              theme={theme}
            >
              <CIcon content={matNavigateNext} />
            </CButton>
          )}
        </div>
      </Fade>

      <div className="c-carousel--sliders">{slides}</div>
    </div>
  )
}

export { CCarouselProps }

export default CCarousel
