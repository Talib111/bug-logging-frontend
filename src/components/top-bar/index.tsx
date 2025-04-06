import { LifeBuoy, LogIn, LogOut, AlignLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import SidePanel from '@/components/side-panel/SidePanel'
import { useNavigate } from 'react-router-dom'
import { CardTitle } from '@/components/ui/card'
import Recentpdates from '@/components/recent-updates'
import { googleLogout } from '@react-oauth/google'
import Accessibility from '@/components/accessibility'
import ChangeLanguage from '@/components/changeLanguage'
import { SheetClose } from '../ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/custom/button'
import { Image } from '@/components/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppContext } from '@/context'
import { Confirm } from '@/components/confirm-box'
import { getRedirect } from '@/lib'
import CitizenSidebar from '@/components/citizenSidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'

export default function TopBar({ setloggedOutAnimation }: any) {
  const navigate = useNavigate()
  const {
    isAuthenticated,
    logout,
    currentLanguage,
    setcurrentLanguage,
    languageKey,
    setlanguageKey,
    user,
  }: any = useAppContext()
  const pathName = window.location.pathname
  const Logout = () => {
    Confirm('Do you want to logout?', 'Please confirm', async () => {
      googleLogout()
      logout()
      setloggedOutAnimation(true)
    })
  }
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()

  const quickToolOptions = [
    {
      id: 1,
      label: currentLanguage?.G_T,
      href: '/bug-log/citizen/tools?type=general',
    },
    {
      id: 2,
      label: currentLanguage?.PT_TL,
      href: '/bug-log/citizen/tools?type=property',
    },
    {
      id: 3,
      label: currentLanguage?.WT_TL,
      href: '/bug-log/citizen/tools?type=water',
    },
    {
      id: 4,
      label: currentLanguage?.TRADE_TOOLS,
      href: '/bug-log/citizen/tools?type=trade_License',
    },
    {
      id: 5,
      label: currentLanguage?.SEPTIC_TANK_CLEANING_TOOLS,
      href: '/bug-log/citizen/tools?type=septic_Tank_Cleaning',
    },
    {
      id: 6,
      label: currentLanguage?.PET_REGISTRATION,
      href: '/bug-log/citizen/tools?type=pet_Registration',
    },
    {
      id: 7,
      label: currentLanguage?.WT_BK_TL,
      href: '/bug-log/citizen/tools?type=water_Tanker_Booking',
    },
    {
      id: 8,
      label: currentLanguage?.ADVERTISEMENT_TAX,
      href: '/bug-log/citizen/tools?type=advertisement_Tax',
    },
    {
      id: 9,
      label: currentLanguage?.LB_REG_TL,
      href: '/bug-log/citizen/tools?type=lodge_And_Banquet_Registration',
    },
    {
      id: 10,
      label: currentLanguage?.SW_UC_TL,
      href: '/bug-log/citizen/tools?type=solid_Waste_User_Charge',
    },
    {
      id: 11,
      label: currentLanguage?.MARRIAGE_REGISTRATION,
      href: '/bug-log/citizen/tools?type=marriage_Registration',
    },
    {
      id: 12,
      label: currentLanguage?.PT_CB_TL,
      href: '/bug-log/citizen/tools?type=public_Transport_City_Bus',
    },
    {
      id: 13,
      label: currentLanguage?.PARKING_MANAGEMENT,
      href: '/bug-log/citizen/tools?type=parking_Management',
    },
    {
      id: 14,
      label: currentLanguage?.RM_REG_TL,
      href: '/bug-log/citizen/tools?type=Rig_Machine_Registration',
    },
    {
      id: 15,
      label: currentLanguage?.HRMS_AND_PAYROLL,
      href: '/bug-log/citizen/tools?type=hrms_And_Payroll',
    },
  ]

  const quickTrackOptions = [
    {
      id: 1,
      label: currentLanguage?.PROPERTY_STATUS,
      href: '/bug-log/citizen/track-status?type=property',
    },
    {
      id: 2,
      label: currentLanguage?.WATER_STATUS,
      href: '/bug-log/citizen/track-status?type=water',
    },
    {
      id: 3,
      label: currentLanguage?.TRADE_STATUS,
      href: '/bug-log/citizen/track-status?type=trade_License',
    },
    {
      id: 4,
      label: currentLanguage?.RIG_STATUS,
      href: '/bug-log/citizen/track-status?type=Rig_Machine_Registration',
    },
    {
      id: 5,
      label: currentLanguage?.PET_STATUS,
      href: '/bug-log/citizen/track-status?type=pet_Registration',
    },
    {
      id: 6,
      label: currentLanguage?.SWM_STATUS,
      href: '/bug-log/citizen/track-status?type=solid_Waste_User_Charge',
    },
    {
      id: 7,
      label: currentLanguage?.LODGE_BANQUET_STATUS,
      href: '/bug-log/citizen/track-status?type=lodge_And_Banquet_Registration',
    },
    {
      id: 8,
      label: currentLanguage?.WATER_TANKER_STATUS,
      href: '/bug-log/citizen/track-status?type=water_Tanker_Booking',
    },
    {
      id: 9,
      label: currentLanguage?.SEPTIC_STATUS,
      href: '/bug-log/citizen/track-status?type=septic_Tank_Cleaning',
    },
  ]

  const sideBarData = [
    {
      id: '1',
      label: currentLanguage?.TRACK_GR,
      path: '/bug-log/citizen/citizen-track-complaint',
      isWeb: false,
    },
    {
      id: '2',
      label: 'Give Feedback',
      path: '/bug-log/citizen/citizen-review',
      isWeb: false,
    },
    {
      id: '3',
      label: 'Citizen Feedback',
      path: '/bug-log/citizen/citizen-testimonials',
      isWeb: false,
    },
    {
      id: '4',
      label: 'ULB Wise Ward List',
      path: '/bug-log/citizen/zone-ward-list',
      isWeb: false,
    },
    {
      id: '5',
      label: 'Privacy Policy',
      path: '/bug-log/citizen/privacy-policy',
      isWeb: false,
    },
    {
      id: '6',
      label: 'FAQ',
      path: '/bug-log/citizen/citizen-faq',
      isWeb: false,
    },
  ]
  const handleChange = (event: any) => {
    const selectedLanguage = event.target.value
    // setcurrentLanguage(MyLanguage(selectedLanguage))
    // setlanguageKey(selectedLanguage)
  }
  console.log(currentLanguage?.KY_WD)
  console.log(currentLanguage?.LANGUAGE)

  // console.log("================================",currentLanguage);

  return (
    <>
      <div className='flex items-center space-x-2 px-2 py-1 md:hidden'>
        <div className='flex-initial'>
          {typeof window !== 'undefined' &&
            !(window as any).ReactNativeWebView && (
              <SidePanel
                side='left'
                trigger={
                  <AlignLeft size={30} className='inline text-green-500' />
                }
              >
                <CardTitle className='mb-4 text-lg text-[#0D7538]'>
                  Sidebar
                </CardTitle>
                <div className='flex'>
                  <div className='h-screen w-64 '>
                    <nav className='space-y-2'>
                        <button
                          className='w-full bg-gray-50 p-2 text-left'
                          onClick={() => navigate('/')}
                        >
                          {' '}
                          Home
                        </button>
                      {sideBarData.map((button, index) => (
                        <SheetClose asChild key={button?.id}>
                          <button
                            key={index + 1}
                            className='w-full bg-gray-50 p-2 text-left'
                            onClick={() => {
                              navigate(button?.path)
                            }}
                          >
                            {button?.label}
                          </button>
                        </SheetClose>
                      ))}

                      <h1 className='group relative'>
                        <h1 className='link-underline link-underline-black flex h-full w-full items-center bg-gray-50 p-2 pl-2'>
                          Quick Tools
                        </h1>
                        <div className='absolute z-10 mt-0 hidden h-72 w-full overflow-auto rounded-md bg-white text-black shadow-lg group-hover:block '>
                          <SheetClose asChild>
                            <ul className='py-2 text-left '>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=general'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    General Tools
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=property'
                                  )
                                }
                              >
                                <li className='w-full px-4 py-2 text-left hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2 text-left'>
                                    Property Tools
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=water'
                                  )
                                }
                              >
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Water Tools
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=trade_License'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Trade Tools
                                  </span>
                                </li>
                              </button>

                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=septic_Tank_Cleaning'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Septic Tank Cleaning
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=pet_Registration'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Pet Registration
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=water_User_Charge'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Water User Charge
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=advertisement_Tax'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Advertisement Tax
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=solid_Waste_User_Charge'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Solid Waste User Charge
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=lodge_And_Banquet_Registration'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Lodge And Banquet
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=marriage_Registration'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Marriage Registration
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=public_Transport_City_Bus'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Public Transport City Bus
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=parking_Management'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Parking Management
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=Rig_Machine_Registration'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    Rig Machine Registration
                                  </span>
                                </li>
                              </button>
                              <button
                                onClick={() =>
                                  navigate(
                                    '/bug-log/citizen/tools?type=hrms_And_Payroll'
                                  )
                                }
                              >
                                {' '}
                                <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                                  <span className='w-full cursor-pointer py-2'>
                                    HRMS And Payroll
                                  </span>
                                </li>
                              </button>
                            </ul>
                          </SheetClose>
                        </div>
                      </h1>
                    </nav>
                  </div>

                  <div className='flex-grow p-4'></div>
                </div>
              </SidePanel>
            )}

          {typeof window !== 'undefined' &&
            (window as any).ReactNativeWebView && (
              <CitizenSidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            )}
        </div>
        {typeof window !== 'undefined' &&
          !(window as any).ReactNativeWebView && (
            <>
              <div className='flex-initial'>
                <div className='font-semibold capitalize'>
                  Bug & Enahacement Logger
                </div>
              </div>
              <div className='flex flex-1 justify-end space-x-2'>
                <Link to='/bug-log/auth/citizen-sign-up'>
                  <Button variant='secondary'>Signup</Button>
                </Link>
                <Link to='/bug-log/auth/citizen-login'>
                  <Button className='bg-gradient-to-r from-yellow-500 to-red-500 text-white'>
                    {currentLanguage?.LOG_IN}
                  </Button>
                </Link>
              </div>
            </>
          )}

        {/* <div className="flex-initial">
                    <div className="capitalize font-semibold ">Jharkhand Integrated Public Greivance </div>
                    <div className="capitalize text-xs text-gray-600  font-semibold">Redressal System</div>
                </div>
                <div className="flex-1 flex justify-end space-x-2">
                    <Link to={'/bug-log/auth/citizen-sign-up'}>
                        <Button variant={'secondary'} className="">Singup</Button>
                    </Link>
                    <Link to={'/bug-log/auth/citizen-login'}>
                        <Button className="bg-gradient-to-r from-yellow-500 to-red-500    text-white">{currentLanguage?.LOG_IN} </Button>
                    </Link>
                </div> */}
      </div>
      <div className='hidden h-auto w-full space-x-4 bg-[#99B37C] px-6 py-2 text-sm text-white sm:block md:flex'>
        <div>
          <Link
            to={'/bug-log/auth/login'}
            className='flex h-full flex-initial items-center '
          >
            {currentLanguage?.GOVT_JH}
          </Link>
        </div>
        <div className='flex-initial border-l border-l-white'></div>
        <div>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={'https://maps.app.goo.gl/HFBxeoz9qYmKWE3z8'}
                  target='_blank'
                  className='flex h-full flex-initial items-center '
                >
                  <Image className='w-5' src='/images/pin.svg' />
                </Link>
              </TooltipTrigger>
              <TooltipContent className='bg-black'>
                <p>Nearest Jan Seva Kendra</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <Link
            to={'/bug-log/auth/login'}
            className='flex h-full flex-initial items-center '
          >
            {currentLanguage?.HELPLINE_NO}
          </Link>
        </div>
        <div className='flex flex-1 justify-end space-x-2'>
          <Link
            className='link-underline link-underline-black flex items-center'
            to={getRedirect(user?.role)}
          >
            <span className='cursor-pointer  px-2'>
              {currentLanguage?.HOME}
            </span>
          </Link>
          <div className='flex-initial border-l border-l-white'></div>

          <div className='flex-initial border-l border-l-white'></div>

          <Link
            className='link-underline link-underline-black flex items-center'
            to={'/bug-log/citizen/citizen-track-complaint'}
          >
            <span className='cursor-pointer  px-2 '>
              {currentLanguage?.TRACK_GR}
            </span>
          </Link>
          <div className='flex-initial border-l border-l-white'></div>

          <div className='group relative'>
            <div className='group relative'>
              <button className='link-underline link-underline-black mt-2 flex h-full items-center px-4'>
                {currentLanguage?.MODULE_STATUS}
              </button>
              <div className='absolute z-10 mt-0 hidden w-60 rounded-md bg-white text-black shadow-lg group-hover:block'>
                <ul className=' text-left'>
                  {quickTrackOptions?.map((item) => (
                    <Link to={item?.href}>
                      <li className='w-full px-4 py-2 text-left hover:bg-[#99B37C] hover:text-white'>
                        <span className='w-full cursor-pointer py-2 text-left'>
                          {item?.label}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='flex-initial border-l border-l-white'></div>

          <div className='group relative'>
            <button className='link-underline link-underline-black flex h-full items-center px-4'>
              {currentLanguage?.QUICK_TOOL}
            </button>
            <div className='absolute z-10 mt-0 hidden w-60 rounded-md bg-white text-black shadow-lg group-hover:block'>
              <ul className='py-2 text-left'>
                {quickToolOptions?.map((item) => (
                  <Link to={item?.href}>
                    <li className='w-full px-4 py-2 text-left hover:bg-[#99B37C] hover:text-white'>
                      <span className='w-full cursor-pointer py-2 text-left'>
                        {item?.label}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex-initial border-l border-l-white'></div>
          <div className='group relative'>
            <button className='link-underline link-underline-black flex h-full items-center px-4'>
              {currentLanguage?.QUICK_ACT}
            </button>
            <div className='absolute z-10 mt-0 hidden w-40 rounded-md bg-white text-black shadow-lg group-hover:block'>
              <ul className='py-2 text-left'>
                <Link to={'/bug-log/citizen/citizen-review'}>
                  <li className='w-full px-4 py-2 text-left hover:bg-[#99B37C] hover:text-white'>
                    <span className='w-full cursor-pointer py-2 text-left'>
                      {currentLanguage?.GIVE_FEED}
                    </span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div className='flex-initial border-l border-l-white'></div>

          <div className='group relative'>
            <button className='link-underline link-underline-black flex h-full items-center px-4 '>
              {currentLanguage?.SUPPORT}
            </button>
            <div className='absolute z-10 mt-0 hidden w-40 rounded-md bg-white text-black shadow-lg group-hover:block'>
              <ul className='py-2 text-left'>
                <SidePanel
                  trigger={
                    <Link to={'#'}>
                      <li className='w-full px-4 py-2 text-left hover:bg-[#99B37C] hover:text-white'>
                        <span className='w-full cursor-pointer py-2 text-left'>
                          {' '}
                          {currentLanguage?.RECENT_NEWS}
                        </span>
                      </li>
                    </Link>
                  }
                >
                  <CardTitle className='mb-4 text-lg text-[#0D7538]'>
                    {currentLanguage?.RECENT_NEWS}{' '}
                  </CardTitle>
                  <Recentpdates notificationSide={1} notificationType={1} />
                </SidePanel>

                {/* <Link to={'/bug-log/citizen/zone-ward-list'}><li className="px-4 py-2 hover:bg-[#99B37C] hover:text-white w-full">
                                    <span className="cursor-pointer py-2 w-full">{currentLanguage?.ULB_WISE_WARD_LIST}</span>
                                </li>
                                </Link> */}
                <Link to={'/bug-log/citizen/privacy-policy'}>
                  {' '}
                  <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                    <span className='w-full cursor-pointer py-2'>
                      {currentLanguage?.PRIVACY_POLICY}
                    </span>
                  </li>
                </Link>
                <Link to={'/bug-log/citizen/citizen-faq'}>
                  {' '}
                  <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                    <span className='w-full  cursor-pointer py-2'>
                      {currentLanguage?.FAQ}
                    </span>
                  </li>
                </Link>
                <Link to={'/bug-log/citizen/citizen-testimonials'}>
                  {' '}
                  <li className='w-full px-4 py-2 hover:bg-[#99B37C] hover:text-white'>
                    <span className='w-full  cursor-pointer py-2'>
                      {' '}
                      {currentLanguage?.CITIZEN_FEEDBACK}
                    </span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div className='flex-initial border-l border-l-white'></div>

          {/* <Link className="link-underline link-underline-black flex items-center" to={'/bug-log'}>
                        <span className="cursor-pointer  px-2"><ChangeLanguage/></span>
                    </Link>
                    <div className="flex-initial border-l border-l-white"></div> */}

          <div className='relative '>
            <label className='mb-1 block text-sm font-normal text-white'>
              {currentLanguage?.LANGUAGE || 'Select Language'}
            </label>
            <select
              value={languageKey}
              onChange={handleChange}
              className='-ml-3 -mt-2 flex h-full cursor-pointer items-center bg-transparent px-2 outline-none'
            >
              <option className='text-black hover:bg-gray-200 ' value='english'>
                English
              </option>
              <option className='text-black hover:bg-gray-200 ' value='hindi'>
                हिन्दी
              </option>
            </select>
          </div>

          {!isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger className='border-none'>
                <Button
                  className='flex items-center justify-center'
                  variant={'secondary'}
                >
                  {currentLanguage?.LOG_IN}
                  <LogIn size={15} className='inline' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {currentLanguage?.MY_ACCOUNT}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                  {' '}
                  <Link to={'/bug-log/auth/citizen-sign-up'}>
                    <span className='cursor-pointer  px-2 '>
                      {currentLanguage?.CITIZEN_LOGIN}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  <Link to={'/bug-log/auth/login'}>
                    <span className='cursor-pointer  px-2 '>
                      {currentLanguage?.ADMIN_LOGIN}
                    </span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {isAuthenticated && (
            <Button onClick={Logout} variant={'secondary'}>
              {currentLanguage?.LOG_OUT} &nbsp;{' '}
              <LogOut size={15} className='inline' />
            </Button>
          )}

          {/* <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex justify-center items-center">
                                    <SidePanel trigger={<LifeBuoy size={25} className="cursor-pointer hover:scale-110" />}>
                                        <CardTitle className='mt-10 mb-4 text-[#0D7538] text-lg'>{currentLanguage?.ACCESSIBILITY_OPTIONS}</CardTitle>
                                        <Accessibility />
                                    </SidePanel>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black">
                                <p> {currentLanguage?.CLICK_TO_SEE_ACCESSIBILITY_OPTIONS}.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}
        </div>
      </div>
    </>
  )
}
