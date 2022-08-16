import { createContext } from 'react'

interface Context {
  hovering: boolean
  setSliding: (sliding: boolean) => void
  pauses: Function[]
  resumes: Function[]
}

const CarouselContext = createContext<Context>({
  hovering: false,
  setSliding: () => {},

  pauses: [],
  resumes: [],
})

export { CarouselContext, Context }
