import { CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context";

export default function AboutComplaintRegistration() {
    const { currentLanguage } :any= useAppContext();
  

  return (

    <div className=''>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-xl font-bold text-blue-800 mb-6 uppercase">{currentLanguage?.GRS}</h1>
          <CardTitle className="text-gray-600 mb-2">
            Step 1
          </CardTitle>
          <div className='border-b mt-1 border-[#99B37C]'></div>
          <p className="text-gray-800 mt-2">
            {currentLanguage?.FTGRF}
          </p>

          <section className="mt-8">
            <CardTitle className="text-gray-600 mb-2">

              {currentLanguage?.S2}
            </CardTitle>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <p className="text-gray-800 mt-2">
              {currentLanguage?.CSTSA}
            </p>
          </section>

          <section className="mt-8">
            <CardTitle className="text-gray-600 mb-2">
            {currentLanguage?.S3}

            </CardTitle>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <p className="text-gray-800 mt-2">
            {currentLanguage?.YCETYRCVCNPATOCS}

            </p>
          </section>

          <section className="mt-8">
            <CardTitle className="text-gray-600 mb-2">
            {currentLanguage?.S4}

            </CardTitle>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <p className="text-gray-800 mt-2">
            {currentLanguage?.YCRYCINSWTS}

            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-amber-600">            {currentLanguage?.YCRYCINSWTS1}
            </h2>
            <h2 className="text-xl font-semibold text-blue-800 mt-8">            {currentLanguage?.YCETYRCVCNPATOCS}
            </h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <h1>{currentLanguage?.ULB1}</h1>
              <p>
                {currentLanguage?.LB_GB}
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.SE}</h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <p>
               {currentLanguage?.S_M}
              </p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.FN}, {currentLanguage?.MN}, {currentLanguage?.E}</h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <p>
              {currentLanguage?.TBAIOPTWIRC}
              </p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.GT}</h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <p>
               {currentLanguage?.TITC}
              </p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.GD}</h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <p>
               {currentLanguage?.TIDTGC}
              </p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.GDOC}</h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <p>
               {currentLanguage?.TIDRWC}
              </p>
            </div>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-blue-800">{currentLanguage?.SBL} - <span className="text-red-500">*</span></h2>
            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className='space-y-2 mt-2'>
              <p>
               {currentLanguage?.AFMW}
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
