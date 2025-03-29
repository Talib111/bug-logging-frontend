import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardTitle,
} from "@/components/ui/card"


export default function FormConfirmation() {

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const complaintRefNo = query.get('complaintRefNo')

 

  return (
   
      <Card className="flex flex-col space-y-4 b p-10">
        <div className="flex space-x-4 ">
          <div>
            <CardTitle className="text-xl">
              Application Details - {complaintRefNo}
            </CardTitle>{" "}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4 md:grid-cols-4">
          <Label className="text-sm">Grievance Information</Label>
        </div>
        <Separator className="col-span-1 lg:col-span-4 md:col-span-4" />
        <div className="grid grid-cols-1 md:grid-cols-3  space-y-4">
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">Title : </div>
            <div>
              <CardTitle className="opacity-60">
                Abc
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center col-span-4">
            <div className="font-semibold">Description : </div>
            <div>
              <CardTitle className="opacity-60">
             Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">ULB : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">Module : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4 md:grid-cols-4">
          <Label className="text-sm">Personal Information</Label>
        </div>
        <Separator className="col-span-1 lg:col-span-4 md:col-span-4" />
        <div className="grid grid-cols-1 md:grid-cols-3  space-y-4">
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">First Name :</div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">Last Name : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">Email : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">Mobile : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">DOB : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">Aadhar : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
          <div className="flex space-x-4  items-center">
            <div className="font-semibold">Gender : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>

          <div className="flex space-x-4  items-center col-span-1 md:col-span-2">
            <div className="font-semibold">Address : </div>
            <div>
              <CardTitle className="opacity-60">
              Mark Henry
              </CardTitle>{" "}
            </div>
          </div>
        </div>
      </Card>
    
  );
}
