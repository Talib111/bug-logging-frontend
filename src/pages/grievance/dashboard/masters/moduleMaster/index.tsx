import Page from '@/components/helmet-page'
import ModuleList from './ModuleList'
export default function page() {
  return (
    <Page title='Module List' subTitle='Manage all the Module Name here'>
      <div>
        <ModuleList />
      </div>
    </Page>
  )
}
