''
import { useState } from 'react'
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
import TargetForm from './TargetForm'
import { useApi,  usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { I_TARGET_TYPE_LIST } from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react";
import toast from 'react-hot-toast'

export default function HomePage() {
  const [page, setPage] = useState<number>(1)
  const mutate = usePutMutation({})
  const [perPage, setPerPage] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const targetData = useApi<I_TARGET_TYPE_LIST>({
    api: `${grievanceAPI.getAllTarget}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllTarget',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  const handleEdit = (id: string) => {
    setEdit(true)
    setOpen(true)
    setId(id)
  }

  const handelStatusUpdate = async (roleId: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${grievanceAPI?.updateTargetStatus}/${roleId}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        targetData.refetch();
        if(result?.data?.data?.status==1) {
          toast.success(result.data?.message);
        }if(result?.data?.data?.status==0){
          toast.error(result.data?.message);
        }
      } else {
        toast.error(result.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className='grid items-start'>
      <TargetForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Target' : 'Add Target'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={targetData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              refetch={targetData.refetch}
              isFetching={targetData.isLoading}
            />
          </div>
          <div>
            <Button
              className='flex items-center gap-2'
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </div>
        </div>
        {/* <Card className='w-full overflow-scroll'> */}
        <Card >
          <CardHeader className='px-7'>
            <CardDescription>
              Target Type List ({targetData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {targetData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Target</TableHead>
                      <TableHead className=''>Id</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {targetData?.data?.data?.docs?.map((role, index) => (
                      <TableRow key={role._id}>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{role.targetType}</TableCell>
                        <TableCell>{role._id}</TableCell>
                        <TableCell>
                          {moment(role.createdAt).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                        <Switch
                            checked={role?.status == 1}
                            onChange={() => handelStatusUpdate(role._id)}
                            className={`${
                              role?.status ? "bg-primary" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                role?.status ? "translate-x-6" : "translate-x-1"
                              } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                          </Switch>
                        </TableCell>
                        <TableCell>
                          <Button
                            className='bg-primary'
                            onClick={() => handleEdit(role._id)}
                          >
                            Edit
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
                    totalPage={targetData?.data?.data?.totalDocs}
                    hasNextPage={targetData?.data?.data?.hasNextPage}
                    hasPrevPage={targetData?.data?.data?.hasPrevPage}
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
