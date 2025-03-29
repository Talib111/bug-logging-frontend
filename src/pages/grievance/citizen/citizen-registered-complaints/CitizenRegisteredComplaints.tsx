import { CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/useCustomQuery";
import { grievanceAPI } from "@/lib";
import { Image } from "@/components/image";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
// import PaginationComponent from "@/components/pagination";
import PaginationComponents from "@/components/paginations";
import { useState, useEffect } from "react";

export default function CitizenRegisteredComplaints() {
  const { currentLanguage } :any= useAppContext();

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const { user } = useAppContext();
  const navigate = useNavigate();

  // Fetch complaint data
  const complaintData = useApi<any>({
    api: `${grievanceAPI.getCitizenComplaints}?page=${page}&limit=${perPage}&citizenId=${user?._id}`,
    key: `getAllComplaint_${page}_${perPage}_${user?._id || "noUser"}`, 
    options: {
      enabled: !!user?._id,
    },
  });

  
  // Re-fetch data when page or perPage changes
  useEffect(() => {
    if (user?._id) {
      complaintData.refetch();
    }
  }, [page, perPage, user?._id]);

  // Pagination calculations
  const totalDocs = complaintData?.data?.data?.totalDocs || 0;
  const totalPages = totalDocs > 0 ? complaintData?.data?.data?.totalPages : 1;

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

console.log("complaintData?.data?.data?.totalPage",complaintData?.data?.data?.totalPages)
  console.log("totalPages",totalPages)

  return (
    <div className="container  mx-auto">
      {/* ════════════ COMPLAINT HEADER   ═════════════════ */}
      <div className="flex items-center justify-center lg:flex">
        <div className="w-full">
          <CardTitle className="text-3xl font-bold opacity-60">
            {currentLanguage?.ARG}({totalDocs})
          </CardTitle>
          <h1 className="mt-2 pr-20 text-xl font-semibold text-gray-800 dark:text-white lg:text-3xl mb-4">
            {currentLanguage?.YCRAROC}
          </h1>
        </div>
        <div className="md:flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 hidden sm:block">
          <Image
            width={251}
            height={263}
            className="w-52"
            src="/images/complaint.png"
            alt="email illustration vector art"
          />
        </div>
      </div>

      {/* ════════════ COMPLAINT LIST   ═════════════════ */}
      <Accordion type="single" collapsible className="w-full bg-white px-2">
        {complaintData?.data?.data?.docs?.map((items: any, index: number) => (
          <AccordionItem key={items?._id} value={`item-${index + 1}`}>
            <AccordionTrigger>
              <div className="flex space-x-4">
                <div>{index + 1}</div>
                <Image className="w-6" src="/images/profile.png" alt="Profile Icon" />
                <div className="text-lg">
                  Status:{" "}
                  {items?.wf_status === 3 && (
                    <Badge className="ml-2 bg-amber-500">Pending (Re-opened)</Badge>
                  )}
                  {items?.wf_status === 2 && (
                    <Badge className="ml-2" variant="destructive">
                      Rejected
                    </Badge>
                  )}
                  {items?.wf_status === 1 && (
                    <Badge className="ml-2" variant="success">
                      Resolved
                    </Badge>
                  )}
                  {items?.wf_status === 0 && (
                    <Badge className="ml-2" variant="secondary">
                      Pending
                    </Badge>
                  )}
                  <span className="ml-6">Grievance no: {items.complaintRefNo}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-10 flex">
              <div className="flex-1 ml-8">{items.complaintDescription}</div>
              <div className="flex-1 flex justify-end">
                <div>
                  <Badge
                    className="ml-4 cursor-pointer"
                    variant="secondary"
                    onClick={() =>
                      navigate(`/grievance/citizen-dashboard/citizen-review?complaintId=${items?._id}`)
                    }
                  >
                    Give Your Feedback
                  </Badge>
                  <Badge
                    className="ml-4 cursor-pointer"
                    onClick={() =>
                      navigate(`/grievance/citizen-dashboard/citizen-complaint-details?complaintRefNo=${items?.complaintRefNo}`)
                    }
                  >
                    View Details
                  </Badge>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* ════════════ PAGINATION   ═════════════════ */}
      <div className="flex w-full justify-end mt-4">
        <PaginationComponents
          page={page}
          perPage={perPage}
          totalPage={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          setPage={setPage}
          setPerPage={setPerPage}
        />
      </div>
    </div>
  );
}