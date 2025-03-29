''
import { useState } from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
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
import ProjectForm from './ProjectForm'
import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { I_ROLE_TYPE_LIST } from './type'
import Spinner from '@/components/loaders/Spinner'
import { Switch } from "@headlessui/react";
import toast from 'react-hot-toast'
import { Eye, Grid, List } from "lucide-react"
import { Image } from '@/components/image'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

export default function ProjectList() {
  const [page, setPage] = useState<number>(1)
  const mutate = usePutMutation({})
  const [viewMode, setViewMode] = useState<"card" | "list">("card")
  const [perPage, setPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState<string>('')
  const [edit, setEdit] = useState(false)
  const roleData = useApi<I_ROLE_TYPE_LIST>({
    api: `${grievanceAPI.getAllProject}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'getAllProjects',
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
        api: `${grievanceAPI?.updateProjectStatus}/${roleId}`,
        data: {
          id: id
        }
      });
      if (result?.data?.success) {
        roleData.refetch();
        if (result?.data?.data?.status == 1) {
          toast.success(result.data?.message);
        } if (result?.data?.data?.status == 0) {
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
      <ProjectForm
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Project' : 'Add Project'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={roleData.refetch}
      />
      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <div className='font-bold text-2xl'>Projects({roleData.data?.data?.totalDocs})</div>
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "card" ? "fade" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("card")}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Cards
                </Button>
                <Button
                  variant={viewMode === "list" ? "fade" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
              </div>
              <Button
                className='flex items-center gap-2'
                onClick={() => setOpen(true)}
              >
                Add New
              </Button>
            </div>


          </div>
        </div>
        {/* <Card className='w-full overflow-scroll'> */}
        <Card className='bg-transparent shadow-none border-none'>
          <CardHeader className="px-7">
            {/* <CardDescription>Project List ({roleData.data?.data?.totalDocs})</CardDescription> */}
          </CardHeader>
          <CardContent>
            {roleData.isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <>
                {viewMode === "list" ? (
                  // List View (Table)
                  <Table className='bg-white'>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=''>#</TableHead>
                        <TableHead className=''>Project Name</TableHead>
                        <TableHead className=''>Id</TableHead>
                        <TableHead className=''>Created at</TableHead>
                        <TableHead className=''>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roleData?.data?.data?.docs?.map((role, index) => (
                        <TableRow key={role?._id}>
                          <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                          <TableCell>{role?.projectName}</TableCell>
                          <TableCell>{role?._id}</TableCell>
                          <TableCell>
                            {moment(role?.createdAt).format('DD-MM-YYYY')}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={role?.status == 1}
                              onChange={() => handelStatusUpdate(role._id)}
                              className={`${role?.status ? "bg-primary" : "bg-gray-200"
                                } relative inline-flex items-center h-6 rounded-full w-11`}
                            >
                              <span className="sr-only">
                                Enable notifications
                              </span>
                              <span
                                className={`${role?.status ? "translate-x-6" : "translate-x-1"
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
                ) : (
                  // Card View
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {roleData?.data?.data?.docs?.map((role, index) => (
                      <Card key={role?._id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{role?.projectName}</CardTitle>
                            </div>
                            <div className="flex items-center">
                              <Badge variant={role?.status == 1 ? "success" : "secondary"}>
                                {role?.status == 1 ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center justify-center bg-gray-100 rounded-md  mb-2 overflow-hidden">
                            {/* Template preview thumbnail or placeholder */}
                            <Image src={role?.imageUrl || "/images/mailT.webp"} alt={role?.projectName || ""} className="w-auto h-32" />
                          </div>
                          {/* <div className="text-sm text-muted-foreground">
                            Created: {moment(role?.createdAt).format("DD-MM-YYYY")}
                          </div> */}
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Link className='w-full' to={`/mail/dashboard/mail-template?projectId=${role?._id}&projectName=${role?.projectName}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => { }}
                              className="w-full"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Templates
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
                {/* <Separator className="mb-2 mt-4" />
                <div className="flex w-full justify-end">
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={roleData?.data?.data?.totalDocs}
                    hasNextPage={roleData?.data?.data?.hasNextPage}
                    hasPrevPage={roleData?.data?.data?.hasPrevPage}
                    setPage={setPage}
                    setPerPage={setPerPage}
                  />
                </div> */}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
