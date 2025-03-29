import Page from '@/components/helmet-page'
import WorkflowList from './WorkflowList'
export default function page() {
  return (
    <Page title='' subTitle=''>
      <div className='pb-12'>
        <WorkflowList />
      </div>
    </Page>
  )
}
