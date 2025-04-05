import Page from '@/components/helmet-page'
import WorkFlowMasterList from './WorkFlowMasterList'
import { useState } from 'react'
export default function page() {
  const [title, settitle] = useState<string>('Workflow Master List')
  return (
    <Page title={title || "Select Workflow to Transfer"} subTitle='Choose workflow from below list'>
      <div className=''>
        <WorkFlowMasterList settitle={settitle} />
      </div>
    </Page>
  )
}
