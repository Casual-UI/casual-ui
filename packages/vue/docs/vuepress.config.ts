import { defineUserConfig } from 'vuepress'
import { path } from '@vuepress/utils'
import casualCode from 'vuepress-plugin-casual-code'
import docSearch from '@vuepress/plugin-docsearch'
import { defaultTheme } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import nightOwlTheme from './config/night-owl.json'
import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'

export default defineUserConfig({
  title: 'Casual UI - Vue',
  templateDev: path.resolve(__dirname, 'template.dev.html'),
  templateBuild: path.resolve(__dirname, 'template.build.html'),
  locales: {
    '/': {
      lang: 'en-US',
      description: 'A ui components lib that supports for Vue3+',
    },
    '/zh-CN/': {
      lang: 'zh-CN',
      description: '一个支持Vue3+的组件库',
    },
  },
  theme: defaultTheme({
    logo: '/logo.svg',
    locales: {
      '/': {
        navbar: [
          {
            text: 'Guide',
            children: [
              {
                text: 'Install',
                link: '/guide/install/',
              },
              {
                text: 'Theme Customization',
                link: '/guide/theme-customize/',
              },
              {
                text: 'Dark Mode',
                link: '/guide/dark-mode/',
              },
            ],
          },
          {
            text: 'Features',
            children: [
              {
                text: 'Components',
                link: '/components/button/',
              },
              {
                text: 'Global CSS Utils',
                link: '/global-style-utils/',
              },
              {
                text: 'Directives',
                link: '/directives/v-loading/',
              },
              {
                text: 'Composable',
                link: '/usable/useClickOutside/',
              },
            ],
          },
        ],
        sidebar: {
          '/guide/': [
            '/guide/install/',
            '/guide/theme-customize/',
            '/guide/dark-mode/',
          ],
          '/components/': [
            {
              text: 'Basic',
              collapsible: true,
              children: [
                '/components/button/',
                '/components/loading/',
                '/components/tag/',
                '/components/icon/',
                '/components/carousel/',
              ],
            },
          ],
          '/usable/': ['/usable/useClickOutside/', '/usable/useFormValidator/'],
          '/global-style-utils/': ['/global-style-utils/'],
          '/directives/': ['/directives/v-loading/'],
        },
      },
      '/zh-CN/': {
        selectLanguageText: '简体中文',
        tip: '提示',
        contributorsText: '贡献者',
        lastUpdatedText: '最后更新于',
        editLinkText: '在Github上编辑此页',
        navbar: [
          {
            text: '指南',
            children: [
              {
                text: '安装',
                link: '/zh-CN/guide/install/',
              },
              {
                text: '主题定制',
                link: '/zh-CN/guide/theme-customize/',
              },
              {
                text: '暗黑模式',
                link: '/zh-CN/guide/dark-mode/',
              },
            ],
          },
          {
            text: '功能',
            children: [
              {
                text: '组件',
                link: '/zh-CN/components/button/',
              },
              {
                text: '全局工具样式',
                link: '/zh-CN/global-style-utils/',
              },
              {
                text: '指令',
                link: '/zh-CN/directives/v-loading/',
              },
              {
                text: '可组合',
                link: '/zh-CN/usable/useClickOutside/',
              },
            ],
          },
        ],
        sidebar: {
          '/zh-CN/guide/': [
            '/zh-CN/guide/install/',
            '/zh-CN/guide/theme-customize/',
            '/zh-CN/guide/dark-mode/',
          ],
          '/zh-CN/usable/': [
            '/zh-CN/usable/useClickOutside/',
            '/zh-CN/usable/useFormValidator/',
          ],
          '/zh-CN/global-style-utils/': ['/zh-CN/global-style-utils/'],
          '/zh-CN/directives/': ['/zh-CN/directives/v-loading/'],
          '/zh-CN/components/': [
            {
              text: 'Basic',
              collapsible: true,
              children: [
                '/zh-CN/components/button/',
                '/zh-CN/components/loading/',
                '/zh-CN/components/tag/',
                '/zh-CN/components/icon/',
                '/zh-CN/components/carousel/',
              ],
            },
          ],
        },
      },
    },
    logoDark: '/logo-dark.svg',
    repo: 'https://github.com/Blackman99/casual-ui',
    repoLabel: 'Github',
    editLinkPattern: ':repo/edit/:branch/packages/vue/docs/:path',
  }),
  plugins: [
    shikiPlugin({
      theme: nightOwlTheme as any,
    }) as any,
    casualCode({
      componentsBasePath:
        path.resolve(__dirname, '../ui/src/components/') + '/',
      importMap: {
        imports: {
          '@quasar/extras/material-icons':
            'https://unpkg.com/@quasar/extras/material-icons/index.mjs',
          'casual-ui-vue':
            'https://unpkg.com/casual-ui-vue/dist/casual-ui-vue.es.js',
          vue: 'https://unpkg.com/@vue/runtime-dom@3.2.36/dist/runtime-dom.esm-browser.js',
        },
      },
    }),
    docSearch({
      appId: 'GC34OK1KSK',
      apiKey: 'e29418351aacb050d006d9e76bdabe16',
      indexName: 'casual-ui-vue',
      locales: {
        '/zh-CN/': {
          translations: {
            button: {
              buttonText: '搜索',
              buttonAriaLabel: '搜索',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '重置查询',
                resetButtonAriaLabel: '重置查询',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '最近',
                noRecentSearchesText: '无最近搜索',
                saveRecentSearchButtonTitle: '保存当前搜索',
                removeRecentSearchButtonTitle: '从历史中删除当前搜索',
                favoriteSearchesTitle: '最爱的搜索',
                removeFavoriteSearchButtonTitle: '从最爱中移除',
              },
              errorScreen: {
                titleText: '无法获取搜索结果',
                helpText: '请检查网络连接',
              },
              footer: {
                selectText: '请选择',
                selectKeyAriaLabel: '输入关键字',
                navigateText: '导航',
                navigateUpKeyAriaLabel: '向上',
                navigateDownKeyAriaLabel: '向下',
                closeText: '关闭',
                closeKeyAriaLabel: '关闭',
                searchByText: '根据文字搜索',
              },
              noResultsScreen: {
                noResultsText: '没有找到结果',
                suggestedQueryText: '您可能想搜索',
                reportMissingResultsText: '没有找到结果？请报告缺失',
                reportMissingResultsLinkText: '报告缺失',
              },
            },
          },
        },
      },
    }),
    googleAnalyticsPlugin({
      id: 'G-4H4K4S0QTD',
    }),
  ],
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@doc': process.cwd(),
        },
      },
      plugins: [Unocss({ presets: [presetIcons()] }) as any],
    },
  }),
})
