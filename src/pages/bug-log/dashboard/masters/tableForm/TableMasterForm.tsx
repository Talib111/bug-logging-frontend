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
  SelectField,
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_TABLE_FORM_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  formType: yup.string().required('form Type is required'),
  elementKey: yup.string().required('Element Key is required'),
  elementLabel: yup.string().required('Element Label is required'),
  isEnable: yup.boolean().required('Is Enable is required'),
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

export default function TableMasterForm({
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
  const { data, isFetching } = useApi<I_TABLE_FORM_TYPE_VIEW>({
    api: `${grievanceAPI.getTableFormById}/${id}`,
    key: 'getTableFormById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { formType: '', elementKey: '', elementLabel: '', isEnable: false },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateTableForm}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Table Form is not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createTableForm,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Table Form is not created successfully')
        }
        methods.reset({ formType: '', elementKey: '', elementLabel: '', isEnable: false })
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
        formType: data.data.formType,
        elementKey: data.data.elementKey,
        elementLabel: data.data.elementLabel,
        isEnable: data.data.isEnable,
      })
    } else {
      methods.reset({ formType: '' })
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
            <RHFTextField name='formType' placeholder='Enter form Type' />
          </div>
          <div>
            {
              edit ? (
                <RHFTextField value={
                  methods.watch('elementKey')
                } placeholder='Enter Element Key'
                />
              ) : (
                <RHFTextField name='elementKey' placeholder='Enter Element Key'
                />
              )
            }

          </div>
          <div>
            <RHFTextField name='elementLabel' placeholder='Enter Element Label' />
          </div>
          <div>
            <SelectField
              name='isEnable'
              data={
                [
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' },
                ]
              }
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
