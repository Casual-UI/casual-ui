export const attributeAtom = attrs =>
  Object.entries(attrs).reduce(
    (attrsNeeded, [name, exist]) => ({
      ...attrsNeeded,
      [name]: exist ? '' : null,
    }),
    {}
  )
