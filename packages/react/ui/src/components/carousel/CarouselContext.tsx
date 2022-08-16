import { createContext } from 'react'

interface Context {
  hovering: boolean
  setSliding: (sliding: boolean) => void
  pauses: Function[]
  resumes: Function[]
  addPause: (pause: Function) => void
  addResume: (resume: Function) => void
}

const CarouselContext = createContext<Context>({
  hovering: false,
  setSliding: () => {},
  pauses: [],
  resumes: [],
  addPause: () => {},
  addResume: () => {},
})

export { CarouselContext, Context }
