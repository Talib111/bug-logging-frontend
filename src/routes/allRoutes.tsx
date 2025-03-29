import { LazyExoticComponent, Suspense, lazy, ElementType } from 'react'
import SuspenseLoader from '@/components/loaders/SuspenseLoader'
// import CitizenSendReminder from '@/pages/grievance/citizen/citizen-send-reminder/CitizenSendReminder'


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
const Login = lazyWithRetries(() => import('@/pages/grievance/auth/login'))
const CitizenLogin = lazyWithRetries(() => import('@/pages/grievance/auth/citizen-login/LoginForm'))
const CitizenSingUp = lazyWithRetries(() => import('@/pages/grievance/auth/citizen-login'))
const CitizenResetPassword = lazyWithRetries(() => import('@/pages/grievance/auth/citizen-login/ResetPassword'))
// // -------------------------------After auth routes--------------------------------

const Home = lazyWithRetries(() => import('@/pages/grievance/dashboard/home'))
const Role = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/role')
)

const Complaint = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/complaint')
)
const ModuleMaster = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/moduleMaster')
)
const UlbList = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/ulbList')
)
const GrProblemList = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/grProblem')
)
const GrDepartment = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/grDepartment')
)
const WorkFlowRole = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/workFlowRole')
)
const Priority = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/priority')
)
const Target = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/targetMaster')
)
const Location = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/location')
)
const Project = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/project')
)
const WorkFlowMaster = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/workFlowMaster')
)
const WorkFlowMemberList = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/workFlowMaster/members')
)
const ManagementComplaintForm = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/management-complaint-form')
)
const ManagementComplaintSuccess = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/complaint-success')
)
const ManagementComplaintDetails = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/complaint-details')
)
const SearchComplaint = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/search-complaint')
)
const ManagementChangePassword = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/change-password')
)
const TransferComplaint = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/workflow/workflow-details/transfer-complaint')
)
const TableForm = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/tableForm')
)
const Users = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/users')
)

const ComplaintSource = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/complaintSource')
)
const ComplaintType = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/complaintType')
)
const ComplaintWorkflow = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/workflow/complaint-workflow')
)
const WorkflowDetails = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/workflow/workflow-details')
)
const Notification = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/notification')
)

const AnalyticalDashboard = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/analytical-dashboard')
)
const ComplaintReports = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/reports/complaint-report')
)
const ComplaintSlaReports = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/reports/complaint-sla-report')
)
const ResolutionDaysReports = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/reports/resolution-day-wise-report')
)
const WorkflowWiseReports = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/reports/wf-wise-report')
)
const WorkflowByIdReport = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/reports/wf-wise-report/WorkflowByIdReport')
)
const CitizenFeedback = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/masters/citizenFeedback')
)


// -------------------------------End After routes--------------------------------

// -------------------------------Main Routes--------------------------------
const LandingPage = lazyWithRetries(
  () => import('@/pages/grievance/main/landing-page')
)

// -------------------------------Citizen Routes--------------------------------
const CitizenComplaintForm = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-complaint-form')
)
const CitizenComplaintSearch = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-complaint-form/search-complaint')
)
const CitizenReview = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-review')
)

const Profile = lazyWithRetries(
  () => import('@/pages/grievance/citizen/profile')
)
const CitizenDashboard = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-dashboard')
)
const ClientTestimonials = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-testimonials')
)
const CitizenAllComplaints = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-registered-complaints')
)
const CitizenFaq = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-faq')
)
const CitizenTrackComplaint = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-track-complaint')
)
const TrackReminder = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-reminder')
)
const CitizenGrievanceViaPhone = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-complaint-via-phone')
)
const CitizenGrievanceViaEmail = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-complaint-via-email')
)
const CitizenGrievanceViaWhatsApp = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-complaint-via-whatsApp')
)
const ComplaintSuccess = lazyWithRetries(
  () => import('@/pages/grievance/citizen/complaint-success')
)
const PrivacyPolicy = lazyWithRetries(
  () => import('@/pages/grievance/citizen/privacy-policy')
)
const ZoneWardList = lazyWithRetries(
  () => import('@/pages/grievance/citizen/zone-ward-list')
)
const ComplaintDetails = lazyWithRetries(
  () => import('@/pages/grievance/citizen/complaint-details')
)
const Tools = lazyWithRetries(
  () => import('@/pages/grievance/citizen/tools')
)
const CitizenChangePassword = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-change-password')
)

const ComplaintRegistrationInfo = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-info/about-complaint-registration')
)

const ModuleTrack = lazyWithRetries(
  () => import('@/pages/grievance/citizen/moudle-track-page')
)
const CitizenFindNewHolding = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-find-new-holding-no')
)
const Sharing = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/sharing')
)
const SharingReceipt = lazyWithRetries(
  () => import('@/pages/grievance/dashboard/sharing-receipt')
)
const SendReminder = lazyWithRetries(
  () => import('@/pages/grievance/citizen/citizen-reminder')
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
      {
        id: '1',
        name: 'Landing Page',
        path: '',
        element: <LandingPage />,
      },
    ],
  },
  {
    layout: 'citizen',
    pages: [
      {
        id: '1',
        name: 'Citizen Complaint Form',
        path: 'citizen-complaint-form',
        element: <CitizenComplaintForm />,
      },
      {
        id: '2',
        name: 'Citizen Complaint Form',
        path: 'citizen-complaint-search',
        element: <CitizenComplaintSearch />,
      },
      {
        id: '3',
        name: 'Citizen Review Form',
        path: 'citizen-review',
        element: <CitizenReview />,
      },
      {
        id: '4',
        name: 'Citizen Testimonials',
        path: 'citizen-testimonials',
        element: <ClientTestimonials />,
      },
      {
        id: '5',
        name: 'Citizen FAQ',
        path: 'citizen-faq',
        element: <CitizenFaq />,
      },
      {
        id: '6',
        name: 'Citizen Track Complaint',
        path: 'citizen-track-complaint',
        element: <CitizenTrackComplaint />,
      },
      {
        id: '7',
        name: 'Citizen Track Reminder',
        path: 'citizen-reminder',
        element: <TrackReminder />,
      },
      {
        id: '8',
        name: 'Complaint Success',
        path: 'complaint-success',
        element: <ComplaintSuccess />,
      },
      {
        id: '9',
        name: 'Complaint Details',
        path: 'complaint-details',
        element: <ComplaintDetails />,
      },
      {
        id: '10',
        name: 'Tools',
        path: 'tools',
        element: <Tools />,
      },
      {
        id: '11',
        name: 'Citizen Change Password',
        path: 'citizen-change-password',
        element: <CitizenChangePassword />,
      },
      {
        id: '12',
        name: 'Privacy Policy',
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        id: '13',
        name: 'Complaint Registration Information',
        path: 'complaint-registration-info',
        element: <ComplaintRegistrationInfo />
      },
      {
        id: '14',
        name: 'Zone Wise Ward List',
        path: 'zone-ward-list',
        element: <ZoneWardList />,
      },
      {
        id: '15',
        name: 'Find New Holding Number',
        path: 'find-new-holding-no',
        element: <CitizenFindNewHolding />,
      },
      {
        id: '16',
        name: 'CItizen Grievance via Phone',
        path: 'citizen-grievance-via-phone',
        element: <CitizenGrievanceViaPhone />,
      },
      {
        id: '17',
        name: 'CItizen Grievance via Email',
        path: 'citizen-grievance-via-email',
        element: <CitizenGrievanceViaEmail />,
      },
      {
        id: '18',
        name: 'CItizen Grievance via Email',
        path: 'citizen-grievance-via-whatsapp',
        element: <CitizenGrievanceViaWhatsApp />,
      },

      {
        id: '19',
        name: 'MOdule Track',
        path: 'track-status',
        element: <ModuleTrack />,
      },
      {
        id: '20',
        name: 'send remndier',
        path: 'citizen-send-reminder',
        element: <SendReminder />,
      },
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
      {
        id: '2',
        name: 'Citizen SingUp',
        path: 'citizen-sign-up',
        element: <CitizenSingUp />,
      },
      {
        id: '3',
        name: 'Citizen Login',
        path: 'citizen-login',
        element: <CitizenLogin />,
      },
      {
        id: '4',
        name: 'Citizen Reset Password',
        path: 'citizen-reset-password',
        element: <CitizenResetPassword />,
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
        name: 'Sharing',
        path: 'sharing',
        element: <Sharing />,
      },
      {
        id: '1',
        name: 'Sharing Receipt',
        path: 'sharing-receipt',
        element: <SharingReceipt />,
      },
      {
        id: '2',
        name: 'Role',
        path: 'role',
        element: <Role />,
      },
      {
        id: '3',
        name: 'Complaint',
        path: 'complaint',
        element: <Complaint />,
      },
      {
        id: '4',
        name: 'Modules',
        path: 'module-id',
        element: <ModuleMaster />,
      },

      {
        id: '5',
        name: 'Ulb List',
        path: 'ulb-list',
        element: <UlbList />,
      },
      {
        id: '5',
        name: 'Work Flow Roles',
        path: 'workflow-roles',
        element: <WorkFlowRole />,
      },
      {
        id: '6',
        name: 'Priority',
        path: 'priority-list',
        element: <Priority />,
      },
      {
        id: '7',
        name: 'Target',
        path: 'target-type',
        element: <Target />,
      },
      {
        id: '8',
        name: 'Workflow Master',
        path: 'workflow-master',
        element: <WorkFlowMaster />,
      },
      {
        id: '9',
        name: 'Table Form',
        path: 'table-form',
        element: <TableForm />,
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
        id: '11',
        name: 'Complaint Type',
        path: 'complaint-type',
        element: <ComplaintType />,
      },
      {
        id: '12',
        name: 'Complaint Workflow',
        path: 'complaint-workflow',
        element: <ComplaintWorkflow />,
      },
      {
        id: '13',
        name: 'Workflow Details',
        path: 'workflow-details',
        element: <WorkflowDetails />,
      },
      {
        id: '14',
        name: 'Members Details',
        path: 'members-details',
        element: <WorkFlowMemberList />,
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
        path: 'management-complaint-success',
        element: <ManagementComplaintSuccess />,
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
        id: '14',
        name: 'Transfer Complaint',
        path: 'transfer-complaint',
        element: <TransferComplaint />,
      },
      {
        id: '15',
        name: 'Location',
        path: 'location',
        element: <Location />,
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
        id: '18',
        name: 'Analytical Dashboard',
        path: 'analytics-dashboard',
        element: <AnalyticalDashboard />,
      },
      {
        id: '19',
        name: 'Complaint Report',
        path: 'complaint-reports',
        element: <ComplaintReports />,
      },
      {
        id: '19',
        name: 'Grievance Sla Report',
        path: 'grievance-sla-reports',
        element: <ComplaintSlaReports />,
      },
      {
        id: '20',
        name: 'Workflow Wise Report',
        path: 'wf-wise-reports',
        element: <WorkflowWiseReports />,
      },
      {
        id: '21',
        name: 'Workflow Wise Report',
        path: 'workflow-byId-Report',
        element: <WorkflowByIdReport />,
      },
      {
        id: '22',
        name: 'Resolution Days Report',
        path: 'resolution-days-reports',
        element: <ResolutionDaysReports />,
      },
      {
        id: '23',
        name: 'Citizen Feedback',
        path: 'citizen-feedback',
        element: <CitizenFeedback />,
      },
      {
        id: '24',
        name: 'Gr Problems',
        path: 'gr-problems',
        element: <GrProblemList />,
      },
      {
        id: '24',
        name: 'Gr Department ',
        path: 'gr-department',
        element: <GrDepartment />,
      },
    ],
  },

  // citizen Dashboard
  {
    layout: 'citizenDashboard', // after Auth
    pages: [
      {
        id: '1',
        name: 'Citizen Dashboard',
        path: 'home',
        element: <CitizenDashboard />,
      },
      {
        id: '2',
        name: 'Citizen Profile',
        path: 'profile',
        element: <Profile />,
      },
      {
        id: '3',
        name: 'Citizen Testimonials',
        path: 'citizen-testimonials',
        element: <ClientTestimonials />,
      },
      {
        id: '4',
        name: 'Tools',
        path: 'tools',
        element: <Tools />,
      },
      {
        id: '5',
        name: 'Zone Wise Ward List',
        path: 'zone-ward-list',
        element: <ZoneWardList />,
      },
      {
        id: '6',
        name: 'Citizen FAQ',
        path: 'citizen-faq',
        element: <CitizenFaq />,
      },
      {
        id: '7',
        name: 'Privacy Policy',
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        id: '8',
        name: 'All Complaints',
        path: 'all-complaints',
        element: <CitizenAllComplaints />,
      },
      {
        id: '9',
        name: 'Citizen Review Form',
        path: 'citizen-review',
        element: <CitizenReview />,
      },
      {
        id: '10',
        name: 'Citizen Complaint Details',
        path: 'citizen-complaint-details',
        element: <ComplaintDetails />,
      },
    ]
  },
]

export default routes
