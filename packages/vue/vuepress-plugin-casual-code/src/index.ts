import { uid } from 'uid'
import { parse } from 'vue-docgen-api'
import { path } from '@vuepress/utils'
import { execSync } from 'child_process'
import type { App } from 'vuepress'

const componentDocMdContent = (name: string, doc?: boolean) => `
### ${name} API

<ComponentDoc ${
  doc ? `:doc="$frontmatter.additionalComponentInfo.${name}"` : ''
} />
`

type AdditionalComponentPaths = {
  name: string
  path: string
}[]

interface ImportMap {
  imports: Record<string, string>
}

const componentsIdMap: Record<string, string> = {}

const markdownItVueDemoCodeBlock = (pluginOptions: {
  componentsBasePath: string
  importMap?: ImportMap
}) => {
  
  return {
    name: 'vupress-plugin-casual-code',
    clientConfigFile: path.resolve(__dirname, './clientConfig.ts'),
    extendsMarkdown: async (md: any, app: any) => {
      const defaultRender = md.render

      md.render = function (src: any, env: any) {
        if(!env.frontmatter) {
          env.frontmatter = {}
        }

        const { componentPath, additionalComponentPaths, hooksPath } =
          env.frontmatter

        let result = src
        if (componentPath) {
          result = `${result} ${componentDocMdContent(
            componentPath.split('/').pop()
          )}`
        }
        if (
          additionalComponentPaths &&
          Array.isArray(additionalComponentPaths) &&
          additionalComponentPaths.length > 0
        ) {
          result = `${result} ${additionalComponentPaths
            .map(({ name }) => componentDocMdContent(name, true))
            .join('\n')}`
        }

        if (hooksPath) {
          result = `${result} \n ### ${hooksPath
            .split('/')
            .pop()} API \n <HooksApi />`
        }

        return defaultRender(`${result}`, env)
      }

      const defaultFenceRenderer = md.renderer.rules.fence

      md.renderer.rules.fence = function (
        tokens: any,
        idx: any,
        options: any,
        env: any,
        self: any
      ) {
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

        if(!env.frontmatter.sandboxCodes) {
          env.frontmatter.sandboxCodes = {}
        }
        env.frontmatter.sandboxCodes[TempDemoCodeComponentName] = content
        
        const path = `.casual/${env.filePathRelative.replace(
          /(\w|-)+\.md/,
          ''
        )}${TempDemoCodeComponentName}.vue`

        app.writeTemp(path, content)
        return `
        <div class="c-doc-demo">
          <DemoCode path="${TempDemoCodeComponentName}">
            <component :is="$resolveCasual(() => import('@temp/${path}'))"/>
            <template #code>
              ${defaultResult}
            </template>
          </DemoCode>
        </div>
      `
      }
    },
    extendsPage: async (page: any) => {
      page.frontmatter = page.frontmatter ?? {}
      if (page.frontmatter.componentPath) {
        const componentDocInfo = await parse(
          path.resolve(
            __dirname,
            `${pluginOptions.componentsBasePath}${page.frontmatter.componentPath}.vue`
          )
        )
        page.frontmatter.docInfo = componentDocInfo
      }
      if (page.frontmatter.additionalComponentPaths) {
        page.frontmatter.additionalComponentInfo = {}
        const additionalComponentPaths = page.frontmatter
          .additionalComponentPaths as AdditionalComponentPaths
        for (const { name, path: singlePath } of additionalComponentPaths) {
          page.frontmatter.additionalComponentInfo[name] = (await parse(
            path.resolve(
              __dirname,
              `${pluginOptions.componentsBasePath}${singlePath}.vue`
            )
          )) as any
        }
      }
      const hooksAPIPath = page.frontmatter.hooksPath
      if (hooksAPIPath) {
        const typesJsonPath = path.resolve(
          __dirname,
          `./.temp/${hooksAPIPath}.json`
        )
        execSync(
          `npx typedoc --tsconfig ${path.resolve(
            __dirname,
            '../../tsconfig.json'
          )} --json ${typesJsonPath} ${
            pluginOptions.componentsBasePath
          }../${hooksAPIPath}.ts`
        )
        page.frontmatter.hooksInfo = require(typesJsonPath)
      }
    },
  }
}

export default markdownItVueDemoCodeBlock
