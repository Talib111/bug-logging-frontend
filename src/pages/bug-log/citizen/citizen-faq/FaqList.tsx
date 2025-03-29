import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useApi } from "@/hooks/useCustomQuery"
import { grievanceAPI } from "@/lib"
import { Image } from "@/components/image"
import ModuleFAQ from "./ModuleFAQ"
import { useState } from "react"
import { useAppContext } from "@/context"

export default function FaqList() {
  const { currentLanguage } :any= useAppContext();

  const [currentFaqType, setCurrentFaqType] = useState<any>(null)
  const [currentFaqTypeId, setCurrentFaqTypeId] = useState<any>('')
  const complaintData = useApi<any>({
    api: `${grievanceAPI.getAllComplaintByIdDirect}?page=${1}&limit=${1000}&moduleId=${currentFaqTypeId}`,
    key: 'getAllComplaintByIdDirect',
    value: [currentFaqTypeId],
    options: {
      enabled: true,
    },
  })

  return (
    <div className=''>
      <div className="min-h-screen bg-gray-100 p-1 sm:p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between">
            <div> <h1 className="text-xl font-bold text-blue-800 mb-6 uppercase">{currentFaqType !== null && `| ${currentFaqType}`} {currentLanguage?.FAQ}</h1></div>
            <div><ModuleFAQ
              setCurrentFaqType={setCurrentFaqType}
              setCurrentFaqTypeId={setCurrentFaqTypeId}
            >
              <h1 className="text-xl font-bold text-amber-600 mb-6 uppercase cursor-pointer hover:underline">{currentLanguage?.SEE_MORE}</h1>
            </ModuleFAQ ></div>
          </div>
          <p className="text-gray-600 mb-2">
            {currentLanguage?.LAST_UPDATED}
          </p>
          <div className='border-b mt-1 border-[#99B37C]'></div>
          <Accordion type="single" collapsible className="w-full bg-white py-10">
            {complaintData?.data?.data?.docs?.length > 0 ? (
              complaintData.data.data.docs.map((items: any, index: any) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>
                    <div className="flex space-x-4">
                      <div>{index + 1}</div>
                      <Image className="w-6" src="/images/profile.png" alt="profile" />
                      <div className="text-lg">{items.titleName}</div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10">{items.description}</AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center text-gray-500">No data found!</div>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
