/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const docgen = require('react-docgen-typescript')
const fg = require('fast-glob')
const flagRef = require('./flagRef')

const cliProgress = require('cli-progress')

const colors = require('ansi-colors')

// create new progress bar
const b1 = new cliProgress.SingleBar({
  format:
    'Doc parsing |' +
    colors.cyan('{bar}') +
    '| {percentage}% || {value}/{total} Parsed',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true,
})

const CWD_PATH = process.cwd()

module.exports = async function CasualComponentsDoc() {
  return {
    name: 'casual-components-doc',
    async loadContent() {
      if (flagRef.value) return {}
      const files = await fg(['../ui/src/components/**/*.tsx'])
      b1.start(files.length, 0)

      const content = files.reduce((docs, filePath) => {
        const name = filePath.split('/').at(-1).replace(/\.tsx/, '.json')
        const res = {
          ...docs,
          [name]: docgen.parse(path.resolve(CWD_PATH, filePath)),
        }
        b1.increment()
        return res
      }, {})
      b1.stop()
      return content
    },
    contentLoaded: async ({ content, actions: { createData } }) => {
      if (flagRef.value) return
      flagRef.value = true
      for (const k in content) {
        await createData(k, JSON.stringify(content[k]))
      }
    },
  }
}
