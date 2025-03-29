import WorkflowWiseReports from './WorkflowWiseReports'
import Page from '@/components/helmet-page';

export default function Home() {
  return (
  
      <Page title='Workflow Wise Reports Details' subTitle='Grievance Workflow Wise Reports'>
        <div className=''>
          <WorkflowWiseReports />
        </div>
      </Page>



  )
}
