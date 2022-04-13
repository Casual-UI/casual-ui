import { uid } from 'uid'
import type { Plugin } from 'vuepress'
import { parse } from 'vue-docgen-api'
import { path } from '@vuepress/utils'

const componentDocMdContent = `
### API

<ComponentDoc />
`
interface CasualCodePluginOptions {
  componentsBasePath: string
}

const componentsIdMap: Record<string, string> = {}

const markdownItVueDemoCodeBlock: Plugin<CasualCodePluginOptions> = options => {
  return {
    name: 'vupress-plugin-casual-code',
    clientAppEnhanceFiles: [path.resolve(__dirname, './clientAppEnhance.ts')],
    extendsMarkdown: async (md, app) => {
      const defaultRender = md.render

      md.render = function (src, env) {
        const { frontmatter = {} } = env

        const { componentPath } = frontmatter

        let result = src
        if (componentPath) {
          result = `${result} ${componentDocMdContent}`
        }
        return defaultRender(result, env)
      }

      const defaultFenceRenderer = md.renderer.rules.fence

      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        if (!defaultFenceRenderer) return ''
        const key = `${env.filePathRelative}-${idx}`

        const { content, info } = tokens[idx]
        const defaultResult = defaultFenceRenderer(
          tokens,
          idx,
          options,
          env,
          self
        )
        const meta = info.split(' ')
        if (!meta.includes('vue') || !meta.includes('live'))
          return defaultResult
        const id = componentsIdMap[key] ? componentsIdMap[key] : uid()

        const TempDemoCodeComponentName = `TempDemoCodeComponent${id}`

        const path = `.casual/${env.filePathRelative.replace(
          /(\w|-)+\.md/,
          ''
        )}${TempDemoCodeComponentName}.vue`

        app.writeTemp(path, content)
        return `
        <div class="c-doc-demo">
          <div class="c-pa-md">
            <component :is="$resolveCasual(() => import('@temp/${path}'))" />
          </div>
          ${
            meta.includes('hide-code')
              ? ''
              : `<DemoCode>
                ${defaultResult}
              </DemoCode>`
          }
        </div>
      `
      }
    },
    extendsPage: async page => {
      page.frontmatter = page.frontmatter ?? {}
      if (page.frontmatter.componentPath) {
        const componentDocInfo = await parse(
          path.resolve(
            __dirname,
            `${options.componentsBasePath}${page.frontmatter.componentPath}.vue`
          )
        )
        page.frontmatter.docInfo = componentDocInfo
      }
      // if (page.frontmatter.additionComponentPaths) {
      //   page.frontmatter
      // }
    },
  }
}

export default markdownItVueDemoCodeBlock
