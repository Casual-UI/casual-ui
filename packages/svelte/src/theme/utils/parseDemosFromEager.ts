function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getName = (path: string) =>
  path.replace(/(^\.\/_demos\/)|(\.svelte$)/g, '') as string

export default (modules: Record<string, any>) => {
  const entries = Object.entries(modules)

  const groupLeaders = entries.filter(([, m]) => !m.group)

  return groupLeaders.map(([k, v]) => {
    const name = getName(k)

    const groupModules = entries.filter(([, m]) => m.group === name)

    return {
      name,
      title: name.split('-').map(capitalizeFirstLetter).join(' '),
      comp: v.default,
      group: groupModules.map(([path, groupModule]) => ({
        name: getName(path),
        title: getName(path) + '.svelte',
        body: groupModule.default,
      })),
    }
  })
}
