import Page from '@/components/helmet-page'
import GrDepatmentList from './GrDepatmentList'
export default function page() {
  return (
    <Page title='Department' subTitle='Manage all the Department here'>
      <div>
        <GrDepatmentList />
      </div>
    </Page>
  )
}
