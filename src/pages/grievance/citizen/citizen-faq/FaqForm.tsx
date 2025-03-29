''
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextField,
  SelectField
} from '@/components/forms'
import { useApi, usePostMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  complaintTitle: yup.string().required('ulb is required'),
  complaintDescription: yup.string().required('Module  is required'),
  moduleId: yup.string().required('Module  is required'),
  ulbId: yup.string().required('Module  is required'),
  priorityId: yup.string().required('Module  is required'),
  targetTypeId: yup.string().required('Module  is required'),
})


export default function FaqForm() {
  const postMutation = usePostMutation({})
  const navigate = useNavigate()

  const methods = useForm<any>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    try {

      const res = await postMutation.mutateAsync({
        api: grievanceAPI.createComplaintApplication,
        data: {
          complaintTitle: data.complaintTitle,
          complaintDescription: data.complaintDescription,
          moduleId: data.moduleId,
          ulbId: data.ulbId,
          priorityId: data.priorityId,
          targetTypeId: data.targetTypeId,
        },
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        navigate(`/grievance/citizen/complaint-success?complaintRefNo=${res?.data?.data?.complaintRefNo}`)
      } else {
        toast.error('Grievance not created successfully')
      }
      methods.reset({
        ulbId: '',
        moduleId: '',
      })
    } catch (error) {
      console.log(error)
    }
  }


  const getUlbData = useApi<any>({
    api: `${grievanceAPI?.getAllUlb}?page=1&limit=10000`,
    key: 'getAllUlb',
    options: {
      enabled: true,
    },
  })


  return (

    <FormProviders
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className='space-y-4'>
      <div>
          <Label htmlFor="complaintTitle">Grievance Title</Label>
          <RHFTextField className='bg-background' name='complaintTitle' placeholder='' />
        </div>

        <div>
          <Label htmlFor="complaintDescription">Grievance Description</Label>
          <RHFTextField className='bg-background' name='complaintDescription' placeholder='' />
        </div>

        <div>
          <Label htmlFor="moduleId">Module Id</Label>
          <SelectField className='bg-background' name='moduleId' data={
            getUlbData.data?.data?.docs?.map((item: any) => {
              return {
                value: item._id,
                label: item.ulbName,
              }
            }) ?? []
          }
          />
        </div>

        <div className='col-span-3'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className=' w-auto rounded-md px-10 float-right'
          >
            Search
          </ButtonLoading>
        </div>

      </div>


    </FormProviders>
  )
}
