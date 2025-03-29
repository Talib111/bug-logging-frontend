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
  SelectField
} from '@/components/forms'
import { Separator } from '@/components/ui/separator'
import EditDialogBox from '@/components/edit-dialog-box'
import { useApi, usePostMutation, usePutMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { I_LOCATION_TYPE_VIEW } from './type'
import { I_ULB_TYPE_LIST } from '../ulbList/type'

const schema = yup.object().shape({
  latitude: yup.string().required('titleName Name is required'),
  longitude: yup.string().required('Longitude is required'),
  radius: yup.string().required('Radius is required'),
  ulbId: yup.string().required('Ulb id is required')
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

export default function LocationForm({
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
  const { data, isFetching } = useApi<I_LOCATION_TYPE_VIEW>({
    api: `${grievanceAPI.getLocationById}/${id}`,
    key: 'getLocationById',
    options: {
      enabled: edit,
    },
  })

  const methods = useForm<FormData>({
    defaultValues: { latitude: '', longitude: '',radius:'', ulbId: "" },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${grievanceAPI.updateLocation}/${id}`,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Location not updated successfully')
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: grievanceAPI.createLocation,
          data: data,
        })
        if (res.data?.success) {
          toast.success(res?.data?.message)
        } else {
          toast.error('Location not created successfully')
        }
        methods.reset({ 
          latitude: '' ,
          longitude: '' ,
          radius: '' ,
          ulbId: '' ,
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
        latitude: data.data.latitude,
        longitude: data.data.longitude,
        radius: data.data.radius,
        ulbId: data.data.ulbId,
      })
    } else {
      methods.reset({ latitude: '', longitude: '',radius: "", ulbId: '' })
    }
  }, [edit, data])

  const ulbData = useApi<I_ULB_TYPE_LIST>({
    api: `${grievanceAPI.getAllUlb}?page=${1}&limit=${1000}`,
    key: 'getAllUlb',
    
    options: {
      enabled: true,
    },
  })

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
            <SelectField name='ulbId' data={
              ulbData.data?.data?.docs?.map((item)=>{
                return {
                  value: item._id,
                  label: item.ulbName,
                }
              }) ??[]
            }
            />
          </div>
          <div>
            <RHFTextField name='latitude' placeholder='Enter latitude' />
          </div>
          <div>
            <RHFTextField name='longitude' placeholder='Enter longitude' />
          </div>
          <div>
            <RHFTextField name='radius' placeholder='Enter radius' />
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
