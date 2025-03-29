import { Image } from "@/components/image";
import { List, Mail, GlobeLock, MessageCircleMore, ChevronDown, PhoneCall, ArrowRightIcon, Phone, MessageCircle } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import SidePanel from "@/components/side-panel/SidePanel";
import TopBar from "@/components/top-bar";
import Footer from "@/components/footer";
import { grievanceAPI } from "@/lib";
import { useApi } from "@/hooks/useCustomQuery";
import Chatbot from "@/components/chatbot";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import CitizenComplaintForm from "@/pages/bug-log/citizen/citizen-complaint-form/CitizenComplaintForm"
import { I_USERS_TYPE_DETAILS } from "./type";
import checkJson from "./check.json";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Accessibility, PersonStanding, Users, Leaf, X } from "lucide-react"
import { SUGGESTION_TYPE, ENQUIRY_TYPE, COMPLAINT_TYPE } from '@/../config/complaintTypes.config'
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Chatbox from "@/components/chatbox";
import { useAppContext } from "@/context";

export default function LandingPage({ children, }: any) {
    const [loggedOutAnimation, setloggedOutAnimation] = useState<boolean>(false)
    const [isDialogOpen, setisDialogOpen] = useState<boolean>(true);
    const { currentLanguage } :any= useAppContext();

    // console.log('the glboal lanauage...', currentLanguage)


    const [isChatbotVisible, setIsChatbotVisible] = useState(false); // State to toggle the chatbot visibility


    const openWhatsapp = () => {
        const mobileNo = ''
        const message = ''
        window.open(`https://wa.me/${mobileNo}?text=${message}`, '_blank')
    }
    const openGmail = () => {
        // const email = "talibplay222@gmail.com"
        const email = "aadrikaent270@gmail.com"
        const subject = "Compalint registration"
        const body = `Dear Sir,
        --Write your complaint here--`
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`, '_blank')
    }

    //  ═══════════════════════║ THE API FETCHES COMPLAINTS BRIEF ║══════════════════════════ 
    const grievanceData = useApi<I_USERS_TYPE_DETAILS>({
        api: `${grievanceAPI.getComplaintBriefDirect}`,
        key: 'getComplaintBriefDirect',
        options: {
            enabled: true,
        },
    })

    const animateCheck = () => {

    }


    const iconData = [
        {
            icon: <Image src="/images/whatsapp.png" alt="WhatsApp" width={36} height={36} />,
            title: currentLanguage?.WHATSAPP,
            href: '/bug-log/citizen/citizen-grievance-via-whatsapp'
        },
        {
            icon: <Image src="/images/call.png" alt="Phone" width={36} height={36} />,
            title: currentLanguage?.PHONE,
            href: '/bug-log/citizen/citizen-grievance-via-phone'
        },
        {
            icon: <Image src="/images/gmail.png" alt="Email" width={36} height={36} />,
            title: currentLanguage?.EMAIL,
            href: '/bug-log/citizen/citizen-grievance-via-email'
        },
        {
            
            icon:<Image src="/images/chat-bot.png" onClick={()=> console.log("12345678")} alt="Chat Bot" width={36} height={36} />,
            title: currentLanguage?.CHATBOT,
            href: '#'
        }
    ]

    const options = [
        {
            icon: "/images/online.png",
            title: currentLanguage?.OPT_ONLINE,
            subtitle: currentLanguage?.OPST_ONLINE,
            href: "#",
        },
        {
            icon: "/images/whatsapp.png",
            title: currentLanguage?.OPT_WHATSAPP,
            subtitle: currentLanguage?.OPST_WHATSAPP,
            href: "/bug-log/citizen/citizen-grievance-via-whatsapp",
        },
        {
            icon: "/images/gmail.png",
            title: currentLanguage?.OPT_EMAIL,
            subtitle: currentLanguage?.OPST_EMAIL,
            href: "/bug-log/citizen/citizen-grievance-via-email",
        },
        {
            icon: "/images/call.png",
            title: currentLanguage?.OPT_PHONE,
            subtitle: currentLanguage?.OPST_PHONE,
            href: "/bug-log/citizen/citizen-grievance-via-phone",
        },
    ]

    useEffect(() => {
        setTimeout(() => {
            setloggedOutAnimation(false)
        }, 1600);

    }, [loggedOutAnimation])



    const toggleChatbot = () => {
        setIsChatbotVisible(!isChatbotVisible); // Toggle visibility
        setisDialogOpen(false)
    };


    return (
        <div className="relative bg-white">
            {/* ═══════════════════════║LOGGED OUT ANIMATION ║══════════════════════════ */}
            {loggedOutAnimation && <div style={{ zIndex: 1001 }} className="w-screen h-screen fixed top-0 left-0 bg-red-50 z-50 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <Lottie className="w-24" animationData={checkJson} loop={true} />
                    <div className="font-semibold">Successfully Logged Out.</div>
                </div>
            </div>}

            {/* ═══════════════════════║ HEADER 1 ║══════════════════════════ */}
            <TopBar setloggedOutAnimation={setloggedOutAnimation} />

            {/* ═══════════════════════║ HEADER 2 ║══════════════════════════ */}
            <div className='md:flex py-1 px-6 space-x-4 items-center hidden sm:block'>
                <div className="flex-initial">
                    <div className=" rounded-full border overflow-hidden">
                        <Image src="/images/cm.png" className="w-16 h-16" />
                    </div>
                </div>
                <div className="flex-initial">
                    <div className="capitalize font-semibold font-serif text-xl text-green-500">{currentLanguage?.Jharkhand_Integrated}</div>
                    <div className="flex gap-3"> <h1 className="text-lg font-serif font-semibold">{currentLanguage?.URBAN_DEV}</h1></div>
                </div>
                <div className="flex-1 flex justify-end">
                </div>
            </div>

            {/* ═══════════════════════║ SLIDER ║══════════════════════════ */}
            {/* <div className='relative' onClick={animateCheck}>
                <div className="hidden sm:block"><Image src="/images/slider.png" className="w-full " /></div>
                <div className="block sm:hidden"><Image src="/images/hero.png" className="h-[600px]" /></div>
                <div className="absolute bottom-0 w-full">
                    <div className="absolute bottom-0 w-auto flex ">
                        <div className="w-full h-full absolute bg-[#0D7538] left-0 top-0 opacity-80"></div>
                        <div className="flex w-auto h-auto z-50"
                        >
                            <div className="flex-initial flex flex-col justify-center items-center py-4 px-6 ">
                                <div className="font-semibold text-2xl text-white tracking-wider">{grievanceData?.data?.data?.grievanceReceived}</div>
                                <div className="text-xs text-white">Grievance Received</div>
                            </div>
                            <div className="border-l border-l-white"></div>
                            <div className="flex-initial flex flex-col justify-center items-center py-4 px-6 ">
                                <div className="font-semibold text-2xl text-white tracking-wider">{grievanceData?.data?.data?.grievanceResolved}</div>
                                <div className="text-xs text-white">Grievance Resolved</div>
                            </div>
                            <div className="border-l border-l-white"></div>
                            <div className="flex-initial flex flex-col justify-center items-center py-4 px-6 ">
                                <div className="font-semibold text-2xl text-white tracking-wider animate">{grievanceData?.data?.data?.grievancePending}</div>
                                <div className="text-xs text-white">Grievance Pending</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 bg-white h-full absolute top-0 right-0 rounded-tl-[500px] md:flex justify-center items-center flex-col space-y-2 pt-20 hidden sm:block">
                    <div className="flex justify-center items-center">
                        <div className="animate-bounce">
                            <ChevronDown className="inline" />
                        </div>
                    </div>

                    <div>
                        <CitizenComplaintForm>
                            <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-2 px-6 rounded border border-white shadow-xl hover:from-pink-500 hover:to-yellow-500 transition duration-300 ease-in-out">
                                Register Grievance Now
                            </button>
                        </CitizenComplaintForm>
                    </div>
                    <CardTitle>Do you have any query.</CardTitle>
                </div>

            </div> */}

            <div className='relative' onClick={animateCheck}>
                <div className="hidden sm:block"><Image src="/images/slider202.png" className="w-full" /></div>
                <div className="block sm:hidden"><Image src="/images/mb.png" className="h-[600px]" /></div>
                <div className="absolute bottom-0 w-full">
                    <div className="absolute bottom-0 w-auto flex ">
                        <div className="w-full h-full absolute bg-[#0D7538] left-0 top-0 opacity-80"></div>
                        <div className="flex w-auto h-auto z-50"
                        >
                            <div className="flex-initial flex flex-col justify-center items-center py-4 px-6 ">
                                <div className="font-semibold text-2xl text-white tracking-wider">{grievanceData?.data?.data?.grievanceReceived}</div>
                                <div className="text-xs text-white">{currentLanguage?.GR_REC}</div>
                            </div>
                            <div className="border-l border-l-white"></div>
                            <div className="flex-initial flex flex-col justify-center items-center py-4 px-6 ">
                                <div className="font-semibold text-2xl text-white tracking-wider">{grievanceData?.data?.data?.grievanceResolved}</div>
                                <div className="text-xs text-white">{currentLanguage?.GR_RES}</div>
                            </div>
                            <div className="border-l border-l-white"></div>
                            <div className="flex-initial flex flex-col justify-center items-center py-4 px-6 ">
                                <div className="font-semibold text-2xl text-white tracking-wider animate">{grievanceData?.data?.data?.grievancePending}</div>
                                <div className="text-xs text-white">{currentLanguage?.GR_PEN}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 bg-white h-full absolute top-0 right-0 rounded-tl-[500px] md:flex justify-center items-center flex-col space-y-2 pt-20 hidden sm:block">
                    <div className="flex justify-center items-center">
                        <div className="animate-bounce">
                            <ChevronDown className="inline" />
                        </div>
                    </div>

                    <div className="">
                        <CitizenComplaintForm>
                            <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-2 px-6 rounded border border-white shadow-xl hover:from-pink-500 hover:to-yellow-500 transition duration-300 ease-in-out">
                            {currentLanguage?.REISTER_GR_NOW}
                            </button>
                        </CitizenComplaintForm>
                    </div>
                    <CardTitle> {currentLanguage?.DO_YOU}</CardTitle>

                    <section className=" bg-gradient-to-r ">
                        <div className="container mx-auto px-4 mt-16">
                            <CardTitle className="text-center text-lg"> {currentLanguage?.YOU_CAN}</CardTitle>
                            <div className="flex justify-center">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                                    {iconData.map((item, index) => (
                                        <Link
                                        key={index}
                                        to={item.href}
                                        onClick={
                                            item.title === 'Chatbot' || item.title === 'चैटबोट'
                                                ? toggleChatbot
                                                : undefined
                                        }
                                        className="flex flex-col items-center group transition-transform duration-300 ease-in-out transform hover:scale-110"
                                    >
                                            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br  rounded-full shadow-lg mb-3 transition-colors duration-300 group-hover:from-green-500 group-hover:to-green-700">
                                                {typeof item.icon === 'string' ? (
                                                    <Image src={item.icon} alt={item.title} width={24} height={24} />
                                                ) : (
                                                    item.icon
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-green-700 group-hover:text-green-900">{item.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>



            {/* ═══════════════════════║ CLICKABLE CARDS ║══════════════════════════ */}
            {/* <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="block sm:hidden">
                        <CitizenComplaintForm>
                            <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-2 px-6 rounded border border-white shadow-xl hover:from-pink-500 hover:to-yellow-500 transition duration-300 ease-in-out">
                                Register Complaint Now
                            </button>
                        </CitizenComplaintForm>
                    </div>
                    <h1 className="mt-6 md:mt-0 text-xl font-semibold text-gray-800 dark:text-white lg:text-3xl mb-4 text-center">Complaint For Various Types</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="cursor-pointer group">

                            <CitizenComplaintForm complaintTypesFor={COMPLAINT_TYPE} complaintFor={"Complaint For Corruptions"}
                            //-------------------------------- This Id is refer to Corruptions Types
                            >
                                <Card className="h-full bg-card group:bg-card/90 transition-colors">
                                    <CardHeader className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                            <Accessibility className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl">Complaint For Corruptions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <span className="text-sm text-[#99B37C] group-hover:underline">Explore</span>
                                    </CardContent>
                                </Card>
                            </CitizenComplaintForm >
                        </div>
                        <div className="cursor-pointer group">
                            <CitizenComplaintForm complaintTypesFor={ENQUIRY_TYPE} complaintFor={"General Enquiry"}
                            //------------------------------- This Id is refer to Enquiry Types
                            >
                                <Card className="h-full bg-card hover:bg-card/90 transition-colors">
                                    <CardHeader className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                            <PersonStanding className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl">General Enquiry</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <span className="text-sm text-[#99B37C] group-hover:underline">Explore</span>
                                    </CardContent>
                                </Card>
                            </CitizenComplaintForm>
                        </div>
                        <div className="cursor-pointer group">
                            <CitizenComplaintForm complaintTypesFor={COMPLAINT_TYPE} complaintFor={"Service Complaint"}
                            // ------------------------------ This Id is refer to Corruptions Types
                            >
                                <Card className="h-full bg-card hover:bg-card/90 transition-colors">
                                    <CardHeader className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                            <Users className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl">Service Complaint</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <span className="text-sm text-[#99B37C] group-hover:underline">Explore</span>
                                    </CardContent>
                                </Card>
                            </CitizenComplaintForm>
                        </div>
                        <div className="cursor-pointer group">
                            <CitizenComplaintForm complaintTypesFor={SUGGESTION_TYPE} complaintFor={"Suggestions"}
                            //------------------------------ This Id is refer to Suggestions Types
                            >
                                <Card className="h-full bg-card hover:bg-card/90 transition-colors">
                                    <CardHeader className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                            <Leaf className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl">Suggestions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <span className="text-sm text-[#99B37C] group-hover:underline">Explore</span>
                                    </CardContent>
                                </Card>
                            </CitizenComplaintForm>
                        </div>
                    </div>
                </div>
            </section> */}




            {/* <div className="w-1/2 mx-auto">
                <Separator />
            </div> */}

            <section className="w-full py-12 ">
                <div className="container px-4 md:px-6">
                    <div className="block sm:hidden">
                        <CitizenComplaintForm>
                            <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-2 px-6 rounded border border-white shadow-xl hover:from-pink-500 hover:to-yellow-500 transition duration-300 ease-in-out">
                                Register grievance  Now
                            </button>
                        </CitizenComplaintForm>
                    </div>
                    {/* <h1 className="mt-6 md:mt-0 text-xl font-semibold text-gray-800 dark:text-white lg:text-3xl mb-4 text-center">Grievance For Various Types</h1> */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="cursor-pointer group">

                            <CitizenComplaintForm complaintTypesFor={COMPLAINT_TYPE} complaintFor={"Complaint For Corruptions"}
                            //-------------------------------- This Id is refer to Corruptions Types
                            >
                                <Card className="h-full bg-card group:bg-card/90 transition-colors">
                                    <CardHeader className="flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                            <Accessibility className="h-6 w-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl">{currentLanguage?.GREVINCE_REG}</CardTitle>
                                        <h1 className="mt-2 text-sm font-semibold text-gray-600">
                                            {currentLanguage?.TRACK_GEV_DES}
                                        </h1>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-center">
                                        <Button className="bg-green-800">
                                            <span className="text-sm text-white group-hover:underline">{currentLanguage?.EX}</span>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CitizenComplaintForm >
                        </div>
                        <div className="cursor-pointer group">
                            {/* <CitizenComplaintForm complaintTypesFor={ENQUIRY_TYPE} complaintFor={"General Enquiry"}
                            //------------------------------- This Id is refer to Enquiry Types
                            > */}
                            <Link to={`/bug-log/citizen/citizen-track-complaint`}>   <Card className="h-full bg-card hover:bg-card/90 transition-colors">
                                <CardHeader className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                        <PersonStanding className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl">{currentLanguage?.TRACK_GEV}</CardTitle>
                                    <h1 className="mt-2 font-semibold text-gray-600  text-sm"> {currentLanguage?.TRACK_GEV_DES}</h1>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center">
                                    <Button className="bg-green-800">
                                        <span className="text-sm text-white group-hover:underline">{currentLanguage?.EX}</span>
                                    </Button>
                                </CardContent>
                            </Card></Link>
                            {/* </CitizenComplaintForm> */}
                        </div>
                        <div className="cursor-pointer group">
                            {/* <CitizenComplaintForm complaintTypesFor={COMPLAINT_TYPE} complaintFor={"Service Complaint"}
                            // ------------------------------ This Id is refer to Corruptions Types
                            > */}
                            <Link to={`/bug-log/citizen/citizen-send-reminder`}>  <Card className="h-full bg-card hover:bg-card/90 transition-colors">
                                <CardHeader className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl">{currentLanguage?.SEND_REM}</CardTitle>
                                    <h1 className="mt-2 font-semibold text-gray-600  text-sm">{currentLanguage?.SEND_REM_DES}</h1>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center">
                                    <Button className="bg-green-800">
                                        <span className="text-sm text-white group-hover:underline">{currentLanguage?.EX}</span>
                                    </Button>
                                </CardContent>
                            </Card></Link>
                            {/* </CitizenComplaintForm> */}
                        </div>
                        <div className="cursor-pointer group">
                            {/* <CitizenComplaintForm complaintTypesFor={SUGGESTION_TYPE} complaintFor={"Suggestions"}
                            //------------------------------ This Id is refer to Suggestions Types
                            > */}
                            <Link to={`/bug-log/citizen/citizen-review`}>  <Card className="h-full bg-card hover:bg-card/90 transition-colors">
                                <CardHeader className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-[#99B37C] flex items-center justify-center mb-4 group-hover:bg-[#99B37C]/60 transition-colors">
                                        <Leaf className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl">{currentLanguage?.GIVE_FEED}</CardTitle>
                                    <h1 className="mt-2 font-semibold text-gray-600  text-sm">{currentLanguage?.GIVE_FEED_DES}</h1>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center">
                                    <Button className="bg-green-800">
                                        <span className="text-sm text-white group-hover:underline">{currentLanguage?.EX}</span>
                                    </Button>
                                </CardContent>
                            </Card></Link>
                            {/* </CitizenComplaintForm> */}
                        </div>
                    </div>
                </div>
            </section>


            <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-100">
                    <DialogHeader className="p-6 pb-0">
                        <CardTitle className="text-xl text-gray-700 font-bold flex justify-between items-center  text-center">
                            <div className=" w-full">
                                {currentLanguage?.MODAL_TITLE}
                            </div>
                            <button
                                onClick={() => setisDialogOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </CardTitle>
                    </DialogHeader>

                    <div className="p-6 space-y-6">
                        <div className="text-center">
                            <CitizenComplaintForm>
                                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                                {currentLanguage?.REISTER_GR_NOW}
                                </button>
                            </CitizenComplaintForm>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-gray-700 font-semibold text-center">
                            {currentLanguage?.YOU_CAN}
                            </h2>
                            {/* <div className="flex justify-center gap-8">
                                {[
                                    { icon: <PhoneCall className="w-8 h-8" />, link: '/bug-log/citizen/citizen-grievance-via-phone', label: 'Phone' },
                                    { icon: '/images/whatsapp.png', link: '/bug-log/citizen/citizen-grievance-via-whatsapp', label: 'WhatsApp' },
                                    { icon: '/images/gmail.png', link: '/bug-log/citizen/citizen-grievance-via-email', label: 'Email' },
                                    { icon: 'chatbott', link: '#', label: 'Chatbot' },
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-2">
                                        {item?.icon==='chatbott' && <div>
                                            <Image src='/images/chat-bot.png' alt={item.label} width={32} height={32} className="w-8 h-8" />
                                            <span className="text-sm text-gray-600">{item.label}</span>
                                            </div>}
                                       { item?.icon!=='chatbott' &&<Link to={item.link} target='_blank' className="hover:opacity-80 transition-opacity duration-200">
                                            {typeof item.icon === 'string' ? (
                                                <Image src={item.icon} alt={item.label} width={32} height={32} className="w-8 h-8" />
                                            ) : (
                                                item.icon
                                            )}
                                            <span className="text-sm text-gray-600">{item.label}</span>
                                        </Link>}
                                    </div>
                                ))}

                            </div> */}

                            <div className="flex justify-center gap-8">
                                {[
                                    { icon: <PhoneCall className="w-8 h-8" />, link: '/bug-log/citizen/citizen-grievance-via-phone', label:   currentLanguage?.PHONE },
                                    { icon: '/images/whatsapp.png', link: '/bug-log/citizen/citizen-grievance-via-whatsapp', label: currentLanguage?.WHATSAPP },
                                    { icon: '/images/gmail.png', link: '/bug-log/citizen/citizen-grievance-via-email', label:currentLanguage?.EMAIL },
                                    { icon: 'chatbott', link: '#', label: currentLanguage?.CHATBOT },
                                ].map((item, index) => (
                                    <div key={index} className="flex flex-col items-center space-y-2">
                                        {item?.icon === 'chatbott' && (
                                            <div onClick={toggleChatbot} className="cursor-pointer">
                                                <Image src='/images/chat-bot.png' alt={item.label} width={32} height={32} className="w-8 h-8" />
                                                <span className="text-sm text-gray-600">{item.label}</span>
                                            </div>
                                        )}
                                        {item?.icon !== 'chatbott' && (
                                            <Link to={item.link} target='_blank' className="hover:opacity-80 transition-opacity duration-200">
                                                {typeof item.icon === 'string' ? (
                                                    <Image src={item.icon} alt={item.label} width={32} height={32} className="w-8 h-8" />
                                                ) : (
                                                    item.icon
                                                )}
                                                <span className="text-sm text-gray-600">{item.label}</span>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>


                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            </Dialog>


            {isChatbotVisible && (
                <div className="chatbot-container mt-8 p-4 bg-white shadow-lg rounded-lg">
                    {/* Render your chatbot component here */}
                    <Chatbox status={true} />{/* Pass the relevant props to your chatbot */}
                </div>
            )}

            {/* ═══════════════════════║ TRACKS ║══════════════════════════ */}
            {/* EMAIL BUTTON */}
            {/* <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-12 h-12 bg-background border rounded-full fixed bottom-28 right-10 flex justify-center items-center shadow-xl">
                            <Image onClick={openGmail} src="/images/gmail.png" className="w-8 h-8 cursor-pointer hover:scale-105" />
                        </div>

                    </TooltipTrigger>

                    <TooltipContent className="bg-black">
                        <p>Register grievance via email.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider> */}

            {/* WHATSAPP BUTTON */}
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-12 h-12 rounded-full fixed bottom-12 right-10 flex justify-center items-center">
                            <Chatbox status={false} />
                        </div>
                    </TooltipTrigger>

                    {/* <TooltipContent className="bg-black">
                        <p>Register grievance via chatbot.</p>
                    </TooltipContent> */}
                </Tooltip>
            </TooltipProvider>


            {/* CHATBOT BUTTON */}
            {/* <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-12 h-12  rounded-full fixed bottom-12 right-10 flex justify-center items-center ">
                            <SidePanel trigger={<Image src="/images/help2.png" className="w-10 cursor-pointer hover:scale-105 " />}>
                                <CardTitle className='mb-4 text-[#0D7538] text-lg'>Ask me Anything ?</CardTitle>
                                <Chatbot />
                            </SidePanel>
                        </div>
                    </TooltipTrigger>

                    <TooltipContent className="bg-black">
                        <p>Click to ask questions</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider> */}



            <div className=" mt-2  bg-gray-50">

                <div className="flex justify-center md:w-9/12 mx-auto ">
                    <div>
                        <div >
                            <h2 className="text-3xl md:text-4xl font-bold text-center mt-6 mb-6 text-gray-800">
                                {currentLanguage?.ABOUT_JHARKAND}
                            </h2>
                        </div>
                        <div className="mx-10">
                            <p className="mb-4">
                                {currentLanguage?.ABOUT_JHARKAND_DES_1}
                            </p>
                            <p>
                                {currentLanguage?.ABOUT_JHARKAND_DES_2}
                            </p>

                        </div>
                        <div>
                            <div className="md:flex  mx-auto justify-evenly space-y-3 items-center mt-6 mb-12 py-5">
                                <div className="flex-initial text-center">
                                    <h1 className="text-lg font-semibold font-serif">{currentLanguage?.CM}</h1>
                                    <div className="rounded-full border overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                                        <Image src="/images/cm.png" alt="Chief Minister" width={128} height={128} className="object-cover" />
                                    </div>
                                    <h1 className="text-sm font-semibold"> {currentLanguage?.CM_NAME}</h1>
                                </div>



                                <div className="flex-initial text-center">
                                    <h1 className="text-lg font-semibold font-serif">{currentLanguage?.MUDHD}</h1>
                                    <div className="rounded-full border overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                                        <Image src="/images/mn.png" alt="Minister" width={128} height={128} className="object-cover" />
                                    </div>
                                    <h1 className="text-sm font-semibold">{currentLanguage?.MINISTER}</h1>
                                </div>

                                <div className="flex-initial text-center z-0">
                                    <h1 className="text-lg font-semibold font-serif z-0">{currentLanguage?.SUDHD}</h1>
                                    <div className="rounded-full border overflow-hidden mx-auto w-32 h-32 bg-gray-200 z-0">
                                        <Image src="/images/secretary.png" alt="Secretary" width={128} height={128} className="object-cover z-0" />
                                    </div>
                                    <h1 className="text-sm font-semibold z-0">{currentLanguage?.SECRETARY} , IAS</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 ">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-800">
                        About Jharkhand Public Grievance Redressal System
                    </h2>

                    <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
                        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6 flex-col items-center  h-full py-10">
                            <blockquote className="text-gray-700 text-sm leading-relaxed">
                                <p className="mb-4">
                                    The Jharkhand Public Grievance Redressal System is an online platform that empowers citizens to express their concerns and grievances related to various government services. The system enables residents to easily lodge grievance  about issues such as housing life, property disputes, water supply problems, waste management, road conditions, and noise pollution.
                                </p>
                                <p>
                                    Once a grievance  is registered, it is tracked and forwarded to the concerned department for resolution. The system ensures that every grievance is addressed in a timely manner, promoting transparency and accountability. Citizens can also monitor the progress of their grievance  and receive updates about the actions taken by the authorities.
                                </p>
                            </blockquote>

                            <div className="md:flex  mx-auto justify-evenly space-y-3 items-center mt-6">
                                <div className="flex-initial text-center">
                                    <h1 className="text-lg font-semibold font-serif">Chief Minister</h1>
                                    <div className="rounded-full border overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                                        <Image src="/images/cm.png" alt="Chief Minister" width={128} height={128} className="object-cover" />
                                    </div>
                                    <h1 className="text-sm font-semibold"> Shri  Hemant Soren</h1>
                                </div>



                                <div className="flex-initial text-center">
                                    <h1 className="text-lg font-semibold font-serif">Minister (UD&HD)</h1>
                                    <div className="rounded-full border overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                                        <Image src="/images/mn.png" alt="Minister" width={128} height={128} className="object-cover" />
                                    </div>
                                    <h1 className="text-sm font-semibold">Shri Sudivya Kumar</h1>
                                </div>

                                <div className="flex-initial text-center">
                                    <h1 className="text-lg font-semibold font-serif">Secretary (UD&HD)</h1>
                                    <div className="rounded-full border overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                                        <Image src="/images/secretary.png" alt="Secretary" width={128} height={128} className="object-cover" />
                                    </div>
                                    <h1 className="text-sm font-semibold">Shri Sunil Kumar, IAS</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>




            {/* ════════════ COMPLAINT ENTRY SOURCE   ═════════════════ */}
            <div className="container px-6 pt-6 md:pt-2 mx-auto mt-10">
                <h1 className="mt-6 md:mt-0 text-xl font-semibold text-gray-800 dark:text-white lg:text-3xl mb-4 px-10">
                    {currentLanguage?.GREVI_REG_MED}
                </h1>
                <div className="items-center lg:flex justify-center">
                    <div className="flex justify-center items-center block sm:hidden ">
                        <Image
                            width={142}
                            height={154}
                            className="w-40"
                            src="/images/medium5.png"
                            alt="email illustration vector art"
                        />

                    </div>

                    <div className="w-full lg:w-1/2 md:pl-20">
                        <div className="lg:max-w-lg">


                            {/* BENEFITS ROW  */}
                            <div className="flex space-x-4">
                                <div className="flex-initial">
                                    <div className="bg-[#99B37C] w-10 h-10 rounded-full flex justify-center items-center border-2 border-white shadow-xl">
                                        <List className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h1 className="font-semibold">{currentLanguage?.ONLINE}</h1>
                                    <p className="font-semibold text-sm text-gray-500">
                                        {currentLanguage?.ONLINE_DES}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-4 mt-4">
                                <div className="flex-initial">
                                    <div className="bg-[#99B37C] w-10 h-10 rounded-full flex justify-center items-center border-2 border-white shadow-xl">
                                        <List className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h1 className="font-semibold">  {currentLanguage?.WP_CHATBOT}</h1>
                                    <p className="font-semibold text-sm text-gray-500">
                                        {currentLanguage?.WP_CHATBOT_DES}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex space-x-4 mt-4">
                                <div className="flex-initial">
                                    <div className="bg-[#99B37C] w-10 h-10 rounded-full flex justify-center items-center border-2 border-white shadow-xl">
                                        <List className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h1 className="font-semibold"> {currentLanguage?.EMAIL}</h1>
                                    <p className="font-semibold text-sm text-gray-500">
                                        {currentLanguage?.EMAIL_DES}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <div className="flex-initial">
                                    <div className="bg-[#99B37C] w-10 h-10 rounded-full flex justify-center items-center border-2 border-white shadow-xl">
                                        <List className="text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h1 className="font-semibold">Phone Call</h1>
                                    <p className="font-semibold text-sm text-gray-500">
                                        {currentLanguage?.PHONE_DES}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full lg:mt-0 lg:w-1/2  hidden sm:block">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto p-10">
                            {options.map((option, index) => (
                                <Link key={index} to={option.href}>
                                    <div className="">
                                        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                            <CardContent className="flex flex-col items-center p-6">
                                                <div className="w-10 h-10 mb-4 relative">
                                                    <Image
                                                        src={option.icon}
                                                        alt={option.title}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {option.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 text-center">
                                                    {option.subtitle}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            {/* ════════════ TESTIMONIALS CONTAINER   ═════════════════ */}


            {/* ════════════ COMPLAINT STEPS CONTAINER   ═════════════════ */}
            <div className="container px-6 py-24 mx-auto ">
                <div className="items-center lg:flex mt-16">
                    <div className=" w-full lg:w-1/2 md:pl-20">
                        <h1 className="mt-6 md:mt-0 text-xl font-semibold text-gray-800 dark:text-white lg:text-3xl mb-4">
                            {currentLanguage?.SUPPORT_HEADING}
                        </h1>
                        <Tabs defaultValue="ONLINE" className="w-full md:w-[500px]">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="ONLINE">{currentLanguage?.ONLINE}</TabsTrigger>
                                <TabsTrigger value="Whatsapp">{currentLanguage?.WHATSAPP}</TabsTrigger>
                                <TabsTrigger value="Email">{currentLanguage?.EMAIL}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="ONLINE">
                                <Card>
                                    <CardTitle className="px-6 py-2 text-indigo-500 flex items-center"><GlobeLock size={20} className="text-indigo-500 inline mr-2" />{currentLanguage?.STRGO}</CardTitle>
                                    <CardTitle className="px-6 py-2  flex items-center"> {currentLanguage?.STEP1}</CardTitle>
                                    <CardContent> {currentLanguage?.STEP1_DESC}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.STEP2}</CardTitle>
                                    <CardContent>{currentLanguage?.STEP2_DESC}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.STEP3}</CardTitle>
                                    <CardContent>{currentLanguage?.STEP3_DESC}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.STEP4}</CardTitle>
                                    <CardContent>{currentLanguage?.STEP34_DESC}</CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="Whatsapp">
                                <Card>
                                    <CardTitle className="px-6 py-2 text-green-500 flex items-center"><MessageCircleMore size={20} className="text-green-500 inline mr-2" />{currentLanguage?.STRGWC}</CardTitle>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.WP_SEC_ST}</CardTitle>
                                    <CardContent>{currentLanguage?.WA_SM}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.GR_SR}</CardTitle>
                                    <CardContent>{currentLanguage?.CB_PR}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.PD_DT}</CardTitle>
                                    <CardContent>{currentLanguage?.CB_GC}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.CS_SB}</CardTitle>
                                    <CardContent>{currentLanguage?.CB_CM}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.TY_GR}</CardTitle>
                                    <CardContent>{currentLanguage?.GN_TR}</CardContent>

                                </Card>
                            </TabsContent>
                            <TabsContent value="Email">
                                <Card>
                                    <CardTitle className="px-6 py-2 text-red-500 flex items-center"><Mail size={20} className="text-red-500 inline mr-2" />{currentLanguage?.ER_GR}</CardTitle>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.S1_SE}</CardTitle>
                                    <CardContent>{currentLanguage?.EM_GR}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.PD_GR}</CardTitle>
                                    <CardContent>{currentLanguage?.EM_DT}
                                        
                                    </CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.RN_GR}</CardTitle>
                                    <CardContent>{currentLanguage?.EM_CN}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.TY_GR_A}</CardTitle>
                                    <CardContent>{currentLanguage?.GR_ST}</CardContent>
                                    <CardTitle className="px-6 py-2  flex items-center">{currentLanguage?.GR_RN}</CardTitle>
                                    <CardContent>{currentLanguage?.GR_RC}</CardContent>

                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="md:flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2 z-0">
                        <Image
                            width={500}
                            height={508}
                            className="z-0"
                            src="/images/support.png"
                            alt="email illustration vector art"
                        />
                    </div>
                </div>
            </div>


            {/* ════════════ FOOTER CONTAINER   ═════════════════ */}
            <Footer />
        </div >
    )
}
