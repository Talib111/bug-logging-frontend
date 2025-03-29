import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextField
} from '@/components/forms'
import { usePostMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { CardDescription } from '@/components/ui/card'

const schema = yup.object().shape({
  complaintTitle: yup.string().required('ulb is required'),
  complaintDescription: yup.string().required('Module  is required'),
  moduleId: yup.string().required('Module  is required'),
  ulbId: yup.string().required('Module  is required'),
  priorityId: yup.string().required('Module  is required'),
  targetTypeId: yup.string().required('Module  is required'),
})


export default function CitizenReviewForm() {
  const postMutation = usePostMutation({})
  const navigate = useNavigate()

  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    try {

      const res = await postMutation.mutateAsync({
        api: grievanceAPI.createComplaintApplication,
        data: {
          complaintTitle: data.complaintTitle,
          complaintDescription: data.complaintDescription,
          moduleId: data.moduleId,
          ulbId: data.ulbId,
          priorityId: data.priorityId,
          targetTypeId: data.targetTypeId,
        },
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate(`/grievance/citizen/complaint-success?complaintRefNo=${res?.data?.data?.complaintRefNo}`)
      } else {
        toast.error('Grievance not created successfully')
      }
      methods.reset({
        ulbId: '',
        moduleId: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <section className="relative flex w-full">
      {/* <div className="min-h-screen absolute top-0 left-0 bg-blue-500 w-full" /> */}

      <div className="min-h-screen bg-white dark:bg-gray-900 md:w-3/4" />
      <div className="flex flex-col justify-center w-full min-h-screen px-4 py-10 md:fixed md:mx-24">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          <span className="text-[#0D7538]">Change Password.</span>
        </h1>
        <CardDescription className='px-2'>Easily change your password</CardDescription>
        <div className="grid w-full md:grid-cols-3 mt-10">
          <div className="w-full p-8 bg-white rounded-md shadow-none border dark:bg-gray-800">
            <FormProviders
              methods={methods}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className='space-y-4'>
                <div>
                  <Label htmlFor="oldPassword">Old Password</Label>
                  <RHFTextField className='bg-background' name='oldPassword' placeholder='' />
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <RHFTextField className='bg-background' name='newPassword' placeholder='' />
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword">Confirm Password</Label>
                  <RHFTextField className='bg-background' name='confirmNewPassword' placeholder='' />
                </div>

                <div className='col-span-3'>
                  <ButtonLoading
                    isLoading={methods.formState.isSubmitting}
                    type='submit'
                    className=' w-auto rounded-lg px-10 float-right'
                  >
                    Submit
                  </ButtonLoading>
                </div>

              </div>


            </FormProviders>
          </div>

        </div>
      </div>
    </section>

  )
}
