import Page from '@/components/helmet-page'
import ComplaintSourceList from './ComplaintSourceList'
export default function page() {
  return (
    <Page title='Platform List' subTitle='Manage all the platform here'>
      <div className='py-12'>
        <ComplaintSourceList />
      </div>
    </Page>
  )
}
