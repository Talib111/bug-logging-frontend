''
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
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
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_WORK_FLOW_MASTER_TYPE_LIST } from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import TransferComponent from '../TransferComponent'


export default function HomePage(props: any) {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(100)
  const [search, setSearch] = useState<string>('')
  const [currentWorkflowId, setcurrentWorkflowId] = useState<string>('')
  const [currentWorkflowName, setcurrentWorkflowName] = useState<string>('')
  const [transferAction, settransferAction] = useState<boolean>(false)
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const navigate = useNavigate()

  const parentId = query.get('parentId')
  const levelSerial = query.get('levelSerial')
  const parentName = query.get('parentName')
  const complaintId = query.get('complaintId')
  const complaintRefNo = query.get('complaintRefNo')

  const actionPermissions = useApi<any>({
    api: `${grievanceAPI.checkWfActions}/${complaintId}`,
    key: "actionPermission",
    options: {
      enabled: true
    }
  });

  const workFlowData = useApi<I_WORK_FLOW_MASTER_TYPE_LIST>({
    api: `${grievanceAPI.getUlbSpecificWorkFlow}?page=${page}&limit=${perPage}&q=${search}&parentId=${parentId}&levelSerial=${levelSerial}`,
    key: 'getAllWorkFlow',
    value: [page, perPage, parentId],
    options: {
      enabled: true,
    },
  })


  useEffect(() => {
    props?.settitle(parentName)
  }, [parentId])
  return (
    <>

      {/* ACTION MODAL FOR RESOLVE REJECT AND TRANSFER COMPONENT */}
      <Dialog>
        <DialogHeader>
        </DialogHeader>
        <DialogContent className="sm:max-w-[425px]">
          <div className="py-4">
            {transferAction && <TransferComponent currentWorkflowId={currentWorkflowId} currentWorkflowName={currentWorkflowName}  complaintRefNo={complaintRefNo} />}
          </div>
        </DialogContent>

        <main className='grid items-start'>
          <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
            <div className='flex w-full justify-between gap-2'>
              <div>
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  refetch={workFlowData.refetch}
                  isFetching={workFlowData.isLoading}
                />
              </div>
              <div>
              </div>
            </div>
            {/* <Card className='w-full overflow-scroll'> */}
            <Card>
              <CardHeader className='px-7'>
                <CardDescription>
                  Work Flow Role List ({workFlowData.data?.data?.totalDocs})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {workFlowData.isLoading ? (
                  <div className='flex h-32 items-center justify-center'>
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className=''>#</TableHead>
                          <TableHead className=''>Work Flow Name</TableHead>
                          <TableHead className=''>Ulb Name</TableHead>
                          <TableHead className=''>Module Name</TableHead>
                          <TableHead className=''>Level Serial</TableHead>
                          <TableHead className=''>Created at</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {workFlowData?.data?.data?.docs?.map((items, index) => (
                          <TableRow key={items._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{items?.workFlowName}</TableCell>
                            <TableCell>{items?.ulb?.ulbName}</TableCell>
                            <TableCell>{items?.module?.moduleName}</TableCell>
                            <TableCell>{items?.levelSerial}</TableCell>
                            <TableCell>
                              {moment(items.createdAt).format('DD-MM-YYYY')}
                            </TableCell>


                            <TableCell className='space-x-2'>
                              <Button
                                variant={'secondary'}
                                onClick={() => {
                                  navigate(
                                    `/bug-log/dashboard/members-details?parentId=${items?._id}`
                                  )
                                }}
                              >
                                Members
                              </Button>
                              {actionPermissions?.data?.permission?.canViewChildWorkflow && <Button
                                variant={'secondary'}
                                className='md:ml-5'
                                onClick={() => {
                                  navigate(
                                    `/bug-log/dashboard/transfer-complaint?parentId=${items?._id}&levelSerial=${items?.levelSerial + 1}&complaintId=${complaintId}&parentName=${items?.workFlowName}`
                                  )
                                }}
                              >
                                View
                              </Button>}
                              <DialogTrigger onClick={() => {
                                setcurrentWorkflowId(items?._id)
                                setcurrentWorkflowName(items?.workFlowName)
                                settransferAction(true)
                              }} asChild>
                                <Button
                                  name="bts"
                                  type="button"
                                  className="mr-4"
                                >
                                  Transfer
                                </Button>
                              </DialogTrigger>

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
                        totalPage={workFlowData?.data?.data?.totalDocs}
                        hasNextPage={workFlowData?.data?.data?.hasNextPage}
                        hasPrevPage={workFlowData?.data?.data?.hasPrevPage}
                        setPage={setPage}
                        setPerPage={setPerPage}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </Dialog>
    </>
  )
}
