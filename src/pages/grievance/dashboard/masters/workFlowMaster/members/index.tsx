import Page from '@/components/helmet-page'
import MemberList from './MemberList'
import { useState } from 'react'
export default function page() {
  const [title, settitle] = useState<string>('Workflow Member List')
  return (
    <Page title={title || 'Workflow Member List'} subTitle='Manage all the work Flow List here'>
      <div className='py-12'>
        <MemberList settitle={settitle} />
      </div>
    </Page>
  )
}
