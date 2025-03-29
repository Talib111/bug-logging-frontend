import { Link, useLocation } from "react-router-dom";
import { Image } from "@/components/image";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";

export default function Tools() {
  const { currentLanguage } :any= useAppContext();

  const [currentToolset, setCurrentToolSet] = useState<any>(null)
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  

  const type = query.get('type')

  const toolSet: any = {

    property: [
      // { id: 1, title: currentLanguage?.FN_HN , imageUrl: '/images/property.png', href: '/grievance/citizen/find-new-holding-no' },
    
      {        id: 3, title: currentLanguage?.HT_ACT,        imageUrl: '/images/rule.png',        // href: 'https://jharkhandegovernance.com/citizen/act&rules',
        href: 'https://suda.jharkhand.gov.in/jharkhandmunicipal/citizen/notice_circular.php',
      },
      { id: 2, title: "Check Property Status", imageUrl: '/images/support.png', href: '/grievance/citizen/track-status?type=property' },
    ],
    water: [
      {
        id: 1,
        title: currentLanguage?.JR_ACT,
        imageUrl: '/images/rule.png',
        href: 'https://jharkhandegovernance.com/citizen/act&rules',
      },
      { id: 1, title:"Know Your Water status", imageUrl: '/images/support.png', href: '/grievance/citizen/track-status?type=water' },
      // { id: 2, title: currentLanguage?.KY_WD, imageUrl: '/images/support.png', href: '#' },
      // { id: 3, title: currentLanguage?.KY_ULB, imageUrl: '/images/support.png', href: '#' },
    ],
    trade_License: [
      {
        id: 1,
        title: currentLanguage?.JR_ACT,
        imageUrl: '/images/rule.png',
        href: 'https://jharkhandegovernance.com/citizen/act&rules',
      },
      { id: 2, title: "Know Your Trdae license Status", imageUrl: '/images/support.png', href: '/grievance/citizen/track-status?type=trade_License' },
    

    ],
    general: [
      {
        id: 1,
        title: currentLanguage?.JR_ACT,
        imageUrl: '/images/rule.png',
        // href: 'https://www.jharkhand.gov.in/Home/DocumentList?doctype=c81e728d9d4c2f636f067f89cc14862c&subdoctype=c4ca4238a0b923820dcc509a6f75849b',
        href: 'https://jharkhandegovernance.com/citizen/act&rules',
      },
    ],  
    septic_Tank_Cleaning: [
      { id: 1,
         title: currentLanguage?.ACT_RULES, 
         imageUrl: '/images/rule.png',
          // href: 'https://niua.in/intranet/sites/default/files/2214.pdf' 
          href: 'https://jharkhandegovernance.com/citizen/act&rules',
         
        },
      { id: 2, title: currentLanguage?.BOOKING_NO, imageUrl: '/images/support.png', href: '#' },
    ],
    pet_Registration: [
      { id: 1,
         title: currentLanguage?.PT_ACT_RULES, 
         imageUrl: '/images/rule.png', 
        //  href: 'https://animalhusbandry.jharkhand.gov.in/acts/'
         href: 'https://jharkhandegovernance.com/citizen/act&rules',
        },
      // { id: 2, title: currentLanguage?.SLN, imageUrl: '/images/support.png', href: '' },
      { id: 3, title: currentLanguage?.SA_NO, imageUrl: '/images/support.png', href: '/grievance/citizen/track-status?type=pet_Registration' },
    ],
    water_Tanker_Booking: [
      { id: 1,
         title: currentLanguage?.ACT_RULES , 
         imageUrl: '/images/rule.png', 
        //  href: 'https://wrdjharkhand.nic.in/sites/default/files/2022-01/JharkhandPolicyEnglish.pdf'
        href: 'https://jharkhandegovernance.com/citizen/act&rules',
        },
      { id: 2, title: currentLanguage?.SA_NO, imageUrl: '/images/support.png', href: '/grievance/citizen/track-status?type=water_Tanker_Booking' },
      // { id: 3, title: currentLanguage?.SA_NO, imageUrl: '/images/support.png', href: '#' },
    ],
    advertisement_Tax: [
      { id: 1, 
        title: currentLanguage?.ACT_RULES, 
        imageUrl: '/images/rule.png',
        //  href: 'https://ranchimunicipal.com/docs/draftadvertisementbyelaws.pdf' 
         href: 'https://jharkhandegovernance.com/citizen/act&rules',
       },
      // { id: 2, title: currentLanguage?.SLN, imageUrl: '/images/support.png', href: '#' },
      // { id: 3, title: currentLanguage?.SA_NO, imageUrl: '/images/support.png', href: '#' },
    ],
    lodge_And_Banquet_Registration: [
      { id: 1,
         title: currentLanguage?.ACT_RULES,
          imageUrl: '/images/rule.png',
          //  href: 'https://www.ranchimunicipal.com/Downloads/10102017192444385_DownloadFiles.pdf' 
          href: 'https://jharkhandegovernance.com/citizen/act&rules',
          },
      // { id: 2, title: currentLanguage?.SLN, imageUrl: '/images/support.png', href: '#' },
      // { id: 3, title: currentLanguage?.SA_NO, imageUrl: '/images/support.png', href: '#' },
    ],
    solid_Waste_User_Charge: [
      { id: 1, title: currentLanguage?.ACT_RULES, imageUrl: '/images/rule.png', href: 'https://cag.gov.in/webroot/uploads/download_audit_report/2024/Report-No.-3-of-2024_SWM_JHR-English-(22-05-2024)-066acd68d100425.95459333.pdf' },
      { id: 2, title: currentLanguage?.SA_NO, imageUrl: '/images/support.png', href: '/grievance/citizen/track-status?type=solid_Waste_User_Charge' },

    ],
    marriage_Registration: [
      { id: 1, title: currentLanguage?.ACT_RULES, imageUrl: '/images/rule.png', href: 'https://prsindia.org/files/bills_acts/acts_states/jharkhand/2018/Act%204%20of%202018%20Jharkhand.pdf' },
    ],
    hrms_And_Payroll: [
      { id: 1, title: currentLanguage?.ACT_RULES, imageUrl: '/images/rule.png', href: 'https://cag.gov.in/webroot/uploads/download_audit_report/2024/Report-No.-3-of-2024_SWM_JHR-English-(22-05-2024)-066acd68d100425.95459333.pdf' },
    ],
    public_Transport_City_Bus: [
      { id: 1, title: currentLanguage?.ACT_RULES, imageUrl: '/images/rule.png', href: 'https://upload.indiacode.nic.in/showfile?actid=AC_JH_70_722_00002_00002_1546842780226&type=rule&filename=jharkhand_motor_vehicles_rules_2001.pdf' },
    ],
    parking_Management: [
      { id: 1, title: currentLanguage?.ACT_RULES, imageUrl: '/images/rule.png', href: 'https://upload.indiacode.nic.in/showfile?actid=AC_JH_70_722_00002_00002_1546842780226&type=rule&filename=jharkhand_motor_vehicles_rules_2001.pdf' },
    ],
    Rig_Machine_Registration: [
      { id: 1,
         title: currentLanguage?.ACT_RULES, 
         imageUrl: '/images/rule.png',
          // href: 'https://wrdjharkhand.nic.in/sites/default/files/2022-01/Ground%20Water%20Regulation%20Act-2019_PDF.pdf'
          href: 'https://jharkhandegovernance.com/citizen/act&rules', },
          { id: 2, title: currentLanguage?.SA_NO, imageUrl: '/images/support.png', href: '/grievance/citizen/track-status?type=Rig_Machine_Registration' },
      // { id: 2, title: 'Search License no', imageUrl: '/images/support.png', href: '#' },
      // { id: 3, title: 'Search Application No.', imageUrl: '/images/support.png', href: '#' },
    ],

  }

  useEffect(() => {
    if (type) {
      setCurrentToolSet(toolSet?.[type])
    } else {
      setCurrentToolSet(null)
    }

  }, [type])

  return (
    <div className=''>
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-8">
          <div className="flex justify-between">
            <h1 className="text-lg md:text-xl font-bold text-blue-800 mb-4 md:mb-6 uppercase ">{type ? type.replace(/_/g, " ") : ""} {currentLanguage?.TOOLS} </h1>
          </div>
          <div className='border-b mt-1 border-[#99B37C]'></div>

          <div className="mt-4">
            {(currentToolset?.length === 0 || currentToolset === null || currentToolset === undefined) ? (
              <div className="text-base md:text-lg font-semibold">! No Tools Found</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                {currentToolset?.map((item: any) => (
                  <Link to={item?.href} key={item?.id} target="_blank">
                    <div>
                      <div className="w-28 md:w-36 h-20 md:h-24 rounded-lg overflow-hidden border p-2 flex justify-center items-center">
                        <Image src={item?.imageUrl} className="w-12 md:w-16" />
                      </div>
                      <div className="font-semibold text-amber-500 text-sm md:text-base">{item?.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
