import Page from '@/components/helmet-page'
import WorkflowDetails from './WorkflowDetails'
import { useState } from 'react'
export default function page() {
  const [searchLink, setsearchLink] = useState<string>('')
  const [searchLabel, setsearchLabel] = useState<string>('')
  return (
    <Page title='' subTitle='' searchLink={searchLink} searchLabel={searchLabel}>
      <div className=''>
        <WorkflowDetails setsearchLink={setsearchLink} setsearchLabel={setsearchLabel} />
      </div>
    </Page>
  )
}
