/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const docgen = require('react-docgen-typescript')
const fg = require('fast-glob')
const flagRef = require('./flagRef')

const CWD_PATH = process.cwd()

module.exports = async function OComponentsDoc() {
  return {
    name: 'o-components-doc',
    async loadContent() {
      if (flagRef.value) return {}
      const files = await fg(['../ui/src/components/**/*.tsx'])
      return files.reduce((docs, filePath) => {
        const name = filePath.split('/').at(-1).replace(/\.tsx/, '.json')
        return {
          ...docs,
          [name]: docgen.parse(path.resolve(CWD_PATH, filePath)),
        }
      }, {})
    },
    contentLoaded: async ({ content, actions: { createData } }) => {
      if (flagRef.value) return
      for (const k in content) {
        await createData(k, JSON.stringify(content[k]))
      }
      flagRef.value = true
    },
  }
}
