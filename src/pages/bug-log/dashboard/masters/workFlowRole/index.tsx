import Page from '@/components/helmet-page'
import WorkFlowRoleList from './WorkFlowRoleList'
export default function page() {
  return (
    <Page title='Work Flow Role List' subTitle='Manage all the work Flow Role here'>
      <div className='py-12'>
        <WorkFlowRoleList />
      </div>
    </Page>
  )
}
