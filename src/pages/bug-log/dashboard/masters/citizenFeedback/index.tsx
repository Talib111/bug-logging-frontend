import Page from '@/components/helmet-page'
import CitizenFeedbackList from './CitizenFeedbackList'
export default function page() {
  return (
    <Page title='Citizen Feedback' subTitle='Manage all the Feedback here'>
      <div>
        <CitizenFeedbackList />
      </div>
    </Page>
  )
}
