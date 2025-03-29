import Page from '@/components/helmet-page'
import PriorityList from './PriorityList'
export default function page() {
  return (
    <Page title='Priority List' subTitle='Manage all the work Flow Priority here'>
      <div className='py-12'>
        <PriorityList />
      </div>
    </Page>
  )
}
