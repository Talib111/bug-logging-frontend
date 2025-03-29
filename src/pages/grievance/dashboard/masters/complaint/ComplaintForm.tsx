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
  RHFTextArea,SelectField
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_COMPLAINT_TYPE_VIEW } from './type'
import { I_MODULE_TYPE_LIST } from '../moduleMaster/type'

const schema = yup.object().shape({
  titleName: yup.string().required('Title Name is required'),
  description: yup.string().required('Description is required'),
  moduleId: yup.string().required('Module id is required')
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

export default function ComplaintForm({
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
  const { data, isFetching } = useApi<I_COMPLAINT_TYPE_VIEW>({
    api: `${grievanceAPI.getComplaintById}/${id}`,
    key: 'getComplaintById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { titleName: '', description: '',moduleId: "" },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateComplaint}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Grievance not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createComplaint,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Grievance not created successfully')
        }
        methods.reset({ titleName: '' })
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
        titleName: data.data.titleName,
        description: data.data.description,
        moduleId: data.data.moduleId,
      })
    } else {
      methods.reset({ titleName: '', description: '',moduleId: ""})
    }
  }, [edit, data])

  const getModuleData = useApi<I_MODULE_TYPE_LIST>({
    api:`${grievanceAPI?.getAllModule}?page=1&limit=10000`,
    key: 'getAllModuleList',
    options: {
      enabled: true,
    },
  })

  console.log(getModuleData.data)

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
            <RHFTextField name='titleName' placeholder='Enter your title name' />
          </div>
          <div>
            <SelectField name='moduleId' data={
              getModuleData.data?.data?.docs?.map((item)=>{
                return {
                  value: item._id,
                  label: item.moduleName,
                }
              }) ??[]
            }
            />
          </div>
          <div>
            <RHFTextArea
              name='description'
              placeholder='Enter your description'
            />
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
