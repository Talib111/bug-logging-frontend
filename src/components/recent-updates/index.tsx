import { useApi } from "@/hooks/useCustomQuery";
import { grievanceAPI } from "@/lib";
import { CheckCircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
  

} from "@/components/ui/dialog"
import { useState } from "react";
export default function TopBar({ notificationSide, notificationType }: any) {
    const [selectedNotification, setSelectedNotification] = useState<any>(null);
    const notification = useApi<any>({
        api: `${grievanceAPI.getUserNotification}?notificationSide=${notificationSide}&notificationType=${notificationType}`,
        key: "notificationRecentUpdates",
        options: {
            enabled: true
        }
    });

    return (
        <Dialog>
        <DialogHeader>
        </DialogHeader>
        <DialogContent className="sm:max-w-[500px]">
        <div>
  {selectedNotification && (
    <div>
      <div>
    <h3 className="font-semibold text-gray-900">{selectedNotification.title}</h3>
    <p className="text-gray-600 text-sm">{selectedNotification.description}</p>

    {/* Image or PDF Section */}
    {selectedNotification.fullImgUrl && (
    <div className="mt-4">
        {selectedNotification.fullImgUrl.endsWith('.pdf') ? (
            <div
                className="w-full border rounded overflow-hidden cursor-pointer"
                onClick={() => window.open(selectedNotification.fullImgUrl, '_blank')}
            >
                <iframe
                    src={selectedNotification.fullImgUrl}
                    className="w-full h-64 border rounded"
                    title="PDF Document"
                />
            </div>
        ) : (
            <div
            className="w-full h-40 border rounded overflow-hidden cursor-pointer"
            onClick={() => window.open(selectedNotification.fullImgUrl, '_blank')}
        >
            <img
                src={selectedNotification.fullImgUrl}
                alt="Notification Image"
                className="w-full h-full object-contain border rounded"
            />
        </div>
        )}
    </div>
)}
</div>
      
    </div>
  )}
</div>

        </DialogContent>
        <div className=" max-h-[95%] overflow-y-auto">
            {notification?.data?.data?.docs.map((item: any) => (
                <DialogTrigger
                key={item?.id} 
                asChild
                onClick={() => setSelectedNotification(item)}
                >
                    <div className="relative flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-2 cursor-pointer">
                        {/* <span className="bg-red-500 text-white absolute -top-1 left-0 text-xs px-2 rounded-full shadow-xl border border-white">Today</span> */}
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                        <div className="ml-3">
                            <p className="font-semibold text-gray-900 text-sm">{item?.title}</p>
                            <div className="w-60 overflow-hidden text-ellipsis whitespace-nowrap mb-2 text-xs">
                            {item?.description}
                            </div>
                            {/* <button className="mt-2 bg-blue-500 text-white text-sm py-1 px-2 rounded">View</button> */}
                            {/* <p className="text-gray-600 text-sm">{item?.description?.slice(0,68)+(item?.description?.length > 30 ? "..." : "")}</p>
                            {item?.description?.length > 30 && <div className=' text-right mt-1'><p className="text-sm mb-2"> more &gt;&gt;&gt; </p></div>} */}
                        </div>
                        <Badge className="text-xs absolute bottom-0 right-0" variant="outline">{moment(item?.createdAt).format('DD-MM-YYYY hh:mm a')}</Badge>
                    </div>
                </DialogTrigger>
            ))}
        </div>
    </Dialog>
    )
}

