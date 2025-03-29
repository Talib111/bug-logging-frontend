''
import { useEffect, useState } from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { STATE_GRO } from '@/../config/roles.config'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { io } from 'socket.io-client';
const socket = io('http://localhost:8008'); 

export default function WorkflowList() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')

  const inboxListData = useApi<any>({
    api: `${grievanceAPI.getComplaintInbox}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getComplaintInboxList',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })
  const outboxListData = useApi<any>({
    api: `${grievanceAPI.getComplaintOutbox}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getComplaintOutboxList',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })
  const specialListData = useApi<any>({
    api: `${grievanceAPI.getComplaintSpecial}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getComplaintSpecialList',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })
  const highlightedListData = useApi<any>({
    api: `${grievanceAPI.getComplaintHighlight}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getComplaintHighlight',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  return (
    <main className='grid items-start'>

      <Tabs defaultValue="INBOX" className="w-full">
        <div className="flex">
          <CardTitle className='flex-1 text-2xl font-bold'>Registered Grievance List</CardTitle>
          <div className='flex-1 flex justify-end'>
            <TabsList className="grid w-auto grid-cols-4">

              {<TabsTrigger value="INBOX">Active Bugs</TabsTrigger>}
              {< TabsTrigger value="OUTBOX">Resolved Bugs</TabsTrigger>}
              {< TabsTrigger value="SPECIAL">Rejected Bugs</TabsTrigger>}
            </TabsList>
          </div>
        </div>
        <TabsContent value="INBOX">
          <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
            <div className='flex w-full justify-between gap-2'>
              <div>
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  refetch={inboxListData.refetch}
                  isFetching={inboxListData.isLoading}
                />
              </div>
              <div>

              </div>
            </div>
            <Card>
              <CardHeader className='px-7'>
                <CardDescription>
                Grievance List Inbox ({inboxListData.data?.data?.totalDocs})
                </CardDescription>
              </CardHeader>
              <CardContent>
                {inboxListData.isLoading ? (
                  <div className='flex h-32 items-center justify-center'>
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className=''>#</TableHead>
                          <TableHead className=''>Name</TableHead>
                          <TableHead className=''>Department</TableHead>
                          <TableHead className=''>ULB</TableHead>
                          <TableHead className=''>Grievance No.</TableHead>
                          <TableHead className=''>Module</TableHead>
                          <TableHead className=''>Date</TableHead>
                          <TableHead className=''>Status</TableHead>
                          {/* <TableHead className=''>Pending From</TableHead> */}
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inboxListData?.data?.data?.docs?.map((items: any, index: any) => (
                          <TableRow key={items._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{items?.citizenName || 'N/A'}</TableCell>
                            <TableCell className='font-semibold'>{items?.complaintTitle || 'N/A'}</TableCell>
                            <TableCell>{items?.ulb?.ulbName || 'N/A'}</TableCell>
                            <TableCell>{items?.complaintRefNo || 'N/A'}</TableCell>
                            <TableCell>{items?.module?.moduleName || 'N/A'}</TableCell>
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
                            {/* <TableCell className='flex justify-center items-center'>
                             {moment().diff(moment(items?.createdAt), 'days')} days
                              </TableCell> */}
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
                        ))}
                      </TableBody>
                    </Table>
                    <Separator className='mb-2 mt-4' />
                    <div className='flex w-full justify-end'>
                      <PaginationComponent
                        page={page}
                        perPage={perPage}
                        totalPage={inboxListData?.data?.data?.totalDocs}
                        hasNextPage={inboxListData?.data?.data?.hasNextPage}
                        hasPrevPage={inboxListData?.data?.data?.hasPrevPage}
                        setPage={setPage}
                        setPerPage={setPerPage}
                      />
                    </div>
                  </>
                )}
                    </CardContent>
                  </Card>
              </div>
            </TabsContent>
            <TabsContent value="OUTBOX">
              <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
                <div className='flex w-full justify-between gap-2'>
                  <div>
                    <SearchBox
                      search={search}
                      setSearch={setSearch}
                      refetch={outboxListData.refetch}
                      isFetching={outboxListData.isLoading}
                    />
                  </div>
                  <div>
                  </div>
                </div>
                <Card>
                  <CardHeader className='px-7'>
                    <CardDescription>
                    Grievance List Outbox ({outboxListData.data?.data?.totalDocs})
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {outboxListData.isLoading ? (
                      <div className='flex h-32 items-center justify-center'>
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className=''>#</TableHead>
                              <TableHead className=''>Name</TableHead>
                              <TableHead className=''>Title</TableHead>
                              <TableHead className=''>ULB</TableHead>
                              <TableHead className=''>Grievance No.</TableHead>
                              <TableHead className=''>Module</TableHead>
                              <TableHead className=''>Date</TableHead>
                              <TableHead className=''>Status</TableHead>
                              <TableHead className=''>Pending From</TableHead>
                              <TableHead>Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {outboxListData?.data?.data?.docs?.map((items: any, index: any) => (
                             <TableRow key={items._id}>
                             <TableCell>{index + 1}</TableCell>
                             <TableCell>{items?.citizenName}</TableCell>
                             <TableCell className='font-semibold'>{items?.complaintTitle}</TableCell>
                             <TableCell>{items?.ulb?.ulbName}</TableCell>
                             <TableCell>{items?.complaintRefNo}</TableCell>
                             <TableCell>{items?.module?.moduleName}</TableCell>
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
                             <TableCell className='flex justify-center items-center'>
                              {moment().diff(moment(items?.createdAt), 'days')} days
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
                            ))}
                          </TableBody>
                        </Table>
                        <Separator className='mb-2 mt-4' />
                        <div className='flex w-full justify-end'>
                          <PaginationComponent
                            page={page}
                            perPage={perPage}
                            totalPage={outboxListData?.data?.data?.totalDocs}
                            hasNextPage={outboxListData?.data?.data?.hasNextPage}
                            hasPrevPage={outboxListData?.data?.data?.hasPrevPage}
                            setPage={setPage}
                            setPerPage={setPerPage}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="SPECIAL">
              <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
                <div className='flex w-full justify-between gap-2'>
                  <div>
                    <SearchBox
                      search={search}
                      setSearch={setSearch}
                      refetch={specialListData.refetch}
                      isFetching={specialListData.isLoading}
                    />
                  </div>
                  <div>
                  </div>
                </div>
                <Card>
                  <CardHeader className='px-7'>
                    <CardDescription>
                    Grievance List Special ({specialListData.data?.data?.totalDocs}) - <span className='text-amber-500'>This list contains special complaints</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {specialListData.isLoading ? (
                      <div className='flex h-32 items-center justify-center'>
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className=''>#</TableHead>
                              <TableHead className=''>Name</TableHead>
                              <TableHead className=''>Title</TableHead>
                              <TableHead className=''>ULB</TableHead>
                              <TableHead className=''>Grievance No.</TableHead>
                              <TableHead className=''>Module</TableHead>
                              <TableHead className=''>Date</TableHead>
                              <TableHead className=''>Status</TableHead>
                              <TableHead className=''>Pending From</TableHead>
                              <TableHead>Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {specialListData?.data?.data?.docs?.map((items: any, index: any) => (
                             <TableRow key={items._id}>
                             <TableCell>{index + 1}</TableCell>
                             <TableCell>{items?.citizenName}</TableCell>
                             <TableCell className='font-semibold'>{items?.complaintTitle || "N/A"}</TableCell>
                             <TableCell>{items?.ulb?.ulbName}</TableCell>
                             <TableCell>{items?.complaintRefNo}</TableCell>
                             <TableCell>{items?.module?.moduleName}</TableCell>
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
                             <TableCell className='flex justify-center items-center'>
                              {moment().diff(moment(items?.createdAt), 'days')} days
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
                            ))}
                          </TableBody>
                        </Table>
                        <Separator className='mb-2 mt-4' />
                        <div className='flex w-full justify-end'>
                          <PaginationComponent
                            page={page}
                            perPage={perPage}
                            totalPage={specialListData?.data?.data?.totalDocs}
                            hasNextPage={specialListData?.data?.data?.hasNextPage}
                            hasPrevPage={specialListData?.data?.data?.hasPrevPage}
                            setPage={setPage}
                            setPerPage={setPerPage}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="HIGHLIGHTED">
              <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
                <div className='flex w-full justify-between gap-2'>
                  <div>
                    <SearchBox
                      search={search}
                      setSearch={setSearch}
                      refetch={specialListData.refetch}
                      isFetching={specialListData.isLoading}
                    />
                  </div>
                  <div>
                  </div>
                </div>
                <Card>
                  <CardHeader className='px-7'>
                    <CardDescription>
                    Grievance  Highlighted List({specialListData.data?.data?.totalDocs}) - <span className='text-amber-500'>This list contains Highlighted complaints</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {highlightedListData.isLoading ? (
                      <div className='flex h-32 items-center justify-center'>
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className=''>#</TableHead>
                              <TableHead className=''>Name</TableHead>
                              <TableHead className=''>Title</TableHead>
                              <TableHead className=''>ULB</TableHead>
                              <TableHead className=''>Grievance No.</TableHead>
                              <TableHead className=''>Module</TableHead>
                              <TableHead className=''>Date</TableHead>
                              <TableHead className=''>Status</TableHead>
                              <TableHead className=''>Pending From</TableHead>
                              <TableHead>Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {highlightedListData?.data?.data?.docs?.map((items: any, index: any) => (
                             <TableRow key={items._id}>
                             <TableCell>{index + 1}</TableCell>
                             <TableCell>{items?.citizenName}</TableCell>
                             <TableCell className='font-semibold'>{items?.complaintTitle}</TableCell>
                             <TableCell>{items?.ulb?.ulbName}</TableCell>
                             <TableCell>{items?.complaintRefNo}</TableCell>
                             <TableCell>{items?.module?.moduleName}</TableCell>
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
                             <TableCell className='flex justify-center items-center'>
                              {moment().diff(moment(items?.createdAt), 'days')} days
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
                            ))}
                          </TableBody>
                        </Table>
                        <Separator className='mb-2 mt-4' />
                        <div className='flex w-full justify-end'>
                          <PaginationComponent
                            page={page}
                            perPage={perPage}
                            totalPage={highlightedListData?.data?.data?.totalDocs}
                            hasNextPage={highlightedListData?.data?.data?.hasNextPage}
                            hasPrevPage={highlightedListData?.data?.data?.hasPrevPage}
                            setPage={setPage}
                            setPerPage={setPerPage}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main >
        )
}
