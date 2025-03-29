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
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { I_WORK_FLOW_MASTER_TYPE_LIST } from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import WorkFlowMasterForm from './WorkFlowMasterForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { Switch } from '@headlessui/react'
import toast from 'react-hot-toast'

export default function HomePage(props: any) {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(50)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const mutate = usePutMutation({})
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const navigate = useNavigate()

  const parentId = query.get('parentId')
  const levelSerial = query.get('levelSerial')
  const parentName = query.get('parentName')
  const moduleName = query.get('moduleName')

  const workFlowData = useApi<I_WORK_FLOW_MASTER_TYPE_LIST>({
    api: `${grievanceAPI.getAllWorkFlow}?page=${page}&limit=${perPage}&q=${search}&parentId=${parentId}&levelSerial=${levelSerial}`,
    key: 'getAllWorkFlow',
    value: [page, perPage, parentId],
    options: {
      enabled: true,
    },
  })

  const handleEdit = (id: string) => {
    setEdit(true)
    setOpen(true)
    setId(id)
  }
  const handelStatusUpdate = async (Id: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${grievanceAPI?.updateWorkFlowStatus}/${Id}`,
        data: {
          id: id,
        },
      })
      if (result?.data?.success) {
        workFlowData.refetch()
        if (result?.data?.data?.status == 1) {
          toast.success(result.data?.message)
        }
        if (result?.data?.data?.status == 0) {
          toast.error(result.data?.message)
        }
      } else {
        toast.error(result.data?.message)
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }
 
  useEffect(() => {
    props?.settitle(parentName)
    props?.setSubtitle(moduleName)
  }, [parentId])

  // const addLevel = [];
  // // Check if moduleName is an array, otherwise handle as empty array
  // const moduleName1 = Array.isArray(moduleName) ? moduleName : moduleName ? [moduleName] : [];
  
  // addLevel.push(...moduleName1);
  
  // console.log(addLevel);

  return (
    <main className='grid items-start'>
      {/* <div className='p-2 '>
        <Breadcrumb>
          <BreadcrumbList>
            {addLevel?.map((data) => {
              return (
                <BreadcrumbItem key={data}>
                  <BreadcrumbLink
                    href={`/grievance/dashboard/workflow-master?parentId=${parentId}&levelSerial=${levelSerial}`}
                  >
                    <div className='flex '>
                      {data}
                      <BreadcrumbSeparator className='mt-1' />
                    </div>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
      <WorkFlowMasterForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Workflow' : 'Add Workflow'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={workFlowData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setPage={setPage}
              setSearch={setSearch}
              refetch={workFlowData.refetch}
              isFetching={workFlowData.isLoading}
            />
          </div>
          <div>
            <Button
              className='flex items-center gap-2'
              onClick={() => {
                setOpen(true);
                // checkWorkflowModulePermissions()
              }
              }
            >
              Add New
            </Button>
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
                      <TableHead className=''>Status</TableHead>
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

                        <TableCell>
                          <Switch
                            checked={items?.status == 1}
                            onChange={() => handelStatusUpdate(items._id)}
                            className={`${items?.status ? 'bg-primary' : 'bg-gray-200'
                              } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className='sr-only'>
                              Enable notifications
                            </span>
                            <span
                              className={`${items?.status
                                ? 'translate-x-6'
                                : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white`}
                            />
                          </Switch>
                        </TableCell>
                        <TableCell className='space-x-2'>
                          <Button
                            variant={'secondary'}
                            onClick={() => handleEdit(items._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant={'secondary'}
                            onClick={() => {
                              navigate(
                                `/grievance/dashboard/members-details?parentId=${items?._id}`
                              )
                            }}
                          >
                            Members
                          </Button>
                          <Button
                            className='bg-primary md:ml-5'
                            onClick={() => {
                              navigate(
                                `/grievance/dashboard/workflow-master?parentId=${items?._id}&levelSerial=${items?.levelSerial + 1}&parentName=${items.workFlowName}&moduleName=${items?.module?.moduleName}`
                              )
                            }}
                          >
                            View
                          </Button>
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
  )
}
