import { CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormStepper from '@/components/form-stepper'
import UlbForm from "./user-inputs/UlbForm"
import BasicInfo from "./user-inputs/BasicInfo"
import ComplaintInfo from "./user-inputs/ComplaintInfo"
import FormReview from "./user-inputs/FormReview"
import FormSubmitSuccess from "./user-inputs/FormSubmitSuccess"
import { ButtonLoading, FormProviders } from "@/components/forms"
import { Button } from "@/components/ui/button"
import { ChevronsLeft, X } from "lucide-react"
import { usePostMutation } from "@/hooks/useCustomQuery"
import { grievanceAPI } from "@/lib"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { useAppContext } from "@/context"
import checkJson from "@/components/animation-files/check.json";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import UseCaptchaVerify from "@/hooks/useCaptcha"
import FormInfo from "./user-inputs/FormInfo"
import { Badge } from "@/components/ui/badge"
import MyLanguage from "./user-inputs/language"

export default function CitizenComplaintForm({ children, complaintTypesFor, complaintFor }: any) {
  const [loggedOutAnimation, setloggedOutAnimation] = useState<boolean>(false)
  const [formStep, setformStep] = useState<number>(0)
  const [complaintData, setcomplaintData] = useState<any>({})
  const [formResponse, setformResponse] = useState<any>({})
  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false);
  // const [currentLanguage, setcurrentLanguage] = useState<any>(MyLanguage('hindi'));
  const [languageKey, setlanguageKey] = useState<any>('hindi');
  const postMutation = usePostMutation({})
  const { isAuthenticated ,currentLanguage}:any = useAppContext()

  console.log(complaintFor)
  const { catptchaTextField, dataUrl, generateCaptcha, verifyCaptcha } =
    UseCaptchaVerify(currentLanguage?.ENTER_CAPTCHA)

  const methods = useForm<any>({
    resolver: yupResolver(
      yup.object().shape({
        captchaName: yup.string().required(currentLanguage?.CAPTCHA_MANDAT),
      })
    ),
    defaultValues: {
      captchaName: '',
    },
  })

  const onSubmit = async (data: any) => {
    const isCaptchaVerified = verifyCaptcha(data.captchaName, methods.reset)
    if (isCaptchaVerified) {
      submitComplaint()
    } else {
      toast.error('Captcha verification failed')
    }
  }
// console.log("Captcha====>",complaintData);

  const submitComplaint = async () => {

    try {

      const formData = new FormData()
      formData.append('citizenName', complaintData?.name || '')
      formData.append('email', complaintData?.email || '')
      formData.append('mobileNo', complaintData?.mobileNo || '')
      formData.append('complaintTitle', complaintData?.complaintTitle || '')
      formData.append('complaintDescription', complaintData?.complaintDescription)
      formData.append('moduleName', complaintData?.moduleName || '')
      formData.append('ulbName', complaintData?.ulbName || '')
      if (complaintData?.module) {
        formData.append('moduleId', complaintData?.module)
      }
      formData.append('ulbId', complaintData?.ulb || '')
      formData.append('customAddress', complaintData?.customAddress || '')
      formData.append('complaintTypeId', complaintTypesFor != undefined ? complaintTypesFor : '')
      formData.append('imageUrl', complaintData?.complaintDocument)
      if (complaintData?.tempNo !== '' && complaintData?.tempNo !== undefined) {
        formData.append('tempNo', complaintData?.tempNo)
      }
      if (complaintData?.fixedNo !== '' && complaintData?.fixedNo !== undefined) {
        formData.append('fixedNo', complaintData?.fixedNo)
      }
      if (complaintData?.tempNoLabel !== '' && complaintData?.tempNoLabel !== undefined) {
        formData.append('tempNoLabel', complaintData?.tempNoLabel)
      }
      if (complaintData?.fixedNoLabel !== '' && complaintData?.fixedNoLabel !== undefined) {
        formData.append('fixedNoLabel', complaintData?.fixedNoLabel)
      }
      formData.append('isTransactionIssue', complaintData?.isTransactionIssue || false)
      formData.append('transactionNo', complaintData?.transactionNo)
      formData.append('isCitizen', '1')
      // ADDED FIELDS
      if (complaintData?.problemTypeId !== '' && complaintData?.problemTypeId !== undefined) {
        formData.append('problemTypeId', complaintData?.problemTypeId)
      }
     
      formData.append('wardNo', complaintData?.wardNo || '')
      formData.append('area', complaintData?.area || '')
      formData.append('latitude', complaintData?.latitude || '')
      formData.append('longitude', complaintData?.longitude || '')
      formData.append('holdingNo', complaintData?.holdingNo || '')
      formData.append('safNo', complaintData?.safNo || '')
      formData.append('consumerNo', complaintData?.consumerNo || '')
      formData.append('grievanceLocation', complaintData?.grievanceLocation || '')


      let url = ''
      if (isAuthenticated) {
        url = grievanceAPI.createComplaintApplication
      } else {
        url = grievanceAPI.createComplaintApplicationDirect
      }

      const res = await postMutation.mutateAsync({
        api: url,
        data: formData,
      })
      if (res.data?.success) {
        setloggedOutAnimation(true)
        setformResponse(res?.data?.data)
        setcomplaintData({})
        setformStep(5)
      } else {
        toast.error('Grievance not created successfully')
      }

    } catch (error) {
      console.log(error)
    }
  };

  // ════════════════════════════║  THIS FUNCTION CHANGES THE LANGUAGE  ║═════════════════════════════════//
  const changeLanauge = (language: string) => {
    const lang = MyLanguage(language)
    console.log("changeLanauge", lang);
    
    // setcurrentLanguage(lang)
    setlanguageKey(language)
  }

  useEffect(() => {
    setTimeout(() => {
      setloggedOutAnimation(false)
    }, 1600);

  }, [loggedOutAnimation])

  return (
    <Dialog open={isDialogOpen}>
      <DialogHeader>
      </DialogHeader>
      <DialogContent className="w-full md:min-w-[600px] sm:max-w-[850px] max-h-[650px] overflow-auto">
        <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>{currentLanguage?.GRIEVANCE_REGISTRATION}<Link to={`/bug-log/citizen/complaint-registration-info`} target='_blank'><span className='text-amber-600 underline cursor-pointer'>{currentLanguage?.KNOW_HOW_IT_WORKS}</span> </Link> <span><X className="cursor-pointer hover:bg-red-100 rounded-lg inline" onClick={() => setisDialogOpen(false)} /></span></CardTitle>

        {/* ═══════════════════════║Language Buttons ║══════════════════════════ */}
        {/* <div className="flex gap-2">
          <div><Badge className="cursor-pointer" onClick={() => { changeLanauge('hindi') }} variant={languageKey === 'hindi' ? 'default' : 'secondary'}>Hindi</Badge></div>
          <div><Badge className="cursor-pointer" onClick={() => { changeLanauge('english') }} variant={languageKey === 'english' ? 'default' : 'secondary'}>English</Badge></div>
        </div> */}
        {/* ═══════════════════════║LOGGED OUT ANIMATION ║══════════════════════════ */}
        {loggedOutAnimation && <div style={{ zIndex: 1001 }} className="w-full h-full fixed top-0 left-0 bg-white z-50 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Lottie className="w-24" animationData={checkJson} loop={true} />
            <div className="font-semibold">{currentLanguage?.GR_SUBMITTED_SUCCESSFULLY}</div>
          </div>
        </div>}
        <div className="py-4">
          {formStep < 5 && formStep > 0 && <FormStepper status={formStep - 1} />}

          {/**{formStep === 1 && <UlbForm setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
          {formStep === 2 && <ModuleForm setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
          {formStep === 3 && <BasicInfo setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
          {formStep === 4 && <ComplaintInfo setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}**/}

          {formStep === 0 && <FormInfo currentLanguage={currentLanguage} setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
          {formStep === 1 && <UlbForm currentLanguage={currentLanguage} setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
          {formStep === 2 && <ComplaintInfo currentLanguage={currentLanguage} setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
          {/* {formStep === 2 && <ModuleForm setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />} */}
          {formStep === 3 && <BasicInfo currentLanguage={currentLanguage} setcomplaintData={setcomplaintData} complaintData={complaintData} setformStep={setformStep} />}
          <FormProviders
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {formStep === 4 && <FormReview currentLanguage={currentLanguage} complaintData={complaintData} setformStep={setformStep}
              catptchaTextField={catptchaTextField}
              dataUrl={dataUrl}
              generateCaptcha={generateCaptcha}
              methods={methods}
            />}
            {formStep === 5 && <FormSubmitSuccess currentLanguage={currentLanguage} formResponse={formResponse} />}

            {formStep === 4 && <div className='px-10 mb-5'>

              <ButtonLoading isLoading={postMutation.isPending} type="submit" className='w-full flex justify-center items-center'>
                <span className='text-xs'>{currentLanguage?.SUBMIT}</span>
              </ButtonLoading>
            </div>}
          </FormProviders>
          {(formStep < 5 && formStep > 1) && <div className='px-10'>
            <Button onClick={() => setformStep(formStep - 1)} variant={'outline'} className='w-full flex justify-center items-center'>
              <ChevronsLeft size={20} className='inline mr-2' /> <span className='text-xs'>{currentLanguage?.GO_BACK}</span>
            </Button>
          </div>}
        </div>
      </DialogContent>

      <DialogTrigger onClick={() => {
        setisDialogOpen(true)
        // setformStep(1)
        setformStep(0)
      }} asChild>
        {children}
      </DialogTrigger>

    </Dialog>
  )
}
