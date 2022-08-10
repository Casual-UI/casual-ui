import React from 'react'
import clsx from 'clsx'
import homeStyle from './home.module.scss'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { translate } from '@docusaurus/Translate'
const Logo = () => {
  const { siteConfig } = useDocusaurusContext()
  const badges = [
    'react',
    'vue',
    'docusaurus',
    'quasar',
    'sass',
    'typescript',
    'vscode',
    'vite',
    'eslint',
    'javascript',
    'pnpm',
    'stylelint',
    'vuepress',
    'svelte',
  ]
  return (
    <div className={homeStyle.home}>
      <div className={clsx(homeStyle.logoContainer)}>
        <img
          src={useBaseUrl('/logo.svg')}
          alt=""
          className={homeStyle.logo}
        />
      </div>
      <h1 className={homeStyle.title}>{siteConfig.title}</h1>
      <p className={homeStyle.description}>
        {translate({
          id: 'homePage.tagsLine',
          message: siteConfig.tagline,
        })}
      </p>
      <div className={homeStyle.actions}>
        <a
          href="/guide/install/"
          aria-label={translate({
            id: 'homePage.quickStart.ariaLabel',
            message: 'Quick Start',
          })}
          className={homeStyle.actionsButton}
        >
          {translate({
            id: 'homePage.quickStart.label',
            message: 'Quick Start',
          })}
        </a>
        <a
          href="/components/basic/button"
          aria-label={translate({
            id: 'homePage.componentList.ariaLabel',
            message: 'Components List',
          })}
          className={`${homeStyle.actionsButton} ${homeStyle.primary}`}
        >
          {translate({
            id: 'homePage.componentList.label',
            message: 'Components List',
          })}
        </a>
      </div>
      <div className={homeStyle.features}>
        {[
          [
            translate({
              id: 'feature.typeFriendly.title',
              message: 'Type Friendly',
            }),
            translate({
              id: 'feature.typeFriendly.desc',
              message: 'All written with TypeScript',
            }),
          ],
          [
            translate({
              id: 'feature.themeCustomization.title',
              message: 'Theme Customization',
            }),
            translate({
              id: 'feature.themeCustomization.desc',
              message: 'All theme color can be override by css vars',
            }),
          ],
          [
            translate({
              id: 'feature.darkMode.title',
              message: 'Dark mode support',
            }),
            translate({
              id: 'feature.darkMode.desc',
              message: 'Easy to toggle dark mode',
            }),
          ],
          [
            translate({
              id: 'feature.strongForm.title',
              message: 'Strong an flexible form',
            }),
            translate({
              id: 'feature.strongForm.desc',
              message:
                'Provide a fully customizable interfaces for customizing form components',
            }),
          ],
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
      <p className={homeStyle.description}>
        {translate({
          id: 'homePage.thanks',
          message: 'Thanks',
        })}
      </p>
      <div className="c-row c-items-center c-gutter-md c-wrap c-justify-center c-py-md">
        {badges.map(badgeUrl => (
          <img
            key={badgeUrl}
            src={useBaseUrl(`/badges/${badgeUrl}.svg`)}
            alt=""
          />
        ))}
      </div>
    </div>
  )
}

export { Logo }
