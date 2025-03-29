import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { useAppContext } from "@/context";



export default function FormSubmitSuccess({ currentLanguage,formResponse }: any) {
  
  const { user } = useAppContext()
  console.log(user)
  return (

    <div className="flex flex-col space-y-4 b">
      <div className="flex space-x-4 justify-center items-center">
        <div>
          <CircleCheckBig className="inline text-green-500 text-5xl font-bold" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">
          {currentLanguage?.GR_SUBMITTED_SUCCESSFULLY}
          </CardTitle>{" "}
        </div>
      </div>

      <div className="flex space-x-4 justify-center items-center">
        <CardTitle className="font-semibold">{currentLanguage?.GR_NO} : </CardTitle>
        <div>
          <div className="text-md opacity-60">{formResponse?.complaintRefNo}</div>{" "}
        </div>
      </div>
      <div className="text-center mx-auto text-md">
        <div className=" opacity-60">
        {currentLanguage?.GR_SUBMIT_MESSAGE}
        </div>
        {/* <div className=" opacity-60 mt-2">
         We have also sent details about your grievance in your mail.</div> */}
      </div>

      <Separator className="md:w-1/3 mx-auto" />

      <div className="text-center mx-auto text-md space-x-4">
        {
        user? <Link
        // to={`/grievance/citizen/complaint-details?complaintRefNo=${formResponse?.complaintRefNo}`}
        to={`/grievance/citizen-dashboard/citizen-complaint-details?complaintRefNo=${formResponse?.complaintRefNo}`}

      >
        <Button>{currentLanguage?.GR_VIEW_DETAILS}</Button>
      </Link>:
       <Link
       to={`/grievance/citizen/complaint-details?complaintRefNo=${formResponse?.complaintRefNo}`}
      //  to={`/grievance/citizen-dashboard/citizen-complaint-details?complaintRefNo=${formResponse?.complaintRefNo}`}

     >
       <Button>{currentLanguage?.GR_VIEW_DETAILS}</Button>
     </Link>
        }
       
        {/* <Link to={"/"}>
          <Button>View Home</Button>
        </Link>{" "} */}
      </div>
    </div>
  )
}
