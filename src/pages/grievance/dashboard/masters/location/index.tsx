import Page from '@/components/helmet-page'
import LocationList from './LocationList'
export default function page() {
  return (
    <Page title='Location List' subTitle='Manage all the Location here'>
      <div className='py-12'>
        <LocationList />
      </div>
    </Page>
  )
}
