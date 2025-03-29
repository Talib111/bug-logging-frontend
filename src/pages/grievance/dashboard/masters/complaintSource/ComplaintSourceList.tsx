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
import ComplaintSourceForm from './ComplaintSourceForm'
import { useApi,  usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { I_COMPLAINT_SOURCE_TYPE_LIST } from './type'
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
  const complaintSourceData = useApi<I_COMPLAINT_SOURCE_TYPE_LIST>({
    api: `${grievanceAPI.getAllComplaintSource}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllComplaintSource',
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

  const handelStatusUpdate = async (Id: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${grievanceAPI?.updateComplaintSourceStatus}/${Id}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        complaintSourceData.refetch();
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
      <ComplaintSourceForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Grievance Source' : 'Add Grievance Source'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={complaintSourceData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              refetch={complaintSourceData.refetch}
              isFetching={complaintSourceData.isLoading}
              setPage={setPage}
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
            Grievance Source List ({complaintSourceData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {complaintSourceData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''> Grievance Source Name</TableHead>
                      <TableHead className=''>Id</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaintSourceData?.data?.data?.docs?.map((items, index) => (
                      <TableRow key={items?._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{items?.source}</TableCell>
                        <TableCell>{items?._id}</TableCell>
                        <TableCell>
                          {moment(items?.createdAt).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                        <Switch
                            checked={items?.status == 1}
                            onChange={() => handelStatusUpdate(items?._id)}
                            className={`${
                              items?.status ? "bg-primary" : "bg-gray-200"
                            } relative inline-flex items-center h-6 rounded-full w-11`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                items?.status ? "translate-x-6" : "translate-x-1"
                              } inline-block w-4 h-4 transform bg-white rounded-full`}
                            />
                          </Switch>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleEdit(items?._id)}
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
                    totalPage={complaintSourceData?.data?.data?.totalDocs}
                    hasNextPage={complaintSourceData?.data?.data?.hasNextPage}
                    hasPrevPage={complaintSourceData?.data?.data?.hasPrevPage}
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
