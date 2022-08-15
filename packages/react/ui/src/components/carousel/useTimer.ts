import { useCallback, useEffect, useState } from 'react'
import useClickOutside from 'src/hooks/useClickOutside'

export default (cb: (...params: any) => any, delay: number) => {
  const [flag, setFlag] = useState<ReturnType<typeof setTimeout> | null>(null)

  const [start, setStart] = useState(Date.now())

  const [remain, setRemain] = useState(delay)

  useEffect(() => {
    return () => {
      if (flag) {
        clearTimeout(flag)
      }
    }
  }, [flag])

  const reset = useCallback(() => {
    setRemain(delay)
    setStart(Date.now())
    if (flag) {
      clearTimeout(flag)
      setFlag(null)
    }
  }, [flag])

  const begin = useCallback(() => {
    reset()
    setFlag(
      setTimeout(() => {
        cb()
        setRemain(delay)
      }, remain)
    )
  }, [cb, flag])

  const resume = useCallback(() => {
    if (remain < 1) {
      return
    }
    setFlag(
      setTimeout(() => {
        cb()
        setRemain(delay)
      }, remain)
    )
  }, [cb, flag, remain])

  const pause = useCallback(() => {
    if (flag) {
      clearTimeout(flag)
      setFlag(null)
    }
    setRemain(remain - (Date.now() - start))
  }, [flag, remain, start])

  return {
    reset,
    begin,
    resume,
    pause,
    flag,
    remain,
    start,
  }
}
