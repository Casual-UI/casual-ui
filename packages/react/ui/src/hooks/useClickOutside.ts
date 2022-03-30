import { RefObject, useEffect } from 'react'

export default ({
  domRef,
  cbInside,
  cbOutside,
}: {
  domRef: RefObject<any>
  cbInside?: () => void
  cbOutside?: () => void
}) => {
  useEffect(() => {
    const onWindowClick = (e: any) => {
      if (!domRef.current) return
      if (domRef.current.contains(e.target)) {
        cbInside?.()
      } else {
        cbOutside?.()
      }
    }
    window.addEventListener('click', onWindowClick)

    return () => {
      window.removeEventListener('click', onWindowClick)
    }
  }, [])
}
