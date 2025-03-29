import React from 'react'
import Page from '@/components/helmet-page'
import LandingPage from './LandingPage'

export default function Home() {
  return (
    // <Page>
    // <LandingPage/>
    // </Page>

    <Page title='Home Page ' subTitle=''>
      <LandingPage />
    </Page>
  )
}
