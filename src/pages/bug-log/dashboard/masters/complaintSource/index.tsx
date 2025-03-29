import Page from '@/components/helmet-page'
import ComplaintSourceList from './ComplaintSourceList'
export default function page() {
  return (
    <Page title='Grievance Source' subTitle='Manage all the Grievance Source here'>
      <div className='py-12'>
        <ComplaintSourceList />
      </div>
    </Page>
  )
}
