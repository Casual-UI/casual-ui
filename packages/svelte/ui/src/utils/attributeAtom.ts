export const attributeAtom = (attrs: Record<string, any>) =>
  Object.entries(attrs).reduce(
    (attrsNeeded, [name, exist]) => ({
      ...attrsNeeded,
      [name]: exist ? '' : null,
    }),
    {}
  )
