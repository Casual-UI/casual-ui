/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Casual UI - React',
  tagline: 'A ui components lib that supports for React17+',
  url: 'https://casual-ui-react.donsen.site',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'logo.svg',
  organizationName: 'Blackman99',
  projectName: 'casual-ui-react',
  githubHost: 'github.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-6X1YBPZXL2',
        },
        docs: {
          sidebarCollapsed: false,
          routeBasePath: '/',
          sidebarPath: require.resolve('./config/sidebars.js'),
          editUrl:
            'https://github.com/Blackman99/casual-ui/edit/main/packages/react/docs',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
            () => async ast => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ast.children.unshift({
                type: 'import',
                value:
                  "import { PropTable } from '@site/src/theme/components/PropTable.tsx'",
                default: false,
              })
            },
          ],
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/styles/doc.scss'),
            require.resolve('casual-styles/src/index.scss'),
          ],
        },
      }),
    ],
  ],
  plugins: ['docusaurus-plugin-sass', './plugins/casual-components-doc'],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Casual UI - React',
        logo: {
          alt: 'Casual UI Logo',
          src: 'logo.svg',
          srcDark: 'logo-dark.svg',
        },
        items: [
          {
            position: 'right',
            label: 'Guide',
            type: 'dropdown',
            items: [
              {
                label: 'Install',
                to: '/guide/install',
              },
              {
                to: 'guide/theme-customize',
                label: 'Theme customization',
              },
              {
                to: 'guide/dark-mode',
                label: 'Dark mode',
              },
            ],
          },
          {
            position: 'right',
            label: 'Features',
            type: 'dropdown',
            items: [
              {
                label: 'CSS Utils',
                to: '/style/global-util/',
              },
              {
                label: 'Components',
                to: '/components/basic/button',
              },
              {
                label: 'Hooks API',
                to: '/hooks/',
              },
            ],
          },
          {
            position: 'right',
            label: 'More',
            type: 'dropdown',
            items: [
              {
                label: 'Casual UI - Vue',
                to: 'https://casual-ui-vue.donsen.site/',
              },
              {
                label: 'Casual UI - Svelte',
                to: 'https://casual-ui-svelte.donsen.site/',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Blackman99/casual-ui.git',
            label: 'Github',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Guide',
            items: [
              {
                label: 'Install',
                to: '/guide/install',
              },
            ],
          },
          {
            title: 'Components',
          },
          {
            title: 'More',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/Blackman99/casual-ui.git',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Casual UI.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      liveCodeBlock: {
        playgroundPosition: 'top',
      },
      showLastUpdateTime: true,
      algolia: {
        apiKey: 'e4cde0eff4725059b13ad81010ace04b',
        appId: '79D0K7AVBK',
        indexName: 'casual-ui',
        contextualSearch: false,
      },
      docs: {
        sidebar: { autoCollapseCategories: false },
      },
    }),
}

module.exports = config
