import { useEffect, useState } from 'react'
const hoveringRef = {
  value: false,
}

type HoveringUpdater = (v: boolean) => void

type HoveringHookReturn = [boolean, HoveringUpdater]

let hoveringListeners: HoveringUpdater[] = []

export default function useHoverState(): HoveringHookReturn {
  const [hovering, setHovering] = useState(hoveringRef.value)

  hoveringListeners.push(setHovering)

  const setHoveringState: (v: boolean) => void = v => {
    hoveringRef.value = v
    hoveringListeners.forEach(listener => listener(v))
  }

  useEffect(() => {
    return () => {
      hoveringListeners = hoveringListeners.filter(l => l !== setHovering)
    }
  }, [])

  return [hovering, setHoveringState]
}
