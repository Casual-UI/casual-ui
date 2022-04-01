import React from 'react'
import clsx from 'clsx'
import homeStyle from './home.module.scss'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const Logo = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <div className={homeStyle.home}>
      <div className={clsx(homeStyle.logoContainer)}>
        <img src="/logo.svg" alt="" className={homeStyle.logo} />
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
      </div>
      <div className={homeStyle.features}>
        {[
          ['拥抱Hooks', '采用Hooks构建整个库'],
          ['支持暗黑模式&主题定制', '可以方便的自定义你的主题'],
          ['TS编写', '友好的类型提示'],
        ].map(([title, description]) => (
          <div className={homeStyle.feature} key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Logo }
