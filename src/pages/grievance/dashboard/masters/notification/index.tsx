import Page from '@/components/helmet-page'
import NotificationList from './NotificationList'
export default function page() {
  return (
    <Page title='News List' subTitle='Manage all the News here'>
      <div className='py-12'>
        <NotificationList />
      </div>
    </Page>
  )
}
