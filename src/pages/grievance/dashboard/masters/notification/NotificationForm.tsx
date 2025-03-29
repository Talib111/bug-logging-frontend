''
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFTextArea,
  RHFUploadFiled,
  SelectField,
} from '@/components/forms'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_NOTIFICATION_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  title: yup.string().required('Title  is required'),
  description: yup.string().required('Description is required'),
  notificationSide: yup.number().required('Notification Side is required'),
  notificationType: yup.number().required('Notification Type is required'),
  imageUrl: yup.mixed().nullable(),
})
type FormData = yup.InferType<typeof schema>

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  id?: string
  edit?: boolean
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: () => void
}

export default function NotificationForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const postMutation = usePostMutation({})
  const putMutation = usePutMutation({})
  const { data, isFetching } = useApi<I_NOTIFICATION_TYPE_VIEW>({
    api: `${grievanceAPI.getNotificationById}/${id}`,
    key: 'getNotificationById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<any>({
    defaultValues: {
      title: '',
      description: '',
      notificationSide: '',
      notificationType: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('notificationSide', data.notificationSide as any)
    formData.append('notificationType', String(data?.notificationType))
    formData.append('imageUrl', data.imageUrl as any)
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateNotification}/${id}`,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Notification not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createNotification,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Notification not created successfully')
        }
        methods.reset({ 
          title: '',
          description: '',
          notificationSide: '',
          notificationType: '',
         })
      }
      setOpen(false)
      setEdit!(false)
      refetch!()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (edit && data) {
      methods.reset({
        title: data.data.title,
        description: data.data.description,
        notificationSide: data.data.notificationSide,
        notificationType: data.data.notificationType,
        imageUrl: data.data.imageUrl,
      })
    } else {
      methods.reset({ 
        title: '',
         description: '',
         notificationSide: '',
         notificationType: '',
         })
    }
  }, [edit, data])

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-1 gap-x-2 gap-y-4'>
          <div>
            <RHFTextField name='title' placeholder='Enter your Title' />
          </div>
          <div>
            <RHFTextArea
              name='description'
              placeholder='Enter your description'
            />
          </div>
          <Label htmlFor="notificationSide">Notification Side</Label>
          <div>
            <SelectField name='notificationSide' 
            data={
              [
                { value: "1", label: 'Citizen' },
                { value: "0", label: 'management' },
              ]
            }
            />
          </div>
          <Label htmlFor="notificationType">Notification Type</Label>
          <div>
            <SelectField name='notificationType' 
            data={
              [
                { value: "0", label: 'Notification' },
                { value: "1", label: 'Recent News' },
              ]
            }
            />
          </div>
          <div >
            <RHFUploadFiled name='imageUrl' placeholder='Upload your Images' />
          </div>
          <Separator />
          <div>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type='submit'
              className='h-11 w-full rounded-xl'
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  )
}
