import React from 'react'
import Page from '@/components/helmet-page'
import SharingReceipt from './SharingReceipt'

export default function Home() {
  return (
    // <Page>
    // <SharingReceipt/>
    // </Page>

    <Page title='Home Page' subTitle=''>
      <SharingReceipt />
    </Page>
  )
}
