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
import { I_ULB_TYPE_VIEW } from './type'

const schema = yup.object().shape({
  ulbName: yup.string().required('Ulb name is required'),
  email: yup.string(),
  phonenumber: yup.string(),
  whatsappnumber: yup.string(),
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

export default function UlbForm({
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
  const { data, isFetching } = useApi<I_ULB_TYPE_VIEW>({
    api: `${grievanceAPI.getUlbById}/${id}`,
    key: 'getUlbById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { 
      ulbName: '',
      email: '',
      phonenumber: '',
      whatsappnumber: '',
    
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateUlb}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Ulb not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createUlb,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Ulb not created successfully')
        }
        methods.reset({ 
          ulbName: '',
      email: '',
      phonenumber: '' ,
      whatsappnumber: '' ,

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
        ulbName: data.data.ulbName,
        email: data.data.email,
        phonenumber: data.data.phonenumber,
        whatsappnumber: data.data.whatsappnumber,
      })
    } else {
      methods.reset({ 
        ulbName: '',
        email: '',
        phonenumber: '',
        whatsappnumber: '',
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
            <RHFTextField name='ulbName' placeholder='Enter Ulb name' />
          </div>
          <div>
            <RHFTextField name='phonenumber' placeholder='Enter Phone no' />
          </div>
          <div>
            <RHFTextField name='whatsappnumber' placeholder='Enter whatsApp no' />
          </div>
          <div>
            <RHFTextField name='email' placeholder='Enter Email' />
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
