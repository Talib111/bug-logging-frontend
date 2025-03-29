import Page from '@/components/helmet-page'
import WorkFlowMasterList from './WorkFlowMasterList'
import { useState } from 'react'
export default function page() {
  const [title, settitle] = useState<string>('Workflow Master List')
  const [subtitle, setSubtitle] = useState<string>('')
  return (
    <Page title={title || "Workflow Master List"} subTitle={subtitle || 'Manage all the work Flow here'}>
      <div className=''>
        <WorkFlowMasterList settitle={settitle} setSubtitle={setSubtitle} />
      </div>
    </Page>
  )
}
