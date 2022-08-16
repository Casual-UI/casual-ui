import {
  matNavigateBefore,
  matNavigateNext,
} from '@quasar/extras/material-icons'
import { CSlot, CTheme } from 'casual-types'
import clsx from 'clsx'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import CButton from '../basic/button/CButton'
import CIcon from '../basic/icon/CIcon'
import Fade from '../transition/Fade'
import TransitionWrapper from './TransitionWrapper'
import { CarouselContext } from './CarouselContext'
interface CCarouselProps {
  /**
   * The height of container.
   * @zh 容器的高度
   */
  height?: string

  /**
   * The theme color. It will affect the control arrow and the indicators' style.
   * @zh 主题色，会影响指示器以及箭头控制器的颜色
   */
  theme?: CTheme

  /**
   * The autoplay interval. If the value is larger than 0 will set a autoplay. Notice that the transition time is not counting.
   * @zh 自动播放间隔，若该值大于0会以该值启动自动播放。值得一提的是动画过渡时间并不会算在内
   */
  interval?: number

  /**
   * The current slider index (from 0).
   * @zh 当前激活的轮播下标（从0开始）
   */
  activeIndex?: number

  /**
   * Emit when the current slider index changed.
   * @zh 当前激活的轮播变化时触发
   */
  onActiveIndexChange?: (newIndex: number) => void

  /**
   * The horizontal position of the indicators.
   * @zh 指示器的横向位置
   */
  indicatorsPositionHorizontal?: 'start' | 'center' | 'end'

  /**
   * The vertical position of the indicators.
   * @zh 指示器的纵向位置
   */
  indicatorsPositionVertical?: 'start' | 'center' | 'end'

  /**
   * The align direction of indicators.
   * @zh 指示器排列方向
   */
  indicatorsAlignDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

  /**
   * Determine whether the transition is vertical or not.
   * @zh 是否纵向过渡
   */
  vertical?: boolean

  /**
   * Determine the carousel can be infinity or not.
   * @zh 是否无限循环
   */
  infinity?: boolean

  /**
   * Determine the arrow shown method.
   * @zh 箭头展示时机
   */
  arrowTiming?: 'always' | 'hover' | 'never'

  /**
   * Customize the indicators content.
   * @zh 自定义指示器内容
   */
  customIndicators?: CSlot

  /**
   * Customize the to previous control arrow.
   * @zh 自定义前一个箭头控制器
   */
  customArrowPrev?: CSlot

  /**
   * Customize the to next control arrow.
   * @zh 自定义后一个箭头控制器
   */
  customArrowNext?: CSlot

  /**
   * Determine whether to pause the autoplay when the carousel is hovered.
   * @zh 鼠标悬浮时是否暂停自动播放
   */
  pauseOnHover?: boolean

  /**
   * The content of carousel. It is recommended to use `CCarouselSlider`
   * @zh 内容，建议使用<code>CCarouselSlider</code>
   */
  children: any[]
}

type Direction = 'forward' | 'backward'

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
  pauseOnHover = true,
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

  const [hovering, setHovering] = useState(false)

  const pauses: Function[] = []
  const resumes: Function[] = []

  const onMouseEnter = () => {
    if (arrowTiming === 'hover') {
      setShowArrow(true)
    }
    setHovering(true)
    if (pauseOnHover) {
      pauses.forEach(p => p())
    }
  }

  const onMouseLeave = () => {
    if (arrowTiming === 'hover') {
      setShowArrow(false)
    }
    setHovering(false)
    if (pauseOnHover) {
      resumes.forEach(r => r())
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

  const [transitioning, setTransitioning] = useState(false)

  const indicatorAnimationState = useMemo<'running' | 'paused'>(
    () => ((pauseOnHover && hovering) || transitioning ? 'paused' : 'running'),
    [pauseOnHover, hovering, transitioning]
  )
  return (
    <CarouselContext.Provider
      value={{
        hovering,
        setSliding: setTransitioning,
        pauses,
        resumes,
      }}
    >
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
              'c-gutter-xs',
              'c-flex',
              `c-${indicatorsAlignDirection}`
            )}
          >
            {customIndicators
              ? customIndicators
              : children.map((_, i) => {
                  const isActive = i === activeIndex
                  return (
                    <div key={`indicators-${i}`}>
                      <div
                        className={clsx(
                          'c-carousel--indicator-item',
                          `c-carousel--indicator-item--${theme}`,
                          isActive && 'c-carousel--indicator-item--active'
                        )}
                        onClick={() => toIndex(i)}
                      >
                        <div className="c-carousel--indicator-item--bg"></div>
                        <div
                          className="c-carousel--indicator-item--progress-bar"
                          style={
                            isActive
                              ? {
                                  animationPlayState: indicatorAnimationState,
                                  animationName: `c-carousel-active-indicator-bar${
                                    indicatorsAlignDirection.startsWith('col')
                                      ? '-vertical'
                                      : ''
                                  }`,
                                  animationDuration: `${interval}ms`,
                                  animationIterationCount: 1,
                                }
                              : {}
                          }
                        ></div>
                      </div>
                    </div>
                  )
                })}
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
        <div className="c-carousel--sliders">
          {children.map((c, i) => (
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
          ))}
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export { CCarouselProps }

export default CCarousel
