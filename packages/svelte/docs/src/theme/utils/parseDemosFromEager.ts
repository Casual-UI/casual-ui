function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export default (modules: Record<string, any>) =>
  Object.entries(modules).map(([k, v]) => {
    const name = k.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '') as string
    return {
      name,
      title: name.split('-').map(capitalizeFirstLetter).join(' '),
      comp: v.default,
    }
  })
