; ('')
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  SelectField,
  RHFTextArea,
  RHFUploadFiled,
} from '@/components/forms'
import { useApi, usePostMutation } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Label } from '@/components/ui/label'
import { useLocation, useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { Image } from '@/components/image'
import {
  SUPER_ADMIN,
  STATE_ADMIN,
  STATE_GRO,
  STATE_JSK_IVR_CALLING,
  ULB_ADMIN,
  ULB_GRO,
  JSK_IVR_CALLING,
  NORMAL,
  TELE_CALLER,
} from '@/../config/roles.config'
import { useAppContext } from '@/context'
import { Bug, ServerCrash } from 'lucide-react'

export default function CitizenComplaintForm() {
  const [isTransactionIssue, setisTransactionIssue] = useState<boolean>(false)
  const [tempNoLabel, settempNoLabel] = useState<string>('')
  const [fixedNoLabel, setfixedNoLabel] = useState<string>('')
  const [complaintData, setcomplaintData] = useState<any>({})
  const [newRole, setNewRole] = useState<any>('')
  const [isExtraInfo, setisExtraInfo] = useState<boolean>(false)
  const [isExtraBasicInfo, setisExtraBasicInfo] = useState<boolean>(false)
  const { user } = useAppContext()
  const postMutation = usePostMutation({})
  const navigate = useNavigate()

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const bugId = query.get('bugId')

  console.log(newRole, 'newRole')

  const schema = yup.object().shape({
    platformId: yup.string().required('Platform is required'),
    bugTitle: yup.string().required('Bug title is required'),
    bugDescription: yup.string().required('Bug description is required'),
    bugDocument: yup.mixed().nullable(),
  })

  const { data, refetch } = useApi<any>({
    api: `${grievanceAPI?.getComplaintDetailsById}/${bugId}`,
    key: 'getApplicationDetails',
    options: {
      enabled: !!bugId,
    },
  })

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      platformId: '',
      bugTitle: '',
      bugDescription: '',
    },
  })

  const onSubmit = async (data: any) => {

    try {
      const formData = new FormData()
      formData.append('platformId', data?.platformId || '')
      formData.append('bugTitle', data?.bugTitle || '')
      formData.append('bugDescription', data?.bugDescription || '')
      formData.append('imageUrl', data?.bugDocument)

      let url: any = grievanceAPI.createComplaintApplication
      if (bugId) {
        formData.append('id', bugId)
        url = grievanceAPI.updateComplaintApplication
      }
      const res = await postMutation.mutateAsync({
        api: url,
        data: formData,
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
      } else {
        toast.error('Grievance not created successfully')
      }
     
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (bugId && data) {
      methods.reset({
        platformId: data?.data?.platformId || '',
        bugTitle: data?.data?.bugTitle || '',
        bugDescription: data?.data?.bugDescription || '',
      })
    } else {
      methods.reset({ platformId: '' })
      methods.reset({ bugTitle: '' })
      methods.reset({ bugDescription: '' })
    }
  }, [bugId, data])

  const getPlatformData = useApi<any>({
    api: `${grievanceAPI?.getAllComplaintSource}?page=1&limit=10000`,
    key: 'getAllPlatformData',
    options: {
      enabled: true,
    },
  })


  useEffect(() => {
    setNewRole(user?.role)
  }, [])

  return (
    <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className='grid grid-cols-4 gap-x-2 gap-y-4 bg-background p-10'>
        <h1 className='text-xl font-bold uppercase text-blue-800 flex items-center gap-2'>
        <ServerCrash /> Bug Entry
        </h1>
        <Separator className='col-span-4' />


        <div className='col-span-4'></div>

        <div>
          <Label>Platform</Label>
          <SelectField
            selectedText='problem'
            className='cursor-pointer bg-background'
            name='platformId'
            data={
              getPlatformData?.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.source,
                }
              }) ?? []
            }
          />
        </div>

        <div>
          <Label>Bug Title</Label>
          <RHFTextField
            name='bugTitle'
            inputValidation={[
              'CapitalFirstLetter',
              'removeDoubleSpace',
              'string',
            ]}
            placeholder=''
          />
        </div>


        <div className='col-span-3'>
          <Label htmlFor='bugDescription'>
            <span className='text-red-500'>*</span>Bug Description</Label>
          <RHFTextArea
            className='h-20 w-full rounded-md border bg-background p-4'
            name='complaintDescription'
            placeholder='write Grievance'
          />
        </div>


        <div className='col-span-2 flex'>
          <div>
            <Label>
              Bug Document
              <span className='text-xs opacity-80'>
                (acceptable formats are jpg, jpeg, png, pdf)
              </span>
            </Label>
            <RHFUploadFiled
              className='cursor-pointer'
              accept='image/jpeg,image/jpg,image/png,application/pdf'
              name='bugDocument'
              placeholder='Select document'
            />
          </div>
          <div className=''>
            {(methods.watch('bugDocument')?.type == 'image/png' ||
              methods.watch('bugDocument')?.type == 'image/jpg' ||
              methods.watch('bugDocument')?.type == 'image/jpeg') && (
                <Image
                  className='w-28'
                  src={URL.createObjectURL(
                    methods.watch('bugDocument')
                  )}
                />
              )}
            {methods.watch('bugDocument')?.type ==
              'application/pdf' && (
                <Image
                  className='w-16 cursor-pointer hover:scale-105'
                  src='/images/pdf.png'
                />
              )}
          </div>
        </div>

        <div className='col-span-4'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className=' float-right w-auto rounded-xl px-10'
          >
            {bugId ? 'Update' : 'Submit'}
          </ButtonLoading>
        </div>
      </div>
    </FormProviders>
  )
}
