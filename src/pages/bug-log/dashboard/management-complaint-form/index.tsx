import ManagementComplaintForm from './ManagementComplaintForm'
import Page from '@/components/helmet-page';

export default function Home() {
  return (
      <Page title='' subTitle=''>
        <div className=''>
          <ManagementComplaintForm />
        </div>
      </Page>
  )
}
