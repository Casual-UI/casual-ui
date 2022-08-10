import { defineUserConfig } from 'vuepress'
import { path } from '@vuepress/utils'
import casualCode from 'vuepress-plugin-casual-code'
import docSearch from '@vuepress/plugin-docsearch'
import { defaultTheme } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { componentsRoutes } from './config/routes'
import nightOwlTheme from './config/night-owl.json'
import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Casual UI - Vue',
  description: '一个随意的组件库',
  templateDev: path.resolve(__dirname, 'template.dev.html'),
  templateBuild: path.resolve(__dirname, 'template.build.html'),
  theme: defaultTheme({
    logo: '/logo.svg',
    logoDark: '/logo-dark.svg',
    repo: 'https://github.com/Blackman99/casual-ui',
    repoLabel: 'Github',
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新于',
    editLinkText: '在Github上编辑此页',
    editLinkPattern: ':repo/edit/:branch/packages/vue/docs/:path',
    tip: '提示',
    navbar: [
      {
        text: '指南',
        children: [
          {
            text: '安装',
            link: '/guide/install/',
          },
          {
            text: '主题定制',
            link: '/guide/theme-customize/',
          },
          {
            text: '暗黑模式',
            link: '/guide/dark-mode/',
          },
        ],
      },
      {
        text: '组件',
        children: componentsRoutes,
      },
      {
        text: '功能',
        children: [
          {
            text: '全局工具样式',
            link: '/global-style-utils/',
          },
          {
            text: '指令',
            link: '/directives/v-loading/',
          },
          {
            text: '可组合',
            link: '/usable/',
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': ['/guide/install/', '/guide/theme-customize/'],
      '/usable/': [
        '/usable/',
        '/usable/useClickOutside/',
        '/usable/useFormValidator/',
      ],
      '/global-style-utils/': ['/global-style-utils/'],
      '/components/': componentsRoutes,
      '/directives/': ['/directives/v-loading/'],
    },
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
      placeholder: '搜索文档',
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
