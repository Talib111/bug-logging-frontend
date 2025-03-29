''
import { useState } from 'react'
import moment from 'moment'
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
import { useApi,  usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
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
  const [id] = useState<string>('')
  const citizenFeedback = useApi<any>({
    api: `${grievanceAPI.getAllCitizenFeedback}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllCitizenFeedback',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })


  const handelStatusUpdate = async (Id: string) => {
    try {
      const result = await mutate.mutateAsync({
        api: `${grievanceAPI?.updateCitizenFeedback}/${Id}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        citizenFeedback?.refetch();
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
     
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              refetch={citizenFeedback?.refetch}
              isFetching={citizenFeedback?.isLoading}
            />
          </div>
          {/* <div>
            <Button
              className='flex items-center gap-2'
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </div> */}
        </div>
        {/* <Card className='w-full overflow-scroll'> */}
        <Card >
          <CardHeader className='px-7'>
            <CardDescription>
              Citizen Feedback List ({citizenFeedback?.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {citizenFeedback?.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Citizen Name</TableHead>
                      <TableHead className=''>Feedback</TableHead>
                      <TableHead className=''>Id</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      {/* <TableHead>Action</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {citizenFeedback?.data?.data?.docs?.map((role:any, index:any) => (
                      <TableRow key={role?._id}>
                        <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{role?.citizenName}</TableCell>
                        <TableCell>{role?.feedback}</TableCell>
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
                        {/* <TableCell>
                          <Button
                            onClick={() => handleEdit(role?._id)}
                          >
                            Edit
                          </Button>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className='mb-2 mt-4' />
                <div className='flex w-full justify-end'>
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={citizenFeedback?.data?.data?.totalDocs}
                    hasNextPage={citizenFeedback?.data?.data?.hasNextPage}
                    hasPrevPage={citizenFeedback?.data?.data?.hasPrevPage}
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
