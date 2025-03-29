import Page from '@/components/helmet-page'
import TableFormList from './TableFormList'
export default function page() {
  return (
    <Page title='Table Form List' subTitle='Manage all the Table Form here'>
      <div className='py-12'>
        <TableFormList />
      </div>
    </Page>
  )
}
