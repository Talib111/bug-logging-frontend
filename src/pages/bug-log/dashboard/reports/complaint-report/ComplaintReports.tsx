
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
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import Spinner from '@/components/loaders/Spinner'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
// import csv from '/public/images/csv1.png'
import xcl from '/public/images/xcl.png'
import pdf from '/public/images/pdf.png'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { Badge } from '@/components/ui/badge'
import { Confirm } from '@/components/confirm-box'
import { useAppContext } from '@/context'
import { CloudCog } from 'lucide-react'
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
  type: yup.string(),
});


export default function ComplaintReport() {
  const { user } = useAppContext()

  const putMutation = usePutMutation({})
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [highlightedComplaints, setHighlightedComplaints] = useState<Set<string>>(new Set());

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
      type: '',
    },
  })
  console.log('methods')

  let data = methods.watch('type')

  const onSubmit = async () => {
    complaintReportData.refetch()
  }

  const complaintReportData = useApi<any>({
    api: `${grievanceAPI.complaintReport}?page=${page}&limit=${perPage}&priority=${methods.watch('priorityId')}&ulb=${methods.watch('ulbId')}&complaintType=${methods.watch('complaintTypeId')}&targetType=${methods.watch('targetTypeId')}&module=${methods.watch('moduleId')}&source=${methods.watch('complaintSourceTypeId')}&fDate=${methods.watch('fDate')}&toDate=${methods.watch('toDate')}&complaintRefNo=${methods.watch('complaintRefNo')}&slaStatusSearch=${methods.watch('slaStatusSearch')}&departmentId=${methods.watch('departmentId')}&type=${methods.watch('type')}   `,
    key: 'searchAllComplaints',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })



  // console.log(data,"=========================>")

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
      refetchOnMount: false,
    },
  })

  const problemTypeData = useApi<any>({
    api: `${grievanceAPI.getAllProblemDirect}?page=1&limit=10000`,
    key: 'getProblemData',
    options: {
      enabled: true,
      refetchOnMount: false,
    },
  })

  const printTableInPDF = (complaintReportData: any) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      return
    }
    printWindow.document.write('<html><head><title>Print</title>')
    printWindow.document.write('<style>')
    printWindow.document.write(
      'table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }'
    )
    printWindow.document.write(
      'th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }'
    )
    printWindow.document.write('th { background-color: #f2f2f2; }')
    printWindow.document.write(
      'tr:nth-child(even) { background-color: #f2f2f2; }'
    )
    printWindow.document.write('</style></head><body>')

    printWindow.document.write('<table>')

    // Header row
    printWindow.document.write('<tr>')
    printWindow.document.write('<th>#</th>')
    printWindow.document.write('<th>Grievance No.</th>')
    printWindow.document.write('<th>ULB Name</th>')
    printWindow.document.write('<th>Module</th>')
    printWindow.document.write('<th>Citizen Name</th>')
    printWindow.document.write('<th>Mobile No.</th>')
    printWindow.document.write('<th>Resolve Status</th>')
    printWindow.document.write('</tr>')

    // Table rows
    complaintReportData?.data?.data?.docs?.forEach((item: any, index: any) => {
      printWindow.document.write('<tr>')
      printWindow.document.write('<td>' + (index + 1) + '</td>')
      printWindow.document.write(
        '<td>' + (item.complaintRefNo || 'N/A') + '</td>'
      )
      printWindow.document.write(
        '<td>' + (item.ulb?.ulbName || 'N/A') + '</td>'
      )
      // printWindow.document.write(
      //   '<td>' + (item.module?.moduleName || 'N/A') + '</td>'
      // )
      printWindow.document.write('<td>' + (item.citizenName || 'N/A') + '</td>')
      printWindow.document.write('<td>' + (item.mobileNo || 'N/A') + '</td>')
      printWindow.document.write(
        '<td>' + (item.resolveStatus === 0 ? 'Pending' : 'Resolved') + '</td>'
      )
      printWindow.document.write('</tr>')
    })

    printWindow.document.write('</table>')

    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.print()
  }

  const tableRef = useRef(null)

  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef.current,
  //   filename: 'Users table',
  //   sheet: 'Users'
  // })

  const highlightedBy = async (Id: string) => {
    const confirmAction = async () => {
      try {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateComplaintApplicationById}/${Id}`,
          data: {
            isHighlighted: true,
          },
        });

        if (res.data?.success) {
          // Update the state to reflect that the complaint has been highlighted
          setHighlightedComplaints(prev => new Set(prev).add(Id));
          toast.success("This Application is now highlighted");
        } else {
          toast.error('This Application is not highlighted');
        }
      } catch (error) {
        toast.error('This Application is not highlighted');
      }
    };

    Confirm('Do you want to highlight this complaint?', 'Please confirm', confirmAction);
  };
  console.log("Bug Fixing- ", getUlbData?.data?.data?.docs)
  return (
    <>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-4 gap-x-2 gap-y-4 bg-background px-10 py-4'>
          <h1 className='col-span-4 text-xl font-bold uppercase text-blue-800'>
            Search Grievance{' '}
          </h1>
          <Separator className='col-span-4' />

          <div>
            <Label htmlFor='complaintRefNo'>Grievance No.</Label>
            <RHFTextField
              name='complaintRefNo'
              className=''
              placeholder='Enter Grievance number'
            />
          </div>
          <div>
            <Label htmlFor='fDate'>From Date</Label>
            <RHFTextField name='fDate' type='date' className='' />
          </div>
          <div>
            <Label htmlFor='toDate'>Upto Date</Label>
            <RHFTextField name='toDate' type='date' className='' />
          </div>

          <div>
            <Label htmlFor='ulbId'>ULB</Label>
            <SelectField
              className='cursor-pointer bg-background'
              name='ulbId'
              data={

                getUlbData.data?.data?.docs?.map((item: any) => {
                  return {
                    value: item?._id,
                    label: item?.ulbName,
                  }
                }) ?? []
              }
            />
          </div>

          <div>
            <Label htmlFor='departmentId'>Department</Label>
            <SelectField
              className='cursor-pointer bg-background'
              name='departmentId'
              data={
                departmentData?.data?.data?.docs?.map((item: any) => {
                  return {
                    value: item?._id,
                    label: item?.department,
                  }
                }) ?? []
              }
            />
          </div>

          {/* <div>
            <Label htmlFor="moduleId">Module</Label>
            <SelectField className='bg-background cursor-pointer' name='moduleId' data={
              getModuleData.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.moduleName,
                }
              }) ?? []
            }
            />
          </div> */}

          <div>
            <Label htmlFor='complaintTypeId'>Grievance Type</Label>
            <SelectField
              className='cursor-pointer bg-background'
              name='complaintTypeId'
              data={
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
            <Label htmlFor='priorityId'>Priority</Label>
            <SelectField
              className='cursor-pointer bg-background'
              name='priorityId'
              data={
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
            <Label htmlFor='targetTypeId'>Target Type</Label>
            <SelectField
              className='cursor-pointer bg-background'
              name='targetTypeId'
              data={
                getTargetTypeData?.data?.data?.docs?.map((item: any) => {
                  return {
                    value: item?._id,
                    label: item?.targetType,
                  }
                }) ?? []
              }
            />
          </div>
          <div>
            <Label htmlFor='complaintSourceTypeId'>Grievance Source Type</Label>
            <SelectField
              className='cursor-pointer bg-background'
              name='complaintSourceTypeId'
              data={
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
            <Label htmlFor='type'>Grievance Status</Label>

            <SelectField
              name='type'
              data={[
                { value: '0', label: 'Pending' },
                { value: '1', label: 'Resolved' },
                { value: '2', label: 'Rejected' },
                { value: '3', label: 'Pending (Re-Opened)' },
                { value: '4', label: 'Close' },
              ]}
            />
          </div>

          <div></div>

          <div className='mt-6'>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className=' float-right  w-auto px-10'
            >
              Search
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>

      <div className='mt-2'>
        <Card>
          <CardHeader className='px-7'>
            <CardDescription className='flex justify-between'>
              <div>
                Bug & Enhancement Report - <span>From </span> <span>{methods.watch('fDate')
                  ? moment(methods.watch('fDate')).format('DD-MM-YYYY') : 'N/A'}{' '}</span> 
                  <span>upto </span> <span>{methods.watch('toDate')
                    ? moment(methods.watch('toDate')).format('DD-MM-YYYY') : 'N/A'}{' '}</span>
              </div>
              {/* <h1 className='flex gap-2 '>
                <button className='w-8 cursor-pointer' onClick={onDownload}><img src={xcl} alt="xcl" /></button>
                <button className='w-8 ' onClick={() => printTableInPDF(complaintReportData)}><img src={pdf} alt="pdf" /></button>
              </h1> */}
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
                    {/* <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Platform</TableHead>
                      <TableHead className=''>Title</TableHead>
                      <TableHead className='line-clamp-2'>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Tracking No.</TableHead>
                      {methods.watch('fDate') && (
                        <TableHead className=''>From Date</TableHead>
                      )}
                      {methods.watch('toDate') && (
                        <TableHead className=''>Upto Date</TableHead>
                      )}
                      <TableCell>
                        Date
                      </TableCell>

                      <TableHead className=''>Ulb Name</TableHead>
                      <TableHead className=''>Citizen Name</TableHead>
                      <TableHead className=''>Mobile No.</TableHead>
                      <TableHead className=''>Resolve Status</TableHead>
                      <TableHead className=''>View</TableHead>
                      {!(user?.role === 'ULB GRO' || user?.role === 'ULB Admin' || user?.role === 'Normal' || user?.role === 'Telecaller' || user?.role === 'State Jsk/Ivr/Calling' || user?.role === 'Jsk/ Ivr /Calling') && (
                        <TableHead className="">Action</TableHead>
                      )}

                    </TableRow> */}
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Platform</TableHead>
                      <TableHead className=''>Title</TableHead>
                      <TableHead className=''>Description</TableHead>
                      <TableHead className=''>Priority</TableHead>
                      <TableHead className=''>Tracking No.</TableHead>
                      <TableHead className=''>Date</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaintReportData?.data?.data?.docs?.map(
                      (items: any, index: any) => (
                        // <TableRow key={items._id}>
                        //   <TableCell>
                        //     {page * perPage - perPage + index + 1}
                        //   </TableCell>
                        //   <TableCell>{items.complaintRefNo || 'N/A'}</TableCell>
                        //   <TableCell>
                        //     {items?.department?.department || 'N/A'}
                        //   </TableCell>
                        //   {methods.watch('fDate') && (
                        //     <TableCell>
                        //       {methods.watch('fDate')
                        //         ? moment(methods.watch('fDate')).format(
                        //           'DD-MM-YYYY'
                        //         )
                        //         : 'N/A'}{' '}
                        //     </TableCell>
                        //   )}
                        //   {methods.watch('toDate') && (
                        //     <TableCell>
                        //       {moment(items.createdAt).format('DD-MM-YYYY') ||
                        //         'N/A'}
                        //     </TableCell>
                        //   )}
                        //   <TableCell>{items.ulb?.ulbName || 'N/A'}</TableCell>

                        //   <TableCell>{items.citizenName || 'N/A'}</TableCell>
                        //   <TableCell>{items.mobileNo || 'N/A'}</TableCell>

                        //   <TableCell>
                        //     {items?.wf_status === 4 && (
                        //       <Badge variant={'destructive'}>Closed</Badge>
                        //     )}
                        //     {items?.wf_status === 3 && (
                        //       <Badge className='bg-amber-500 text-white'>
                        //         Pending(Re-Opened)
                        //       </Badge>
                        //     )}
                        //     {items?.wf_status === 2 && (
                        //       <Badge variant={'destructive'}>Rejected</Badge>
                        //     )}
                        //     {items?.wf_status === 1 && (
                        //       <Badge variant={'success'}>Resolved</Badge>
                        //     )}
                        //     {items?.wf_status === 0 && (
                        //       <Badge variant={'secondary'}>Pending</Badge>
                        //     )}
                        //   </TableCell>
                        //   <TableCell>
                        //     <Link
                        //       to={`/bug-log/dashboard/management-complaint-details?complaintRefNo=${items?.complaintRefNo}
                        //  &complaintId=${items?._id}`}
                        //     >
                        //       <Button className='bg-primary' onClick={() => { }}>
                        //         View
                        //       </Button>
                        //     </Link>
                        //   </TableCell>

                        //   {!(user?.role === 'ULB GRO' || user?.role === 'ULB Admin' || user?.role === 'Normal' || user?.role === 'Telecaller' || user?.role === 'State Jsk/Ivr/Calling' || user?.role === 'Jsk/ Ivr /Calling') && (
                        //     <TableCell>
                        //       {highlightedComplaints.has(items?._id) || items?.isHighlighted ? (
                        //         <Button type="button" className="bg-green-500">
                        //           Highlighted
                        //         </Button>
                        //       ) : (
                        //         <Button type="button" className="bg-red-500" onClick={() => highlightedBy(items?._id)}>
                        //           Highlight
                        //         </Button>
                        //       )}
                        //     </TableCell>
                        //   )}
                        // </TableRow>
                        <TableRow key={items._id}>
                          <TableCell className='relative'>
                            <span className="bg-gradient-to-r text-[10px] from-orange-500 to-red-600 h-5 flex justify-center items-center text-white px-2 py-0 border border-dotted border-red-300 rounded-tr-md rounded-br-md shadow-md font-semibold">
                              New
                            </span>
                            {index + 1}</TableCell>
                          <TableCell className='font-semibold'>💻 {items?.citizenName || 'N/A'}</TableCell>
                          <TableCell>{items?.bugTitle || 'N/A'}</TableCell>
                          <TableCell>{items?.bugDescription || 'N/A'}</TableCell>
                          <TableCell>{items?.priority || 'N/A'}</TableCell>
                          <TableCell>{items?.complaintRefNo || 'N/A'}</TableCell>
                          <TableCell>
                            {moment(items?.createdAt).format('DD-MM-YYYY')}
                          </TableCell>
                          <TableCell>
                            {items?.wf_status === 4 && <Badge variant={'destructive'}>Closed</Badge>}
                            {items?.wf_status === 3 && <Badge className='bg-amber-500 text-white'>Pending(Re-Opened)</Badge>}
                            {items?.wf_status === 2 && <Badge variant={'destructive'}>Rejected</Badge>}
                            {items?.wf_status === 1 && <Badge variant={'success'}>Resolved</Badge>}
                            {items?.wf_status === 0 && <Badge variant={'secondary'}>Pending</Badge>}
                          </TableCell>
                          <TableCell>
                            <Link to={`/bug-log/dashboard/workflow-details?complaintRefNo=${items?.complaintRefNo}&complaintId=${items?._id}`}>
                              <Button
                                className='bg-primary'
                                onClick={() => { }}
                              >
                                View
                              </Button>
                            </Link>
                          </TableCell>

                        </TableRow>
                      )
                    )}
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
