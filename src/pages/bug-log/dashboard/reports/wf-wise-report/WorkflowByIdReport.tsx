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
import Spinner from '@/components/loaders/Spinner'
import { useState } from 'react'
import Page from '@/components/helmet-page'
import { useLocation } from 'react-router-dom'


export default function WorkflowByIdReport() {
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()


  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)

  const workflowId = query.get('workflowId')





  const complaintWorkflowDataId = useApi<any>({
    api: `${grievanceAPI.complaintWorkflowWiseReportById}?page=${1}&limit=${1000}&workflowId=${workflowId}`,
    key: 'complaintWorkflowWiseReportById',
    value: [page, perPage],
    options: {
      enabled: true,
    },
  })







  return (
    <Page title='Reports Details' subTitle='Grievance Reports' >
      <div className=''>
        <Card >
          <CardHeader className='px-7'>
            <CardDescription>
              List of Grievance number ({complaintWorkflowDataId.data?.data?.totalDocs})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {complaintWorkflowDataId.isLoading ? (
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
                      <TableHead className=''>Citizen Name</TableHead>
                      <TableHead className=''>Mobile No.</TableHead>
                      <TableHead className=''>Ulb</TableHead>
                      <TableHead className=''>Module</TableHead>
                      <TableHead className=''>Resolve Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaintWorkflowDataId?.data?.data?.docs?.map((items: any, index: any) => (
                      <TableRow key={items._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{items.complaintTitle}</TableCell>
                        <TableCell>{items.citizenName}</TableCell>
                        <TableCell>{items.mobileNo}</TableCell>
                        <TableCell>{items?.ulb?.ulbName}</TableCell>
                        <TableCell>{items?.module?.moduleName}</TableCell>
                        <TableCell>{items.resolveStatus == 0 ? "Pending" : "Resolved"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className='mb-2 mt-4' />
                <div className='flex w-full justify-end'>
                  <PaginationComponent
                    page={page}
                    perPage={perPage}
                    totalPage={complaintWorkflowDataId?.data?.data?.totalDocs}
                    hasNextPage={complaintWorkflowDataId?.data?.data?.hasNextPage}
                    hasPrevPage={complaintWorkflowDataId?.data?.data?.hasPrevPage}
                    setPage={setPage}
                    setPerPage={setPerPage}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
