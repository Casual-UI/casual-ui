import {
  compileScript,
  compileTemplate,
  parse
} from 'vue/compiler-sfc'

export default (id: string, source: string) => {

  const sourceParsed = parse(source, {
    filename: `${id}.vue`,
  })

  const script = sourceParsed.descriptor.scriptSetup ? compileScript(sourceParsed.descriptor, {
    id
  }).content.replace(/export default/, 'const App =') : `const App = { name: ${id} }`

  const templateSource = sourceParsed.descriptor.template?.content + `\n<c-notification />`

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
      </style>
      <link rel="stylesheet" href="https://unpkg.com/casual-ui-vue/dist/style.css">
      <!-- ES Module Shims: Import maps polyfill for modules browsers without import maps support (all except Chrome 89+) -->
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
        ${compileTemplate({
          source: templateSource || '<h3>Hello World</h3>',
          id,
          filename: 'App.vue',
        }).code.replace(/export/, '')}
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
