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
import { Image } from '@/components/image'
import NotificationForm from './NotificationForm'
import { useApi,  usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { I_NOTIFICATION_TYPE_LIST } from './type'
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
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const notificationData = useApi<I_NOTIFICATION_TYPE_LIST>({
    api: `${grievanceAPI.getAllNotification}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllNotification',
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
        api: `${grievanceAPI?.updateNotificationStatus}/${Id}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        notificationData.refetch();
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
      <NotificationForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit News' : 'Add News'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={notificationData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              refetch={notificationData.refetch}
              isFetching={notificationData.isLoading}
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
            News List ({notificationData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notificationData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Images</TableHead>
                      <TableHead className=''>Title</TableHead>
                      <TableHead className=''>Notification Side</TableHead>
                      <TableHead className=''>Notification Type</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationData?.data?.data?.docs?.map((role, index) => (
                      <TableRow key={role._id}>
                      <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell style={{
                          margin: 5,
                          width: '50px',
                          height: '50px',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 0
                        }}>
                          <Image
                            src={role?.fullImgUrl} alt={role.imageUrl} className='h-12 w-12 rounded-full' />
                        </TableCell>
                        <TableCell>{role.title}</TableCell>
                        <TableCell>{role.notificationSide==0 ? "Management" :"Citizen"}</TableCell>
                        <TableCell>{role.notificationType == 0 ? "Notification" : "Recent News"}</TableCell>
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
                    totalPage={notificationData?.data?.data?.totalDocs}
                    hasNextPage={notificationData?.data?.data?.hasNextPage}
                    hasPrevPage={notificationData?.data?.data?.hasPrevPage}
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
