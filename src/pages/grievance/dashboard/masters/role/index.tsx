import Page from '@/components/helmet-page'
import RoleList from './RoleList'
export default function page() {
  return (
    <Page title='Role' subTitle='Manage all the roles here'>
      <div>
        <RoleList />
      </div>
    </Page>
  )
}
