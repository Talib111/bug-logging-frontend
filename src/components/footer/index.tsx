import { Link } from "react-router-dom"
import { Image } from "@/components/image";
import { useAppContext } from "@/context";

export default function TopBar() {
        const { currentLanguage }:any = useAppContext()
    
    return (
        <footer className="bg-[#374151] text-white pt-10">
        <div className="container p-6 mx-auto">
            <div className="lg:flex">
                <div className="w-full -mx-6 lg:w-2/6">
                    <div className="px-6">
                        <Image
                            width={286.5}
                            height={323}
                            alt="manage"
                            className="w-60 hover:animate-pulse"
                            src="/images/mobile.png"
                        />
                        <p className="max-w-sm">
                          {currentLanguage?.YOU_DOWNLOAD}
                        </p>
                    </div>
                </div>
                <div className="mt-6 lg:mt-0 lg:flex-1">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div>
                            <h3 className=" uppercase font-semibold text-lg mb-2">
                            {currentLanguage?.IMPORTANT_LINKS}
                            </h3>
                            <div className="flex flex-col space-y-1.5  font-normal text-sm  opacity-80">
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://pgportal.gov.in/'}>  {currentLanguage?.NATIONAL_PORTAL_OF_INDIA}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://www.jharkhand.gov.in/'}> {currentLanguage?.STATE_PORTAL_OF_JHARKHAND}</Link>
                                {/* <Link target="_blank" className="link-underline link-underline-black" to={'http://ww25.cmjharkhand.in/'}>{currentLanguage?.STATE_PORTAL_OF_JHARKHAND_DUPLICATE}</Link> */}
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://jhpolice.gov.in/'}>{currentLanguage?.JHARKHAND_POLICE}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'http://prdjharkhand.in/iprd/'}>{currentLanguage?.MUKHYAMANTRI_JANSAMVAD}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'http://jsac.jharkhand.gov.in:8000/jan_samvad/'}>{currentLanguage?.IPRD}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://juidco.jharkhand.gov.in/'}>{currentLanguage?.JHARKHAND_LTD}</Link>
                            </div>
                        </div>
                        <div>
                            <h3 className=" uppercase font-semibold text-lg mb-2">
                            {currentLanguage?.USEFUL_LINKS}
                            </h3>
                            <div className="flex flex-col space-y-1.5  font-normal text-sm  opacity-80">
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://mohua.gov.in/'}> {currentLanguage?.MINISTRY_OF_URBAN_DEVELOPMENT}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'http://mhupa.gov.in/Default.aspx'}> {currentLanguage?.MINISTRY_OF_HOUSING_AND_URBAN_POVERTY_ALLEVIATION}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'http://smartcity.gov.in/'}> {currentLanguage?.SMART_CITY}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://sbmurban.org/'}> {currentLanguage?.SWACHH_BHARAT_MISSION_URBAN}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://www.ranchimunicipal.com/'}> {currentLanguage?.RANCHI_MUNICIPAL_CORPORATION}</Link>
                            </div>
                        </div>
                        <div>
                            <h3 className=" uppercase font-semibold text-lg mb-2">
                                {currentLanguage?.DEPARTMENT}
                            </h3>
                            <div className="flex flex-col space-y-1.5  font-normal text-sm  opacity-80">
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://mohua.gov.in/'}> {currentLanguage?.ABOUT_US}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'http://mhupa.gov.in/Default.aspx'}>{currentLanguage?.ULB_CONTACTS}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'http://smartcity.gov.in/'}>{currentLanguage?.SERVICES}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://swachhbharaturban.gov.in/ISNAHome.aspx'}>{currentLanguage?.SCHEMES}</Link>
                                <Link target="_blank" className="link-underline link-underline-black" to={'https://www.ranchimunicipal.com/'}>{currentLanguage?.VIDEOS}</Link>
                            </div>
                        </div>
                        <div>
                            <h3 className=" uppercase font-semibold text-lg mb-2">
                                {currentLanguage?.CONTACT}
                            </h3>
                            <div className="flex flex-col space-y-1.5  font-normal text-sm  opacity-80">
                                <div>{currentLanguage?.URBAN_DEVELOPMENT_HOUSING_DEPARTMENT}</div>
                                <div>{currentLanguage?.MPHONE}</div>
                                <div>{currentLanguage?.GMAIL}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

        </div>
        <div className="bg-[#111827] text-center text-xs font-semibold py-2">
            <span className="text-white">Terms & Conditions</span><span className="border-l border-l-white mx-2"></span>
            <span className="text-white">Privacy Policy</span><span className="border-l border-l-white mx-2"></span>
            <span className="text-white">© 2024-Bug-Tracking, GOJ version 1.0.0 </span>
        </div>
    </footer>
    )
}

