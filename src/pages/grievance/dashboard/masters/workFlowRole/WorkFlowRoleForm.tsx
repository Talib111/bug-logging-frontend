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
import { I_WORK_FLOW_ROLE_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  workFlowRoleName: yup.string().required('Work Flow Role Name is required'),
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

export default function WorkFlowRoleForm({
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
  const { data, isFetching } = useApi<I_WORK_FLOW_ROLE_TYPE_VIEW>({
    api: `${grievanceAPI.getWorkFlowRoleById}/${id}`,
    key: 'getWorkFlowRoleById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { workFlowRoleName: ''},
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateWorkFlowRole}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Work Flow Role not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createWorkFlowRole,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('work Flow Role Name not created successfully')
        }
        methods.reset({ workFlowRoleName: '' })
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
        workFlowRoleName: data.data.workFlowRoleName,
      })
    } else {
      methods.reset({ workFlowRoleName: '' })
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
            <RHFTextField name='workFlowRoleName' placeholder='Enter Work Flow Role  Name' />
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
