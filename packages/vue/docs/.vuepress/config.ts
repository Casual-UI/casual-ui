import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'
import type { UserConfig } from 'vite'
import casualCode from 'vuepress-plugin-casual-code'
import docSearch from '@vuepress/plugin-docsearch'

const iconsRoutes = [
  '/icons-preview/material/',
  '/icons-preview/material-outlined/',
  '/icons-preview/material-round/',
  '/icons-preview/fontawesome/',
  '/icons-preview/fontawesome-v6/',
  '/icons-preview/ionicons-v4/',
  '/icons-preview/ionicons-v5/',
  '/icons-preview/ionicons-v6/',
  '/icons-preview/mdi-v4/',
  '/icons-preview/mdi-v5/',
  '/icons-preview/mdi-v6/',
]

const componentsRoutes = [
  {
    text: '基础组件',
    children: [
      '/components/button/',
      '/components/loading/',
      '/components/icon/',
      '/components/tag/',
    ],
  },
  {
    text: '表单',
    children: [
      '/components/form/input',
      '/components/form/select/',
      '/components/form/radio/',
      '/components/form/checkbox/',
      '/components/form/toggle/',
      '/components/form/date-picker/',
      '/components/form/form/',
    ],
  },
  {
    text: '交互',
    children: [
      '/components/interact/expansion/',
      '/components/interact/dropdown/',
      '/components/interact/tabs/',
    ],
  },
  {
    text: '反馈',
    children: [
      '/components/feedback/tooltip/',
      '/components/feedback/dialog/',
      '/components/feedback/notification/',
    ],
  },
  {
    text: '数据展示',
    children: [
      '/components/data-presentation/table/',
      '/components/data-presentation/list/',
    ],
  },
]

export default defineUserConfig<
  DefaultThemeOptions,
  {
    viteOptions: UserConfig
  }
>({
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  lang: 'zh-CN',
  title: 'Casual UI - Vue',
  description: '一个随意的组件库',
  theme: '@vuepress/theme-default',
  clientAppEnhanceFiles: [path.resolve(__dirname, './clientAppEnhance.ts')],
  plugins: [
    [
      casualCode,
      {
        componentsBasePath:
          path.resolve(__dirname, '../../ui/src/components/') + '/',
      },
    ],
    [
      docSearch,
      {
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
      },
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-4H4K4S0QTD',
      },
    ],
  ],
  clientAppRootComponentFiles: [
    path.resolve(__dirname, './components/UseCNotification.vue'),
  ],
  themeConfig: {
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
            text: '可组合',
            link: '/usable/',
          },
          {
            text: '图标一览',
            children: iconsRoutes,
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
      '/icons-preview/': iconsRoutes,
    },
  },
  bundlerConfig: {
    viteOptions: {
      resolve: {
        alias: {
          '@doc': path.resolve(__dirname, '../'),
        },
      },
    },
  },
})
