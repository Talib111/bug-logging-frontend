import Page from '@/components/helmet-page'
import UlbList from './UlbList'
export default function page() {
  return (
    <Page title='Ulb List' subTitle='Manage all the ulb here'>
      <div>
        <UlbList />
      </div>
    </Page>
  )
}
