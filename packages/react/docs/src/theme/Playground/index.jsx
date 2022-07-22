/* eslint-disable react/prop-types */
import * as React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { usePrismTheme } from '@docusaurus/theme-common'
import styles from './styles.module.css'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { CExpansion } from 'casual-ui-react'

function LivePreviewLoader() {
  // Is it worth improving/translating?
  return <div>Loading...</div>
}

function ResultWithHeader() {
  return (
    <>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <BrowserOnly fallback={<LivePreviewLoader />}>
          {() => (
            <>
              <LivePreview />
              <LiveError />
            </>
          )}
        </BrowserOnly>
      </div>
    </>
  )
}

function ThemedLiveEditor() {
  const isBrowser = useIsBrowser()
  return (
    <CExpansion title="展开/收起代码" open={false} reverse>
      <LiveEditor key={isBrowser} className={styles.playgroundEditor} />
    </CExpansion>
  )
}

export default function Playground({ children, transformCode, ...props }) {
  const {
    siteConfig: {
      themeConfig: {
        liveCodeBlock: { playgroundPosition },
      },
    },
  } = useDocusaurusContext()
  const prismTheme = usePrismTheme()

  return (
    <div className={styles.playgroundContainer}>
      <LiveProvider
        code={children.replace(/\n$/, '')}
        transformCode={transformCode || (code => `${code};`)}
        theme={prismTheme}
        {...props}
      >
        {playgroundPosition === 'top' ? (
          <>
            <ResultWithHeader />
            <ThemedLiveEditor />
          </>
        ) : (
          <>
            <ThemedLiveEditor />
            <ResultWithHeader />
          </>
        )}
      </LiveProvider>
    </div>
  )
}
