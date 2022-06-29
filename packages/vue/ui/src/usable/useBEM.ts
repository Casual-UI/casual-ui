const camelToKebab = (str: string) =>
  str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')

type BEM = (
  base: string,
  bemCondition: {
    [k: string]: any
  }
) => any[]

const useBEM: BEM = (base, bemCondition) =>
  Object.entries(bemCondition).reduce<any[]>(
    (bemClass, [k, v]) => {
      const className = `c-${base}--${camelToKebab(k)}`

      return [...bemClass, { [className]: v }]
    },
    [`c-${base}`]
  )

export { useBEM, camelToKebab }
