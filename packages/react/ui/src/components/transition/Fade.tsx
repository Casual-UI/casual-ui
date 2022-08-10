import React from 'react'
import { useTransition, animated, config } from 'react-spring'

interface FadeProps {
  show: boolean
  children: any
}

export default ({ show, children }: FadeProps) => {
  const transition = useTransition(show, {
    from: {
      opacity: 0,
    },
    delay: 0,
    reverse: true,
    config: config.wobbly,
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  })

  return transition(
    ({ opacity }, item) =>
      item && (
        <animated.div
          style={{
            opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
          }}
        >
          {children}
        </animated.div>
      )
  )
}
