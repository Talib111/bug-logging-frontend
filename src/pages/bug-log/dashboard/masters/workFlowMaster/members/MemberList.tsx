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
import { useApi, 
  // usePutMutation 
} from '@/hooks/useCustomQuery'
import { axios, getErrorMessage, grievanceAPI } from '@/lib'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import MemberForm from './MemberForm'
import { useLocation } from 'react-router-dom'
// import { Switch } from '@headlessui/react'
import toast from 'react-hot-toast'
import { I_WORK_FLOW_USER_MAP_TYPE_LIST } from '../type'
import { Trash2 } from 'lucide-react';
import { Confirm } from '@/components/confirm-box';
import MemberRoleForm from '../memberRole/MemberRoleForm'

export default function HomePage(props: any) {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [openMemberRole, setOpenMemberRole] = useState(false)
  const [wrkId, setWorkFlowId] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  // const mutate = usePutMutation({})
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()

  const parentId = query.get('parentId')

  const workFlowData = useApi<I_WORK_FLOW_USER_MAP_TYPE_LIST>({
    // api: `${grievanceAPI.getAllWFUserMapping}/${parentId}`,
    api: `${grievanceAPI.getAllWFUserMapping}?workflowId=${parentId}`,
    key: 'getAllWFUserMapping',
    value: [page, perPage, parentId],
    options: {
      enabled: true,
    },
  })

  const actionPermissions = useApi<any>({
    api: `${grievanceAPI.checkGeneralActions}`,
    key: "generalActionPermission",
    options: {
      enabled: true
    }
  });


  // const handelStatusUpdate = async (Id: string) => {
  //   try {
  //     const result = await mutate.mutateAsync({
  //       api: `${grievanceAPI?.updateWFUserMappingStatus}/${Id}`,
  //       data: {
  //         id: id,
  //       },
  //     })
  //     if (result?.data?.success) {
  //       workFlowData.refetch()
  //       if (result?.data?.data?.status == 1) {
  //         toast.success(result.data?.message)
  //       }
  //       if (result?.data?.data?.status == 0) {
  //         toast.error(result.data?.message)
  //       }
  //     } else {
  //       toast.error(result.data?.message)
  //     }
  //   } catch (error) {
  //     toast.error(getErrorMessage(error))
  //   }
  // }

  useEffect(() => {
    props?.settitle()
  }, [])

  const deletedUsersData = (id: any) => {
    Confirm('Are you sure ?', 'Please confirm', async () => {
      axios.delete(`${grievanceAPI?.deleteWFUserMapping}/${id}`)
        .then((res) => {
          toast.success(res?.data?.message)
          workFlowData.refetch()
        }).catch((error) => {
          toast.error(getErrorMessage(error))
        });
    })
  }

  return (
    <main className='grid items-start'>
      {
        open && (<MemberForm
          open={open}
          setOpen={setOpen}
          title={edit ? 'Edit Workflow Member' : 'Add Workflow Member'}
          id={id}

          edit={edit}
          setEdit={setEdit}
          refetch={workFlowData.refetch}
        />)
      }

      <MemberRoleForm
        open={openMemberRole}
        setOpen={setOpenMemberRole}
        title={edit ? 'Edit Workflow Member Role' : 'Add Workflow Member Role'}
        id={id}
        wrkId={wrkId}
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
          {actionPermissions?.data?.permission?.canModifyMembers && <div>
            <Button
              className='flex items-center gap-2'
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </div>}
        </div>
        {/* <Card className='w-full overflow-scroll'> */}
        <Card>
          <CardHeader className='px-7'>
            <CardDescription>
              Workflow Member List ({workFlowData.data?.data?.totalDocs})
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
                      <TableHead className=''>Workflow Member</TableHead>
                      <TableHead className=''>Role</TableHead>
                      {actionPermissions?.data?.permission?.canModifyMembers && <><TableHead className=''>Created at</TableHead>
                        {/* <TableHead className=''>Status</TableHead> */}
                        <TableHead>Action</TableHead></>}

                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workFlowData?.data?.data?.docs?.map((items, index) => (
                      <TableRow key={items._id}>
                        <TableCell>{index + 1} </TableCell>
                        <TableCell className='font-semibold'>{items.UserName}</TableCell>
                        <TableCell>{items.workflowRoleName || "N/A"}</TableCell>
                        {actionPermissions?.data?.permission?.canModifyMembers && <>

                          <TableCell>
                            {moment(items.createdAt).format('DD-MM-YYYY')}
                          </TableCell>
                          {/* <TableCell>
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
                          </TableCell> */}
                          <TableCell className='space-x-5 '>
                            <Button
                              type='button'
                              className=''
                              variant={'secondary'}

                              onClick={() => {

                                setId(items._id),
                                  setWorkFlowId(items?.workflowRoleId)
                                // setId(items._id),
                                setOpenMemberRole(true)
                                setEdit(items.workflowRoleId ? true : false)
                              }
                              }
                            >
                              {items.workflowRoleName ?
                                <div> Update Member Role </div> : <div className='ml-5'>Add Member Role</div>}
                            </Button>
                            <Button
                              className='bg-red-500 hover:bg-red-700  pt-2'
                              onClick={() => deletedUsersData(items._id)}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </TableCell></>}

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
