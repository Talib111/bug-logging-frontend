import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { Star } from 'lucide-react'
import profile from '../../../../../public/images/profile.png'
import { useAppContext } from '@/context'

export default function CitizenTestimonials() {
  const { user } = useAppContext()
  const { currentLanguage }: any = useAppContext();  // Get the current language

  const grievanceData = useApi<any>({
    api: user?._id ? `${grievanceAPI.getCitizenFeedback}?userId=${user?._id}` : `${grievanceAPI.getCitizenFeedback}`,
    key: 'getCitizenFeedback',

    options: {
      enabled: true,
    },
  })

console.log(currentLanguage?.REVIEW_SD)
console.log(grievanceData?.data?.data?.docs.length)
  return (
    <section className="w-full">
      <div className="min-h-auto bg-white dark:bg-gray-900" />
      <div className="w-full px-4 py-10 md:px-16">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          {currentLanguage?.FARG} <br />
          <span className="text-[#0D7538]">{currentLanguage?.CO}</span>
        </h1>
       
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.isArray(grievanceData?.data?.data?.docs) && grievanceData?.data?.data?.docs.length > 0 ? (
  grievanceData.data.data.docs
    .filter((items: any) => items?.status === 1) // Filter items with status 1
    .map((items: any) => (
      <div className="w-full p-6 bg-white rounded-md shadow-lg dark:bg-gray-800" key={items?.citizenName || Math.random()}>
        <div className="flex flex-col sm:flex-row items-center mt-6">
          <img
            className="object-cover rounded-full w-14 h-14 mb-4 sm:mb-0 sm:mr-4"
            src={items?.imageUrl || profile}
            alt="Profile"
          />
          <div className="text-center sm:text-left">
            <h1 className="font-semibold text-gray-800 dark:text-white">{items?.citizenName || "Anonymous"}</h1>
            <div className="flex justify-center sm:justify-start space-x-1 mt-2">
              {[...Array(5)].map((_, index) => (
                <span key={index}>
                  <Star
                    size={24}
                    className={`inline cursor-pointer ${index < (items?.citizenRating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 leading-loose text-center sm:text-left">
          {items?.feedback}
        </p>
      </div>
    ))
) : (
  <p className="text-gray-500 dark:text-gray-400 text-center w-full col-span-4">
    {currentLanguage?.REVIEW_SD}
  </p>
)}

</div>

      </div>
    </section>
  )
}
