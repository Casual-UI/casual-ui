export const attributeAtom = (attrs: Record<string, boolean | undefined>) =>
  Object.entries(attrs).reduce(
    (attrsNeeded, [name, exist]) => ({
      ...attrsNeeded,
      [name]: exist ? '' : null,
    }),
    {}
  )
