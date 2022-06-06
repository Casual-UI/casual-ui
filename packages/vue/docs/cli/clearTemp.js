const fs = require('fs')
const path = require('path')
const CWD_PATH = process.cwd()

fs.rmSync(path.resolve(CWD_PATH, '.vuepress/.temp/.casual'), {
  recursive: true,
  force: true,
})

fs.rmSync(path.resolve(CWD_PATH, '.vuepress/public/sandbox-demos'), {
  recursive: true,
  force: true,
})

fs.mkdirSync(path.resolve(CWD_PATH, '.vuepress/public/sandbox-demos'))
