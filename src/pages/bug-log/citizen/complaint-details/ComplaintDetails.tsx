
import { useApi, usePutMutation } from "@/hooks/useCustomQuery";
import { grievanceAPI } from "@/lib";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { Image } from "@/components/image";
import { Badge } from "@/components/ui/badge";
import { CircleCheck,FileText,Info, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReopenComplaintComponent from "./ReopenComplaintComponent";
import { Key, useState } from "react";
import CloseComplaintComponent from "./CloseComplaintComponent";
import CommentComponent from "./CommentComponent";
import { useAppContext } from "@/context";
import { DialogClose, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
// import { useQueryClient } from "react-query";

export default function ComplaintDetails() {

  const [reminderCount, setReminderCount] = useState(0); // State to hold the number
  const [reOpenStatus, setreOpenStatus] = useState<boolean>(false)
  const [dialogType, setdialogType] = useState<string>('')
  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false);
  const mutate = usePutMutation({});
  const {currentLanguage}:any= useAppContext()
  const useQuery = () => new URLSearchParams(useLocation().search)
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);


  

  const query = useQuery()
  const complaintRefNo = query.get('complaintRefNo')

  const complaintData = useApi<any>({
    api: `${grievanceAPI.getComplaintDetailsByComplaintNo}/${complaintRefNo}`,
    key: "ComplaintDetails",
    options: {
      enabled: true
    }
  });

   

  // console.log()

  const handleReminderClick = async () => {
    try {
      const result = await mutate.mutateAsync({
        api: `${grievanceAPI?.updateReminder}/${complaintRefNo}`,
      });

      if (result) {
        // Invalidate the query to refetch complaint details
        // queryClient.invalidateQueries("ComplaintDetails");
      toast.success("Reminder sent sucessfully.")

      }
    } catch (error) {
      console.error('Error during reminder API call:', error);
    } finally {
      setIsReminderDialogOpen(false); // Close the dialog after the function executes
      window.location.reload(); // Reload the page

    }
  };
  
  // console.log("Line 41---",complaintData)

  return (
    <div className=''>
      <div className="min-h-screen bg-gray-100 p-1 sm:p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-1 sm:p-8">
          {/* ════════════════════════════║ DIALOG CONDITIONS ║═════════════════════════════════
          COMMENT
          CLOSE_COMPLAINT
          DETAILS */}

          {/* THIS IS COMPLAINT RESOLUTION DETAILS MODAL */}
          <Dialog open={isDialogOpen}>
            <DialogHeader>
            </DialogHeader>
            {dialogType === 'DETAILS' && <DialogContent className="sm:max-w-[500px]">
              <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>
                <div>
                  {!reOpenStatus && <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>
                    {complaintData?.data?.data?.wf_status === 1 && <span className="text-green-500">| Resolution Details</span>}
                    {complaintData?.data?.data?.wf_status === 2 && <span className="text-red-500">| Rejection Details</span>}
                  </CardTitle>}
                </div>
                <div>
                  <span><X className="cursor-pointer hover:bg-red-100 rounded-lg inline" onClick={() => setisDialogOpen(false)} /></span></div>
              </CardTitle>


              <div className="py-4">

                {!reOpenStatus && <>
                  <div className="flex space-x-4  items-center">
                    {complaintData?.data?.data?.wf_status === 1 && <span>Resolution Date</span>}
                    {complaintData?.data?.data?.wf_status === 2 && <span>Rejection Date</span>}
                    <div>
                      <p className="opacity-90">
                        {moment(complaintData?.data?.data?.wf_resolutionDate).format('DD-MM-YYYY')}
                      </p>{" "}
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="font-semibold">Details : </div>
                    <div>
                      <p className="opacity-90">
                        {complaintData?.data?.data?.wf_finalCommentToCitizen}
                      </p>{" "}
                    </div>
                  </div></>}


                {/* THIS IS COMPLAINT REOPEN SECTION */}
                <section
                  style={{
                    height: reOpenStatus ? '400px' : '0px',
                    transition: 'height 0.3s ease', // Add duration and easing
                    overflow: 'hidden'
                  }}
                >
                  <ReopenComplaintComponent setisDialogOpen={setisDialogOpen} setreOpenStatus={setreOpenStatus} complaintData={complaintData} />
                </section>

                {!reOpenStatus && <section className="mt-8">
                  <div className='border-b mt-1 border-[#99B37C]'></div>
                  <p className="text-gray-800 mt-2">
                    <span className="font-semibold italic font-serif">Note : </span>If you are not satisfied with the resolution of grievance, You can re-open grievance anytime.
                  </p>

                  <div className="flex justify-center items-center mt-6"> <Button onClick={() => setreOpenStatus(!reOpenStatus)} variant={'secondary'} className="mt-2">Re-Open this Grievance</Button></div>
                </section>}

              </div>
            </DialogContent>}

            {dialogType === 'COMMENT' && <DialogContent className="sm:max-w-[500px] w-full mx-2">
              <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between '>
                <div>
                  | Send Comment
                </div>
                <div>
                  <span><X className="cursor-pointer hover:bg-red-100 rounded-lg inline" onClick={() => setisDialogOpen(false)} /></span></div>
              </CardTitle>

              <div className="py-4">
                {/* THIS IS COMPLAINT REOPEN SECTION */}
                <section
                  style={{
                    height: '400px',
                    transition: 'height 0.3s ease', // Add duration and easing
                    overflow: 'hidden'
                  }}
                >
                  <CommentComponent setisDialogOpen={setisDialogOpen} complaintData={complaintData} />
                </section>

              </div>
            </DialogContent>}

            {dialogType === 'CLOSE_COMPLAINT' && <DialogContent className="sm:max-w-[500px] w-full mx-2">
              <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>
                <div>
                  | Close Grievance
                </div>
                <div>
                  <span><X className="cursor-pointer hover:bg-red-100 rounded-lg inline" onClick={() => setisDialogOpen(false)} /></span></div>
              </CardTitle>

              <div className="py-4">
                {/* THIS IS COMPLAINT REOPEN SECTION */}
                <section
                  style={{
                    height: '400px',
                    transition: 'height 0.3s ease', // Add duration and easing
                    overflow: 'hidden'
                  }}
                >
                  <CloseComplaintComponent setisDialogOpen={setisDialogOpen} complaintData={complaintData} />
                </section>

              </div>
            </DialogContent>}


            <div className="md:flex">
              {/* ═════════════║ 1 PENDING CASE ║═════════════════ */}
              {complaintData?.data?.data?.wf_status === 0 && <div className="text-gray-600 mb-2 font-semibold flex space-x-2"><Info className="inline text-amber-500" /><span className="opacity-70">{currentLanguage?.WAWTG}</span> </div>}

              {/* ═════════════║ 2 RESOLVED CASE ║═════════════════ */}
              {complaintData?.data?.data?.wf_status === 1 && <div className="text-gray-600 mb-2 font-semibold flex space-x-2"><CircleCheck className="inline text-green-500" /><span className="opacity-70">This grievance has been resolved, You can reopen this grievance if not satisfied.</span>  </div>}

              {/* ═════════════║ 3 REJECT CASE ║═════════════════ */}
              {complaintData?.data?.data?.wf_status === 2 && <div className="text-gray-600 mb-2 font-semibold flex space-x-2"><X className="inline text-red-500" /><span className="opacity-70">This grievance has been rejected, Please re-register grievance if not satisfied with this.</span> </div>}

              {/* ═════════════║ 4 CLOSED CASE ║═════════════════ */}
              {complaintData?.data?.data?.wf_status === 4 && <div className="text-gray-600 mb-2 font-semibold flex space-x-2"><X className="inline text-red-500" /><span className="opacity-70">This grievance has been closed by you.</span> </div>}

              {/* ═════════════║ 5 PENDING(RE-OPENED CASE) CASE ║═════════════════ */}
              {complaintData?.data?.data?.wf_status === 3 && <div className="text-gray-600 mb-2 font-semibold flex space-x-2"><Info className="inline text-amber-500" /><span className="opacity-70">This grievance has been re-opened, We are working on this grievance, You will be informed soon.</span> </div>}

              {/* ═════════════║ 6 PENDING AND PENDING(RE-OPENED CASE) CASE ║═════════════════ */}
              {(complaintData?.data?.data?.wf_status === 0 || complaintData?.data?.data?.wf_status === 3) && <div className="text-gray-600 mb-2 font-semibold sm:flex space-x-2 space-y-2 sm:space-y-0">   <DialogTrigger onClick={() => {
                setisDialogOpen(true)
                setdialogType('COMMENT')
                setreOpenStatus(false)
              }} asChild>
                <Button className="ml-2" size={'sm'} variant={'secondary'}>Send Comment</Button>
              </DialogTrigger>
                <DialogTrigger onClick={() => {
                  setisDialogOpen(true)
                  setdialogType('CLOSE_COMPLAINT')
                  setreOpenStatus(false)

                }} asChild>
                  <Button className="ml-2" size={'sm'} variant={'destructive'}>Close Grievance</Button>
                </DialogTrigger>
                <DialogTrigger asChild>
        <Badge
          className="ml-2 cursor-pointer hover:bg-primary hover:text-white"
          variant={'reminder'}
          onClick={() => setIsReminderDialogOpen(true)} // Open the dialog
        >
          Send Reminder {complaintData?.data?.data?.reminder} {/* Display the number in the button */}
        </Badge>
      </DialogTrigger>


      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Reminder</DialogTitle>
            <DialogDescription>
              Are you sure you want to set a reminder for this complaint?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleReminderClick}>
              Yes
            </Button>
            <Button variant="outline" onClick={() => setIsReminderDialogOpen(false)}>
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </div>}
                {/* <DialogTrigger onClick={() => {
            setisDialogOpen(true)
            setdialogType('DETAILS')
            setreOpenStatus(false)
          }} asChild>
            <Badge className="ml-2 cursor-pointer hover:bg-primary hover:text-white" variant={'reminder'}>send reminder</Badge>
          </DialogTrigger> */}

              {(complaintData?.data?.data?.wf_status === 1 || complaintData?.data?.data?.wf_status === 2) && <DialogTrigger onClick={() => {
                setisDialogOpen(true)
                setdialogType('DETAILS')
                setreOpenStatus(false)
              }} asChild>
                <Badge className="ml-2 cursor-pointer hover:bg-primary hover:text-white" variant={'secondary'}>View Details</Badge>
              </DialogTrigger>}
              

            </div>
          </Dialog>

          <div className="md:flex justify-between ml-2">
          <h1 className="text-xl font-bold text-blue-800 md:mb-6 mb-1 sm:ml-20 lg:ml-0 uppercase">
  {currentLanguage?.GRIEVANCE_DETAILS}
</h1>
            <h1 className="md:text-xl md:font-bold md:mb-6 mb-1"><span className="font-semibold">{currentLanguage?.GN} :-</span> <span className="">{complaintData?.data?.data?.complaintRefNo}</span></h1>
          </div>
          <div className="md:flex">
            <div className="text-gray-600 mb-2 flex-1 ml-2">
            <span className="font-semibold">  {currentLanguage?.REGISTERED_ON} </span>:- {moment(complaintData?.data?.data?.createdAt).format('DD-MM-YYYY')}
            </div>
            <div className="text-gray-600 mb-2 flex-1 text-right">
              Status :&nbsp;
              {complaintData?.data?.data?.wf_status === 4 && <Badge variant={'destructive'}>Closed</Badge>}
              {complaintData?.data?.data?.wf_status === 3 && <Badge className="bg-amber-400 text-white" variant={'secondary'}>Pending(re-opened)</Badge>}
              {complaintData?.data?.data?.wf_status === 2 && <Badge variant={'destructive'}>Rejected</Badge>}
              {complaintData?.data?.data?.wf_status === 1 && <Badge variant={'success'}>Resolved</Badge>}
              {complaintData?.data?.data?.wf_status === 0 && <Badge className="bg-amber-400 text-white" variant={'secondary'}>Pending</Badge>}
            </div>
            {complaintData?.data?.data?.wf_status === 4 && <div className="text-gray-600 mb-2 flex-1 text-right"><span>Closed on : </span> {moment(complaintData?.data?.data?.wf_resolutionDate).format('DD-MM-YYYY')} </div>}
            {complaintData?.data?.data?.wf_status === 2 && <div className="text-gray-600 mb-2 flex-1 text-right"><span>Rejected on : </span> {moment(complaintData?.data?.data?.wf_resolutionDate).format('DD-MM-YYYY')} </div>}
            {complaintData?.data?.data?.wf_status === 1 && <div className="text-gray-600 mb-2 flex-1 text-right"><span>Resolved on : </span> {moment(complaintData?.data?.data?.wf_resolutionDate).format('DD-MM-YYYY')} </div>}
          </div>
          <div className='border-b mt-1 border-[#99B37C]'></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 space-y-4 md:space-y-0 ml-2">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
              <div className="font-semibold">{currentLanguage?.FN}:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.citizenName || 'N/A'}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
              <div className="font-semibold">{currentLanguage?.MN}:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.mobileNo|| 'N/A'}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
              <div className="font-semibold">{currentLanguage?.EMAIL}:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.email|| 'N/A'}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
              <div className="font-semibold">{currentLanguage?.ULB}:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.ulb?.ulbName|| 'N/A'}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
              <div className="font-semibold">{currentLanguage?.GT}:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.problemType?.problem|| 'N/A'}</p>
              </div>
            </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
                    <div className="font-semibold">{currentLanguage?.WARD_NO}.:</div>
                <div>
                  <p className="opacity-90">{complaintData?.data?.data?.wardNo || "N/A"}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
                 <div className="font-semibold">{currentLanguage?.AREA}:</div>
                <div>
                <p className="opacity-90">{complaintData?.data?.data?.area || "N/A"}</p>
                </div>
              </div>
            {complaintData?.data?.data?.holdingNo && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
                 <div className="font-semibold">Holding No.:</div>
                <div>
                  <p className="opacity-90">{complaintData?.data?.data?.holdingNo}</p>
                </div>
              </div>
            )}
            {complaintData?.data?.data?.safNo && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
               <div className="font-semibold">Saf No.:</div>
                <div>
                  <p className="opacity-90">{complaintData?.data?.data?.safNo}</p>
                </div>
              </div>
            )}
           
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
                <div className="font-semibold">{currentLanguage?.GR_LOCATION}:</div>
                <div>
                  <p className="opacity-90">{complaintData?.data?.data?.grievanceLocation || "N/A"}</p>
                </div>
              </div>

              {complaintData?.data?.data?.consumerNo && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
               <div className="font-semibold">Consumer No.:</div>
                <div>
                  <p className="opacity-90">{complaintData?.data?.data?.consumerNo}</p>
                </div>
              </div>
            )}
        
            {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
              <div className="font-semibold">Module:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.module?.moduleName|| 'N/A'}</p>
              </div>
            </div> */}

            
            {complaintData?.data?.data?.fixedNo && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
                <div className="font-semibold">
                  {complaintData?.data?.data?.fixedNoLabel}:
                </div>
                <div>
                  <p className="opacity-90">{complaintData?.data?.data?.fixedNo}</p>
                </div>
              </div>
            )}

            {complaintData?.data?.data?.tempNo && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start md:items-center">
                <div className="font-semibold">
                  {complaintData?.data?.data?.tempNoLabel}:
                </div>
                <div>
                  <p className="opacity-90">{complaintData?.data?.data?.tempNo}</p>
                </div>
              </div>
            )}
            <div className="col-span-1 md:col-span-3 border-b my-10 md:my-20 border-[#99B37C]"></div>
            {/* <div className="flex flex-col col-span-1 md:col-span-3">
              <div className="font-semibold">Title:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.complaintTitle|| 'N/A'}</p>
              </div>
            </div> */}
            <div className="col-span-1 md:col-span-3 flex flex-col">
              <div className="font-semibold">{currentLanguage?.DESCRIPTION}</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.complaintDescription}</p>
              </div>
            </div>
            <div className="col-span-1 md:col-span-3 flex flex-col">
              <div className="font-semibold">{currentLanguage?.REMARK}:</div>
              <div>
                <p className="opacity-90">{complaintData?.data?.data?.wf_currentReopenComment}</p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 flex flex-col">
              <div className="font-semibold">{currentLanguage?.GDOC}:</div>
              <Dialog>
                <DialogHeader />
                <DialogContent className="sm:max-w-[500px]">
                  <div className="py-4">
                    {/* <Image src="/images/slider.png" className="w-80" /> */}
                    <Image src={complaintData?.data?.data?.imgUrl } className="w-80" />
                  </div>
                </DialogContent>

                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <Image src={complaintData?.data?.data?.imgUrl }  className="w-40" />
                  </div>
                </DialogTrigger>
              </Dialog>
            </div>

{/* resolve condition  */}

{complaintData?.data?.data?.wf_status === 1 &&
  Array.isArray(complaintData?.data?.data?.resolveDocs) &&
  complaintData.data.data.resolveDocs.length > 0 && (
    <div className="col-span-1 md:col-span-3 flex flex-col">
      <div className="font-semibold">Resolve Document:</div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            {complaintData.data.data.resolveDocs.map((doc: string | undefined, index: Key | null | undefined) => {
              const isPdf = typeof doc === "string" && doc.endsWith(".pdf");
              return isPdf ? (
                <div
                  key={index}
                  className="flex items-center gap-2 border p-2 rounded cursor-pointer"
                >
                  <FileText className="w-12 h-12 text-red-600" />
                  <span className="text-sm font-semibold">PDF Document</span>
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
            {complaintData.data.data.resolveDocs.map((doc: string | undefined, index: Key | null | undefined) => {
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

          <section className="mt-8 px-4 md:px-0">
            <h2 className="text-lg md:text-xl font-semibold text-blue-800">{currentLanguage?.GRT}</h2>
            <div className="border-b mt-1 border-[#99B37C]"></div>

            <p className="text-gray-800 mt-2 text-sm md:text-base">
             {currentLanguage?.YGWWR}
            </p>

            <p className="text-gray-800 mt-2 text-sm md:text-base flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">{currentLanguage?.FCTC} 
              <a href="tel:+91912325398" className="font-semibold">{currentLanguage?.NUMBER}</a>. {currentLanguage?.YCN}
              <Link to={'https://maps.app.goo.gl/HFBxeoz9qYmKWE3z8'} target="_blank" className="inline-flex items-center hover:underline">
                <Image className="w-5 inline" src="/images/pin.svg" alt="Location Pin" />
                <span className="mx-2">{currentLanguage?.NJSK}</span>
              </Link>
              {currentLanguage?.FQ}.
            </p>
          </section>

          {/* Add other sections such as Privacy, Security, etc. */}
        </div>
      </div>
    </div>

  );
}
