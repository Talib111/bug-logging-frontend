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
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_COMPLAINT_SOURCE_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  source: yup.string().required('Grievance source name is required'),
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

export default function RoleForm({
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
  const { data, isFetching } = useApi<I_COMPLAINT_SOURCE_TYPE_VIEW>({
    api: `${grievanceAPI.getComplaintSourceById}/${id}`,
    key: 'getComplaintSourceById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { source: '' },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateComplaintSource}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Grievance Source not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createComplaintSource,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Grievance Source not created successfully')
        }
        methods.reset({ source: '' })
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
        source: data.data.source,
      })
    } else {
      methods.reset({ source: ''  })
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
            <RHFTextField name='source' placeholder='Enter Grievance Source ' />
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
