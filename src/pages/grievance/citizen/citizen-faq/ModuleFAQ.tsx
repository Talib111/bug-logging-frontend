import { Image } from "@/components/image"
import { CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { grievanceAPI } from "@/lib"
import { useApi } from "@/hooks/useCustomQuery"
import Profile from '/public/images/profile.png'
export default function ModuleFAQ({ children, setCurrentFaqType, setCurrentFaqTypeId }: any) {

    const moduleData = useApi<any>({
        api: `${grievanceAPI.getAllModuleDirect}?page=${1}&limit=${1000}`,
        key: 'getAllModule',
        options: {
            enabled: true,
        },
    })

    const [isModalOpen, setIsModalOpen] = useState<any>('')
   

    return (

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
        <DialogHeader></DialogHeader>
        <DialogContent className="w-full">
          <CardTitle className="mt-4 text-lg md:text-xl text-amber-600 cursor-pointer ">
            Select module to see FAQ
          </CardTitle>
          <div className="py-4">
            <div className="mt-4">
              {(moduleData?.data?.data?.length === 0 ||
                moduleData?.data?.data === null ||
                moduleData?.data?.data === undefined) ? (
                <div className="text-base md:text-lg font-semibold">! No Tools Found</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {moduleData?.data?.data?.map((item: any) => (
                    <button
                      key={item?.id}
                      onClick={() => {
                        setCurrentFaqType(item?.moduleName);
                        setCurrentFaqTypeId(item?._id);
                        setIsModalOpen(false);
                      }}
                    >
                      <div className="w-16 md:w-20 h-16 md:h-20 rounded-lg overflow-hidden border p-2 flex justify-center items-center shadow-lg">
                        <Image src={item?.fullImgUrl || Profile} className="w-auto" />
                      </div>
                      <div className="font-semibold text-xs md:text-sm">
                        {item?.moduleName}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogTrigger asChild>{children}</DialogTrigger>
      </Dialog>
      

    )
}
