import Page from '@/components/helmet-page'
import ComplaintTypeList from './ComplaintTypeList'
export default function page() {
  return (
    <Page title='Grievance Types' subTitle='Manage all the Grievance Types here'>
      <div className=''>
        <ComplaintTypeList />
      </div>
    </Page>
  )
}
