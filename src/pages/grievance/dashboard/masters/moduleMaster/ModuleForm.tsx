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
  RHFUploadFiled,
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_MODULE_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  moduleName: yup.string().required('Module Name is required'),
  uniqueString: yup.string().required('Enter unique label for the module'),
  fixedNoLabel: yup.string().nullable(),
  tempNoLabel: yup.string().nullable(),
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

export default function ModuleForm({
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
  const { data, isFetching } = useApi<I_MODULE_TYPE_VIEW>({
    api: `${grievanceAPI.getModuleById}/${id}`,
    key: 'getModuleById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { moduleName: '', },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const formData = new FormData()
    formData.append('moduleName', data.moduleName)
    formData.append('fixedNoLabel', data.fixedNoLabel || '')
    formData.append('tempNoLabel', data.tempNoLabel || '')

    formData.append('imageUrl', data.imageUrl as any)
    try {
      if (edit && data) {
        formData.append('uniqueString', data.uniqueString)
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateModule}/${id}`,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Module not updated successfully')
        }
      } else {
        formData.append('uniqueString', data.uniqueString)
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createModule,
          data: formData,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Module not created successfully')
        }
        methods.reset({ moduleName: '' })
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
        moduleName: data.data.moduleName,
        uniqueString: data.data.uniqueString,
        fixedNoLabel: data.data.fixedNoLabel,
        tempNoLabel: data.data.tempNoLabel,
        imageUrl: data.data.imageUrl,
      })
    } else {
      methods.reset({ moduleName: '', })
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
            <RHFTextField name='moduleName' placeholder='Enter your module name' />
          </div>
          <div>
            <RHFTextField name='uniqueString' placeholder='Enter unique string' />
          </div>
          <div>
            <RHFTextField name='fixedNoLabel' placeholder='Enter fixed no. label' />
          </div>
          <div>
            <RHFTextField name='tempNoLabel' placeholder='Enter temp no. label' />
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
