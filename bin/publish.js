#!/usr/bin/env zx
// @ts-nocheck
import { $, cd, fs } from 'zx'
import { format } from 'prettier'

/**
 *
 * @param {'--sm' | '--md' | '--lg'} type
 * @param {any} packageInfo
 */
function addVersion(type = '--sm', packageInfo) {
  const versions = packageInfo.version.split('.')
  if (versions.length < 3) return
  switch (type) {
    case '--sm':
      versions[2] = Number(versions[2]) + 1
      break
    case '--md':
      versions[1] = Number(versions[1]) + 1
      versions[2] = 0
      break
    case '--lg':
      versions[0] = Number(versions[1]) + 0
      versions[1] = 0
      versions[2] = 0
      break
  }
  packageInfo.version = versions.join('.')
}

/**
 * @type {*}
 */
const type = process.argv.find(
  arg => arg === '--sm' || arg === '--md' || arg === '--lg'
)

if (type) {
  cd('./packages/styles')

  await $`npm run build`

  cd('../react/ui')

  let packageInfo = await fs.readJSON('./package.json')
  addVersion(type, packageInfo)
  fs.writeFileSync(
    './package.json',
    format(JSON.stringify(packageInfo), { parser: 'json', printWidth: 30 })
  )

  await $`npm run build`
  await $`npm publish`

  cd('../../vue/ui')

  packageInfo = await fs.readJSON('./package.json')
  addVersion(type, packageInfo)
  fs.writeFileSync(
    './package.json',
    format(JSON.stringify(packageInfo), { parser: 'json', printWidth: 30 })
  )

  await $`npm run build`
  await $`npm publish`

  cd('../../svelte')

  packageInfo = await fs.readJSON('./src/lib/package.json')
  addVersion(type, packageInfo)
  fs.writeFileSync(
    './src/lib/package.json',
    format(JSON.stringify(packageInfo), { parser: 'json', printWidth: 30 })
  )

  await $`npm run package`
  cd('./dist')
  await $`npm publish`

  cd('../../../')

  const tag = `v${packageInfo.version}`

  await $`git tag ${tag}`
  await $`git push origin ${tag}`
  await $`git add -A`
  await $`git commit -m "relese: ${packageInfo.version}"`
  await $`git push`
}
