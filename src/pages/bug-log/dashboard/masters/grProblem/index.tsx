import Page from '@/components/helmet-page'
import GrProblemList from './GrProblemList'
export default function page() {
  return (
    <Page title='Grievance Problem' subTitle='Manage all the Grievance Problem here'>
      <div>
        <GrProblemList />
      </div>
    </Page>
  )
}
