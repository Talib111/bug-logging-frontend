import { useAppContext } from "@/context";

export default function PrivacyPolicy() {
    const { currentLanguage } :any= useAppContext();
  

  return (

    <div className=''>
      <div className="min-h-screen bg-gray-100 p-1 sm:p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-xl font-bold text-blue-800 mb-6 uppercase">{currentLanguage?.TOU_JS}</h1>
          <p className="text-gray-600 mb-2">
            {currentLanguage?.LU_DATE}
          </p>
          <div className='border-b mt-1 border-[#99B37C]'></div>
          <p className="text-gray-800 mt-2">
            {currentLanguage?.TOU_DESC}
          </p>
          <p className="text-gray-800">
            {currentLanguage?.TOU_AGREE}
          </p>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.SVC_GUIDELINES}</h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <p className="text-gray-800 mt-2">
              {currentLanguage?.IP_PROTECTION}
            </p>
            {/* Add more sections similarly */}
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.CNTNT}</h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <h1>{currentLanguage?.JMC_CGRS}</h1>
              <p>
                {currentLanguage?.JMC_CGRS_DESC}
              </p>
              <p>
               {currentLanguage?.JMC_CGRS_AUTOMATE}
              </p>
              <p>
               {currentLanguage?.JMC_CGRS_RESOLVE}
              </p>
              <p>
               {currentLanguage?.JMC_CGRS_POLICY}
              </p>
            </div>
            <div className='space-y-2'>
              <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.YOUR_CNTNT}</h1>
              <div className='border-b mt-1 border-[#99B37C]'></div>
              <p>
                {currentLanguage?.YCCOJMC}
              </p>

              <h1 className='text-xl font-semibold text-blue-800' >{currentLanguage?.PRIVACY}</h1>
              <div className='border-b mt-1 border-[#99B37C]'></div>
              <p>
                {currentLanguage?.PRIVACY_POLICY_DESC}
              </p>

              <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.SECURITY}</h1>
              <div className='border-b mt-1 border-[#99B37C]'></div>
              <p>
                {currentLanguage?.SECURITY_DESC} <a href="mailto:gzb.nagar.nigam@gmail.com">{currentLanguage?.SECURITY_EMAIL}</a>.
              </p>

              <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.ELIGIBILITY}</h1>
              <div className='border-b mt-1 border-[#99B37C]'></div>
              <p>
                {currentLanguage?.ELIGIBILITY_DESC}
              </p>

              <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.COPYRIGHT}</h1>
              <div className='border-b mt-1 border-[#99B37C]'></div>
              <p>
              {currentLanguage?.COPYRIGHT_DESC} <a href="mailto:smartranchi02@gmail.com"> {currentLanguage?.COPY_EMAIL}</a> {currentLanguage?.COPYRIGHT_DESC2}
              </p>

              <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.CHANGES_TO_SERVICE}</h1>
              <div className='border-b mt-1 border-[#99B37C]'></div>
              <p>
                {currentLanguage?.CHANGES_TO_SERVICE_DESC}
              </p>
              <div className='space-y-2'>
                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.DISCLAIMERS}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                 {currentLanguage?.DISCLAIMERS_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.LIMITATION_OF_LIABILITY}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                 {currentLanguage?.LIMITATION_OF_LIABILITY_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.ARBITRATION}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.ARBITRATION_DESC} <a href="mailto:smartranchi02@gmail.com">{currentLanguage?.COPY_EMAIL}</a> {currentLanguage?.ARBITRATION_DESC2}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.JURISDICTION}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
               {currentLanguage?.JURISDICTION_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.ENTIRE_AGREEMENT}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.JURISDICTION_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.MODIFICATION}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.MODIFICATION_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.CONTACT}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.CONTACT_DESC}t <a href="mailto:smartranchi02@gmail.com">{currentLanguage?.COPY_EMAIL}</a>.
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.PRIVACY}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
{currentLanguage?.PRIVACY_POLICY_DESC1}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.THE_INFORMATION_WE_COLLECT}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                 {currentLanguage?.USER_ACCOUNT_INFORMATION}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.HOW_WE_USE_AND_DISCLOSE_INFORMATION1}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                 {currentLanguage?.HOW_WE_USE_AND_DISCLOSE_INFORMATION}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.LIMITED_PERMISSION_TO_COPY}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                 {currentLanguage?.LIMITED_PERMISSION_TO_ACCESS}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.WEB_STORAGE_AND_TRACKING_POLICY}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.WEB_STORAGE_AND_TRACKING_POLICY_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.DATA_SAFETY}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.DATA_SAFETY_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.USAGE_OF_PERSONAL_DATA}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                 {currentLanguage?.PURPOSE_OF_STORING_PERSONAL_DATA}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.PAYMENT_REFUND_POLICY}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.PAYMENT_REFUND_POLICY_DESC}
                </p>

                <h1 className='text-xl font-semibold text-blue-800'>{currentLanguage?.PAYMENT_CANCELLATION_POLICY_1}</h1>
                <div className='border-b mt-1 border-[#99B37C]'></div>
                <p>
                  {currentLanguage?.PAYMENT_CANCELLATION_POLICY}
                </p>
              </div>
            </div>

            {/* Add more sections similarly */}
          </section>

          {/* Add other sections such as Privacy, Security, etc. */}
        </div>
      </div>
    </div>
  )
}
