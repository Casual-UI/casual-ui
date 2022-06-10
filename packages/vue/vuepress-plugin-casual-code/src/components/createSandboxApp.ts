import {
  compileScript,
  compileTemplate,
  parse,
  compileStyle
} from 'vue/compiler-sfc'

export default (id: string, source: string) => {

  const sourceParsed = parse(source, {
    filename: `${id}.vue`,
  })

  const script = sourceParsed.descriptor.scriptSetup ? compileScript(sourceParsed.descriptor, {
    id,
  }).content.replace(/export default/, 'const App =') : `const App = { name: ${id} }`

  const templateSource = sourceParsed.descriptor.template?.content + `\n<c-notification />`

  const templateParsed = compileTemplate({
    source: templateSource || '<h3>Hello World</h3>',
    id,
    filename: `${id}.vue`,
    scoped: true
  }).code.replace(/export/, '')

  const styleCode = sourceParsed.descriptor.styles.reduce(
    (r, style) => {
      const styleParsed = compileStyle({
        id,
        filename: `${id}.vue`,
        source: style.content,
        scoped: style.scoped,
      })
      return `${r}\n${styleParsed.code}`
    },
    ''
  )

  return `
  <!doctype html>
  <html>
    <head>
      <style>
        body, html {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        html {
          overflow-x: hidden;
        }
        body {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
        .c-button + .c-button {
          margin-left: 12px;
        }
        ${styleCode}
      </style>
      <link rel="stylesheet" href="https://unpkg.com/casual-ui-vue/dist/style.css">
      <script async src="https://unpkg.com/es-module-shims@1.5.5/dist/es-module-shims.wasm.js"></script>
      <script type="importmap">
        {
          "imports": {
            "@quasar/extras/material-icons": "https://unpkg.com/@quasar/extras/material-icons/index.mjs",
            "casual-ui-vue": "https://unpkg.com/casual-ui-vue/dist/casual-ui-vue.es.js", 
            "vue": "https://unpkg.com/vue@3.2.37/dist/vue.esm-browser.prod.js"
          }
        }
      </script>
    </head>
    <body>
      <div id="${id}">

      </div>
      <script type="module">
        import { createApp } from 'vue'
        import CasualUI from 'casual-ui-vue'
        ${script}
        ${templateParsed}
        App.__scopeId = 'data-v-${id}'
        App.__file = '${id}.vue'
        App.render = render
        const app = createApp(App)
        app.config.unwrapInjectedRef = true
        app.config.errorHandler = e => console.error(e)
        app.use(CasualUI)
        app.mount('#${id}')
      </script>
    </body>
  </html>`
}
