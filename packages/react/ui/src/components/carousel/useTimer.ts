import { useCallback, useEffect, useState } from 'react'

export default function useTimer(cb: (...params: any) => any, delay: number) {
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
    setStart(Date.now())
    setRemain(delay)
    if (flag) {
      clearTimeout(flag)
      setFlag(null)
    }
  }, [flag])

  const begin = () => {
    setRemain(delay)
    setStart(Date.now())
    setFlag(setTimeout(cb, remain))
  }

  const resume = useCallback(() => {
    if (remain < 1) {
      return
    }
    if (flag) {
      clearTimeout(flag)
      setFlag(null)
    }
    setFlag(setTimeout(cb, remain))
  }, [remain, cb, flag])

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
