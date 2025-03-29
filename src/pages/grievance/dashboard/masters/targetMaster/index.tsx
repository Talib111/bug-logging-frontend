import Page from '@/components/helmet-page'
import TargetList from './TargetList'
export default function page() {
  return (
    <Page title='Target Type' subTitle='Manage all the target here'>
      <div className='py-12'>
        <TargetList />
      </div>
    </Page>
  )
}
