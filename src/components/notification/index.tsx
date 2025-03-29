import { useApi } from "@/hooks/useCustomQuery";
import { grievanceAPI } from "@/lib";
import { BellRing } from "lucide-react"
import moment from "moment";
import { Badge } from "@/components/ui/badge";
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
        api: `${grievanceAPI.getUserNotificationAuth}?notificationSide=${notificationSide}&notificationType=${notificationType}`,
        key: "myNotificationsAuth",
        options: {
            enabled: true
        }
    });

    return (
        <Dialog>
            <DialogHeader>
            </DialogHeader>
            <DialogContent className="sm:max-w-[500px]">
                {/* <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>Complaint Registration </CardTitle> */}
                <div >
                    {selectedNotification && (
                        <div>
                            <h3 className="font-semibold  text-lg text-amber-500"><BellRing className="inline mr-2" />{selectedNotification?.title}</h3>
                            <p className="text-gray-600">{selectedNotification?.description}</p>
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
                            <BellRing className="h-6 w-6 text-amber-500" />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-900 ">{item?.title}</p>
                                <div className="w-60 overflow-hidden text-ellipsis whitespace-nowrap mb-2">
                                    {item?.description}
                                </div>
                            </div>
                            <Badge className="text-xs absolute bottom-0 right-0" variant="outline">{moment(item?.createdAt).format('DD-MM-YYYY hh:mm a')}</Badge>
                        </div>
                    </DialogTrigger>
                ))}
            </div>
        </Dialog>
    )
}

