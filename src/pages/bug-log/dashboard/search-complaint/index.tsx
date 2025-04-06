import Page from '@/components/helmet-page'
import ComplaintList from './ComplaintList'
export default function page() {
  return (
    <Page title='Search Bug' subTitle=''>
      <div className='py-0'>
        <ComplaintList />
      </div>
    </Page>
  )
}
