;('')
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
import { CloudCog } from 'lucide-react'

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
  const complaintId = query.get('complaintId')

  console.log(newRole, 'newRole')

  const schema = yup.object().shape({
    ulbId: yup.string().required('ULB  is required'),
    moduleId: yup.string(),
    citizenName: yup.string(),
    mobileNo: yup.string(),
    email: yup.string(),
    complaintTypeId: yup.string(),
    priorityId: yup.string(),
    targetTypeId: yup.string(),
    complaintTitle: yup.string(),
    complaintDescription: yup
      .string()
      .required('complaint description is required'),
    complaintDocument: yup.mixed().nullable(),
    tempNo: yup.string(),
    fixedNo: yup.string(),
    isTransactionIssue: yup.string(),
    transactionNo: yup.string(),
    extraInfo: yup.string(),
    extraBasicInfo: yup.string(),
  })

  const { data, refetch } = useApi<any>({
    api: `${grievanceAPI?.getComplaintDetailsById}/${complaintId}`,
    key: 'getApplicationDetails',
    options: {
      enabled: !!complaintId,
    },
  })

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      ulbId:
        user?.roleId === SUPER_ADMIN ||
        user?.roleId === STATE_ADMIN ||
        user?.roleId === STATE_GRO ||
        user?.roleId === STATE_JSK_IVR_CALLING
          ? ''
          : user?.userUlbId,
      moduleName: '',
    },
  })

  const onSubmit = async (data: any) => {
    console.log(data.mobileNo, '234')
    console.log(newRole, '234')

    if ((newRole === 'Telecaller' || newRole === 'State Jsk/Ivr/Calling') && !data.mobileNo) {
      return toast.error('Please add a mobile number before proceeding.');
    }
    
   
    try {
      const formData = new FormData()
      formData.append('citizenName', data?.citizenName || '')
      formData.append('email', data?.email || '')
      formData.append('mobileNo', data?.mobileNo || '')
      formData.append('complaintTitle', data?.complaintTitle || '')
      formData.append('complaintDescription', data?.complaintDescription)
      formData.append('ulbName', data?.ulbName)
      if (data?.moduleId) {
        formData.append('moduleId', data?.moduleId)
      }
      formData.append('ulbId', data?.ulbId)
      formData.append('imageUrl', data?.complaintDocument)
      if (data?.tempNo !== '' && data?.tempNo !== undefined) {
        formData.append('tempNo', data?.tempNo)
      }
      if (data?.fixedNo !== '' && data?.fixedNo !== undefined) {
        formData.append('fixedNo', data?.fixedNo)
      }
      if (data?.tempNoLabel !== '' && data?.tempNoLabel !== undefined) {
        formData.append('tempNoLabel', data?.tempNoLabel)
      }
      if (data?.fixedNoLabel !== '' && data?.fixedNoLabel !== undefined) {
        formData.append('fixedNoLabel', data?.fixedNoLabel)
      }
      if (data?.complaintTypeId)
        formData.append('complaintTypeId', data?.complaintTypeId)
      if (data?.priorityId) formData.append('priorityId', data?.priorityId)
      if (data?.targetTypeId)
        formData.append('targetTypeId', data?.targetTypeId)
      formData.append('isCitizen', '2')
      formData.append('moduleName', data?.moduleName || '')
      // formData.append('problemTypeId', data?.problemTypeId || '')

      if (complaintData?.problemTypeId !== '' && complaintData?.problemTypeId !== undefined) {
        formData.append('problemTypeId', complaintData?.problemTypeId)
      }
      formData.append('wardNo', data?.wardNo || '')
      formData.append('area', data?.area || '')
      formData.append('latitude', data?.latitude || '')
      formData.append('longitude', data?.longitude || '')
      formData.append('holdingNo', data?.holdingNo || '')
      formData.append('safNo', data?.safNo || '')
      formData.append('consumerNo', data?.consumerNo || '')
      formData.append('grievanceLocation', data?.grievanceLocation || '')

      let url: any = grievanceAPI.createComplaintApplication
      if (complaintId) {
        formData.append('id', complaintId)
        url = grievanceAPI.updateComplaintApplication
      }
      const res = await postMutation.mutateAsync({
        api: url,
        data: formData,
      })
      if (res.data?.success) {
        toast.success(res?.data?.message)
        if (complaintId) {
          refetch()
          return navigate(`/grievance/dashboard/workflow-details?complaintId=${complaintId}`)
        }
        navigate(`/grievance/dashboard/management-complaint-success?complaintRefNo=${res?.data?.data?.complaintRefNo}&complaintId=${res?.data?.data?._id}`)
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

  useEffect(() => {
    if (complaintId && data) {
      methods.reset({
        ulbId: data?.data?.ulbId || '',
        moduleId: data?.data?.moduleId || '',
        fixedNo: data?.data?.fixedNo || '',
        tempNo: data?.data?.tempNo || '',
        citizenName: data?.data?.citizenName || '',
        mobileNo: data?.data?.mobileNo || '',
        email: data?.data?.email || '',
        complaintTypeId: data?.data?.complaintTypeId || '',
        priorityId: data?.data?.priorityId || '',
        targetTypeId: data?.data?.targetTypeId || '',
        complaintTitle: data?.data?.complaintTitle || '',
        complaintDescription: data?.data?.complaintDescription || '',
        problemTypeId: data?.data?.problemTypeId || '',
        wardNo: data?.data?.wardNo || '',
        area: data?.data?.area || '',
        holdingNo: data?.data?.holdingNo || '',
        safNo: data?.data?.safNo || '',
        consumerNo: data?.data?.consumerNo || '',
        grievanceLocation: data?.data?.grievanceLocation || '',
      })
    } else {
      methods.reset({ ulbId: '' })
      methods.reset({ moduleId: '' })
      methods.reset({ citizenName: '' })
      methods.reset({ mobileNo: '' })
      methods.reset({ email: '' })
      methods.reset({ complaintTypeId: '' })
      methods.reset({ priorityId: '' })
      methods.reset({ targetTypeId: '' })
      methods.reset({ complaintTitle: '' })
      methods.reset({ complaintDescription: '' })
      methods.reset({ problemTypeId: '' })
      methods.reset({ wardNo: '' })
      methods.reset({ area: '' })
      methods.reset({ holdingNo: '' })
      methods.reset({ safNo: '' })
      methods.reset({ consumerNo: '' })
      methods.reset({ grievanceLocation: '' })
    }
  }, [complaintId, data])

  const getUlbData = useApi<any>({
    api: `${grievanceAPI?.getAllUlbDirect}?page=1&limit=10000`,
    key: 'getAllUlb',
    options: {
      enabled: true,
    },
  })

  const getModuleData = useApi<any>({
    api: `${grievanceAPI?.getAllModule}?page=1&limit=10000`,
    key: 'geAllModules',
    options: {
      enabled: true,
    },
  })

  const getComplaintTypeData = useApi<any>({
    api: `${grievanceAPI?.getAllComplaintType}?page=1&limit=10000`,
    key: 'getAllComplaintTypes',
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

  const getTargetTypeData = useApi<any>({
    api: `${grievanceAPI?.getAllTarget}?page=1&limit=10000`,
    key: 'getAllTargetTypes',
    options: {
      enabled: true,
    },
  })

  const problemTypeData = useApi<any>({
    api: `${grievanceAPI.getAllProblemDirect}?page=1&limit=10000`,
    key: 'getProblemData',
    options: {
      enabled: true,
      refetchOnMount: false,
    },
  })

  const wardList = [
    { wardNo: '1' },
    { wardNo: '2' },
    { wardNo: '3' },
    { wardNo: '4' },
    { wardNo: '5' },
    { wardNo: '6' },
    { wardNo: '7' },
    { wardNo: '8' },
    { wardNo: '9' },
    { wardNo: '10' },
    { wardNo: '11' },
    { wardNo: '12' },
    { wardNo: '13' },
    { wardNo: '14' },
    { wardNo: '15' },
    { wardNo: '16' },
    { wardNo: '17' },
    { wardNo: '18' },
    { wardNo: '19' },
    { wardNo: '20' },
    { wardNo: '21' },
    { wardNo: '22' },
    { wardNo: '23' },
    { wardNo: '24' },
    { wardNo: '25' },
    { wardNo: '26' },
    { wardNo: '27' },
    { wardNo: '28' },
    { wardNo: '29' },
    { wardNo: '30' },
    { wardNo: '31' },
    { wardNo: '32' },
    { wardNo: '33' },
    { wardNo: '34' },
    { wardNo: '35' },
    { wardNo: '36' },
    { wardNo: '37' },
    { wardNo: '38' },
    { wardNo: '39' },
    { wardNo: '40' },
    { wardNo: '41' },
    { wardNo: '42' },
    { wardNo: '43' },
    { wardNo: '44' },
    { wardNo: '45' },
    { wardNo: '46' },
    { wardNo: '47' },
    { wardNo: '48' },
    { wardNo: '49' },
    { wardNo: '50' },
  ]

  useEffect(() => {
    if (methods.watch('moduleId')) {
      // const [selectedData] = getModuleData.data?.data?.docs?.filter((item: any) => {
      const selectedData = getModuleData.data?.data?.docs?.find((item: any) => {
        return item?._id === methods?.watch('moduleId')
      })

      setfixedNoLabel(selectedData?.fixedNoLabel)
      settempNoLabel(selectedData?.tempNoLabel)
    }
  }, [methods.watch('moduleId')])

  useEffect(() => {
    setisExtraInfo(methods.watch('extraInfo'))
  }, [methods.watch('extraInfo')])
  useEffect(() => {
    setisExtraBasicInfo(methods.watch('extraBasicInfo'))
  }, [methods.watch('extraBasicInfo')])

  useEffect(() => {
    setisTransactionIssue(methods.watch('isTransactionIssue'))
  }, [methods.watch('isTransactionIssue')])

  useEffect(() => {
    setNewRole(user?.role)
  }, [])

  return (
    <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className='grid grid-cols-4 gap-x-2 gap-y-4 bg-background p-10'>
        <div
          className={`${
            (user?.roleId === ULB_ADMIN ||
              user?.roleId === ULB_GRO ||
              user?.roleId === JSK_IVR_CALLING ||
              user?.roleId === NORMAL) &&
            'hidden'
          }`}
        >
          <Label htmlFor='ulbId'>
            <span className='text-red-500'>*</span>ULB
          </Label>
          <div className="">

  <SelectField
    className="cursor-pointer bg-background"
    name="ulbId"
    disabled={user?.roleId === TELE_CALLER} 
    data={
      Array.isArray(getUlbData?.data?.data) && getUlbData?.data?.data?.length !== 0
        ? getUlbData?.data?.data?.map((item: any) => ({
            value: item._id,
            label: item.ulbName,
          }))
        : []
    }
  />
</div>

        </div>

        <div className='col-span-4'></div>

        {/* ═══════════════════════║ COMPLAINT INFO  ║════════════════════════════// */}
        <h1 className='text-xl font-bold uppercase text-blue-800'>
          Grievance Info
        </h1>
        <Separator className='col-span-4' />

        <div className='col-span-3'>
          <Label htmlFor='complaintDescription'>
            <span className='text-red-500'>*</span>Grievance Description
          </Label>
          <RHFTextArea
            className='h-20 w-full rounded-md border bg-background p-4'
            name='complaintDescription'
            placeholder='write Grievance'
          />
        </div>

        <div className='col-span-4'></div>

        <div className='flex items-center space-x-2'>
          <RHFTextField
            className='h-5 w-5 cursor-pointer'
            type='checkbox'
            name='extraInfo'
            placeholder=''
          />
          <Label className='text-amber-600 opacity-80'>
            Give More Information
          </Label>
        </div>

        <div className='col-span-4'></div>

        {isExtraInfo && (
          <>
            <div>
              <Label>Grievance Location</Label>
              <RHFTextField
                name='grievanceLocation'
                inputValidation={[
                  'CapitalFirstLetter',
                  'removeDoubleSpace',
                  'string',
                ]}
                placeholder=''
              />
            </div>

            <div>
              <Label>Grievance Type</Label>
              <SelectField
                selectedText='problem'
                className='cursor-pointer bg-background'
                name='problemTypeId'
                data={
                  problemTypeData.data?.data?.docs?.map((item: any) => {
                    return {
                      value: item?._id,
                      label: item?.problem,
                    }
                  }) ?? []
                }
              />
            </div>
            <div>
              <Label htmlFor='moduleId'>Module</Label>
              <SelectField
                selectedText='moduleName'
                className='cursor-pointer bg-background'
                name='moduleId'
                data={
                  getModuleData.data?.data?.docs?.map((item: any) => {
                    return {
                      value: item?._id,
                      label: item?.moduleName,
                    }
                  }) ?? []
                }
              />
            </div>

            {fixedNoLabel && (
              <div>
                <Label>
                  {fixedNoLabel}
                  <span className='text-xs opacity-80'></span>
                </Label>
                <RHFTextField name='fixedNo' placeholder='' />
              </div>
            )}
            {tempNoLabel && (
              <div>
                <Label>
                  {tempNoLabel}
                  <span className='text-xs opacity-80'></span>
                </Label>
                <RHFTextField name='tempNo' placeholder='' />
              </div>
            )}

            <div>
              <Label htmlFor='complaintTypeId'>Grievance Type</Label>
              <SelectField
                className='cursor-pointer bg-background'
                name='complaintTypeId'
                data={
                  getComplaintTypeData?.data?.data?.docs?.map((item: any) => {
                    return {
                      value: item?._id,
                      label: item?.complaintTypeName,
                    }
                  }) ?? []
                }
              />
            </div>
            <div>
              <Label htmlFor='priorityId'>Priority</Label>
              <SelectField
                className='cursor-pointer bg-background'
                name='priorityId'
                data={
                  getPriorityData?.data?.data?.docs?.map((item: any) => {
                    return {
                      value: item?._id,
                      label: item?.priorityName,
                    }
                  }) ?? []
                }
              />
            </div>
            <div>
              <Label htmlFor='targetTypeId'>Target Type</Label>
              <SelectField
                className='cursor-pointer bg-background'
                name='targetTypeId'
                data={
                  getTargetTypeData?.data?.data?.docs?.map((item: any) => {
                    return {
                      value: item._id,
                      label: item?.targetType,
                    }
                  }) ?? []
                }
              />
            </div>

            <div className='col-span-2 flex'>
              <div>
                <Label>
                  Grievance Document
                  <span className='text-xs opacity-80'>
                    (acceptable formats are jpg, jpeg, png, pdf)
                  </span>
                </Label>
                <RHFUploadFiled
                  className='cursor-pointer'
                  accept='image/jpeg,image/jpg,image/png,application/pdf'
                  name='complaintDocument'
                  placeholder='Select document'
                />
              </div>
              <div className=''>
                {(methods.watch('complaintDocument')?.type == 'image/png' ||
                  methods.watch('complaintDocument')?.type == 'image/jpg' ||
                  methods.watch('complaintDocument')?.type == 'image/jpeg') && (
                  <Image
                    className='w-28'
                    src={URL.createObjectURL(
                      methods.watch('complaintDocument')
                    )}
                  />
                )}
                {methods.watch('complaintDocument')?.type ==
                  'application/pdf' && (
                  <Image
                    className='w-16 cursor-pointer hover:scale-105'
                    src='/images/pdf.png'
                  />
                )}
              </div>
            </div>
          </>
        )}

        <div className='col-span-4'></div>

        {/* ═══════════════════════║ BASIC INFO  ║════════════════════════════// */}
        <h1 className='text-xl font-bold uppercase text-blue-800'>
          Basic Info
        </h1>
        <Separator className='col-span-4' />

        <div>
          <Label htmlFor='citizenName'>Citizen Name</Label>
          <RHFTextField
            className='bg-background'
            name='citizenName'
            inputValidation={[
              'CapitalFirstLetter',
              'removeDoubleSpace',
              'string',
            ]}
            placeholder=''
          />
        </div>

        <div>
          <Label>
          {(newRole === 'Telecaller' || newRole === 'State Jsk/Ivr/Calling') && <span className='text-red-500'>*</span>} Mobile No.
        </Label>
          <RHFTextField
            name='mobileNo'
            inputValidation={['mobile', 'number']}
            placeholder=''
          />
        </div>

        <div className='col-span-4'></div>

        <div className='flex items-center space-x-2'>
          <RHFTextField
            className='h-5 w-5 cursor-pointer'
            type='checkbox'
            name='extraBasicInfo'
            placeholder=''
          />
          <Label className='text-amber-600 opacity-80'>
            Give More Information
          </Label>
        </div>

        <div className='col-span-4'></div>

        {isExtraBasicInfo && (
          <>
            <div>
              <Label>Email</Label>
              <RHFTextField
                inputValidation={['email']}
                name='email'
                placeholder=''
              />
            </div>

            <div>
              <Label>Ward</Label>
              <SelectField
                selectedText='ward'
                className='cursor-pointer bg-background'
                name='wardNo'
                data={
                  wardList?.map((item: any) => {
                    return {
                      value: item?.wardNo,
                      label: item?.wardNo,
                    }
                  }) ?? []
                }
              />
            </div>
            <div>
              <Label>Area</Label>
              <RHFTextField
                name='area'
                inputValidation={['CapitalFirstLetter', 'removeDoubleSpace']}
                placeholder=''
              />
            </div>
            <div>
              <Label>Holding No.</Label>
              <RHFTextField name='holdingNo' maxLength={20} placeholder='' />
            </div>
            <div>
              <Label>Saf No.</Label>
              <RHFTextField name='safNo' maxLength={20} placeholder='' />
            </div>
            <div>
              <Label>Consumer No.</Label>
              <RHFTextField name='consumerNo' maxLength={20} placeholder='' />
            </div>
          </>
        )}

        <div className='col-span-4'></div>

        {/* ═══════════════════════║ FINANCIAL INFO  ║════════════════════════════// */}
        <h1 className='text-xl font-bold uppercase text-blue-800'>
          Financial Info
        </h1>
        <Separator className='col-span-4' />

        <div className='col-span-2  flex items-center space-x-2'>
          <RHFTextField
            className='h-5 w-5 cursor-pointer'
            type='checkbox'
            name='isTransactionIssue'
            placeholder=''
          />
          <Label className='text-amber-600 opacity-80'>
            Is issue related with financial transaction
          </Label>
        </div>

        <div className='col-span-4'></div>
        {isTransactionIssue && (
          <div>
            <Label>Transaction No.</Label>
            <RHFTextField name='transactionNo' placeholder='' />
          </div>
        )}
        <div className='col-span-4'></div>

        <div className='col-span-4'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className=' float-right w-auto rounded-xl px-10'
          >
            {complaintId ? 'Update' : 'Submit'}
          </ButtonLoading>
        </div>
      </div>
    </FormProviders>
  )
}
