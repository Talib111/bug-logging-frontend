import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useApi } from "@/hooks/useCustomQuery"
import { grievanceAPI } from "@/lib"
import { I_USERS_TYPE_DETAILS } from "./type"
import { NotepadText } from "lucide-react"
import ComplaintTypeChart from "@/pages/grievance/dashboard/analytical-dashboard/complaint-types-chart"
import ModeWiseComplaintTypeChart from "@/pages/grievance/dashboard/analytical-dashboard/mode-wise-chart"
import UlbWiseComplaintsCount from "@/pages/grievance/dashboard/analytical-dashboard/ulb-wise-complaints-count"
import MonthWiseGrievanceCount from "@/pages/grievance/dashboard/analytical-dashboard/month-wise-grievance-count"
import ComplaintResolutionInsights from "@/pages/grievance/dashboard/analytical-dashboard/complaint-resolution-insights"
import DepartmentWiseComplaintResolutionInsights from "@/pages/grievance/dashboard/analytical-dashboard/department-wise-grievance"
import RoleWiseUserCount from "@/pages/grievance/dashboard/analytical-dashboard/role-wise-user-count"
import ComplaintResolvedEfficiencyChart from "@/pages/grievance/dashboard/analytical-dashboard/complaint-resolved-efficiency"
function AnalyticalDashboard() {

  //  ═══════════════════════║ THE API FETCHES COMPLAINTS BRIEF ║══════════════════════════ 
  const grievanceData = useApi<I_USERS_TYPE_DETAILS>({
    api: `${grievanceAPI.getComplaintBrief}`,
    key: 'getComplaintBrief',
    options: {
      enabled: true,
    },
  })

  return (
    <div>


      <div className='grid md:grid-cols-4 col-span-1 gap-4 '>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-semibold text-lg'><div className='h-8 w-8 rounded-full bg-indigo-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Received</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievanceReceived}</CardTitle></CardTitle>
            </CardHeader>

          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-semibold text-lg'><div className='h-8 w-8 rounded-full bg-green-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Resolved</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievanceResolved}</CardTitle></CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-semibold text-lg'><div className='h-8 w-8 rounded-full bg-red-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Rejected</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievanceReject}</CardTitle></CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-semibold text-lg'><div className='h-8 w-8 rounded-full bg-yellow-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Pending</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievancePending}</CardTitle></CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CHART SECTION-1 */}
      <div className='grid md:grid-cols-3 col-span-1 gap-4 mt-6 '>
        <div className="">
          <ComplaintTypeChart dashboardData={grievanceData?.data?.data} />
        </div>
        <div className="relative h-[100px]">
          {/* <div className="w-full h-full absolute top-0 left-0  z-50">
            <Lottie className="w-16" animationData={rocketJson} loop={true} />
          </div> */}
          <ComplaintResolvedEfficiencyChart dashboardData={grievanceData?.data?.data} />
        </div>
        <div className="col-span-1">
          <ComplaintResolutionInsights dashboardData={grievanceData?.data?.data} />
        </div>
      </div>




      {/* ════════════════════════════║  MODE WISE AND DEPARTMENT WISE ║═════════════════════════════════//  */}

      <div className='grid md:grid-cols-4 col-span-1 gap-4 mt-6 '>
        <div className="">
          <ModeWiseComplaintTypeChart dashboardData={grievanceData?.data?.data} />
        </div>

        <div className="col-span-3">
          <DepartmentWiseComplaintResolutionInsights dashboardData={grievanceData?.data?.data} />
        </div>
      </div>

      {/* ════════════════════════════║  ULB WISE GRIEVANCE COUNT ║═════════════════════════════════//  */}
      <div className='grid md:grid-cols-4 col-span-1 gap-4 mt-6'>
        <div className="col-span-4">
          <UlbWiseComplaintsCount dashboardData={grievanceData?.data?.data} />
        </div>
      </div>

      {/* ════════════════════════════║  MONTH WISE GRIEVANCE COUNT ║═════════════════════════════════//  */}
      <div className='grid md:grid-cols-4 col-span-1 gap-4 mt-6'>
        <div className="col-span-4">
          <MonthWiseGrievanceCount />
        </div>
      </div>



      {/* CHART SECTION-2 */}
      <div className='grid md:grid-cols-4 col-span-1 gap-4 mt-6'>

        <div className="col-span-4">
          <RoleWiseUserCount dashboardData={grievanceData?.data?.data} />
        </div>

      </div>
    </div>
  )
}

export default AnalyticalDashboard