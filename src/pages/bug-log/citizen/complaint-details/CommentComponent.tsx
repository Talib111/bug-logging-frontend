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
import { Info, RefreshCcw} from 'lucide-react'
import { Label } from '@/components/ui/label'

const schema = yup.object().shape({
  comment: yup.string().required('Write comment'),
})


export default function CommentComponent({ setisDialogOpen,complaintData }: any) {
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
        api: grievanceAPI.openCommentDirect,
        data: requestBody
      });
      if (result.data.success) {
        toast.success(result.data.message);
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

          <CardTitle className='text-2xl flex items-center font-bold mb-6 justify-between'><div className='flex items-center'><div className='w-7 h-7 bg-amber-600 rounded-full bg-red-5500 text-white justify-center items-center mr-2 flex '><RefreshCcw className='inline' /></div> Send Comment</div>
          </CardTitle>

          <Label className='opacity-70 flex items-center'><div><Info size={20} className='inline mr-1' /></div><div>Enter the comment you want to send?</div></Label>
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
            Send Comment
          </ButtonLoading>
        </div>

      </div>


    </FormProviders>
  )
}
