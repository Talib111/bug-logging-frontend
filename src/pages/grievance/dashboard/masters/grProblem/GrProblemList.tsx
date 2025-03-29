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
import GrProblemForm from './GrProblemForm'
import { useApi,  usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { I_PROBLEM_TYPE_LIST } from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react";
import toast from 'react-hot-toast'

export default function HomePage() {
  const [page, setPage] = useState<number>(1)
  const mutate = usePutMutation({})
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState<string>('')
  const roleData = useApi<I_PROBLEM_TYPE_LIST>({
    api: `${grievanceAPI.getAllProblem}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllProblem',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })


  const handelStatusUpdate = async (roleId: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${grievanceAPI?.updateProblemStatus}/${roleId}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        roleData.refetch();
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

  const handleEdit = (id: string) => {
    setEdit(true)
    setOpen(true)
    setId(id)
  }

  return (
    <main className='grid items-start'>
      <GrProblemForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Gr Problem' : 'Add Gr Problem'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={roleData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              refetch={roleData.refetch}
              isFetching={roleData.isLoading}
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
            Grievance Problem List ({roleData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {roleData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Gr Problem</TableHead>
                      <TableHead className=''>Department</TableHead>
                      <TableHead className=''>SLA 1</TableHead>
                      <TableHead className=''>SLA 2</TableHead>
                      <TableHead className=''>SLA 3</TableHead>
                      <TableHead className=''>Id</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roleData?.data?.data?.docs?.map((role:any, index:any) => (
                      <TableRow key={role?._id}>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{role?.problem}</TableCell>
                        <TableCell>{role?.departmentName}</TableCell>
                        <TableCell>{role?.sla1} (Hs)</TableCell>
                        <TableCell>{role?.sla2} (Hs)</TableCell>
                        <TableCell>{role?.sla3} (Hs)</TableCell>
                        <TableCell>{role?._id}</TableCell>
                        <TableCell>
                          {moment(role?.createdAt).format('DD-MM-YYYY')}
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
                            onClick={() => handleEdit(role?._id)}
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
                    totalPage={roleData?.data?.data?.totalDocs}
                    hasNextPage={roleData?.data?.data?.hasNextPage}
                    hasPrevPage={roleData?.data?.data?.hasPrevPage}
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
