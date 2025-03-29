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
import UlbListForm from './UlbListForm'
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { I_ULB_TYPE_LIST } from './type'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import SearchBox from '@/components/search-box'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react";
import toast from 'react-hot-toast'

export default function HomePage() {
  const mutate = usePutMutation({})
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const ulbData = useApi<I_ULB_TYPE_LIST>({
    api: `${grievanceAPI?.getAllUlb}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllUlb',
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
        api: `${grievanceAPI?.updateUlbStatus}/${Id}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        ulbData.refetch();
        if(result?.data?.data?.status==1) {
          toast.success(result?.data?.message);
        }if(result?.data?.data?.status==0){
          toast.error(result?.data?.message);
        }
      } else {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <main className='grid items-start'>
      <UlbListForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Ulb' : 'Add Ulb'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={ulbData?.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setPage={setPage}
              setSearch={setSearch}
              refetch={ulbData.refetch}
              isFetching={ulbData.isLoading}
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
              Ulb List ({ulbData?.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ulbData?.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Ulb Name</TableHead>
                      <TableHead className=''>Mobile No.</TableHead>
                      <TableHead className=''>WhatsApp No.</TableHead>
                      <TableHead className=''>Email</TableHead>
                      <TableHead className=''>Id</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ulbData?.data?.data?.docs?.map((items, index) => (
                      <TableRow key={items?._id}>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{items?.ulbName}</TableCell>
                        <TableCell>{items?.phonenumber}</TableCell>
                        <TableCell>{items?.whatsappnumber}</TableCell>
                        <TableCell>{items?.email}</TableCell>
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
                            className='bg-primary'
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
                    totalPage={ulbData?.data?.data?.totalDocs}
                    hasNextPage={ulbData?.data?.data?.hasNextPage}
                    hasPrevPage={ulbData?.data?.data?.hasPrevPage}
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
