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
import Page from '@/components/helmet-page'

const schema = yup.object().shape({
  currentPassword: yup.string().required('Current Password is required'),
  newPassword: yup.string().required('New Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
})

export default function ChangePassword() {
  const postMutation = usePostMutation({})
  const navigate = useNavigate()
  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    try {
      const res = await postMutation.mutateAsync({
        api: grievanceAPI.changePassword,
        data: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate("/bug-log/auth/login")
      } else {
        toast.error(res.data?.message)
      }
      methods.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <section className="relative flex w-full justify-center items-center bg-white  dark:bg-gray-900">
        <div className="w-full max-w-md px-4 py-8 dark:bg-gray-800">
          <h1 className="text-2xl text-left font-semibold text-gray-800 capitalize dark:text-white mb-2">
            <span className="text-primary text-left">Change Password</span>
          </h1>
        
          <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-6 mt-6">
              <div>
                <Label htmlFor="currentPassword"><span className='text-red-500'>*</span> Old Password</Label>
                <RHFTextField
                  className="bg-gray-100 dark:bg-gray-700 mt-1 w-full rounded-md shadow-sm"
                  name="currentPassword"
                  type="password"
                  placeholder="Enter old password"
                />
              </div>
              <div>
                <Label htmlFor="newPassword"><span className='text-red-500'>*</span> New Password</Label>
                <RHFTextField
                  className="bg-gray-100 dark:bg-gray-700 mt-1 w-full rounded-md shadow-sm"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword"><span className='text-red-500'>*</span> Confirm Password</Label>
                <RHFTextField
                  className="bg-gray-100 dark:bg-gray-700 mt-1 w-full rounded-md shadow-sm"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex justify-end">
                <ButtonLoading
                  isLoading={methods.formState.isSubmitting}
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
                >
                  Submit
                </ButtonLoading>
              </div>
            </div>
          </FormProviders>
        </div>
      </section>
    </Page>
  )
}
