import { useApi, usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Spinner from '@/components/loaders/Spinner'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function TransferToUlb({ setisDialogOpen, complaintData }: any) {
  const mutate = usePutMutation({});
  const getUlbData = useApi<any>({
    api: `${grievanceAPI?.getAllUlbDirect}?page=1&limit=10000`,
    key: 'getAllUlbDirect',
    options: {
      enabled: true,
    },
  })


  const transferToUlb = async (ulbId: string) => {
    try {
      let requestBody = {
        complaintId: complaintData?.data?.data?._id,
        ulbId: ulbId,
      };

      const result = await mutate.mutateAsync({
        api: grievanceAPI?.transferComplaintToUlbSpecific,
        data: requestBody
      });
      if (result.data.success) {
        toast.success(result.data.message);
        complaintData.refetch()
        setisDialogOpen(false)

      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (

    <div className='gap-x-2 gap-y-4 px-10 py-10 h-[600px] overflow-y-scroll'>
      <div>
        <CardTitle className='text-2xl flex items-center justify-between font-bold mb-6'>
          <div>
            Transfer to ULB({getUlbData?.data?.data?.length})
          </div>
          <div>
            <X className="cursor-pointer hover:bg-red-100 rounded-lg inline" onClick={() => setisDialogOpen(false)} />
          </div>
        </CardTitle>

        {getUlbData.isLoading ? (
          <div className='flex h-32 items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className=''>#</TableHead>
                  <TableHead className=''>ULB</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getUlbData?.data?.data?.map((items: any, index: any) => (
                  <TableRow key={items._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{items?.ulbName}</TableCell>
                    <TableCell className='space-x-2'>
                      <Button
                        name="bts"
                        type="button"
                        className="mr-4"
                        onClick={() => transferToUlb(items?._id)}
                      >
                        Transfer
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  )
}
