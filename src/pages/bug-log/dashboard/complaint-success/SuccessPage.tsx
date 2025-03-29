"";
import { CircleCheckBig } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";

export default function SuccessPage() {

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const complaintRefNo = query.get('complaintRefNo')
  const complaintId = query.get('complaintId')

  return (
    <div className="flex flex-col space-y-4 b">
      <div className="flex space-x-4 justify-center items-center">
        <div>
          <CircleCheckBig className="inline text-green-500 text-5xl font-bold" />
        </div>
        <div>
          <CardTitle className="text-3xl">
          Grievance Submitted Successfully!
          </CardTitle>{" "}
        </div>
      </div>

      <div className="flex space-x-4 justify-center items-center">
        <div className="font-semibold">Grievance No : </div>
        <div>
          <CardTitle className="text-2xl opacity-60">{complaintRefNo}</CardTitle>{" "}
        </div>
      </div>
      <div className="text-center md:w-1/3 mx-auto text-md">
        <div className=" opacity-60">
          Please keep this grievance no. for future reference. You can track
          your grievance status with this grievance no.
        </div>{" "}
      </div>

      <Separator className="md:w-1/3 mx-auto" />

      <div className="text-center md:w-1/2 mx-auto text-md space-x-4">
        <Link
          to={`/bug-log/dashboard/management-complaint-details?complaintRefNo=${complaintRefNo}&complaintId=${complaintId}`}
        >
          <Button>View Grievance Details</Button>
        </Link>
        <Link to={"/"}>
          {/* <Button>Register Grievance</Button> */}
        </Link>{" "}
      </div>
    </div>
  );
}

