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
      <section className="relative flex w-full justify-center items-center   dark:bg-gray-900">
        <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-2xl text-center font-semibold text-gray-800 capitalize dark:text-white mb-2">
            <span className="text-[#0D7538] ">Change Password</span>
          </h1>
          <CardDescription className="px-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Easily change your password
          </CardDescription>
          <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-6 mt-6">
              <div>
                <Label htmlFor="currentPassword">Old Password</Label>
                <RHFTextField
                  className="bg-gray-100 dark:bg-gray-700 mt-1 w-full rounded-md shadow-sm"
                  name="currentPassword"
                  type="password"
                  placeholder="Enter old password"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <RHFTextField
                  className="bg-gray-100 dark:bg-gray-700 mt-1 w-full rounded-md shadow-sm"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                  className="w-full bg-[#0D7538] text-white py-2 rounded-md hover:bg-green-700"
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
