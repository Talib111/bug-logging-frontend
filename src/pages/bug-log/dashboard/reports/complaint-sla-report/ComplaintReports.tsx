''
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextField,
  SelectField,
} from '@/components/forms'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { Separator } from '@/components/ui/separator'
import PaginationComponent from '@/components/pagination'
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import Spinner from '@/components/loaders/Spinner'
import { useRef, useState } from 'react'
// import csv from '/public/images/csv1.png'
import xcl from '/public/images/xcl.png'
import pdf from '/public/images/pdf.png'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import moment from "moment";
import { Badge } from '@/components/ui/badge'
const schema = yup.object().shape({

  ulbId: yup.string(),
  moduleId: yup.string(),
  complaintTypeId: yup.string(),
  priorityId: yup.string(),
  targetTypeId: yup.string(),
  complaintSourceTypeId: yup.string(),
  departmentId: yup.string(),
  fDate: yup.string(),
  slaStatusSearch: yup.string(),
  toDate: yup.string(),
  complaintRefNo: yup.string(),
  type:yup.string(),  
})


export default function ComplaintReport() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      ulbId: '',
      moduleId: '',
      complaintTypeId: '',
      priorityId: '',
      targetTypeId: '',
      slaStatusSearch: '',
      complaintSourceTypeId: '',
      // fDate: today,
      // toDate: today,
      departmentId: '',
      fDate: '',
      toDate: '',
      complaintRefNo: '',
      type:'',
    },
  })
  console.log("methods");

  const onSubmit = async () => {
    complaintReportData.refetch();
  }

  const complaintReportData = useApi<any>({
    api: `${grievanceAPI.complaintReport}?page=${page}&limit=${perPage}&priority=${methods.watch('priorityId')}&ulb=${methods.watch('ulbId')}&departmentId=${methods.watch('departmentId')}&complaintType=${methods.watch('complaintTypeId')}&targetType=${methods.watch('targetTypeId')}&module=${methods.watch('moduleId')}&source=${methods.watch('complaintSourceTypeId')}&fDate=${methods.watch('fDate')}&toDate=${methods.watch('toDate')}&complaintRefNo=${methods.watch('complaintRefNo')}&slaStatusSearch=${methods.watch('slaStatusSearch')}&type=${methods.watch('type')}`,
    key: 'searchAllComplaints',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  const getUlbData = useApi<any>({
    api: `${grievanceAPI?.getAllUlb}?page=1&limit=10000`,
    key: 'getAllUlb',
    options: {
      enabled: true,
    },
  })

  const getModuleData = useApi<any>({
    api: `${grievanceAPI?.getAllModule}?page=1&limit=10000`,
    key: 'geAllModules',
    options: {
      enabled: true,
    },
  })

  const getComplaintTypeData = useApi<any>({
    api: `${grievanceAPI?.getAllComplaintType}?page=1&limit=10000`,
    key: 'getAllComplaintTypes',
    options: {
      enabled: true,
    },
  })

  const getPriorityData = useApi<any>({
    api: `${grievanceAPI?.getAllPriority}?page=1&limit=10000`,
    key: 'getAllPriority',
    options: {
      enabled: true,
    },
  })

  const getTargetTypeData = useApi<any>({
    api: `${grievanceAPI?.getAllTarget}?page=1&limit=10000`,
    key: 'getAllTargetTypes',
    options: {
      enabled: true,
    },
  })
  const complaintSourceData = useApi<any>({
    api: `${grievanceAPI.getAllComplaintSource}?page=1&limit=10000`,
    key: 'getAllComplaintSource',
    options: {
      enabled: true,
    },
  })

  const departmentData = useApi<any>({
    api: `${grievanceAPI.getAllDepartment}?page=1&limit=10000`,
    key: 'getAllDepartment',
    options: {
      enabled: true,
      refetchOnMount: false
    },
  })

  const problemTypeData = useApi<any>({
    api: `${grievanceAPI.getAllProblemDirect}?page=1&limit=10000`,
    key: 'getProblemData',
    options: {
      enabled: true,
      refetchOnMount: false
    },
  })


  const printTableInPDF = (complaintReportData: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      return;
    }
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }');
    printWindow.document.write('th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }');
    printWindow.document.write('th { background-color: #f2f2f2; }');
    printWindow.document.write('tr:nth-child(even) { background-color: #f2f2f2; }');
    printWindow.document.write('</style></head><body>');

    printWindow.document.write('<table>');

    // Header row
    printWindow.document.write('<tr>');
    printWindow.document.write('<th>#</th>');
    printWindow.document.write('<th>Grievance No.</th>');
    printWindow.document.write('<th>ULB Name</th>');
    printWindow.document.write('<th>Module</th>');
    printWindow.document.write('<th>Citizen Name</th>');
    printWindow.document.write('<th>Mobile No.</th>');
    printWindow.document.write('<th>Resolve Status</th>');
    printWindow.document.write('</tr>');

    // Table rows
    complaintReportData?.data?.data?.docs?.forEach((item: any, index: any) => {
      printWindow.document.write('<tr>');
      printWindow.document.write('<td>' + (index + 1) + '</td>');
      printWindow.document.write('<td>' + (item.complaintRefNo || 'N/A') + '</td>');
      printWindow.document.write('<td>' + (item.ulb?.ulbName || 'N/A') + '</td>');
      printWindow.document.write('<td>' + (item.module?.moduleName || 'N/A') + '</td>');
      printWindow.document.write('<td>' + (item.citizenName || 'N/A') + '</td>');
      printWindow.document.write('<td>' + (item.mobileNo || 'N/A') + '</td>');
      printWindow.document.write('<td>' + (item.resolveStatus === 0 ? 'Pending' : 'Resolved') + '</td>');
      printWindow.document.write('</tr>');
    });

    printWindow.document.write('</table>');

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };



  const tableRef = useRef(null);

  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef.current,
  //   filename: 'Users table',
  //   sheet: 'Users'
  // })


//   const slaLevelCheck = (createdAt: string, slaObj: {}) => {
//     // FIND OUT HOURS FROM CREATEDAT
//     // CHECK AT WHICH SLA CURRENT APPLICATION FALLS
// console.log("tttttttttt================================", createdAt);
// console.log("rrrrrrrrrrererererwer===================", slaObj);

//     return 'L2'
//   }

const slaLevelCheck = (createdAt: string, slaObj: { sla1: number, sla2: number, sla3: number }) => {
  const currentTime = new Date();
  const complaintTime = new Date(createdAt);
  
  // Calculate the time difference in hours
  const timeDiffInHours = (currentTime.getTime() - complaintTime.getTime()) / (1000 * 60 * 60);
  
  // Log the time difference and other variables for debugging
  console.log("Time Difference (in hours):", timeDiffInHours);
  console.log("SLA Levels:", slaObj);

  // Check at which SLA the current application falls
  // if (timeDiffInHours <= slaObj.sla3) {
  //   return 'L3';  
  // } else if (timeDiffInHours <= slaObj.sla2) {
  //   return 'L2';  
  // } else if (timeDiffInHours <= slaObj.sla1) {
  //   return 'L1';  
  // } else {
  //   return 'L3';  
  // }
  if (timeDiffInHours <= slaObj.sla1) {
    return 'L1';  
  } else if (timeDiffInHours <= slaObj.sla2) {
    return 'L2';  
  } else if (timeDiffInHours <= slaObj.sla3) {
    return 'L3';  
  } else {
    return 'L3';  
  }
};


  return (
    <>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-6 gap-x-2 gap-y-4 bg-background px-10 py-4'>
          <h1 className="text-xl font-bold text-blue-800 uppercase col-span-4">Grievance Report</h1>
          <Separator className='col-span-6' />

          <div>
            <Label htmlFor="complaintRefNo">Grievance No.</Label>
            <RHFTextField name='complaintRefNo' className='' placeholder='Enter Grievance number' />
          </div>
          <div>
            <Label htmlFor="fDate">From Date</Label>
            <RHFTextField name='fDate' type='date' className='' />
          </div>
          <div>
            <Label htmlFor="toDate">Upto Date</Label>
            <RHFTextField name='toDate' type='date' className='' />
          </div>

          {/* <div>
            <Label htmlFor="ulbId">ULB</Label>
            <SelectField className='bg-background cursor-pointer' name='ulbId' data={
              getUlbData.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.ulbName,
                }
              }) ?? []
            }
            />
          </div> */}
          <div>
            <Label htmlFor="departmentId">Department</Label>
            <SelectField className='bg-background cursor-pointer' name='departmentId' data={
              departmentData?.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.department,
                }
              }) ?? []
            }
            />
          </div>

          <div>
            <Label htmlFor="targetTypeId">Grievance Type</Label>
            <SelectField className='bg-background cursor-pointer' name='targetTypeId' data={
              problemTypeData?.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.problem,
                }
              }) ?? []
            }
            />
          </div>

          <div>
            <Label htmlFor="complaintTypeId">Entry Type</Label>
            <SelectField className='bg-background cursor-pointer' name='complaintTypeId' data={
              getComplaintTypeData?.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.complaintTypeName,
                }
              }) ?? []
            }
            />
          </div>
          <div>
            <Label htmlFor="priorityId">Priority</Label>
            <SelectField className='bg-background cursor-pointer' name='priorityId' data={
              getPriorityData?.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.priorityName,
                }
              }) ?? []
            }
            />
          </div>

          <div>
            <Label htmlFor="complaintSourceTypeId">Entry Modes</Label>
            <SelectField className='bg-background cursor-pointer' name='complaintSourceTypeId' data={
              complaintSourceData?.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.source,
                }
              }) ?? []
            }
            />
          </div>
          <div>
            <Label htmlFor="type">Grievance Status</Label>
            <SelectField
              name='type'
              data={
                [
                  { value: '0', label: 'Pending' },
                  { value: '1', label: 'Resolved' },
                  { value: '2', label: 'Rejected' },
                  { value: '3', label: 'Pending (Re-Opened)' },
                  { value: '4', label: 'Withdrawn' },
                ]
              }
            />
          </div>
          <div>
            <Label htmlFor="slaStatusSearch">Level Status</Label>
            <SelectField
              name='slaStatusSearch'
              data={
                [
                  { value: 'L1', label: 'L1' },
                  { value: 'L2', label: 'L2' },
                  { value: 'L3', label: 'L3' },
                ]
              }
            />
          </div>

          <div></div>

          <div className='mt-6'>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className=' w-auto  px-10 float-right'
            >
              Search
            </ButtonLoading>
          </div>
        </div>

      </FormProviders>


      <div className='mt-2'>
        <Card >
          <CardHeader className='px-7'>
            <CardDescription className='flex justify-between'>
              <h1>Grievance List ({complaintReportData.data?.data?.totalDocs})</h1>
              <h1 className='flex gap-2 '>
                {/* <div className='w-8 cursor-pointer'><img src={csv} alt="csv" /></div> */}
                {/* <button className='w-8 cursor-pointer' onClick={onDownload}><img src={xcl} alt="xcl" /></button>
                <button className='w-8 ' onClick={() => printTableInPDF(complaintReportData)}><img src={pdf} alt="pdf" /></button> */}
              </h1>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {complaintReportData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <div>
                <Table ref={tableRef}>
                  <TableHeader>
                    <TableRow className='text-xs'>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Grievance No.</TableHead>
                      <TableHead className=''>Department</TableHead>
                      <TableHead className=''>Received Date</TableHead>
                      <TableHead className=''>Source</TableHead>
                      <TableHead className=''>Pending At</TableHead>
                      <TableHead className=''>Redressal Days</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead className=''>Level Status</TableHead>
                      <TableHead className=''>Priority</TableHead>
                      {/* {methods.watch('fDate') && <TableHead className=''>From Date</TableHead>}
                      {methods.watch('toDate') && <TableHead className=''>Upto Date</TableHead>} */}
                      <TableHead className=''>View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody  >
                    {complaintReportData?.data?.data?.docs?.map((items: any, index: any) => (
                      <TableRow key={items._id} className='text-xs'>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{items?.complaintRefNo || 'N/A'}</TableCell>
                        <TableCell>{items?.department?.department || 'N/A'}</TableCell>
                        <TableCell>{moment(items?.createdAt).format('DD-MM-YYYY') || "N/A"}</TableCell>
                        <TableCell>{items?.source?.source || 'N/A'}</TableCell>
                        <TableCell>{items?.pendingAt || 'N/A'}</TableCell>
                        <TableCell> {moment().diff(moment(items?.createdAt), 'days')} days</TableCell>
                        <TableCell>
                          {items?.wf_status === 4 && <Badge variant={'destructive'}>Closed</Badge>}
                          {items?.wf_status === 3 && <Badge className='bg-amber-500 text-white'>Pending(Re-Opened)</Badge>}
                          {items?.wf_status === 2 && <Badge variant={'destructive'}>Rejected</Badge>}
                          {items?.wf_status === 1 && <Badge variant={'success'}>Resolved</Badge>}
                          {items?.wf_status === 0 && <Badge variant={'secondary'}>Pending</Badge>}
                        </TableCell>
                        <TableCell>
                          {/* {slaLevelCheck(items?.createdAt, {
                            sla1: items?.problemType?.sla1,
                            sla2: items?.problemType?.sla2,
                            sla3: items?.problemType?.sla3,
                          })} */}
                          { items?.slaLevel == "1" &&<Badge className='bg-gray-400 hover:bg-gray-400'>{items?.slaLevel }</Badge>}
                          {items?.slaLevel == "2" && <Badge className='bg-amber-500 hover:bg-amber-500'>{items?.slaLevel }</Badge>}
                          {items?.slaLevel == "3" && <Badge className='bg-red-500 hover:bg-red-500'>{items?.slaLevel }</Badge>}

                        </TableCell>
                        <TableCell>{items?.priority?.priorityName || 'N/A'}</TableCell>

                        {/* {methods.watch('fDate') && <TableCell>{methods.watch('fDate') ? moment(methods.watch('fDate')).format('DD-MM-YYYY') : "N/A"} </TableCell>}
                        {methods.watch('toDate') && <TableCell>{moment(items.createdAt).format('DD-MM-YYYY') || "N/A"}</TableCell>} */}
                        <TableCell>
                          <Link to={`/bug-log/dashboard/management-complaint-details?complaintRefNo=${items?.complaintRefNo}
                         &complaintId=${items?._id}`}>
                            <Button
                              className='bg-primary'
                              onClick={() => { }}
                            >
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className='mb-2 mt-4' />
                <div className='flex w-full justify-end'>
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={complaintReportData?.data?.data?.totalDocs}
                    hasNextPage={complaintReportData?.data?.data?.hasNextPage}
                    hasPrevPage={complaintReportData?.data?.data?.hasPrevPage}
                    setPage={setPage}
                    setPerPage={setPerPage}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </>
  )
}
