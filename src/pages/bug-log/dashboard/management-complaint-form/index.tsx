import ManagementComplaintForm from './ManagementComplaintForm'
import Page from '@/components/helmet-page';

export default function Home() {
  return (
      <Page title='Grievance Details' subTitle='Grievance Registration Form'>
        <div className=''>
          <ManagementComplaintForm />
        </div>
      </Page>
  )
}
