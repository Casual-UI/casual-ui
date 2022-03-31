const fs = require('fs')
const path = require('path')
const CWD_PATH = process.cwd()

fs.rm(
  path.resolve(CWD_PATH, './docs/.vuepress/.temp/.casual'),
  {
    recursive: true,
    force: true,
  },
  () => {
    console.log('Casual temp components deleted')
  }
)
