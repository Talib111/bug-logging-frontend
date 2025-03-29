;('')
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import EditDialogBox from '@/components/edit-dialog-box'
import { usePostMutation } from '@/hooks/useCustomQuery'
import toast from 'react-hot-toast'
import {
  ButtonLoading,
  FormProviders,
  RHFTextField,
  SelectField,
} from '@/components/forms'
import { CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { grievanceAPI } from '@/lib'
import { useAppContext } from '@/context'

const schema = yup.object().shape({
  name: yup.string(),
  mobileNo: yup.string(),
  email: yup.string(),
  wardNo: yup.string(),
  area: yup.string(),
  holdingNo: yup.string(),
  safNo: yup.string(),
  consumerNo: yup.string(),
  extraInfo: yup.string(),
})

export default function BasicInfo({
  currentLanguage,
  setformStep,
  setcomplaintData,
  complaintData,
}: any) {
  const { languageKey }: any = useAppContext()
  const [isExtraInfo, setisExtraInfo] = useState<any>(false)
  const verifyOtpMutation = usePostMutation({})
  const [openOtpModal, setOpenOtpModal] = useState(false)
  const [closeModal, setCloseModal] = useState(false)
  const [otp, setOtp] = useState('')
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: complaintData?.name,
      mobileNo: complaintData?.mobileNo,
      email: complaintData?.email,
      wardNo: complaintData?.wardNo,
      problemTypeId: complaintData?.problemTypeId,
      departmentName: complaintData?.departmentName,
      area: complaintData?.area,
      holdingNo: complaintData?.holdingNo,
      safNo: complaintData?.safNo,
      consumerNo: complaintData?.consumerNo,
    },
  })

  const onSubmit = async (data: any) => {
    setcomplaintData({
      ...complaintData,
      name: data.name,
      mobileNo: data.mobileNo,
      email: data.email,
      wardNo: data.wardNo,
      area: data.area,
      problemTypeId: data?.problemTypeId,
      departmentName: data?.departmentName,
      holdingNo: data.holdingNo,
      safNo: data.safNo,
      consumerNo: data.consumerNo,
    })
    setformStep(4)
  }

  console.log(closeModal)

  useEffect(() => {
    console.log('the is form data...', complaintData)
  }, [complaintData])

  // Handle OTP verification
  const verifyOtp = async () => {
    try {
      const response = await verifyOtpMutation.mutateAsync({
        api: grievanceAPI.verifyEmailOtp,
        data: { otp, email: methods.watch('email') },
      })

      if (response?.data?.success) {
        toast.success(response?.data?.message)
        setOpenOtpModal(false)
        setformStep(4)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error: any) {
      // toast.error(getErrorMessage(error.message));
    }
  }

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
    setisExtraInfo(methods?.watch('extraInfo'))
  }, [methods?.watch('extraInfo')])

  console.log(languageKey, 'languageKey===============>>')

  return (
    <>
      {/* OTP Verification Modal */}
      <EditDialogBox
        open={openOtpModal}
        setOpen={setOpenOtpModal}
        title='OTP Send to your Registered Email '
        setEdit={setCloseModal}
      >
        <div style={{ zIndex: 100000 }} className='p-6'>
          <h2 className='mb-4 text-lg font-bold'>Enter OTP</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type='text'
              placeholder='Enter OTP'
              className='input-field w-full rounded-md border border-gray-300 p-2'
            />
            <div>
              <ButtonLoading
                type='button'
                onClick={verifyOtp}
                className='mt-2 w-full rounded-xl px-4 py-6 shadow-none'
                variant='outline'
              >
                Verify OTP
              </ButtonLoading>
            </div>
          </form>
        </div>
      </EditDialogBox>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='gap-x-2 gap-y-4 px-10 py-10'>
          <div className=''>
            <div className='mb-10'>
              <CardTitle className='flex  items-center text-2xl font-bold'>
                {currentLanguage?.BASIC_INFO}
              </CardTitle>
              <div className='font-serif text-sm text-amber-500'>
                {currentLanguage?.OPITONAL_TEXT}
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              <div>
                <Label>{currentLanguage?.FULL_NAME}</Label>
                {languageKey === 'hindi' ? (
                  <RHFTextField
                    name='name'
                     placeholder=''
                  />
                ) : (
                  <RHFTextField
                    name='name'
                    inputValidation={[
                      'CapitalFirstLetter',
                      'removeDoubleSpace',
                      'string',
                    ]}
                    placeholder=''
                  />
                )}
              </div>
              <div>
                <Label>{currentLanguage?.MOBILE_NO}</Label>
                <RHFTextField
                  name='mobileNo'
                  inputValidation={['mobile', 'number']}
                  placeholder=''
                />
              </div>

              <div className='mt-6 flex items-center space-x-2'>
                <RHFTextField
                  className='h-5 w-5 cursor-pointer'
                  type='checkbox'
                  name='extraInfo'
                  placeholder=''
                />
                <Label className='text-amber-600 opacity-80'>
                  {currentLanguage?.GIVE_MORE_INFO}
                </Label>
              </div>

              {isExtraInfo && (
                <>
                  <div>
                    <Label>{currentLanguage?.EMAIL}</Label>
                    <RHFTextField
                      inputValidation={['email']}
                      name='email'
                      placeholder=''
                    />
                  </div>

                  <div>
                    <Label>{currentLanguage?.WARD}</Label>
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
                    <Label>{currentLanguage?.AREA}</Label>
                    <RHFTextField
                      name='area'
                      inputValidation={[
                        'CapitalFirstLetter',
                        'removeDoubleSpace',
                      ]}
                      placeholder=''
                    />
                  </div>
                  <div>
                    <Label>{currentLanguage?.HOLDING_NO}</Label>
                    <RHFTextField
                      name='holdingNo'
                      maxLength={20}
                      placeholder=''
                    />
                  </div>
                  <div>
                    <Label>{currentLanguage?.SAF_NO}</Label>
                    <RHFTextField name='safNo' maxLength={20} placeholder='' />
                  </div>
                  <div>
                    <Label>{currentLanguage?.CONSUMER_NO}</Label>
                    <RHFTextField
                      name='consumerNo'
                      maxLength={20}
                      placeholder=''
                    />
                  </div>
                </>
              )}
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
    </>
  )
}
