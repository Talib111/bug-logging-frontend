
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormProviders,
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/user-edit-dialog-box'
import { useApi, usePostMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { useLocation } from 'react-router-dom'
import PaginationComponent from '@/components/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Spinner from '@/components/loaders/Spinner'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/custom/button'
import moment from 'moment'
import { I_USERS_TYPE_LIST } from '../../users/type'
import { Confirm } from '@/components/confirm-box';
import SearchBox from '@/components/search-box'

const schema = yup.object().shape({
  ulbId: yup.string().required('ulb is required'),
  moduleId: yup.string().required('Module  is required'),
  workFlowName: yup.string().required('workFlow Name is required'),
  parentId: yup.string().notRequired(),
  levelSerial: yup.string().notRequired(),
})
type FormData = yup.InferType<typeof schema>

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  id?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

export default function MemberForm({
  open,
  setOpen,
  title,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const postMutation = usePostMutation({})
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

  const [search, setSearch] = useState<string>('')
  // const [search] = useState<string>('')

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  let parentId = query.get('parentId');

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async () => {

  }

  const usersData = useApi<I_USERS_TYPE_LIST>({
    api: `${grievanceAPI.getAllUser}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllUserData',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  const createdUsersData = (id: any) => {
    Confirm('Are you sure ?', 'Please confirm', async () => {
      const res =await postMutation.mutateAsync({
        api: grievanceAPI.createWFUserMapping,
        data: {
          workflowId: parentId,
          userId: id,
        },
      })
      if (res.data?.success) {
        refetch!()
        toast.success(res?.data?.message)
      } else {
        toast.error('workflow user not created successfully')
      }
    });
    setOpen(false)
    
   
  }


  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={usersData?.isFetching}
    >

      
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid gap-x-2 gap-y-4'>
          <Card>
          <div className='mx-5 p-2'>
            <SearchBox
              search={search}
              setPage={setPage}
              setSearch={setSearch}
              refetch={usersData.refetch}
              isFetching={usersData.isLoading}
            />
          </div>
            <CardHeader className='px-7'>
              <CardDescription>
                Workflow Member List ({usersData.data?.data?.totalDocs})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usersData.isLoading ? (
                <div className='flex h-32 items-center justify-center'>
                  <Spinner />
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=''>#</TableHead>
                        <TableHead className=''>User Name</TableHead>
                        <TableHead className=''>Role</TableHead>
                        <TableHead className=''>Created at</TableHead>
                        {/* <TableHead className=''>Status</TableHead> */}
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersData?.data?.data?.docs?.map((items, index) => (
                        <TableRow key={items._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{items.fullName}</TableCell>
                          <TableCell>{items.role}</TableCell>
                          <TableCell>
                            {moment(items.createdAt).format('DD-MM-YYYY')}
                          </TableCell>

                          {/* <TableCell>
                            <Switch
                              checked={items?.status == 1}
                              // onChange={() => handelStatusUpdate(items._id)}
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
                          <TableCell className=''>


                            <Button
                              className='bg-primary '
                              onClick={() => createdUsersData(items._id)}
                            >
                              Add Member
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
                    totalPage={usersData?.data?.data?.totalDocs}
                    hasNextPage={usersData?.data?.data?.hasNextPage}
                    hasPrevPage={usersData?.data?.data?.hasPrevPage}
                    setPage={setPage}
                    setPerPage={setPerPage}
                  />
                </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </FormProviders>

    </EditDialogBox>
  )
}
