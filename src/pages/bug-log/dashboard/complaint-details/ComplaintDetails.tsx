import { useApi } from "@/hooks/useCustomQuery";
import { grievanceAPI } from "@/lib";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { MoveRight, FileText, X } from "lucide-react";
import { Image } from "@/components/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import ReopenComplaintComponent from "./ReopenComplaintComponent";
import profile from '/images/profile.png'
import {
  MODULE_OTHERS,
} from '@/../config/module.config'
import { DialogClose } from "@radix-ui/react-dialog";
import { Key } from "react";

export default function ComplaintDetails() {

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const complaintRefNo = query.get('complaintRefNo')
  const complaintId = query.get('complaintId')

  const complaintData = useApi<any>({
    api: `${grievanceAPI.getComplaintDetailsByComplaintNo}/${complaintRefNo}`,
    key: "ComplaintDetails",
    options: {
      enabled: true
    }
  });

  const complaintLogData = useApi<any>({
    api: `${grievanceAPI.complaintApplicationLog}/${complaintId}`,
    key: "complaintApplicationLog",
    options: {
      enabled: true
    }
  });


  return (
    <div className=''>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto bg-background shadow-lg rounded-lg p-8">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-blue-800 mb-6 uppercase">Grievance No : {complaintData?.data?.data?.complaintRefNo}</h1>
            {complaintData?.data?.data?.workflow?.workFlowName && <h1 className="text- font-bold  mb-6 Capitalize"><span className="opacity-60">Current Stage : </span>{complaintData?.data?.data?.workflow?.workFlowName} Workflow</h1>}
            {!complaintData?.data?.data?.workflow?.workFlowName && <h1 className="text- font-bold  mb-6 Capitalize"><span className="opacity-60">Current Stage : </span>
              {complaintData?.data?.data?.currentUser && `${complaintData?.data?.data?.currentUser?.fullName} `}
              {complaintData?.data?.data?.currentWorkflow && `(${complaintData?.data?.data?.currentWorkflow?.workFlowName})`}
              {!complaintData?.data?.data?.currentWorkflow && !complaintData?.data?.data?.currentUser && complaintData?.data?.data?.moduleId === MODULE_OTHERS && 'State GRO'}
              {!complaintData?.data?.data?.currentWorkflow && !complaintData?.data?.data?.currentUser && complaintData?.data?.data?.moduleId !== MODULE_OTHERS && 'ULB GRO'}
            </h1>}
            <h1 className="text-md font-bold  mb-6 flex items-center">
              <span>Status -
                {complaintData?.data?.data?.wf_status === 0 && <Badge className="bg-yellow-500 ml-2">Pending</Badge>}
                {/* {complaintData?.data?.data?.wf_status === 0 && <Badge className="bg-yellow-500 ml-2">Pendjjdvhdguyuing</Badge>} */}

                {complaintData?.data?.data?.wf_status === 1 && <Badge className="bg-green-500 ml-2">Resolved</Badge>}
                {complaintData?.data?.data?.wf_status === 2 && <Badge className="bg-red-500 ml-2">Rejected</Badge>}
                {complaintData?.data?.data?.wf_status === 3 && <Badge className="bg-yellow-500 ml-2">Pending(re-opened)</Badge>}
              </span>
            </h1>
          </div>
          <p className="text-gray-600 mb-2">
            Registered on {moment(complaintData?.data?.data?.createdAt).format('DD-MM-YYYY')}
          </p>

          <div className='border-b mt-1 border-[#99B37C]'></div>

          <div className="mt-4  grid grid-cols-1 md:grid-cols-3   space-y-4">
            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Full Name : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.citizenName || 'N/A'}
                </p>{" "}
              </div>
            </div>
            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Mobile No : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.mobileNo || 'N/A'}
                </p>{" "}
              </div>
            </div>
            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Email : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.email || 'N/A'}
                </p>{" "}
              </div>
            </div>
            <div className="flex space-x-4  items-center">
              <div className="font-semibold">ULB : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.ulb?.ulbName || 'N/A'}
                </p>{" "}
              </div>
            </div>
            {/* <div className="flex space-x-4  items-center">
              <div className="font-semibold">Module : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.module?.moduleName || 'N/A'}
                </p>{" "}
              </div>
            </div> */}
            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Grievance Type : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.problemType?.problem || 'N/A'}
                </p>{" "}
              </div>
            </div>
            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Word No. : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.wardNo || 'N/A'}
                </p>{" "}
              </div>
            </div>
            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Area : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.area || 'N/A'}
                </p>{" "}
              </div>
            </div>

            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Consumer No : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.consumerNo || 'N/A'}
                </p>{" "}
              </div>
            </div>

            <div className="flex space-x-4  items-center">
              <div className="font-semibold">Grievance Location : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.grievanceLocation || 'N/A'}
                </p>{" "}
              </div>
            </div>
            {complaintData?.data?.data?.fixedNo && <div className="flex space-x-4  items-center">
              <div className="font-semibold">{complaintData?.data?.data?.fixedNoLabel}Fixed No : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.fixedNo}
                </p>{" "}
              </div>
            </div>}
            {complaintData?.data?.data?.tempNo && <div className="flex space-x-4  items-center">
              <div className="font-semibold">{complaintData?.data?.data?.tempNoLabel}Temp No : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.tempNo}
                </p>{" "}
              </div>
            </div>}
            {complaintData?.data?.data?.holdingNo && <div className="flex space-x-4  items-center">
              <div className="font-semibold">{complaintData?.data?.data?.tempNoLabel}Holding No : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.holdingNo}
                </p>{" "}
              </div>
            </div>}
            {complaintData?.data?.data?.safNo && <div className="flex space-x-4  items-center">
              <div className="font-semibold">{complaintData?.data?.data?.tempNoLabel}Saf No : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.safNo}
                </p>{" "}
              </div>
            </div>}
            {(complaintData?.data?.data?.wf_status === 0 || complaintData?.data?.data?.wf_status === 3) &&
              <div className="flex space-x-4  items-center">
                <div className="font-semibold">Pending From : </div>
                <div>
                  <p className="opacity-90">
                    {moment().diff(moment(complaintData?.data?.data?.createdAt), 'days')} days
                  </p>{" "}
                </div>
              </div>
            }
            {complaintData?.data?.data?.priorityType &&
              <div className="flex space-x-4  items-center">
                <div className="font-semibold">Priority Type : </div>
                <div>
                  <p className="opacity-90">
                    {complaintData?.data?.data?.priorityType?.priorityName || 'N/A'}
                  </p>{" "}
                </div>
              </div>}
            {complaintData?.data?.data?.targetType && <div className="flex space-x-4  items-center">
              <div className="font-semibold">Target Type : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.targetType?.targetType || 'N/A'}
                </p>{" "}
              </div>
            </div>}
            {complaintData?.data?.data?.complaintType &&
              <div className="flex space-x-4  items-center">
                <div className="font-semibold">Grievance Type : </div>
                <div>
                  <p className="opacity-90">
                    {complaintData?.data?.data?.complaintType?.complaintTypeName || 'N/A'}
                  </p>{" "}
                </div>
              </div>}
            <div className='col-span-3 border-b my-20 border-[#99B37C]'></div>
           
            <div className="col-span-2 flex flex-col">
              <div className="font-semibold">Description : </div>
              <div>
                <p className="opacity-90">
                  {complaintData?.data?.data?.complaintDescription || 'N/A'}
                </p>{" "}
              </div>
            </div>

            {/* COMPLAINT DOCUMENT SECTION */}
            <div className="col-span-3 flex flex-col">
              <div className="font-semibold">Grievance Document </div>
              <Dialog>
                <DialogHeader>
                </DialogHeader>
                <DialogContent className="sm:max-w-[500px]">
                  <div className="py-4">
                    {/* Check if the uploaded file is an image */}
                    {complaintData?.data?.data?.imgUrl && complaintData?.data?.data?.imgUrl.includes('.pdf') ? (
                      <iframe
                        src={complaintData?.data?.data?.imgUrl}
                        width="100%"
                        height="400px"
                        title="Document Preview"
                      />
                    ) : (
                      <Image src={complaintData?.data?.data?.imgUrl} className="w-80" />
                    )}
                  </div>
                </DialogContent>
                {/* IMAGE TRIGGER */}
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    {complaintData?.data?.data?.imgUrl && complaintData?.data?.data?.imgUrl.includes('.pdf') ? (
                      <div className="w-20 h-20  flex justify-center items-center">  <FileText className="w-20 h-20 " /></div>
                    ) : (
                      <Image src={complaintData?.data?.data?.imgUrl} className="w-40" />
                    )}
                  </div>
                </DialogTrigger>
              </Dialog>
            </div>





            {complaintData?.data?.data?.resolveDocs && (
  <div className="col-span-1 md:col-span-3 flex flex-col">
    <div className="font-semibold">Resolve Document:</div>
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          {Array.isArray(complaintData.data.data.resolveDocs) &&
            complaintData.data.data.resolveDocs.map((doc: string | undefined, index: Key | null | undefined) => {
              const isPdf = typeof doc === "string" && doc.endsWith(".pdf");
              return isPdf ? (
                <div
                  key={index}
                  className="flex items-center gap-2  p-2 rounded cursor-pointer"
                >
                  <FileText className="w-12 h-12 text-red-600" />
                  <span className="text-sm font-semibold"></span>
                </div>
              ) : (
                <Image key={index} src={doc} className="w-40 rounded cursor-pointer" />
              );
            })}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogClose className="absolute right-4 top-4 text-red-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </DialogClose>
        </DialogHeader>
        <div className="py-4">
          {Array.isArray(complaintData.data.data.resolveDocs) &&
            complaintData.data.data.resolveDocs.map((doc: string | undefined, index: Key | null | undefined) => {
              const isPdf = typeof doc === "string" && doc.endsWith(".pdf");
              return isPdf ? (
                <div key={index} className="w-full h-[500px] border rounded overflow-hidden">
                  <iframe src={doc} className="w-full h-full" />
                </div>
              ) : (
                <Image key={index} src={doc} className="w-80 rounded" />
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  </div>
)
}

          </div>




          <section className="mt-8">

            {/* THIS IS COMPLAINT REOPEN MODAL */}
            {(complaintData?.data?.data?.wf_status === 1 || complaintData?.data?.data?.wf_status === 2) && <Dialog>
              <DialogHeader>
              </DialogHeader>
              <DialogContent className="sm:max-w-[500px]">
                <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>Grievance Re-Open</CardTitle>

                <div className="py-4">
                  <ReopenComplaintComponent complaintData={complaintData} />

                </div>
              </DialogContent>

              <DialogTrigger asChild>
                <div className="flex justify-between">
                  <div><h2 className="text-xl font-semibold text-blue-800">Grievance Flow History</h2></div>
                  <div><Button variant={'secondary'}>Re-Open Grievance</Button></div>
                </div>
              </DialogTrigger>
            </Dialog>}



            <div className='border-b mt-1 border-[#99B37C]'></div>
            <div className="flex flex-col space-y-4 mt-4">
              {
                complaintLogData?.data?.data?.map((item: any, index: any) => (
                  <div className="flex space-x-4 items-center">
                    <div>{index + 1}</div>
                    <div>
                      {item?.actionStatus === 0 && <Badge className="bg-gray-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 1 && <Badge className="bg-green-400 text-white">{item?.statusText}</Badge>}
                      {item?.actionStatus === 2 && <Badge className="bg-red-400 text-white">{item?.statusText}</Badge>}
                      {item?.actionStatus === 3 && <Badge >{item?.statusText}</Badge>}
                      {item?.actionStatus === 4 && <Badge className="bg-amber-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 5 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 6 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 7 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 8 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 9 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 10 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 11 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      {item?.actionStatus === 12 && <Badge className="bg-cyan-200 text-dark">{item?.statusText}</Badge>}
                      <div className="text-xs text-gray-600 font-semibold mt-1">{moment(complaintData?.data?.data?.createdAt).format('DD-MM-YYYY hh:mm a')}</div>
                    </div>
                    <MoveRight />
                    <div>
                      <Dialog>
                        <DialogHeader>
                        </DialogHeader>
                        <DialogContent className="sm:max-w-[500px]">
                          <div className="py-4">
                            <Image src={item?.actionBy?.fullImgUrl} className="w-60" />
                          </div>
                        </DialogContent>

                        {/* IMAGE TRIGGER */}
                        <DialogTrigger asChild>
                          <div className="w-10 h-10 rounded-full border overflow-hidden cursor-pointer">
                            <Image src={item?.actionBy?.fullImgUrl || profile} className="w-10 cursor-pointer hover:scale-105" />
                          </div>
                        </DialogTrigger>


                      </Dialog>
                      <div className="text-xs text-gray-700">Action by <span className="font-semibold text-black text-md">{item?.actionByUserId === null ? 'Direct Citizen' : item?.actionBy?.fullName}</span></div>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>


          {/* Add other sections such as Privacy, Security, etc. */}
        </div>
      </div>
    </div>
  );
}
