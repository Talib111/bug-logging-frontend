''
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextArea,
} from '@/components/forms'
import { usePutMutation } from '@/hooks/useCustomQuery'
import { getErrorMessage, grievanceAPI } from '@/lib'
import { CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  comment: yup.string(),
})


export default function TransferComponent({ currentWorkflowId, currentWorkflowName }: any) {
  
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const complaintId = query.get('complaintId')

  const mutate = usePutMutation({});
  const navigate = useNavigate()

  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })
console.log("complaintId=====>",complaintId);

  const onSubmit = async (data: any) => {

    let requestBody = {
      complaintId: complaintId,
      workflowId: currentWorkflowId,
      userId: null,
      comment: data?.comment
    };

    try {
      const result = await mutate.mutateAsync({
        api: grievanceAPI.transferComplaintToUlb,
        data: requestBody
      });
      if (result.data.success) {
        toast.success(result.data.message);
        navigate(`/bug-log/dashboard/complaint-workflow`)
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <FormProviders
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className='gap-x-2 gap-y-4 px-10 py-10'>
        <div>
          <CardTitle className='text-2xl font-bold'>Transfer Bug to <span className='text-amber-600'>{currentWorkflowName}</span> Workflow</CardTitle>
          {/* <div className='opacity-50'>Select ULB to transfer</div> */}


          <RHFTextArea
            className='mt-6 bg-background w-full rounded-md p-4 h-40 border'
            name='comment'
            placeholder='Comment'
          />
        </div>

        <div className='mt-4'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className=' w-full'
          >
            Transfer
          </ButtonLoading>
        </div>

      </div>


    </FormProviders>
  )
}
