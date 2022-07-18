import React from 'react'
import clsx from 'clsx'
import homeStyle from './home.module.scss'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const Logo = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <div className={homeStyle.home}>
      <div className={clsx(homeStyle.logoContainer)}>
        <img
          src="/logo.svg"
          alt=""
          className={homeStyle.logo}
        />
      </div>
      <h1 className={homeStyle.title}>{siteConfig.title}</h1>
      <p className={homeStyle.description}>{siteConfig.tagline}</p>
      <div className={homeStyle.actions}>
        <a
          href="/guide/install/"
          aria-label="快速上手"
          className={homeStyle.actionsButton}
        >
          快速上手
        </a>
        <a
          href="/components/basic/button"
          aria-label="组件一览"
          className={`${homeStyle.actionsButton} ${homeStyle.primary}`}
        >
          组件一览
        </a>
      </div>
      <div className={homeStyle.features}>
        {[
          ['拥抱Hooks', '采用Hooks构建整个库'],
          ['支持暗黑模式&主题定制', '可以方便的自定义你的主题'],
          ['TS编写', '友好的类型提示'],
        ].map(([title, description]) => (
          <div
            className={homeStyle.feature}
            key={title}
          >
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
      <p className={homeStyle.description}>鸣谢</p>
      <div className="c-row c-items-center c-gutter-md c-wrap c-justify-center c-py-md">
        <img
          src="/badges/react.svg"
          alt=""
        />
        <img
          src="/badges/vue.svg"
          alt=""
        />
        <img
          src="/badges/docusaurus.svg"
          alt=""
        />
        <img
          src="/badges/quasar.svg"
          alt=""
        />
        <img
          src="/badges/sass.svg"
          alt=""
        />
        <img
          src="/badges/typescript.svg"
          alt=""
        />
        <img
          src="/badges/vscode.svg"
          alt=""
        />
        <img
          src="/badges/vite.svg"
          alt=""
        />
        <img
          src="/badges/eslint.svg"
          alt=""
        />
        <img
          src="/badges/javascript.svg"
          alt=""
        />
        <img
          src="/badges/pnpm.svg"
          alt=""
        />
        <img
          src="/badges/stylelint.svg"
          alt=""
        />
        <img
          src="/badges/vuepress.svg"
          alt=""
        />
        <img
          src="/badges/svelte.svg"
          alt=""
        />
      </div>
    </div>
  )
}

export { Logo }
