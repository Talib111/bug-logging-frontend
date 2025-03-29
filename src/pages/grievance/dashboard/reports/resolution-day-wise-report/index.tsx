import ResolutionDayReports from './ResolutionDayReports'
import Page from '@/components/helmet-page';

export default function Home() {
  return (
  
      <Page title='Reports Details' subTitle='Grievance Reports'>
        <div className=''>
          <ResolutionDayReports />
        </div>
      </Page>



  )
}
