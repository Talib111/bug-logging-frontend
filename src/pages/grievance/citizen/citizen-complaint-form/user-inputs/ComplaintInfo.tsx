// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
''
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ButtonLoading,
  FormProviders,
  RHFTextArea,
  RHFTextField,
  RHFUploadFiled,
  SelectField,
} from '@/components/forms'
import { CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'




export default function ComplaintInfo({currentLanguage, setformStep, setcomplaintData, complaintData }: any) {
  const schema = yup.object().shape({
    complaintDescription: yup.string().required(currentLanguage?.GR_MANDAT_MSG),
    problemTypeId: yup.string(),
    grievanceLocation: yup.string(),
    extraInfo: yup.string(),
    complaintDocument: yup.mixed().nullable(),
  })

  const [isExtraInfo, setisExtraInfo] = useState<any>(false)
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      complaintDescription: complaintData?.complaintDescription,
      grievanceLocation: complaintData?.grievanceLocation,
      problemTypeId: complaintData?.problemTypeId,
      departmentName: complaintData?.departmentName,
      complaintDocument: complaintData?.complaintDocument,
    }
  })

 


  const onSubmit = async (data: any) => {
    if (data?.complaintDescription?.length === 1) {
      toast.error('You have entered 1 character. Please provide a more detailed description.');
      return; // Stop the form submission if the description is too short
    }
    setcomplaintData({
      ...complaintData,
      complaintDescription: data?.complaintDescription,
      grievanceLocation: data?.grievanceLocation,
      problemTypeId: data?.problemTypeId,
      departmentName: data?.departmentName,
      complaintDocument: data?.complaintDocument,
      complaintDocumentUrl: data?.complaintDocument ? URL.createObjectURL(data?.complaintDocument) : ''
    })
    setformStep(3)
  }

  useEffect(() => {
    setisExtraInfo(methods?.watch('extraInfo'))
  }, [methods?.watch('extraInfo')])


  const problemTypeData = useApi<any>({
    api: `${grievanceAPI.getAllProblemDirect}?page=1&limit=10000`,
    key: 'getProblemData',
    options: {
      enabled: true,
      refetchOnMount: false,
    },
  })
  return (

    <FormProviders
      methods={methods}
      onSubmit={methods?.handleSubmit(onSubmit)}
    >
      <div className='gap-x-2 gap-y-4 px-10 py-4'>
        <div>
          <CardTitle className='text-2xl mb-4 flex items-center font-bold'>{currentLanguage?.GR_DETAILS}</CardTitle>


          <div className='flex flex-col space-y-2 gap-2'>
            {/* <div>
              <Label><span className='text-red-500'>*</span>Complaint Title</Label>
              <RHFTextField name='complaintTitle' placeholder='' />
            </div> */}

            <div>
              <Label><span className='text-red-500'>*</span>{currentLanguage?.GR_DESCRIPTION}</Label>
              <RHFTextArea
                className='bg-background w-full rounded-md p-4 h-40 border'
                name='complaintDescription'
                placeholder=''
              />
            </div>

            <div className='mt-6 flex items-center space-x-2'>
              <RHFTextField className='cursor-pointer h-5 w-5' type='checkbox' name='extraInfo' placeholder='' />
              <Label className='text-amber-600 opacity-80'>{currentLanguage?.GIVE_MORE_INFO}</Label>
            </div>

            {isExtraInfo && <>
              <div>
                <Label>{currentLanguage?.GR_LOCATION}</Label>
                <RHFTextField name='grievanceLocation' inputValidation={['CapitalFirstLetter', 'removeDoubleSpace']} placeholder='' />
              </div>

              <div>
                <Label>{currentLanguage?.GR_TYPE}</Label>
                <SelectField selectedText='departmentName' className='bg-background cursor-pointer' name='problemTypeId' data={

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
                <Label>{currentLanguage?.GR_DOCUMENT}<span className='text-xs opacity-80'>{currentLanguage?.GR_FORMAT}</span></Label>
                <RHFUploadFiled className='cursor-pointer' accept="image/jpeg,image/jpg,image/png,application/pdf" name='complaintDocument' placeholder='Select document' />
              </div>

            </>
            }


          </div>
        </div>

        <div className='mt-4'>
          <ButtonLoading
            isLoading={methods.formState.isSubmitting}
            type='submit'
            className=' w-full'
          >
            {currentLanguage?.NEXT}
          </ButtonLoading>
        </div>

      </div>


    </FormProviders>
  )
}
