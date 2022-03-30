import fs from 'fs'
import path from 'path'
const CWD_PATH = process.cwd()

fs.rm(
  path.resolve(CWD_PATH, './docs/.vuepress/.temp/.casual'),
  {
    recursive: true,
    force: true,
  },
  () => {
    console.log('OPay temp components deleted')
  }
)
