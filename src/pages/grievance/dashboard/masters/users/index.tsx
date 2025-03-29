import Page from '@/components/helmet-page'
import UsersList from './UsersList'
export default function page() {
  return (
    <Page title='Users List' subTitle='Manage all the Users List here'>
      <div className=''>
        <UsersList />
      </div>
    </Page>
  )
}
