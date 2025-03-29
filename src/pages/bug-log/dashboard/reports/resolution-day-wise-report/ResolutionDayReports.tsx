''
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  SelectField,
} from '@/components/forms'
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
import { Separator } from '@/components/ui/separator'
import PaginationComponent from '@/components/pagination'
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import Spinner from '@/components/loaders/Spinner'
import { useState } from 'react'

const schema = yup.object().shape({
  duration: yup.string(),
})


export default function ResolutionDayReport() {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      duration: '',
      // fDate: today,
      // toDate: today,
    },
  })

  const onSubmit = async () => {
    complaintReportData.refetch();
  }

  const complaintReportData = useApi<any>({
    api: `${grievanceAPI.complaintTimeDurationReport}?page=${page}&limit=${perPage}&duration=${methods.watch('duration')}`,
    key: 'searchAllComplaints',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  const resolutionDays: any = [
    { id: 1, value: '1', label: '1 Day' },
    { id: 2, value: '2', label: '2 Day' },
    { id: 3, value: '3', label: '3 Day' },
    { id: 4, value: '4', label: '4 Day' },
    { id: 5, value: '5', label: '5 Day' },
    { id: 6, value: '6', label: '6 Day' },
    { id: 7, value: '7', label: '7 Day' },
    { id: 8, value: '8', label: '8 Day' },
    { id: 9, value: '9', label: '9 Day' },
    { id: 10, value: '10', label: '10 Day' },
  ]

  return (
    <>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-4 gap-x-2  bg-background p-10'>
          <h1 className="text-xl font-bold text-blue-800 uppercase col-span-4">Search Your Grievance </h1>
          <Separator className='col-span-4' />
          {/* <div className='flex gap-8'>
            <div>
              <Label htmlFor="fDate">From Date</Label>
              <RHFTextField name='fDate' type='date' className='w-40' />
            </div>
            <div>
              <Label htmlFor="toDate">Upto Date</Label>
              <RHFTextField name='toDate' type='date' className='w-40' />
            </div>
          </div> */}
          {/* <div>
            <Label htmlFor="duration">Time Duration Type</Label>
            <SelectField className='bg-background cursor-pointer' name='duration' data={
              resolutionDays?.map((item: any) => {
                return {
                  value: item?.value,
                  label: item?.label,
                }
              }) ?? []
            }
            />
          </div> */}
          <div>
            <Label htmlFor="duration">Resolved Under</Label>
            <SelectField className='bg-background cursor-pointer' name='duration' data={
              resolutionDays?.map((item: any) => {
                return {
                  value: item?.value,
                  label: item?.label,
                }
              }) ?? []
            }
            />
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
      <div className='mt-2'>
        <Card >
          <CardHeader className='px-7'>
            <CardDescription>
            Grievance List ( {complaintReportData.data?.data?.totalDocs} )
            </CardDescription>
          </CardHeader>
          <CardContent>
            {complaintReportData.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=''>#</TableHead>
                      <TableHead className=''>Grievance Tittle.</TableHead>
                      <TableHead className=''>Module</TableHead>
                      <TableHead className=''>Duration Day's</TableHead>
                      <TableHead className=''>Resolve Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaintReportData?.data?.data?.docs?.map((items: any, index: any) => (
                      <TableRow key={items._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{items.complaintTitle}</TableCell>
                        <TableCell>{items?.module?.moduleName}</TableCell>
                        <TableCell>{items.duration} ( Day's)</TableCell>
                        <TableCell>{items.wfStatus == 0 ? "Pending" : "Resolved"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className='mb-2 mt-4' />
                <div className='flex w-full justify-end'>
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={complaintReportData?.data?.data?.totalDocs}
                    hasNextPage={complaintReportData?.data?.data?.hasNextPage}
                    hasPrevPage={complaintReportData?.data?.data?.hasPrevPage}
                    setPage={setPage}
                    setPerPage={setPerPage}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </>
  )
}
