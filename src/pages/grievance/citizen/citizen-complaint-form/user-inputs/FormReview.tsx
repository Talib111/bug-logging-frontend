import { Image } from '@/components/image'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'



export default function FormReview({ currentLanguage, complaintData, catptchaTextField,
  dataUrl,
  generateCaptcha,
  methods, }: any) {
  return (
    <div className='gap-x-2 gap-y-4 px-10 pt-2 pb-10'>
      <div>
        <CardTitle className='text-2xl mb-10 flex items-center font-bold'>{currentLanguage?.REIVEW_SUBMIT}</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col space-y-3">
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.ULB} : </CardTitle>

              <CardDescription>{complaintData?.ulbName}</CardDescription>
            </div>

            {/* COMPLAINT INFO */}
            <Separator />
            <CardTitle className='text-amber-500'>{currentLanguage?.GR_INFO}</CardTitle>

            <div className='flex flex-col space-y-1'>

              <CardTitle>{currentLanguage?.GR_TYPE} : </CardTitle>
              <CardDescription>{complaintData?.departmentName || 'N/A'}</CardDescription>
            </div>
            <div className='flex flex-col space-y-1'>
              <CardTitle>{currentLanguage?.GR_DESCRIPTION} : </CardTitle>
              <CardDescription>{complaintData?.complaintDescription || 'N/A'}</CardDescription>
            </div>

            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.GR_LOCATION} : </CardTitle>
              <CardDescription>{complaintData?.grievanceLocation || 'N/A'}</CardDescription>
            </div>

            <div className='flex flex-col space-y-1'>
              <CardTitle>{currentLanguage?.GR_DOCUMENT} : </CardTitle>
              {(complaintData?.complaintDocument?.type == 'image/png' || complaintData?.complaintDocument?.type == 'image/jpg' || complaintData?.complaintDocument?.type == 'image/jpeg') && <Image className='w-28' src={complaintData?.complaintDocumentUrl} />}
              {complaintData?.complaintDocument?.type == 'application/pdf' && <Image className='w-16 cursor-pointer hover:scale-105' src='/images/pdf.png' />}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <div className='flex items-center space-x-2'>
              <CardTitle>&nbsp;</CardTitle>
              <CardDescription>&nbsp;</CardDescription>
            </div>

            <Separator />
            <CardTitle className='text-amber-500'>{currentLanguage?.PERNSONAL_INFO}</CardTitle>

            {complaintData?.customAddress != '' &&
              <div className='flex items-center space-x-2'>
                <CardTitle>Address : </CardTitle>
                <CardDescription>{complaintData?.customAddress}</CardDescription>
              </div>}

            {complaintData?.fixedNoLabel && <div className='flex items-center space-x-2'>
              <CardTitle>{complaintData?.fixedNoLabel} : </CardTitle>
              <CardDescription>{complaintData?.fixedNo}</CardDescription>
            </div>}
            {complaintData?.tempNoLabel && <div className='flex items-center space-x-2'>
              <CardTitle>{complaintData?.tempNoLabel} : </CardTitle>
              <CardDescription>{complaintData?.tempNo}</CardDescription>
            </div>}
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.FULL_NAME} : </CardTitle>
              <CardDescription>{complaintData?.name || 'N/A'} </CardDescription>
            </div>
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.EMAIL} : </CardTitle>
              <CardDescription>{complaintData?.email || 'N/A'}</CardDescription>
            </div>
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.MOBILE_NO} : </CardTitle>
              <CardDescription>{complaintData?.mobileNo || 'N/A'}</CardDescription>
            </div>
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.WARD} : </CardTitle>
              <CardDescription>{complaintData?.wardNo || 'N/A'}</CardDescription>
            </div>
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.AREA} : </CardTitle>
              <CardDescription>{complaintData?.area || 'N/A'}</CardDescription>
            </div>

            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.HOLDING_NO}</CardTitle>
              <CardDescription>{complaintData?.holdingNo || 'N/A'}</CardDescription>
            </div>
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.SAF_NO} : </CardTitle>
              <CardDescription>{complaintData?.safNo || 'N/A'}</CardDescription>
            </div>
            <div className='flex items-center space-x-2'>
              <CardTitle>{currentLanguage?.CONSUMER_NO} : </CardTitle>
              <CardDescription>{complaintData?.consumerNo || 'N/A'}</CardDescription>
            </div>

          </div>
        </div>


        <div className='mt-16 flex flex-col flex-wrap gap-0  bg-center' >
          <div className='flex justify-between'>
            <div className='rounded-sm  px-4 py-1 bg-cover'style={{ backgroundImage: 'url("https://i.ibb.co/MGksJQp/image-11.png")' }}>
              <img src={dataUrl} alt='captcha' className='opacity-40 '/>
            </div>
            <div>
              <button
                type='button'
                onClick={generateCaptcha}
                className='text-sm text-[#5846BE]'
              >
                {currentLanguage?.RELOAD_CAPTCHA}
              </button>
            </div>
          </div>
        </div>


        {/* <div className='mt-16 flex flex-col flex-wrap gap-0'>
          <div className='flex justify-between'>
            <div className='rounded-sm bg-gray-400 px-4 py-1'>
              <img src={dataUrl} alt='captcha' />
            </div>
            <div>
              <button
                type='button'
                onClick={generateCaptcha}
                className='text-sm text-[#5846BE]'
              >
                {currentLanguage?.RELOAD_CAPTCHA}
              </button>
            </div>
          </div>
        </div> */}
        <div className='mt-2 flex flex-col flex-wrap gap-2'>
          {catptchaTextField()}
        </div>

      </div>

    </div>
  )
}
