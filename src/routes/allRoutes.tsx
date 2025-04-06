import { LazyExoticComponent, Suspense, lazy, ElementType } from 'react'
import SuspenseLoader from '@/components/loaders/SuspenseLoader'

// ----------------------------------------------------------------------
const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) =>
    (props: JSX.IntrinsicAttributes) => {
      return (
        <Suspense fallback={<SuspenseLoader />}>
          <Component {...props} />
        </Suspense>
      )
    }

const lazyWithRetries = (importer: () => Promise<{ default: ElementType }>) => {
  const retryImport = async () => {
    try {
      return await importer()
    } catch (error) {
      // window.location.reload();
    }
  }
  return Loadable(lazy(retryImport as any))
}

// // -------------------------------Before auth routes--------------------------------
const Login = lazyWithRetries(() => import('@/pages/bug-log/auth/login'))
const Home = lazyWithRetries(() => import('@/pages/bug-log/dashboard/home'))
const ClientHome = lazyWithRetries(() => import('@/pages/bug-log/dashboard/client-dashboard'))
const Role = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/masters/role')
)


const Priority = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/masters/priority')
)
const Project = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/masters/project')
)

const ManagementComplaintForm = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/management-complaint-form')
)

const ManagementComplaintDetails = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/complaint-details')
)
const SearchComplaint = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/search-complaint')
)
const ManagementChangePassword = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/change-password')
)
const TransferComplaint = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/workflow/workflow-details/transfer-complaint')
)
const Users = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/masters/users')
)

const ComplaintSource = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/masters/complaintSource')
)

const ComplaintWorkflow = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/workflow/complaint-workflow')
)
const EnhancementWorkflow = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/enhancement-workflow/enhacement-list')
)
const WorkflowDetails = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/workflow/workflow-details')
)
const Notification = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/masters/notification')
)

const ComplaintReports = lazyWithRetries(
  () => import('@/pages/bug-log/dashboard/reports/complaint-report')
)

const Profile = lazyWithRetries(
  () => import('@/pages/bug-log/citizen/profile')
)



export type Route = {
  layout: string
  pages: {
    id: string
    name: string
    path: string
    element: JSX.Element
    exact?: boolean
    userTypes?: Array<string | number>
  }[]
}

const routes: Route[] = [
  // main routes
  {
    layout: 'main', // before Auth
    pages: [
    ],
  },
  // auth routes
  {
    layout: 'auth', // before Auth
    pages: [
      {
        id: '1',
        name: 'Login',
        path: 'login',
        element: <Login />,
      },
    ],
  },
  // dashboard routes
  {
    layout: 'dashboard', // after Auth
    pages: [
      {
        id: '1',
        name: 'Home',
        path: 'home',
        element: <Home />,
      },
      {
        id: '1',
        name: 'Client Home',
        path: 'client-home',
        element: <ClientHome />,
      },
      {
        id: '2',
        name: 'Role',
        path: 'role',
        element: <Role />,
      },
      {
        id: '6',
        name: 'Priority',
        path: 'priority-list',
        element: <Priority />,
      },
      {
        id: '10',
        name: 'Users List',
        path: 'users-master',
        element: <Users />,
      },
      {
        id: '11',
        name: 'Complaint Source',
        path: 'complaint-source',
        element: <ComplaintSource />,
      },
      {
        id: '12',
        name: 'Complaint Workflow',
        path: 'complaint-workflow',
        element: <ComplaintWorkflow />,
      },
      {
        id: '12',
        name: 'Enhacement List',
        path: 'enhancement-list',
        element: <EnhancementWorkflow />,
      },
      {
        id: '13',
        name: 'Workflow Details',
        path: 'workflow-details',
        element: <WorkflowDetails />,
      },
      {
        id: '14',
        name: 'Management Complaint',
        path: 'management-complaint-form',
        element: <ManagementComplaintForm />,
      },
      {
        id: '14',
        name: 'Management Complaint success',
        path: 'management-complaint-details',
        element: <ManagementComplaintDetails />,
      },
      {
        id: '14',
        name: 'Search Complaint',
        path: 'search-complaint',
        element: <SearchComplaint />,
      },
      {
        id: '14',
        name: 'Change Password',
        path: 'change-password',
        element: <ManagementChangePassword />,
      },
      {
        id: '15',
        name: 'Project Master',
        path: 'project-mstrs',
        element: <Project />,
      },
      {
        id: '16',
        name: 'Notifications',
        path: 'notifications',
        element: <Notification />,
      },
      {
        id: '17',
        name: 'Admin Profile',
        path: 'profile',
        element: <Profile />,
      },
      {
        id: '19',
        name: 'Complaint Report',
        path: 'complaint-reports',
        element: <ComplaintReports />,
      },
    ],
  },
]

export default routes
