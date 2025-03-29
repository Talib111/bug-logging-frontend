import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useApi } from '@/hooks/useCustomQuery'
import { grievanceAPI } from '@/lib'
import { useAppContext } from "@/context"
import { Image } from "@/components/image"
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import SidePanel from "@/components/side-panel/SidePanel";
import Chatbot from "@/components/chatbot";
import CitizenComplaintForm from "@/pages/bug-log/citizen/citizen-complaint-form/CitizenComplaintForm"
import { Link } from "react-router-dom"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoveRight, Plus, X } from "lucide-react"
import list from '/public/images/list.png'
import profile from '/public/images/profile.png'
import whatsapp from '/public/images/whatsapp.png'
import { useState } from "react"

export default function CitizenDashboard() {
  const { currentLanguage }: any = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggleIcons = () => setIsOpen(!isOpen);

  const { user } = useAppContext()
  // const openWhatsapp = () => {
  //   const mobileNo = ''
  //   const message = ''
  //   window.open(`https://wa.me/${mobileNo}?text=${message}`, '_blank')
  // }

  // const openGmail = () => {
  //   // const email = "talibplay222@gmail.com"
  //   const email = "aadrikaent270@gmail.com"
  //   const subject = "Compalint registration"
  //   const body = "This is the test body of complaint."
  //   const encodedSubject = encodeURIComponent(subject);
  //   const encodedBody = encodeURIComponent(body);
  //   window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`, '_blank')
  // }

  const grievanceData = useApi<any>({
    api: `${grievanceAPI.citizenDashboard}`,
    key: 'citizenDashboard',
    options: {
      enabled: true,
    },
  })

  const popularOptions = [
    { id: 1, label: currentLanguage?.MG, linkUrl: '/bug-log/citizen-dashboard/all-complaints', iconUrl: list },
    { id: 2, label: currentLanguage?.MP, linkUrl: '/bug-log/citizen-dashboard/profile', iconUrl: profile },
    { id: 3, label: currentLanguage?.WC, linkUrl: '#', iconUrl: whatsapp },
  ]

  const navigate = useNavigate();

  return (
    <div className="sm:p-10 p-1">
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-center lg:flex">
          <div className=" w-full ">
            <CardTitle className="text-3xl font-bold opacity-60">{currentLanguage?.WELCOME}</CardTitle>
            <CardTitle className="text-4xl font-bold">{user?.fullName}</CardTitle>
            <CardDescription className="font-bold">{user?.email}</CardDescription>

            <h1 className="mt-10 md:pr-20 text-sm md:text-xl font-semibold text-gray-800 dark:text-white lg:text-3xl mb-4">
              {currentLanguage?.WEL_TXT}
            </h1>
            <div defaultValue="ONLINE" className="w-[500px]">

            </div>
          </div>
          <div className="sm:flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 hidden md:block">
            <Image
              width={250}
              height={185.5}
              className="w-60"
              src="/images/support.png"
              alt="email illustration vector art"
            />
          </div>
        </div>
      </div>

      <div className='grid md:grid-cols-3 col-span-1 gap-4 mt-6'>
        <div>
          <Link to={'/bug-log/citizen-dashboard/all-complaints'}>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{currentLanguage?.TOTAL_GRV}</CardTitle>
                <CardDescription>{grievanceData?.data?.data?.totalRegistrations}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
        <div>
          <Link to={'/bug-log/citizen-dashboard/citizen-testimonials'}>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{currentLanguage?.FD_GIVEN}</CardTitle>
                <CardDescription>{grievanceData?.data?.data?.totalFeedback}</CardDescription>
              </CardHeader>
            </Card>
          </Link>

        </div>

        <div>
          <Dialog>
            <DialogHeader>
            </DialogHeader>
            <DialogContent className="sm:max-w-[600px]">
              <CardTitle className='mt-4 text-xl text-gray-500 font-bold flex justify-between'>{currentLanguage?.POE}</CardTitle>
              <div className="py-4">
                <div className="mt-4">
                  {(popularOptions?.length === 0 || popularOptions === null || popularOptions === undefined) ?
                    <div className="text-lg font-semibold">! No Tools Found</div> :
                    <div className="grid md:grid-cols-4 grid-cols-1 mt-4 gap-4">
                      {popularOptions?.map((item: any) => (
                        <Link className="border p-2 flex justify-center items-center flex-col" to={item?.linkUrl} key={item?.id}>
                          <div className="w-20  h-20 rounded-lg overflow-hidden border p-2 flex justify-center items-center shadow-lg">
                            <Image src={item?.iconUrl} className="w-auto" />
                          </div>
                          <div className="font-semibold text-xs mt-2 text-center">{item?.label}</div>
                        </Link>
                      ))}
                    </div>
                  }
                </div>
              </div>
            </DialogContent>
            <Card className="cursor-pointer">
              <DialogTrigger asChild>
                <CardHeader>
                  <CardTitle className="text-lg">{currentLanguage?.EX}</CardTitle>
                  <CardDescription><MoveRight className="inline" /></CardDescription>
                </CardHeader>
              </DialogTrigger>
            </Card>
          </Dialog>
        </div>


      </div>

      {/* REGISTER COMPLAINT BUTTON */}

      <div className="w-full flex justify-center items-center mt-10">
        <CitizenComplaintForm >
          <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-2 px-4 rounded border border-white shadow-xl hover:from-pink-500 hover:to-yellow-500">{currentLanguage?.RGN} </button>
        </CitizenComplaintForm>
      </div>

      {/* ═══════════════════════║ TRACKS ║══════════════════════════ */}
      {/* EMAIL BUTTON */}
      <div
        onClick={toggleIcons}
        className="w-14 h-14 bg-blue-600 text-white flex justify-center items-center rounded-full fixed bottom-5 right-10 cursor-pointer shadow-xl hover:scale-105 transition-all"
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
      </div>

      {/* Popup Icons */}
      {isOpen && (
        <div className="fixed bottom-20 right-10 flex flex-col gap-4 items-center">
          {/* Gmail Button */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-12 h-12 bg-background border rounded-full flex justify-center items-center shadow-xl">
                  {/* <Image onClick={openGmail} src="/images/gmail.png"  alt="Gmail" className="w-8 h-8 cursor-pointer hover:scale-105" /> */}
                  <Image
        src="/images/gmail.png"
        alt="Gmail"
        className="w-8 h-8 cursor-pointer hover:scale-105"
        onClick={() => navigate("/bug-log/citizen/citizen-grievance-via-email")}
      />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white text-xs">Receive via Gmail</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* WhatsApp Button */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-12 h-12 rounded-full flex justify-center items-center">
                  {/* <Image onClick={openWhatsapp} src="/images/whatsapp.png" alt="WhatsApp" className="w-12 h-12 cursor-pointer hover:scale-105" /> */}
                  <Image
        src="/images/whatsapp.png"
        alt="Gmail"
        className="w-12 h-12 cursor-pointer hover:scale-105"
        onClick={() => navigate("/bug-log/citizen/citizen-grievance-via-whatsapp")}
      />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white text-xs">Receive via WhatsApp</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Chatbot Button */}
          {/* <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-12 h-12 rounded-full flex justify-center items-center">
                  <SidePanel trigger={<Image src="/images/help2.png" alt="Chatbot" className="w-10 cursor-pointer hover:scale-105" />}>
                    <CardTitle className="mb-4 text-[#0D7538] text-lg">Ask me Anything?</CardTitle>
                    <Chatbot />
                  </SidePanel>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white text-xs">Chat with our bot</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      )}

    </div>

  )
}

