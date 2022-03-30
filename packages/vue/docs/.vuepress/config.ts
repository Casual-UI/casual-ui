import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'
import { UserConfig } from 'vite'

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

export default defineUserConfig<
  DefaultThemeOptions,
  {
    viteOptions: UserConfig
  }
>({
  port: 8090,
  lang: 'zh-CN',
  title: 'OPay UI - Vue',
  description: '基于OPay业务的增长式组件库',
  theme: '@vuepress/theme-default',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  clientAppEnhanceFiles: [path.resolve(__dirname, './clientAppEnhance.ts')],
  plugins: [path.resolve(__dirname, './plugins/vueDemoCode.ts')],
  clientAppRootComponentFiles: [
    path.resolve(__dirname, '../../ui/src/components/popup/CNotification.vue'),
  ],
  themeConfig: {
    logo: '/logo.svg',
    logoDark: '/logo-dark.svg',
    repo: 'https://github.com/Blackman99/casual-ui',
    repoLabel: 'Git仓库',
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新于',
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
        text: '功能',
        children: [
          {
            text: '全局工具样式',
            link: '/global-style-utils/',
          },
          {
            text: '组件',
            link: '/components/',
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
      '/usable/': ['/usable/', '/usable/useClickOutside/'],
      '/global-style-utils/': ['/global-style-utils/'],
      '/components/': [
        {
          text: '简介',
          link: '/components/',
        },
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
          ],
        },
        {
          text: '交互',
          children: [
            '/components/interact/expansion/',
            '/components/interact/dropdown/',
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
          children: ['/components/data-presentation/table/'],
        },
      ],
      '/icons-preview/': iconsRoutes,
    },
  },
})
