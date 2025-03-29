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
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import PaginationComponent from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/loaders/Spinner'
import { Link } from 'react-router-dom'
import { ButtonLoading, FormProviders, RHFTextField, SelectField } from '@/components/forms'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Badge } from '@/components/ui/badge'


const schema = yup.object().shape({

  ulbId: yup.string(),

})


export default function ComplaintList() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  // const [search, setSearch] = useState<string>('')
  const [search] = useState<string>('')

  const inboxListData = useApi<any>({
    api: `${grievanceAPI.getAllComplaints}?page=${page}&limit=${perPage}&q=${search}`,
    key: 'searchAllComplaints',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  const ulbData = useApi<any>({
    api: `${grievanceAPI.getAllUlb}?page=1&limit=1000`,
    key: 'geAllulb',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      ulbId: '',
      moduleId: '',
      complaintTypeId: '',
      priorityId: '',
      targetTypeId: '',
      complaintSourceTypeId: '',
    },
  })

  const onSubmit = async () => {
  }


  return (
    <main className='grid items-start'>

      <div className='grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2'>
        <div className='flex w-full justify-between gap-2'>
          <FormProviders
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
            className='w-full'
          >
            <div className='grid grid-cols-4 gap-x-2 gap-y-4 bg-background p-10 w-full' >

              <div>
                <Label htmlFor="ulbId">ULB</Label>
                <SelectField className='bg-background cursor-pointer' name='ulbId' data={
                  ulbData.data?.data?.docs?.map((item: any) => {
                    return {
                      value: item?._id,
                      label: item?.ulbName,
                    }
                  }) ?? []
                }
                />
              </div>
              <div>
                <Label>Text</Label>
                <RHFTextField name='name' inputValidation={['CapitalFirstLetter', 'removeDoubleSpace', 'string']} placeholder='' />
              </div>

              <div className='mt-6'>
                <ButtonLoading
                  isLoading={methods.formState.isSubmitting}
                  type='submit'
                  className=' w-auto  px-10 float-right'
                >
                  Search
                </ButtonLoading>
              </div>
            </div>

          </FormProviders>
        </div>
        <Card>
          <CardHeader className='px-7'>
            <CardDescription>
              Users List ({inboxListData.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {inboxListData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Grievance No.</TableHead>
                      <TableHead className=''>Title</TableHead>
                      <TableHead className=''>Description</TableHead>
                      <TableHead className=''>ULB</TableHead>
                      <TableHead className=''>Module</TableHead>
                      <TableHead className=''>Created at</TableHead>
                      <TableHead className=''>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inboxListData?.data?.data?.docs?.map((items: any, index: any) => (
                      <TableRow key={items._id}>
                       <TableCell>{((page * perPage) - perPage) + index + 1}</TableCell>
                        <TableCell>{items.complaintRefNo}</TableCell>
                        <TableCell>{items.complaintTitle}</TableCell>
                        <TableCell>{items.complaintDescription}</TableCell>
                        <TableCell>{items.ulb?.ulbName}</TableCell>
                        <TableCell>{items?.module?.moduleName}</TableCell>
                        <TableCell>
                          {moment(items.createdAt).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                              {items?.wf_status === 3 && <Badge className='bg-amber-400 text-white'>Pending(re-opened)</Badge>}
                              {items?.wf_status === 2 && <Badge variant={'destructive'}>Rejected</Badge>}
                              {items?.wf_status === 1 && <Badge variant={'success'}>Resolved</Badge>}
                              {items?.wf_status === 0 && <Badge variant={'secondary'}>Pending</Badge>}
                            </TableCell>
                        <TableCell>
                          <Link to={`/bug-log/dashboard/management-complaint-details?complaintRefNo=${items?.complaintRefNo}
                         &complaintId=${items?._id}`}>
                            <Button
                              className='bg-primary'
                              onClick={() => { }}
                            >
                              View
                            </Button>
                          </Link>
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
                    totalPage={inboxListData?.data?.data?.totalDocs}
                    hasNextPage={inboxListData?.data?.data?.hasNextPage}
                    hasPrevPage={inboxListData?.data?.data?.hasPrevPage}
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
