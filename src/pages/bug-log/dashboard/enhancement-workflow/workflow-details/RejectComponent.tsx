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
import { Info, X } from 'lucide-react'
import { Label } from '@/components/ui/label'

const schema = yup.object().shape({
  comment: yup.string().required('Select comment'),
})


export default function RejectComponent({ setisDialogOpen,complaintData, actionPermissions }: any) {
  const mutate = usePutMutation({});

  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {

    let requestBody = {
      complaintId: complaintData?.data?.data?._id,
      comment: data?.comment
    };

    try {
      const result = await mutate.mutateAsync({
        api: grievanceAPI.rejectComplaint,
        data: requestBody
      });
      if (result.data.success) {
        toast.success(result.data.message);
        actionPermissions.refetch()
        complaintData?.refetch();
        setisDialogOpen(false)
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
          <CardTitle className='text-2xl flex items-center justify-between font-bold mb-6'>
            <div>
            <span className='w-7 h-7 bg-red-600 rounded-full bg-red-5500 text-white inline-flex justify-center items-center mr-2'><X /></span> Reject Bug
            </div>
            <div>
              <X className="cursor-pointer hover:bg-red-100 rounded-lg inline" onClick={() => setisDialogOpen(false)} />
            </div>
          </CardTitle>

          <Label className='opacity-70 flex items-center'><div><Info size={20} className='inline mr-1' /></div><div>This comment will be visible to citizen.</div></Label>
          <RHFTextArea
            className='bg-background w-full rounded-md p-4 h-40 border mt-2'
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
            Reject
          </ButtonLoading>
        </div>

      </div>


    </FormProviders>
  )
}
