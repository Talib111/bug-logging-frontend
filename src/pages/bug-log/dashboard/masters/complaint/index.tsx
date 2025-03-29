import Page from '@/components/helmet-page'
import ComplaintList from './ComplaintList'
export default function page() {
  return (
    <Page title='FAQ List' subTitle='Manage all the FAQ here'>
      <div className='py-12'>
        <ComplaintList />
      </div>
    </Page>
  )
}
