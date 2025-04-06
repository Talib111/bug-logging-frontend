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
import { useAppContext } from '@/context'
import { ServerCrash } from 'lucide-react'
import { SUPER_ADMIN } from '@/../config/roles.config'
import { I_ROLE_TYPE_LIST } from './type'
import { Avatar, AvatarImage } from '@/components/ui/avatar'


export default function CitizenComplaintForm() {
  const [newRole, setNewRole] = useState<any>('')
  const { user } = useAppContext()
  const postMutation = usePostMutation({})
  const navigate = useNavigate()

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const bugId = query.get('bugId')


  const schema = yup.object().shape({
    logType: yup.string().required('Type is required'),
    priority: yup.string(),
    tat: yup.string(),
    projectId: yup.string(),
    platformId: yup.string().required('Platform is required'),
    bugTitle: yup.string().required('Bug title is required'),
    bugDescription: yup.string().required('Bug description is required'),
    bugDocument: yup.mixed().nullable(),
  })

  const { data } = useApi<any>({
    api: `${grievanceAPI?.getComplaintDetailsById}/${bugId}`,
    key: 'getApplicationDetails',
    options: {
      enabled: !!bugId,
    },
  })

  const getPlatformData = useApi<any>({
    api: `${grievanceAPI?.getAllComplaintSource}?page=1&limit=10000`,
    key: 'getAllPlatformData',
    options: {
      enabled: true,
    },
  })

  const getPriorityData = useApi<any>({
    api: `${grievanceAPI?.getAllPriority}?page=1&limit=10000`,
    key: 'getAllPriority',
    options: {
      enabled: true,
    },
  })

  const projectData = useApi<I_ROLE_TYPE_LIST>({
    api: `${grievanceAPI.getAllProject}?page=1&limit=100`,
    key: 'getAllProjectsWithoutLimit',
    value: [],
    options: {
      enabled: true,
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
      formData.append('logType', data?.logType || '')
      if (data.priority) {
        formData.append('priority', data?.priority || '')
      }
      formData.append('passedProjectId', data?.projectId || '')
      formData.append('tat', data?.tat || '')
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
        if (user?.roleId === SUPER_ADMIN) {
          navigate('/bug-log/dashboard/home')
        } else {
          navigate('/bug-log/dashboard/client-home')
        }
      } else {
        toast.error('Bug not created!')
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (bugId && data) {
      methods.reset({
        logType: data?.data?.logType || '',
        priority: data?.data?.priority || '',
        tat: data?.data?.tat || '',
        projectId: data?.data?.projectId || '',
        platformId: data?.data?.platformId || '',
        bugTitle: data?.data?.bugTitle || '',
        bugDescription: data?.data?.bugDescription || '',
      })
    } else {
      methods.reset({ logType: '' })
      methods.reset({ priority: '' })
      methods.reset({ tat: '' })
      methods.reset({ projectId: '' })
      methods.reset({ platformId: '' })
      methods.reset({ bugTitle: '' })
      methods.reset({ bugDescription: '' })
    }
  }, [bugId, data])




  useEffect(() => {
    setNewRole(user?.role)
  }, [])

  return (
    <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className='grid grid-cols-4 gap-x-2 gap-y-4 bg-background p-10'>
        <h1 className='text-xl font-bold uppercase text-blue-800 flex items-center gap-2'>
          <Avatar  className='h-12 w-12 border-2 p-2 bg-amber-400 shadow-lg border-white cursor-pointer flex flex-col hover:border-primary'>
            <AvatarImage className='rounded-full' src={'/images/bug.png'} alt='profile' />
          </Avatar> Bug Entry
        </h1>
        <Separator className='col-span-4' />


        {user?.roleId === SUPER_ADMIN && <>
          <div>
            <Label>Project</Label>
            <SelectField
              selectedText='problem'
              className='cursor-pointer bg-background'
              name='projectId'
              data={
                projectData?.data?.data?.docs?.map((item: any) => {
                  return {
                    value: item?._id,
                    label: item?.projectName,
                  }
                }) ?? []
              }
            />
          </div>
        </>}

        <div className='col-span-4'></div>
        <div>
          <Label><span className='text-red-500'>*</span> Type</Label>
          <SelectField
            selectedText='problem'
            className='cursor-pointer bg-background'
            name='logType'
            data={[
              { value: 'BUG', label: 'Bug' },
              { value: 'ENHANCEMENT', label: 'Enahancement' },
            ]
            }
          />
        </div>

        <div>
          <Label><span className='text-red-500'>*</span> Platform</Label>
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

        {user?.roleId === SUPER_ADMIN && <div>
          <Label>Priority</Label>
          <SelectField
            selectedText='problem'
            className='cursor-pointer bg-background'
            name='priority'
            data={
              getPriorityData?.data?.data?.docs?.map((item: any) => {
                return {
                  value: item?._id,
                  label: item?.priorityName,
                }
              }) ?? []
            }
          />
        </div>}

        {user?.roleId === SUPER_ADMIN && <div>
          <Label>TAT</Label>
          <RHFTextField
            name='tat'
            inputValidation={[
              'number',
            ]}
            placeholder=''
          />
        </div>}

        <div className="col-span-4"></div>
        <div>
          <Label><span className='text-red-500'>*</span> Bug Title</Label>
          <RHFTextField
            maxLength={300}
            name='bugTitle'
            inputValidation={[
              'CapitalFirstLetter',
              'removeDoubleSpace',
              'string',
            ]}
            placeholder=''
          />
        </div>

        <div className="col-span-4"></div>
        <div className='col-span-3'>
          <Label htmlFor='bugDescription'>
            <span className='text-red-500'>*</span> Bug Description</Label>
          <RHFTextArea
            maxLength={2000}
            className='h-20 w-full rounded-md border bg-background p-4'
            name='bugDescription'
            placeholder='write Bug'
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
