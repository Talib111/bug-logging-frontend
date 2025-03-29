import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import Spinner from '@/components/loaders/Spinner'
import { Separator } from '@/components/ui/separator'
import { NotepadText } from 'lucide-react'
import moment from 'moment'
export default function LandingPage() {

  const complaintData = useApi({
    api: `${grievanceAPI?.getComplaintDetails}?page=${1}&limit=${10}`,
    key: 'getAllComplaint',
    options: {
      enabled: true,
    },
  })
  const grievanceData = useApi({
    api: `${grievanceAPI?.getComplaintBrief}`,
    key: 'getComplaintBrief',
    options: {
      enabled: true,
    },
  })
  return (
    <div>
      <div className='grid md:grid-cols-4 col-span-1 gap-4 '>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-bold text-lg'><div className='h-8 w-8 rounded-full bg-indigo-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Received</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievanceReceived}</CardTitle></CardTitle>
            </CardHeader>

          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-bold text-lg'><div className='h-8 w-8 rounded-full bg-green-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Resolved</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievanceResolved}</CardTitle></CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-bold text-lg'><div className='h-8 w-8 rounded-full bg-yellow-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Pending</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievancePending}</CardTitle></CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex justify-between items-center font-bold text-lg'><div className='h-8 w-8 rounded-full bg-red-500 overflow-hidden inline-flex justify-center items-center mr-2 flex-initial'><NotepadText className='inline text-white' /></div> <div className='flex-initial'>Grievance Rejected</div>  <CardTitle className='text-xl font-bold flex-1 flex justify-end'>{grievanceData?.data?.data?.grievanceReject}</CardTitle></CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className='p-2 font-bold mt-2'>
        # Recent Complaint
      </div>
      <div className=''>
        <Card >
          <CardHeader className='px-7'>
          </CardHeader>
          <CardContent>
            {complaintData?.isLoading ? (
              <div className='flex h-32 items-center justify-center'>
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Citizen Name</TableHead>
                      <TableHead>ULB</TableHead>
                      <TableHead>Module Name</TableHead>
                      <TableHead>Grievance Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaintData?.data?.data?.docs?.map((items, index) => (
                      <TableRow key={items?._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{items?.citizenName || 'N/A'}</TableCell>
                        <TableCell>{items?.ulbName==='undefined' ? 'N/A': items?.ulbName || 'N/A' }</TableCell>
                        <TableCell>{items?.moduleName || 'N/A'}</TableCell>
                        <TableCell>{items?.complaintTitle || 'N/A'}</TableCell>
                        <TableCell>{items?.complaintDescription || 'N/A'}</TableCell>
                        <TableCell className='whitespace-nowrap'>{moment(items?.createdAt).format('DD-MM-YYYY')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className='mb-2 mt-4' />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
