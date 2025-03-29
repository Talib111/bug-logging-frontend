import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
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
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import Spinner from '@/components/loaders/Spinner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({

  parentId: yup.string(),
  levelSerial: yup.string(),


})


export default function WorkflowWiseReport() {
  const navigate = useNavigate()
  // const [page, setPage] = useState<number>(1)
  // const [perPage, setPerPage] = useState<number>(10)
  const [page] = useState<number>(1)
  const [perPage] = useState<number>(10)

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      parentId: '',
      levelSerial: '',
    },
  })

  const onSubmit = async () => {
    complaintReportData.refetch();
  }

  const complaintReportData = useApi<any>({
    api: `${grievanceAPI.complaintWorkflowWiseReport}?workflowId=${methods?.watch('parentId')}`,
    key: 'searchAllComplaints',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })

  
 
  const workFlowData = useApi<any>({
    api: `${grievanceAPI.getAllWorkFlow}?page=${1}&limit=${1000}&parentId=${null}&levelSerial=${1}`,
    key: 'getAllWorkFlow',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })


  return (
    <>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-4 gap-x-2 gap-y-4 bg-background p-10'>
          <h1 className="text-xl font-bold text-blue-800 uppercase col-span-4">Search Your Grievance </h1>
          <Separator className='col-span-4' />

          <div>
            <Label htmlFor="parentId">Workflow</Label>
            <SelectField className='bg-background cursor-pointer' name='parentId' data={
              workFlowData.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.workFlowName,
                }
              }) ?? []
            }
            />
          </div>
          <div></div>

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
              Grievance List
              </CardDescription>
            </CardHeader>
            <CardContent>
              {complaintReportData?.isFetching ? (
                <div className='flex h-32 items-center justify-center'>
                  <Spinner />
                </div>
              ) : (
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=''>#</TableHead>
                        <TableHead className=''>WorkFlow Name</TableHead>
                        <TableHead className=''>Total Grievance no.</TableHead>
                        <TableHead className=''>View Grievance List</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complaintReportData?.data?.data?.map((items: any, index: any) => (
                        <TableRow key={items._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{items.workFlowName}</TableCell>
                          <TableCell>{items.complaintCount}</TableCell>
                          <TableCell>
                          <Button
                            className='bg-primary md:ml-5'
                            onClick={() => {
                              navigate(
                                `/bug-log/dashboard/workflow-byId-Report?workflowId=${items?._id}`
                              )
                            }}
                          >
                            View
                          </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Separator className='mb-2 mt-4' />
                 
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      
    </>
  )
}
