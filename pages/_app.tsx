import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Fragment>
    <Head>
      <title>Netflix-clone</title>
      <meta name="description" content="A clone of netflix, made with React and Next JS and powered by TMDB api"/>
      <meta itemProp="description" content="A clone of netflix, made with React and Next JS and powered by TMDB api"/>
    </Head>
    <Component {...pageProps} />
  </Fragment>
  )
}
export default MyApp
