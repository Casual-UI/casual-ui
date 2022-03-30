import { uid } from 'uid'
import { Plugin } from 'vuepress'
import { parse } from 'vue-docgen-api'
import { resolve } from 'path'

const componentsIdMap: Record<string, string> = {}

const markdownItVueDemoCodeBlock: Plugin = {
  name: 'vupress-plugin-vue3-demo-code',
  extendsMarkdown: async (md, app) => {
    const defaultFenceRenderer = md.renderer.rules.fence

    md.renderer.rules.fence = function (tokens, idx, options, env, self) {
      if (!defaultFenceRenderer) return ''
      const key = `${env.filePathRelative}-${idx}`

      const { content, info } = tokens[idx]
      if (info.indexOf('title="') !== -1) {
        console.log('info: ', info)
      }
      const defaultResult = defaultFenceRenderer(
        tokens,
        idx,
        options,
        env,
        self
      )
      const meta = info.split(' ')
      if (!meta.includes('vue') || !meta.includes('live')) return defaultResult
      const id = componentsIdMap[key] ? componentsIdMap[key] : uid()

      const TempDemoCodeComponentName = `TempDemoCodeComponent${id}`

      app.writeTemp(
        `.casual/${env.filePathRelative.replace(
          /(\w|-)+\.md/,
          ''
        )}${TempDemoCodeComponentName}.vue`,
        content
      )

      componentsIdMap[key] = id

      return `
        <div class="c-doc-demo">
          <div class="c-pa-md">
            <${TempDemoCodeComponentName} />
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

    const defaultRender = md.render

    md.render = function (src, env) {
      const { frontmatter = {} } = env
      const { componentPath } = frontmatter
      if (componentPath) {
        return defaultRender(
          `${src}
### Props

<ComponentDoc type="props" />

### Events

<ComponentDoc type="events" />

### Slots

<ComponentDoc type="slots" />

### Methods

<ComponentDoc type="methods" />

            `,
          env
        )
      }
      return defaultRender(src, env)
    }
  },
  extendsPage: async page => {
    page.frontmatter = page.frontmatter ?? {}
    if (page.frontmatter.componentPath) {
      const componentDocInfo = await parse(
        resolve(
          __dirname,
          `../../../ui/src/components/${page.frontmatter.componentPath}.vue`
        )
      )
      page.frontmatter.docInfo = componentDocInfo
    }
  },
}

export default markdownItVueDemoCodeBlock
