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

export default function WorkflowMemberComponent({ setisDialogOpen, complaintData ,actionPermissions}: any) {
  const mutate = usePutMutation({});



  const workflowMembers = useApi<any>({
    api: `${grievanceAPI.getAllWFUserMappingToTransfer}?workflowId=${complaintData?.data?.data?.wf_currentWorkflowId}`,
    key: 'getWorkflowMembers',
    value: [],
    options: {
      enabled: true,
    },
  })

  const transferToMember = async (userId: any) => {
    let requestBody = {
      complaintId: complaintData?.data?.data?._id,
      workflowId: null,
      userId: userId,
    };

    try {
      const result = await mutate.mutateAsync({
        api: grievanceAPI?.transferComplaintToUlb,
        data: requestBody
      });
      if (result.data.success) {
        toast.success(result.data.message);
        complaintData?.refetch();
        actionPermissions.refetch()
        setisDialogOpen(false)
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (

    <div className='gap-x-2 gap-y-4 px-10 py-10'>
      <div>
        <CardTitle className='text-2xl flex items-center justify-between font-bold mb-6'>
          <div>
            Transfer to any Members
          </div>
          <div>
            <X className="cursor-pointer hover:bg-red-100 rounded-lg inline" onClick={() => setisDialogOpen(false)} />
          </div>
        </CardTitle>

        {workflowMembers.isLoading ? (
          <div className='flex h-32 items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className=''>#</TableHead>
                  <TableHead className=''>Member</TableHead>
                  <TableHead className=''>Workflow Role</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflowMembers?.data?.data?.docs?.map((items: any, index: any) => (
                  <TableRow key={items._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{items?.UserName}</TableCell>
                    <TableCell>{items?.workflowRoleName}</TableCell>
                    <TableCell className='space-x-2'>
                      <Button
                        name="bts"
                        type="button"
                        className="mr-4"
                        onClick={() => transferToMember(items?.userId)}
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
